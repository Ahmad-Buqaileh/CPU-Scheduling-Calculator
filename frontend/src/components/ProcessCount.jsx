const ProcessCount = ({ handleProcessCount }) => {

    const validateInput = (e) => {
        handleProcessCount(e);
    };

    return (
        <div className="flex flex-col">
            <label htmlFor="processCount" className="font-semibold mb-2">
                Number of processes <span className="text-gray-600 dark:text-gray-400">(2–10)</span>
            </label>
            <input
                id="processCount"
                type="number"
                required
                className="w-14 h-10 p-2 text-center border-1 border-[#ced4da] rounded-md dark:border-0 bg-white/6"
                min={2}
                max={10}
                onChange={validateInput}
            />
        </div>
    );
};

export default ProcessCount;