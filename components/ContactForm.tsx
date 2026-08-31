"use client";

import { useState } from "react";
import { useLang } from "@/components/LangProvider";

type Status = "idle" | "sending" | "success" | "error";

/* Same success/failure check as the live site's fix: FormSubmit always
   returns HTTP 200, the real result is in the JSON body's "success" field
   (a string, "true"/"false"), so res.ok alone is not enough. */
export function ContactForm() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formsubmit.co/ajax/info@littlemanlabs.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();
      if (!res.ok || String(json?.success).toLowerCase() === "false") {
        throw new Error("FormSubmit reported failure");
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="text-sm text-[var(--patina)]">{t("contact.form.success")}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="_subject" value="Nueva consulta, littlemanlabs.com" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-bone-faint">
            {t("contact.form.name")}
          </span>
          <input
            required
            name="name"
            type="text"
            className="rounded-md border border-bone/20 bg-graphite-deep/95 px-3 py-2.5 text-sm text-bone outline-none backdrop-blur-sm focus:border-bronze-bright"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs uppercase tracking-[0.06em] text-bone-faint">
            {t("contact.form.email")}
          </span>
          <input
            required
            name="email"
            type="email"
            className="rounded-md border border-bone/20 bg-graphite-deep/95 px-3 py-2.5 text-sm text-bone outline-none backdrop-blur-sm focus:border-bronze-bright"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-xs uppercase tracking-[0.06em] text-bone-faint">
          {t("contact.form.org")}
        </span>
        <input
          name="business"
          type="text"
          className="rounded-md border border-bone/20 bg-graphite-deep/95 px-3 py-2.5 text-sm text-bone outline-none backdrop-blur-sm focus:border-bronze-bright"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-xs uppercase tracking-[0.06em] text-bone-faint">
          {t("contact.form.message")}
        </span>
        <textarea
          required
          name="message"
          rows={4}
          className="resize-none rounded-md border border-bone/20 bg-graphite-deep/95 px-3 py-2.5 text-sm text-bone outline-none backdrop-blur-sm focus:border-bronze-bright"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 w-fit rounded-md border border-bronze/70 px-6 py-3 font-mono text-sm uppercase tracking-[0.06em] text-bronze-bright transition-colors hover:bg-bronze-bright hover:text-graphite-deep disabled:opacity-50"
      >
        {status === "sending" ? t("contact.form.sending") : t("contact.form.submit")}
      </button>

      {status === "error" && <p className="text-sm text-red-400">{t("contact.form.error")}</p>}
    </form>
  );
}
