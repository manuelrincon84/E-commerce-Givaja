export default function FormField({ label, name, type = "text", value, onChange, error, placeholder = "", required = false, options = null, rows = 4 }) {
  const baseInputClass = "w-full border p-2 rounded focus:outline-none focus:ring-2";
  const baseInputStyle = {
    borderColor: error ? 'var(--error-500)' : 'var(--gray-300)',
    '--tw-ring-color': 'var(--primary-500)'
  };
  const errorClass = error ? "" : "";

  return (
    <div className="mb-3">
      {label && (
        <label className="block mb-1 font-medium text-gray-700">
          {label}
          {required && <span className="ml-1" style={{ color: 'var(--primary-600)' }}>*</span>}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`${baseInputClass} ${errorClass} resize-none`}
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`${baseInputClass} ${errorClass}`}
        >
          <option value="">Seleccionar {label?.toLowerCase() || "opción"}</option>
          {options?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name || `${option.first_name} ${option.last_name}`}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseInputClass} ${errorClass}`}
          step={type === "number" ? "0.01" : undefined}
        />
      )}

      {error && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
    </div>
  );
}
