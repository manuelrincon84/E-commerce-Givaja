export default function Badge({ value, type = "default", children }) {
  let bgStyle = {
    backgroundColor: 'var(--gray-200)',
    color: 'var(--gray-800)'
  };

  if (type === "success") {
    bgStyle = { backgroundColor: 'var(--primary-100)', color: 'var(--primary-700)' };
  } else if (type === "danger") {
    bgStyle = { backgroundColor: 'var(--error-50)', color: 'var(--error-700)' };
  } else if (type === "primary") {
    bgStyle = { backgroundColor: 'var(--info-50)', color: 'var(--info-600)' };
  }

  return (
    <span style={bgStyle} className="inline-block px-3 py-1 rounded-full text-sm font-medium">
      {children || value}
    </span>
  );
}
