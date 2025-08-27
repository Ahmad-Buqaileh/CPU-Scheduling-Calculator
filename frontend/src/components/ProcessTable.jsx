import { useState } from 'react';

const ProcessTable = ({ handleProcessCount }) => {
    const [isValid, setIsValid] = useState(true);

    const validateInput = (e) => {
        const val = parseInt(e.target.value);
        const valid = val >= 2 && val <= 10;
        setIsValid(valid);
        handleProcessCount(e);
    };

    return (
        <div className="flex flex-col mb-4">
            <label htmlFor="processCount" className="font-semibold mb-2 text-white">
                Number of processes <span className="text-gray-400">(2–10)</span> : {!isValid && (
                    <span className="text-red-500 text-sm">
                        Please enter a number between 2 and 10
                    </span>
                )}
            </label>
            <input
                id="processCount"
                type="number"
                className="w-16 h-10 p-2 text-center bg-[#2c2c2c] text-white border border-[#444] rounded-md focus:outline-none focus:border-[#888] focus:ring-2 focus:ring-white"
                min={2}
                max={10}
                onChange={validateInput}
            />
        </div>
    );
};

export default ProcessTable;
