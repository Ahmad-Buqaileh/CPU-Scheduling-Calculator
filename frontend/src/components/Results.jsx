
const Results = ({ showResponse, showPriority }) => {
  if (!showResponse || !showResponse.processes) return null;

  return (
    <div className='form_results'>
      <h2 className='title'>Results</h2>

      <table className='results_table'>
        <thead>
          <tr>
            <th>PID</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            {showPriority && (<th>Priority</th>)}
            <th>Waiting Time</th>
            <th>Turn-around Time</th>
          </tr>
        </thead>
        <tbody>
          {showResponse?.processes
            ?.slice()
            .sort((a, b) => a.pid - b.pid)
            .map(process => (
              <tr key={process.pid}>
                <td>{process.pid}</td>
                <td>{process.arrivalTime}</td>
                <td>{process.burstTime}</td>
                {showPriority && <td>{process.priority ?? '-'}</td>}
                <td>{process.waitingTime}</td>
                <td>{process.turnaroundTime}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className='avg_container'>

        <p><strong>Average Waiting Time:</strong> {showResponse.avgWaitTime?.toFixed(2)}</p>
        <p><strong>Average Turn-around Time:</strong> {showResponse.avgTurnAroundTime?.toFixed(2)}</p>

      </div>


    </div >
  );
}

export default Results