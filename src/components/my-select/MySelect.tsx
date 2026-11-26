import "./my-select.sass";
type SelectProps<T extends string> = {
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
  label?: string;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

export default function MySelect<T extends string>({
  value,
  options,
  onChange,
  label,
  error,
  disabled,
  placeholder,
}: SelectProps<T>) {
  return (
    <div className="my-select">
      {label && (
        <div>
          <label className="my-select-label">{label}</label>
          {error && <span className="my-select-error-sign">!</span>}
        </div>
      )}

      <select
        className={`my-select-field ${error ? "my-select-field-error" : ""} ${disabled ? "my-select-disabled" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="my-select-error-text">This field is required</p>}
    </div>
  );
}
