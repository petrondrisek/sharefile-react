import { useRef } from "react";

export function meta() {
    return [
        { title: "Sharefile" },
        { name: "description", content: "Home" },
    ];
}

export default function Home() {
    const inputRef = useRef<HTMLInputElement>(null);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const inputValue = inputRef.current?.value.trim();
        if (inputValue) {
            const id = inputValue.split("/").pop();
            if (id) {
                window.location.href = `/detail/${id}`;
            }
        } else {
            alert("Please enter a valid link.");
        }
    }

    return (
        <div className="container flex w-full min-h-screen items-center justify-center mx-auto">
            <div className="w-[600px] max-w-full min-h-[200px] p-8 mx-auto overflow-x-hidden">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-500">Sharefile</h1>
                
                <div className="flex items-center justify-center flex-col gap-4">
                    <input 
                        ref={inputRef}
                        type="text" 
                        placeholder="Enter shareable link here or ID" 
                        className="w-full p-4 border border-gray-700 dark:border-gray-600 text-gray-500 focus:border-blue-500 focus:outline-none focus:text-black dark:focus:text-white rounded transition duration-200 ease-in-out" 
                    />
                    <button 
                        type="submit"
                        onClick={handleSubmit}
                        className="w-max bg-blue-500 text-white px-8 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}