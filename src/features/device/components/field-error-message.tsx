import { FieldError } from "@heroui/react";

export default function FieldErrorMessage({ message, isFormLoading }: { message?: string; isFormLoading: boolean }) {
  return message && !isFormLoading ? (
    <p aria-live="polite" className="text-danger px-1 text-xs">
      {message}
    </p>
  ) : (
    <FieldError />
  );
}
