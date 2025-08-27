
const InputTableDisplay = ({ handleProcessChange, processCount, showPriority, processes }) => {
  const load = (processCount > 1 && processCount <= 10);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm text-white bg-[#2c2c2c] rounded-md">
        <thead className="bg-[#3a3a3a]">
          <tr>
            <th className="p-3 border border-[#444]">PID</th>
            <th className="p-3 border border-[#444]">Arrival Time</th>
            <th className="p-3 border border-[#444]">Burst Time</th>
            {showPriority && <th className="p-3 border border-[#444]">Priority</th>}
          </tr>
        </thead>
        {load && (
          <tbody className="sm:text-base md:text-lg">
            {processes.map((process, index) => (
              <tr key={index} className="odd:bg-[#2c2c2c] even:bg-[#242424] hover:bg-[#333]">
                <td className="p-3 border border-[#444] text-center">{process.pid}</td>
                <td className="p-3 border border-[#444] text-center">
                  <input
                    type="number"
                    min={0}
                    value={process.arrivalTime}
                    onChange={(e) => handleProcessChange(index, 'arrivalTime', e.target.value)}
                    className="w-16 p-1 text-center bg-[#1e1e1e] text-white border border-[#555] rounded-md focus:outline-none focus:border-[#888] focus:ring-2 focus:ring-white"
                  />
                </td>
                <td className="p-3 border border-[#444] text-center">
                  <input
                    type="number"
                    min={1}
                    value={process.burstTime}
                    onChange={(e) => handleProcessChange(index, 'burstTime', e.target.value)}
                    className="w-16 p-1 text-center bg-[#1e1e1e] text-white border border-[#555] rounded-md focus:outline-none focus:border-[#888] focus:ring-2 focus:ring-white"
                  />
                </td>
                {showPriority && (
                  <td className="p-3 border border-[#444] text-center">
                    <input
                      type="number"
                      min={1}
                      value={process.priority}
                      onChange={(e) => handleProcessChange(index, 'priority', e.target.value)}
                      className="w-16 p-1 text-center bg-[#1e1e1e] text-white border border-[#555] rounded-md focus:outline-none focus:border-[#888] focus:ring-2 focus:ring-white"
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  )
}

export default InputTableDisplay
