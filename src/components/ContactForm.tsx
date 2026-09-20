"use client";
import { useState } from "react";
import { useLang } from "./LangProvider";
import { SITE } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

/* FormSubmit always answers HTTP 200, so the real result is the JSON `success` field. Delivery goes to
   info@littlemanlabs.com. To add HubSpot later, post the same fields to its Forms API right after this
   request; email stays as the backup, so no lead depends on a single service. */
export default function ContactForm() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_honey")) return; // bots fill the hidden field
    setStatus("sending");
    try {
      const res = await fetch(SITE.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: data });
      const json = await res.json();
      if (!res.ok || String(json?.success).toLowerCase() === "false") throw new Error("delivery failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} aria-busy={status === "sending"}>
      <input type="hidden" name="_subject" value="New enquiry from littlemanlabs.com" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
      <div className="field">
        <label htmlFor="f-name">{t.contact.name}</label>
        <input id="f-name" name="name" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="f-email">{t.contact.email}</label>
        <input id="f-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="f-org">{t.contact.org}</label>
        <input id="f-org" name="business" autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="f-msg">{t.contact.msg}</label>
        <textarea id="f-msg" name="message" required />
      </div>
      <div className="form-row">
        <button className="send" type="submit" disabled={status === "sending"}>
          {status === "sending" ? t.contact.sending : t.contact.send}
        </button>
        <a className="alt" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
          {t.contact.whatsapp}
        </a>
        <a className="alt" href={`tel:${SITE.phoneTel}`}>
          {t.contact.call} {SITE.phoneLabel}
        </a>
      </div>
      <p className="form-status" role="status" aria-live="polite" data-state={status}>
        {status === "success" ? t.contact.success : status === "error" ? t.contact.error : ""}
      </p>
    </form>
  );
}
