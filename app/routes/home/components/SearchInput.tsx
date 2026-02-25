import { useRef } from 'react'

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error: string
}

const SearchInput = ({ onChange, error }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (<>
        <input 
            ref={inputRef}
            type="text" 
            placeholder="Enter shareable link" 
            className="w-full p-4 border border-gray-700 dark:border-gray-600 text-gray-500 focus:border-blue-500 focus:outline-none focus:text-black dark:focus:text-white rounded transition duration-200 ease-in-out" 
            onChange={onChange}
        />
        {error && <p className="text-red-500">{error}</p>}
    </>)
}

export default SearchInput