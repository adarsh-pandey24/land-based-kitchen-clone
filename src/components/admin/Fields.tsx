"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { createContext, startTransition, useActionState, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export type FormState = {
  message?: string;
  success?: string;
  errors?: Record<string, string[] | undefined>;
};

export const inputClass =
  "w-full border border-line bg-white px-3 py-2.5 text-sm text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";

const FormContext = createContext<{ state: FormState; pending: boolean }>({ state: {}, pending: false });

export function AdminForm({
  action,
  children,
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  children: ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.success) form.current?.reset();
  }, [state]);
  // Submitting through onSubmit (not <form action>) keeps typed values in place
  // when the server returns validation errors.
  return (
    <FormContext value={{ state, pending }}>
      <form
        ref={form}
        className="space-y-6"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          startTransition(() => formAction(formData));
        }}
      >
        {state.message && (
          <p role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {state.message}
          </p>
        )}
        {state.success && (
          <p role="status" className="border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            {state.success}
          </p>
        )}
        {children}
      </form>
    </FormContext>
  );
}

export function useFormErrors() {
  return useContext(FormContext).state.errors ?? {};
}

function useFieldError(name: string) {
  return useContext(FormContext).state.errors?.[name]?.[0];
}

function Wrapper({
  name,
  label,
  hint,
  children,
}: {
  name: string;
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  const error = useFieldError(name);
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <div className="mt-1">{children}</div>
      {hint && !error && <span className="mt-1 block text-xs text-muted">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

type FieldProps = {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  required?: boolean;
  hint?: string;
};

export function TextField({ type = "text", ...p }: FieldProps & { type?: string }) {
  return (
    <Wrapper {...p}>
      <input
        name={p.name}
        type={type}
        required={p.required}
        defaultValue={p.defaultValue ?? ""}
        aria-invalid={!!useFieldError(p.name)}
        className={inputClass}
      />
    </Wrapper>
  );
}

export function TextArea({ rows = 5, ...p }: FieldProps & { rows?: number }) {
  return (
    <Wrapper {...p}>
      <textarea
        name={p.name}
        rows={rows}
        required={p.required}
        defaultValue={p.defaultValue ?? ""}
        aria-invalid={!!useFieldError(p.name)}
        className={inputClass}
      />
    </Wrapper>
  );
}

export function SelectField({ options, ...p }: FieldProps & { options: { value: string; label: string }[] }) {
  return (
    <Wrapper {...p}>
      <select name={p.name} defaultValue={p.defaultValue ?? ""} className={inputClass}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

export function Checkbox({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 accent-[#baa18e]" />
      {label}
    </label>
  );
}

// Image URL input with live preview. This is URL entry, not a file upload:
// host the image elsewhere (or in /public) and paste its address here.
export function ImageUrlField(p: FieldProps) {
  const [url, setUrl] = useState(String(p.defaultValue ?? ""));
  const [broken, setBroken] = useState(false);
  const previewable = /^https:\/\//.test(url) || /^\/(?!\/)/.test(url);
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
      <Wrapper {...p} hint={p.hint ?? "Paste an https:// image URL or a site path such as /images/dish.jpg"}>
        <input
          name={p.name}
          type="text"
          inputMode="url"
          required={p.required}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value.trim());
            setBroken(false);
          }}
          aria-invalid={!!useFieldError(p.name)}
          className={inputClass}
        />
      </Wrapper>
      <div className="flex aspect-square items-center justify-center overflow-hidden border border-dashed border-line bg-mist text-center text-xs text-muted">
        {previewable && !broken ? (
          <img src={url} alt="Preview" className="h-full w-full object-cover" onError={() => setBroken(true)} />
        ) : (
          <span className="px-2">{broken ? "Image could not be loaded" : "Preview"}</span>
        )}
      </div>
    </div>
  );
}

export function SubmitBar({ cancelHref }: { cancelHref: string }) {
  const { pending } = useContext(FormContext);
  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-line pt-6">
      <button type="submit" disabled={pending} className="btn disabled:opacity-60">
        {pending ? "Saving…" : "Save"}
      </button>
      <Link href={cancelHref} className="px-4 py-3 text-sm uppercase tracking-[0.2em] text-muted hover:text-ink">
        Cancel
      </Link>
    </div>
  );
}
