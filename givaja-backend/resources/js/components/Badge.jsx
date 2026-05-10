export default function Badge({ value, type = "default", children }) {
  let bgClass = "bg-gray-200 text-gray-800";

  if (type === "success") {
    bgClass = "bg-green-200 text-green-800";
  } else if (type === "danger") {
    bgClass = "bg-red-200 text-red-800";
  } else if (type === "primary") {
    bgClass = "bg-blue-200 text-blue-800";
  }

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${bgClass}`}>
      {children || value}
    </span>
  );
}
