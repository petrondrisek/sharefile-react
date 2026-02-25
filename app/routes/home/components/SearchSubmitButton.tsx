interface Props {
    disabled: boolean,
    onClick: () => void
}

const SearchSubmitButton = ({ disabled, onClick }: Props) => {
  return (
    <button 
        type="submit"
        disabled={disabled}
        onClick={onClick}
        className="w-max bg-blue-500 disabled:bg-gray-400 text-white px-8 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
    >
        Submit
    </button>
  )
}

export default SearchSubmitButton