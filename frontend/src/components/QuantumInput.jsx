
import { useState } from 'react'

export const QuantumInput = ({ handleQuantum, showQuantum }) => {
    if (!showQuantum) {
        return null;
    }

    const [isValid, setIsValid] = useState(true);

    const validateInput = (e) => {
        const val = parseInt(e.target.value);
        const valid = val > 0;
        setIsValid(valid);
        handleQuantum(e);
    };

    return (
        <div className="flex flex-col mb-4">
            <label htmlFor="quantumTime" className="font-semibold mb-2 text-white">
                Quantum Time : {!isValid && (
                    <span className="text-red-500 text-sm">
                        Please enter a number bigger than zero
                    </span>
                )}
            </label>
            <input
                id="quantumTime"
                type="number"
                min={1}
                onChange={validateInput}
                className="w-16 h-10 p-2 text-center bg-[#2c2c2c] text-white border border-[#444] rounded-md focus:outline-none focus:border-[#888] focus:ring-2 focus:ring-white"
            />
        </div>
    )
}

export default QuantumInput
