import React, { useState } from 'react';

const ProcessTable = ({ handleProcessCount }) => {
    const [isValid, setIsValid] = useState(true);

    const validateInput = (e) => {
        const val = parseInt(e.target.value);
        const valid = val >= 2 && val <= 10;
        setIsValid(valid);
        handleProcessCount(e);
    };

    return (
        <div className="form_group">
            <label htmlFor="processCount">
                Number of processes  <span className="validation">(2–10)</span>  : {!isValid && (
                    <span style={{ color: 'red', fontSize: '13px' }}>
                        Please enter a number between 2 and 10
                    </span>
                )}
            </label>
            <input
                id="processCount"
                type="number"
                className="algo_input no_spinner numberIn"
                min={2}
                max={10}
                onChange={validateInput}
            />
        </div>
    );
};

export default ProcessTable;
