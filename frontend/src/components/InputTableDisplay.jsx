import React from 'react'

const InputTableDisplay = ({ handleProcessChange, processCount, showPriority, processes }) => {

  return (
    (processCount > 1 && processCount <= 10) && (
      <div className="form_group">
        <table className="proccesses_table">
          <thead>
            <tr>
              <th>PID</th>
              <th>Arrival Time</th>
              <th>Burst Time</th>
              {showPriority && <th>Priority</th>}
            </tr>
          </thead>
          <tbody>
            {processes.map((process, index) => (
              <tr key={index}>
                <td>{process.pid}</td>
                <td>
                  <input
                    className='no_spinner'
                    type="number"
                    value={process.arrivalTime}
                    onChange={(e) =>
                      handleProcessChange(index, 'arrivalTime', e.target.value)
                    }
                    min={0}
                  />
                </td>
                <td>
                  <input
                    className='no_spinner'
                    type="number"
                    value={process.burstTime}
                    onChange={(e) =>
                      handleProcessChange(index, 'burstTime', e.target.value)
                    }
                    min={1}
                  />
                </td>
                {showPriority && (
                  <td>
                    <input
                      className='no_spinner'
                      type="number"
                      value={process.priority}
                      onChange={(e) =>
                        handleProcessChange(index, 'priority', e.target.value)
                      }
                      min={1}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  )
}

export default InputTableDisplay