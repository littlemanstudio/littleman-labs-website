"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "./LangProvider";
import { SITE } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";
type StepKey = "message" | "phone" | "name";

const STEPS: StepKey[] = ["message", "phone", "name"];

/* One question at a time, shortest first: what they need, where to send the quote, who they are.
   FormSubmit always answers HTTP 200, so the real result is the JSON `success` field. Delivery goes to
   info@littlemanlabs.com. To add HubSpot later, post the same fields to its Forms API right after this
   request; email stays as the backup, so no lead depends on a single service. */
export default function ContactForm() {
  const { t } = useLang();
  const c = t.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<StepKey, string>>({ message: "", phone: "", name: "" });
  const [problem, setProblem] = useState("");
  const [honey, setHoney] = useState("");
  const field = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const moved = useRef(false);

  // Move focus to the new question after a step change, never on first paint (that would scroll the page).
  useEffect(() => {
    if (moved.current) field.current?.focus({ preventScroll: true });
  }, [step]);

  const key = STEPS[step];
  const last = step === STEPS.length - 1;
  const done = status === "success";

  function check(k: StepKey) {
    const v = values[k].trim();
    if (k === "message" && v.length < 3) return c.needMsg;
    if (k === "phone" && v.replace(/\D/g, "").length < 7) return c.needPhone;
    if (k === "name" && v.length < 2) return c.needName;
    return "";
  }

  async function send() {
    if (honey) return; // bots fill the hidden field
    setStatus("sending");
    const data = new FormData();
    data.append("_subject", "New enquiry from littlemanlabs.com");
    data.append("_template", "table");
    data.append("_captcha", "false");
    data.append("name", values.name.trim());
    data.append("phone", values.phone.trim());
    data.append("message", values.message.trim());
    try {
      const res = await fetch(SITE.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: data });
      const json = await res.json();
      if (!res.ok || String(json?.success).toLowerCase() === "false") throw new Error("delivery failed");
      setStatus("success");
      setValues({ message: "", phone: "", name: "" });
      setStep(0);
    } catch {
      setStatus("error");
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const msg = check(key);
    setProblem(msg);
    if (msg) return;
    if (!last) {
      moved.current = true;
      setStep(step + 1);
      return;
    }
    send();
  }

  function back() {
    moved.current = true;
    setProblem("");
    setStep(step - 1);
  }

  function onChange(v: string) {
    setValues((cur) => ({ ...cur, [key]: v }));
    if (problem) setProblem("");
    if (status === "error") setStatus("idle");
  }

  const label = key === "message" ? c.msg : key === "phone" ? c.phonePrompt : c.namePrompt;
  const hint = key === "message" ? c.msgHint : key === "phone" ? c.phoneHint : "";

  return (
    <form className="form step-form" onSubmit={onSubmit} aria-busy={status === "sending"} noValidate>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} value={honey} onChange={(e) => setHoney(e.target.value)} />
      {!done && (
        <>
          <div className="step-meter" aria-hidden="true">
            <span className="step-count">{c.step(step + 1, STEPS.length)}</span>
            <span className="step-bar">
              <i style={{ transform: `scaleX(${(step + 1) / STEPS.length})` }} />
            </span>
          </div>
          <div className="field step-field">
            <label htmlFor="f-step">{label}</label>
            {key === "message" ? (
              <textarea
                key={key}
                id="f-step"
                ref={field as unknown as React.RefObject<HTMLTextAreaElement>}
                value={values.message}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                  // Enter moves on, Shift+Enter writes a new line.
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
                aria-describedby="f-step-note"
                rows={3}
              />
            ) : (
              <input
                key={key}
                id="f-step"
                ref={field}
                value={values[key]}
                onChange={(e) => onChange(e.target.value)}
                type={key === "phone" ? "tel" : "text"}
                inputMode={key === "phone" ? "tel" : "text"}
                autoComplete={key === "phone" ? "tel" : "name"}
                placeholder={key === "phone" ? c.phonePlaceholder : ""}
                aria-describedby="f-step-note"
              />
            )}
            <p className="step-note" id="f-step-note" data-state={problem ? "error" : "idle"} role={problem ? "alert" : undefined}>
              {problem || hint}
            </p>
          </div>
          <div className="form-row">
            <button className="send" type="submit" disabled={status === "sending"}>
              {status === "sending" ? c.sending : last ? c.send : c.next}
            </button>
            {step > 0 && (
              <button className="alt step-back" type="button" onClick={back} disabled={status === "sending"}>
                {c.back}
              </button>
            )}
          </div>
        </>
      )}
      <div className="form-row">
        <a className="alt" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
          {c.whatsapp}
        </a>
        <a className="alt" href={`tel:${SITE.phoneTel}`}>
          {c.call} {SITE.phoneLabel}
        </a>
      </div>
      <p className="form-status" role="status" aria-live="polite" data-state={status}>
        {status === "success" ? c.success : status === "error" ? c.error : ""}
      </p>
    </form>
  );
}
