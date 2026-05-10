export default function Table({ headers, rows, children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-green-400 text-white">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-3 text-left font-semibold text-sm">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-6 py-4 text-center text-gray-500">
                No hay registros
              </td>
            </tr>
          ) : (
            rows.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                {children ? children(row) : <td colSpan={headers.length}>{row}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
