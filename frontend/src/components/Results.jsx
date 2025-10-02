const Results = ({ showResponse, showPriority }) => {
  if (!showResponse || !showResponse.processes) return null;

  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold mb-4 border-b border-[#ced4da] dark:border-white/6 pb-2">Results</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm rounded-md">
          <thead className="bg-gray-50 dark:bg-white/6">
            <tr>
              <th className="p-3 border border-[#ced4da] dark:border-white/6 sm:text-base md:text-lg">PID</th>
              <th className="p-3 border border-[#ced4da] dark:border-white/6 sm:text-base md:text-lg">Arrival Time</th>
              <th className="p-3 border border-[#ced4da] dark:border-white/6 sm:text-base md:text-lg">Burst Time</th>
              {showPriority && (
                <th className="p-3 border border-[#ced4da] dark:border-white/6 sm:text-base md:text-lg">Priority</th>
              )}
              <th className="p-3 border border-[#ced4da] dark:border-white/6 sm:text-base md:text-lg">Waiting Time</th>
              <th className="p-3 border border-[#ced4da] dark:border-white/6 sm:text-base md:text-lg">Turn-around Time</th>
            </tr>
          </thead>
          <tbody className="sm:text-base md:text-lg">
            {showResponse.processes
              .sort((a, b) => a.pid - b.pid)
              .map(process => (
                <tr
                  key={process.pid}
                  className="dark:odd:bg-white/3 even:bg-gray-50 dark:even:bg-white/6"
                >
                  <td className="p-3 border border-[#ced4da] dark:border-white/6 text-center">{process.pid}</td>
                  <td className="p-3 border border-[#ced4da] dark:border-white/6 text-center">{process.arrivalTime}</td>
                  <td className="p-3 border border-[#ced4da] dark:border-white/6 text-center">{process.burstTime}</td>
                  {showPriority && (
                    <td className="p-3 border border-[#ced4da] dark:border-white/6 text-center">
                      {process.priority ?? '-'}
                    </td>
                  )}
                  <td className="p-3 border border-[#ced4da] dark:border-white/6 text-center">{process.waitingTime}</td>
                  <td className="p-3 border border-[#ced4da] dark:border-white/6 text-center">{process.turnaroundTime}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-gray-50 dark:bg-white/6 rounded-md shadow-inner text-base">
        <p><strong>Average Waiting Time:</strong> {showResponse.avgWaitTime?.toFixed(2)}</p>
        <p><strong>Average Turn-around Time:</strong> {showResponse.avgTurnAroundTime?.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Results;