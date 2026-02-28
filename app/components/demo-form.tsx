"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "../actions/contact";

const initialState: ContactState = {
  status: "idle",
  message: "",
};

const inputBaseClass =
  "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm " +
  "motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/15";

const errorClass = "mt-1 text-xs text-red-700";

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="inline-flex w-full items-center justify-center rounded-md border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:bg-slate-800 hover:shadow disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-200 disabled:text-slate-500 md:w-auto"
    >
      {pending ? "Submitting..." : "Request a 20-minute walkthrough"}
    </button>
  );
}

export function DemoForm() {
  const [state, formAction] = useActionState(submitContact, initialState);
  const hasSucceeded = state.status === "success";
  const searchParams = useSearchParams();

  const fieldErrors = state.fieldErrors ?? {};
  const errorFor = (field: keyof typeof fieldErrors) => fieldErrors[field]?.[0];
  const requestedUseCase = searchParams.get("useCase");
  const defaultUseCase =
    requestedUseCase && ["Fund reporting", "Denials", "Validation", "Other"].includes(requestedUseCase)
      ? requestedUseCase
      : "";

  return (
    <form
      action={formAction}
      noValidate
      className="space-y-5"
      aria-describedby={state.message ? "form-status" : undefined}
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website</label>
        <input id="companyWebsite" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-slate-800">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            aria-required="true"
            aria-invalid={errorFor("name") ? "true" : "false"}
            aria-describedby={errorFor("name") ? "name-error" : undefined}
            className={inputBaseClass}
          />
          {errorFor("name") ? (
            <p id="name-error" className={errorClass}>
              {errorFor("name")}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="company" className="text-sm font-medium text-slate-800">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            aria-required="true"
            aria-invalid={errorFor("company") ? "true" : "false"}
            aria-describedby={errorFor("company") ? "company-error" : undefined}
            className={inputBaseClass}
          />
          {errorFor("company") ? (
            <p id="company-error" className={errorClass}>
              {errorFor("company")}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="role" className="text-sm font-medium text-slate-800">
            Role (optional)
          </label>
          <input
            id="role"
            name="role"
            type="text"
            aria-invalid={errorFor("role") ? "true" : "false"}
            aria-describedby={errorFor("role") ? "role-error" : undefined}
            className={inputBaseClass}
          />
          {errorFor("role") ? (
            <p id="role-error" className={errorClass}>
              {errorFor("role")}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-800">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-required="true"
            aria-invalid={errorFor("email") ? "true" : "false"}
            aria-describedby={errorFor("email") ? "email-error" : undefined}
            className={inputBaseClass}
          />
          {errorFor("email") ? (
            <p id="email-error" className={errorClass}>
              {errorFor("email")}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="useCase" className="text-sm font-medium text-slate-800">
          Use case
        </label>
        <select
          id="useCase"
          name="useCase"
          required
          defaultValue={defaultUseCase}
          aria-required="true"
          aria-invalid={errorFor("useCase") ? "true" : "false"}
          aria-describedby={errorFor("useCase") ? "useCase-error" : undefined}
          className={inputBaseClass}
        >
          <option value="" disabled>
            Select a use case
          </option>
          <option value="Fund reporting">Fund reporting</option>
          <option value="Denials">Denials</option>
          <option value="Validation">Validation</option>
          <option value="Other">Other</option>
        </select>
        {errorFor("useCase") ? (
          <p id="useCase-error" className={errorClass}>
            {errorFor("useCase")}
          </p>
        ) : null}
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-slate-800">Data sources</legend>
        <p className="mt-1 text-xs text-slate-500">Select all that apply.</p>
        <div className="mt-3 grid grid-flow-col auto-cols-[minmax(140px,1fr)] gap-3 overflow-x-auto pb-1">
          {[
            { label: "PDF", value: "PDF" },
            { label: "Excel", value: "Excel" },
            { label: "Emails", value: "Emails" },
            { label: "Database", value: "Database" },
            { label: "Other", value: "Other" },
          ].map((source) => {
            const id = `data-source-${source.value.toLowerCase()}`;

            return (
              <label
                key={source.value}
                htmlFor={id}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm motion-safe:transition motion-safe:duration-150 motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-md"
              >
                <input
                  id={id}
                  name="dataSources"
                  type="checkbox"
                  value={source.value}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/15"
                />
                <span className="font-medium">{source.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="notes" className="text-sm font-medium text-slate-800">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          aria-invalid={errorFor("notes") ? "true" : "false"}
          aria-describedby={errorFor("notes") ? "notes-error" : undefined}
          className={`${inputBaseClass} resize-y`}
        />
        {errorFor("notes") ? (
          <p id="notes-error" className={errorClass}>
            {errorFor("notes")}
          </p>
        ) : null}
      </div>

      <div className="space-y-3">
        <SubmitButton disabled={hasSucceeded} />
        {state.message ? (
          <p
            id="form-status"
            role="status"
            aria-live="polite"
            className={state.status === "success" ? "text-sm text-emerald-700" : "text-sm text-red-700"}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
