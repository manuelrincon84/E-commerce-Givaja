export default function Table({ headers, rows, children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
        <thead style={{ backgroundColor: 'var(--primary-500)', color: 'white' }}>
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
              <td colSpan={headers.length} style={{ color: 'var(--gray-500)' }} className="px-6 py-4 text-center">
                No hay registros
              </td>
            </tr>
          ) : (
            rows.map((row, idx) => (
              <tr key={idx} style={{ borderBottomColor: 'var(--gray-200)' }} className="border-b hover:bg-gray-50 transition">
                {children ? children(row) : <td colSpan={headers.length}>{row}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
