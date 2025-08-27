
const Results = ({ showResponse, showPriority }) => {
  if (!showResponse || !showResponse.processes) return null;

  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold mb-4 border-b border-[#444] pb-2 text-white">Results</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-white border-collapse bg-[#2b2b2b] rounded-md">
          <thead className="bg-[#3a3a3a]">
            <tr>
              <th className="p-3 border border-[#444] sm:text-base md:text-lg">PID</th>
              <th className="p-3 border border-[#444] sm:text-base md:text-lg">Arrival Time</th>
              <th className="p-3 border border-[#444] sm:text-base md:text-lg">Burst Time</th>
              {showPriority && <th className="p-3 border border-[#444] sm:text-base md:text-lg">Priority</th>}
              <th className="p-3 border border-[#444] sm:text-base md:text-lg">Waiting Time</th>
              <th className="p-3 border border-[#444] sm:text-base md:text-lg">Turn-around Time</th>
            </tr>
          </thead>
          <tbody>
            {showResponse.processes
              .sort((a, b) => a.pid - b.pid)
              .map(process => (
                <tr key={process.pid} className="odd:bg-[#2c2c2c] even:bg-[#242424] hover:bg-[#333]">
                  <td className="p-3 border border-[#444] text-center sm:text-base md:text-lg">{process.pid}</td>
                  <td className="p-3 border border-[#444] text-center sm:text-base md:text-lg">{process.arrivalTime}</td>
                  <td className="p-3 border border-[#444] text-center sm:text-base md:text-lg">{process.burstTime}</td>
                  {showPriority && <td className="p-3 border border-[#444] text-center sm:text-base md:text-lg">{process.priority ?? '-'}</td>}
                  <td className="p-3 border border-[#444] text-center sm:text-base md:text-lg">{process.waitingTime}</td>
                  <td className="p-3 border border-[#444] text-center sm:text-base md:text-lg">{process.turnaroundTime}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-[#2c2c2c] rounded-md shadow-inner text-white text-base">
        <p><strong>Average Waiting Time:</strong> {showResponse.avgWaitTime?.toFixed(2)}</p>
        <p><strong>Average Turn-around Time:</strong> {showResponse.avgTurnAroundTime?.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Results
