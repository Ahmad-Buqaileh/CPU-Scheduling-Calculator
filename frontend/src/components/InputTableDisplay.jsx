const InputTableDisplay = ({ handleProcessChange, processCount, showPriority, processes }) => {
  const load = (processCount > 1 && processCount <= 10);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm rounded-md">
        <thead className="bg-gray-50 dark:bg-white/6">
          <tr>
            <th className="p-3 border border-[#ced4da] dark:border-white/6">PID</th>
            <th className="p-3 border border-[#ced4da] dark:border-white/6">Arrival Time</th>
            <th className="p-3 border border-[#ced4da] dark:border-white/6">Burst Time</th>
            {showPriority && <th className="p-3 border border-[#ced4da] dark:border-white/6">Priority</th>}
          </tr>
        </thead>
        {load && (
          <tbody className="sm:text-base md:text-lg">
            {processes.map((process, index) => (
              <tr key={index} className="dark:odd:bg-white/3 even:bg-gray-50 dark:even:bg-white/6">
                <td className="p-3 border border-[#ced4da] dark:border-white/6 text-center">{process.pid}</td>
                <td className="p-3 border border-[#ced4da] dark:border-white/6 text-center">
                  <input
                    type="number"
                    required
                    min={0}
                    value={process.arrivalTime}
                    onChange={(e) => handleProcessChange(index, 'arrivalTime', e.target.value)}
                    className="w-14 h-10 p-2 text-center border-1 border-[#ced4da] rounded-md dark:border-0 bg-white/6"
                  />
                </td>
                <td className="p-3 border border-[#ced4da] dark:border-white/6 text-center">
                  <input
                    type="number"
                    required
                    min={1}
                    value={process.burstTime}
                    onChange={(e) => handleProcessChange(index, 'burstTime', e.target.value)}
                    className="w-14 h-10 p-2 text-center border-1 border-[#ced4da] rounded-md dark:border-0 bg-white/6"
                  />
                </td>
                {showPriority && (
                  <td className="p-3 border border-[#ced4da] dark:border-white/6 text-center">
                    <input
                      type="number"
                      required
                      min={1}
                      value={process.priority}
                      onChange={(e) => handleProcessChange(index, 'priority', e.target.value)}
                      className="w-14 h-10 p-2 text-center border-1 border-[#ced4da] rounded-md dark:border-0 bg-white/6"
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
};

export default InputTableDisplay;
