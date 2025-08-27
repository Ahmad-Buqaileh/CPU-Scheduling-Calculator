
const GanttChart = ({ showResponse }) => {
  if (!showResponse || !showResponse.ganttChart) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 border-b border-[#444] pb-2 text-white">Gantt Chart</h2>
      <div className="flex flex-col gap-4">
        <div className="flex w-full h-20 items-center relative">
          {showResponse.ganttChart.map((process, index) => (
            <div key={index} className="flex-1 relative">
              <div className="bg-[#2c2c2c] h-14 flex items-center justify-center text-white font-bold border-r border-[#444]">
                {process.pid === 0 ? 'IDLE' : `P${process.pid}`}
              </div>
              {index === 0 && (
                <span className="absolute left-0 -bottom-6 text-sm text-white">{process.start}</span>
              )}
              <span className="absolute right-0 -bottom-6 text-sm text-white">{process.end}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
