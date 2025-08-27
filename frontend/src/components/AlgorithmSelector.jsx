
const AlgorithmSelector = ({ handleAlgo, algo }) => {
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor="algorithm" className="font-semibold mb-2 text-white">
                Choose the type of Scheduling:
            </label>
            <select
                id="algorithm"
                className="p-2 h-12 border border-[#444] rounded-md bg-[#2c2c2c] text-white focus:outline-none focus:border-[#888] focus:ring-2 focus:ring-white"
                value={algo}
                onChange={handleAlgo}>
                <option value="" className="text-lg">-- Select an Algorithm --</option>
                <option value="FCFS" className="text-lg">First-Come, First-Served (FCFS)</option>
                <option value="SJF" className="text-lg">Shortest-Job-First (SJF)</option>
                <option value="SRTF" className="text-lg">Shortest-Remaining-Time-First (SRTF)</option>
                <option value="PriorityScheduling" className="text-lg">Priority Scheduling (Non-Preemptive)</option>
                <option value="PrioritySchedulingPreemptive" className="text-lg">Priority Scheduling (Preemptive)</option>
                <option value="RR" className="text-lg">Round Robin (RR)</option>
            </select>
        </div>
    )
}

export default AlgorithmSelector
