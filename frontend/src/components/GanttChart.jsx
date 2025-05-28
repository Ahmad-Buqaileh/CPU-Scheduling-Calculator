
const GanttChart = ({ showResponse }) => {
  if (!showResponse || !showResponse.ganttChart) return null;

  return (
    <div className="gantt_chart">
      <h2 className="title">Gantt Chart</h2>
      <div className="gantt_bar">
        {showResponse.ganttChart.map((process, index) => (
          <div key={index} className="time_stamp">
            <div className="gantt_block">
              {process.pid === 0 ? `IDLE` : `P${process.pid}`}
            </div>
            {index === 0 && (<span className="start">{process.start}</span>)}  <span className="end">{process.end}</span>
          </div>
        ))}
      </div>

    </div>
  );
};


export default GanttChart