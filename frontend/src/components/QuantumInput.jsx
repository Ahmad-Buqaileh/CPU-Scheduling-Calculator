const QuantumInput = ({ setQuantumTime, showQuantum }) => {
    if (!showQuantum) {
        return null;
    }

    return (
        <div className="flex flex-col mb-4">
            <label htmlFor="quantumTime" className="font-semibold mb-2">
                Quantum Time
            </label>
            <input
                id="quantumTime"
                type="number"
                required
                min={1}
                onChange={(e) => setQuantumTime(parseInt(e.target.value))}
                className="w-14 h-10 p-2 text-center border-1 border-[#ced4da] rounded-md dark:border-0 bg-white/6 "
            />
        </div>
    )
};

export default QuantumInput;
