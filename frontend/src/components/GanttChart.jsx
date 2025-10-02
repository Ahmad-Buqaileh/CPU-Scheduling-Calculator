const GanttChart = ({ showResponse }) => {
  if (!showResponse || !showResponse.ganttChart) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 border-b border-[#ced4da] dark:border-white/6 pb-2">Gantt Chart</h2>
      <div className="flex flex-col gap-4">
        <div className="flex w-full h-20 items-center relative">
          {showResponse.ganttChart.map((process, index) => (
            <div key={index} className="flex-1 relative border border-[#ced4da] dark:border-0">
              <div className="h-14 flex items-center justify-center font-bold border-r border-[#ced4da] dark:border-white/12 dark:bg-white/6">
                {process.pid === 0 ? 'IDLE' : `P${process.pid}`}
              </div>
              {index === 0 && (
                <span className="absolute left-0 -bottom-6 text-sm">{process.start}</span>
              )}
              <span className="absolute right-0 -bottom-6 text-sm">{process.end}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;