import React, { useState } from 'react'

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
        <div className="form_group Quantum_Time">
            <label htmlFor="quantumTime">Quantum Time : {!isValid && (
                <span style={{ color: 'red', fontSize: '13px' }}>
                    Please Enter a Number Bigger than Zero
                </span>)} </label>
            <input
                id="quantumTime"
                type="number"
                className="algo_input no_spinner numberIn"
                min={1}
                onChange={validateInput}
            />
        </div>)
}

export default QuantumInput
