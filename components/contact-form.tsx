"use client";

import { useActionState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { submitContactForm } from "@/app/actions";

const FIELD =
  "w-full border border-border bg-surface-2 px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

const LABEL = "font-sans text-sm font-medium text-text-secondary";

type Props = { subject?: string };

export function ContactForm({ subject }: Props) {
  const searchParams = useSearchParams();
  const prefilledSubject = subject ?? searchParams.get("subject") ?? "";

  const [state, action, pending] = useActionState(submitContactForm, {
    status: "idle",
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="flex flex-col gap-3 border border-border bg-surface p-6">
        <p className="font-sans text-base font-medium text-text-primary">
          Message sent.
        </p>
        <p className="font-sans text-sm text-text-secondary">
          I&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-name" className={LABEL}>
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={FIELD}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-email" className={LABEL}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={FIELD}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="cf-subject" className={LABEL}>
          Subject
        </label>
        <input
          id="cf-subject"
          name="subject"
          type="text"
          required
          defaultValue={prefilledSubject}
          placeholder="What can I help you with?"
          className={FIELD}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="cf-message" className={LABEL}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="Tell me more..."
          className={`${FIELD} resize-none`}
        />
      </div>
      {state.status === "error" && (
        <p role="alert" className="font-sans text-sm text-text-secondary">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-fit items-center justify-center border border-accent px-8 py-4 font-sans text-base font-medium uppercase tracking-wider text-text-primary transition-[box-shadow,border-color,opacity] duration-200 hover:border-[var(--color-accent-hover)] hover:shadow-[var(--shadow-accent-glow)] focus:outline-none focus-visible:border-[var(--color-accent-hover)] focus-visible:shadow-[var(--shadow-accent-glow)] disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
