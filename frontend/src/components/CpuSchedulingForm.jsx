
import { useState } from 'react';
import AlgorithmSelector from './AlgorithmSelector';
import ProcessTable from './ProcessTable';
import { QuantumInput } from './QuantumInput';
import InputTableDisplay from './InputTableDisplay';
import SubmitBTN from './SubmitBTN';
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

    const handleQuantum = (e) => {
        setQuantumTime(parseInt(e.target.value));
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
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

        try {
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
            setLoading(false);
            console.error("Scheduling error:", err);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && (<Loading />)}
            <div className="flex flex-row justify-center px-4">
                <form className="w-full max-w-6xl gap-6 my-12" onSubmit={handleSubmit}>
                    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-10 w-full'>
                        <div className="bg-[#1e1e1e] shadow-xl p-5 rounded flex-1 flex flex-col gap-4 h-fit">
                            <h1 className="text-white text-4xl font-medium mb-4">Input</h1>
                            <AlgorithmSelector handleAlgo={handleAlgo} algo={algo} />
                            <ProcessTable handleProcessCount={handleProcessCount} />
                            <QuantumInput handleQuantum={handleQuantum} showQuantum={showQuantum} />
                            <SubmitBTN processCount={processCount} />
                        </div>

                        <div className="bg-[#1e1e1e] shadow-xl p-5 rounded flex-1">
                            <h1 className="text-white text-4xl font-medium mb-7">Processes Input</h1>
                            <InputTableDisplay
                                handleProcessChange={handleProcessChange}
                                processCount={processCount}
                                showPriority={showPriority}
                                processes={processes}
                            />
                        </div>
                    </div>
                    <div className='bg-[#1e1e1e] p-5 mt-5 rounded shadow-xl'>
                        <h1 className="text-white text-4xl font-medium mb-7">Output</h1>
                        <GanttChart showResponse={showResponse} />
                        <Results showResponse={showResponse} showPriority={showPriority} />
                    </div>
                </form>
            </div>
        </>
    );
};

export default CpuSchedulingForm;
