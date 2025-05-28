
const AlgorithmSelector = ({ handleAlgo, algo }) => {
    return (
        <div className="form_group">
            <label htmlFor="algorithm">Choose the type of Scheduling:</label>
            <select
                id="algorithm"
                className="algo_input"
                value={algo}
                onChange={handleAlgo}>
                <option value="">-- Select an Algorthim --</option>
                <option value="FCFS">First-Come, First-Served (FCFS)</option>
                <option value="SJF">Shortest-Job-First (SJF)</option>
                <option value="SRTF">Shortest-Remaining-Time-First (SRTF)</option>
                <option value="PriorityScheduling">Priority Scheduling (Non-Preemptive)</option>
                <option value="PrioritySchedulingPreemptive">Priority Scheduling (Preemptive)</option>
                <option value="RR">Round Robin (RR)</option>
            </select>
        </div>
    )
}

export default AlgorithmSelector