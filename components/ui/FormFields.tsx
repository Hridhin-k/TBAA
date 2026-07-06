import { cn } from "@/utils/cn";

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
};

export function Label({ htmlFor, children, required, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block text-sm font-medium tracking-wide text-ink mb-2",
        className
      )}
    >
      {children}
      {required && (
        <span className="text-stone ml-1" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export function Input({ className, error, id, ...props }: InputProps) {
  return (
    <div>
      <input
        id={id}
        className={cn(
          "w-full bg-transparent border-b border-mist-dark px-0 py-3",
          "text-ink placeholder:text-stone-light",
          "transition-colors duration-300",
          "focus:outline-none focus:border-ink",
          error && "border-red-500",
          className
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

export function Textarea({ className, error, id, ...props }: TextareaProps) {
  return (
    <div>
      <textarea
        id={id}
        className={cn(
          "w-full bg-transparent border-b border-mist-dark px-0 py-3 min-h-[120px] resize-y",
          "text-ink placeholder:text-stone-light",
          "transition-colors duration-300",
          "focus:outline-none focus:border-ink",
          error && "border-red-500",
          className
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
};

export function Select({
  className,
  error,
  id,
  options,
  placeholder,
  ...props
}: SelectProps) {
  return (
    <div>
      <select
        id={id}
        className={cn(
          "w-full bg-transparent border-b border-mist-dark px-0 py-3",
          "text-ink appearance-none cursor-pointer",
          "transition-colors duration-300",
          "focus:outline-none focus:border-ink",
          error && "border-red-500",
          className
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type CheckboxProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  error?: string;
};

export function Checkbox({ id, checked, onChange, label, error }: CheckboxProps) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 accent-ink cursor-pointer shrink-0"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <label htmlFor={id} className="text-sm text-stone leading-relaxed cursor-pointer">
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
