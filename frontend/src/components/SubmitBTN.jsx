import React from 'react'

const SubmitBTN = ({ processCount }) => {
    return (
        (processCount > 1 && processCount <=10) && (
            <button type="submit" className="submit_button">
                Calculate
            </button>
        )
    )
}

export default SubmitBTN