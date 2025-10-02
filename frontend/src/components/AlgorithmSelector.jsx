const AlgorithmSelector = ({ handleAlgo, algo }) => {
    return (
        <div className="flex flex-col">
            <label htmlFor="algorithm" className="font-semibold mb-2">
                Choose the type of Scheduling:
            </label>
            <select
                id="algorithm"
                className="p-2 h-12 font-semibold border-1 border-[#ced4da] rounded-md dark:bg-white/6 dark:border-0"
                value={algo}
                onChange={handleAlgo}>
                <option value="" className="lg:text-lg">-- Select an Algorithm --</option>
                <option value="FCFS" className="lg:text-lg">First-Come, First-Served (FCFS)</option>
                <option value="SJF" className="lg:text-lg">Shortest-Job-First (SJF)</option>
                <option value="SRTF" className="lg:text-lg">Shortest-Remaining-Time-First (SRTF)</option>
                <option value="PriorityScheduling" className="lg:text-lg">Priority Scheduling (Non-Preemptive)</option>
                <option value="PrioritySchedulingPreemptive" className="lg:text-lg">Priority Scheduling (Preemptive)</option>
                <option value="RR" className="lg:text-lg">Round Robin (RR)</option>
            </select>
        </div>
    )
}

export default AlgorithmSelector;
