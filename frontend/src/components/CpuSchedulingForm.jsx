import { useState } from 'react';
import AlgorithmSelector from './AlgorithmSelector';
import ProcessCount from './ProcessCount';
import QuantumInput from './QuantumInput';
import InputTableDisplay from './InputTableDisplay';
import Results from './Results';
import GanttChart from './GanttChart';
import Loading from './Loading';

const CpuSchedulingForm = () => {
    const [algo, setAlgo] = useState('');
    const [processCount, setProcessCount] = useState(0);
    const [processes, setProcesses] = useState([]);
    const [quantumTime, setQuantumTime] = useState('');
    const [showPriority, setShowPriority] = useState(false);
    const [showQuantum, setShowQuantum] = useState(false);
    const [showResponse, setShowResponse] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAlgo = (e) => {
        const selectedAlgo = e.target.value;
        setAlgo(selectedAlgo);
        setShowPriority(selectedAlgo === 'PriorityScheduling' || selectedAlgo === 'PrioritySchedulingPreemptive');
        setShowQuantum(selectedAlgo === 'RR');
    };
    const handleProcessCount = (e) => {
        const count = parseInt(e.target.value);
        setProcessCount(count);
        const newProcesses = Array.from({ length: count }, (_, index) => ({
            pid: index + 1,
            arrivalTime: '',
            burstTime: '',
            priority: '',
        }));
        setProcesses(newProcesses);
    };
    const handleProcessChange = (index, arrival, value) => {
        const updated = [...processes];
        updated[index][arrival] = value;
        setProcesses(updated);
    };

    return (
        <>
            {loading && (<Loading />)}
            <div className="flex flex-row justify-center px-4">
                <form className="flex flex-col w-full max-w-6xl gap-10 my-12" onSubmit={
                    async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        try {
                            if (!algo) {
                                alert("Please select a scheduling algorithm.");
                                return;
                            }
                            const payload = {
                                algorithm: algo,
                                quantum: algo === 'RR' ? quantumTime : null,
                                processes: processes.map(process => ({
                                    pid: process.pid,
                                    arrivalTime: parseInt(process.arrivalTime),
                                    burstTime: parseInt(process.burstTime),
                                    priority: process.priority ? parseInt(process.priority) : null
                                }))
                            };
                            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/schedule`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(payload)
                            });

                            if (!response.ok) {
                                throw new Error(`Server responded with ${response.status}`);
                            }
                            const result = await response.json();
                            setShowResponse(result);
                        } catch (err) {
                            alert(err);
                        } finally {
                            setLoading(false);
                        }
                    }}>
                    <div
                        className="p-5 mt-5 rounded-md shadow-xl dark:bg-white/3"
                        style={{ boxShadow: "0px 0px 15px rgba(0,0,0,0.3)" }}
                    >
                        <h1 className="text-4xl font-black mb-7">Output</h1>
                        <GanttChart showResponse={showResponse} />
                        <Results showResponse={showResponse} showPriority={showPriority} />
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10 w-full">
                        <div
                            className="p-5 rounded-md flex-1 flex flex-col gap-4 h-fit dark:bg-white/3"
                            style={{ boxShadow: "0px 0px 15px 7px rgba(0,0,0,0.1)" }}
                        >
                            <h1 className="text-4xl font-black mb-">Input</h1>
                            <AlgorithmSelector handleAlgo={handleAlgo} algo={algo} />
                            <ProcessCount handleProcessCount={handleProcessCount} />
                            <QuantumInput setQuantumTime={setQuantumTime} showQuantum={showQuantum} />
                            <button
                                type="submit"
                                className="flex justify-center py-3 bg-[#1F96FF] text-xl text-white font-bold rounded-2xl cursor-pointer dark:bg-white/6"
                            >
                                Calculate
                            </button>
                        </div>
                        <div
                            className="p-5 rounded flex-1 dark:bg-white/3"
                            style={{ boxShadow: "0px 0px 15px 7px rgba(0,0,0,0.1)" }}
                        >
                            <h1 className="text-4xl font-black mb-4">Processes Input</h1>
                            <InputTableDisplay
                                handleProcessChange={handleProcessChange}
                                processCount={processCount}
                                showPriority={showPriority}
                                processes={processes}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CpuSchedulingForm;
