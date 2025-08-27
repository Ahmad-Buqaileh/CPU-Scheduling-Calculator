
const SubmitBTN = ({ processCount }) => {
    const submit = (processCount > 1 && processCount <= 10);

    return (
        <button
            disabled={!submit}
            type="submit"
            className={`w-full py-2 font-medium text-lg rounded-xl border transition-all
    ${submit
                    ? "bg-[#2c2c2c] text-white border-[#555] hover:bg-[#2e2e2e] hover:shadow-md cursor-pointer"
                    : "bg-[#363636] text-gray-300 border-gray-500 cursor-not-allowed"
                }`}
        >
            Calculate
        </button>

    )
}

export default SubmitBTN
