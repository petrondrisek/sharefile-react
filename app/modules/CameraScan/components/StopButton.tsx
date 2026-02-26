interface Props {
    handleStop: () => void,
    buttonText?: string
}

const StopButton = ({ handleStop, buttonText }: Props) => {
    return (
        <button 
            type="button"
            onClick={handleStop}
            className="mt-6 inline-flex w-[90%] items-center mx-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black dark:text-white bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none cursor-pointer"
        >
            &#x23F9;&nbsp;
            {buttonText ?? "Stop"}
        </button>
    )
}

export default StopButton