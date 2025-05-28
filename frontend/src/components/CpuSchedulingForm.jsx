import React, { useState } from 'react';
import '../styles/cpu_scheduling_form.css';
import AlgorithmSelector from './AlgorithmSelector';
import ProcessTable from './ProcessTable';
import { QuantumInput } from './QuantumInput';
import InputTableDisplay from './InputTableDisplay'
import SubmitBTN from './SubmitBTN';
import Results from './Results';
import GanttChart from './GanttChart';

const CpuSchedulingForm = () => {
    const [algo, setAlgo] = useState('');
    const [processCount, setProcessCount] = useState(0);
    const [processes, setProcesses] = useState([]);
    const [quantumTime, setQuantumTime] = useState('');
    const [showPriority, setShowPriority] = useState(false);
    const [showQuantum, setShowQuantum] = useState(false);
    const [showResponse, setShowResponse] = useState([]);

    const handleAlgo = (e) => {
        const selectedAlgo = e.target.value;
        setAlgo(selectedAlgo);
        setShowPriority(selectedAlgo === 'PriorityScheduling' || selectedAlgo == 'PrioritySchedulingPreemptive');
        setShowQuantum(selectedAlgo === 'RR')
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

        console.log("Payload being sent to backend:", payload);

        try {
            const response = await fetch("/api/schedule", {
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
            console.error("Scheduling error:", err);
            alert("Something went wrong.");
        }
    };


    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>

                <AlgorithmSelector handleAlgo={handleAlgo} algo={algo} />

                <ProcessTable handleProcessCount={handleProcessCount} />

                <QuantumInput handleQuantum={handleQuantum} showQuantum={showQuantum} />

                <InputTableDisplay handleProcessChange={handleProcessChange} processCount={processCount}
                    showPriority={showPriority} processes={processes} />

                <SubmitBTN processCount={processCount} />

                <Results showResponse={showResponse} showPriority={showPriority} />

                <GanttChart showResponse={showResponse} />
            </form>
        </div>
    );
};

export default CpuSchedulingForm;
