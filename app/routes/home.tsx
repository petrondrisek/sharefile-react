import { useRef } from "react";
import { validateInput } from "~/utils/validateInput";
import ImageScanButton from "~/components/ImageScanButton";
import CameraScanButton from "~/components/CameraScanButton";
import PageTitle from "~/components/PageTitle";
import RouteLink from "~/components/RouteLink";

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
        const id = validateInput(inputValue);
        if(id) {
            window.location.href = `/detail/${id}`;
        } else {
            console.log("Invalid URL data:", inputValue, "(ID: ", id, ")");
            alert("Please enter a valid shareable link or ID.");
        }
    }

    return (
        <div className="container flex w-full min-h-screen min-h-[100dvh] items-center justify-center mx-auto">
            <div className="w-[600px] max-w-full min-h-[200px] p-8 mx-auto overflow-x-hidden">
                <PageTitle>Sharefile</PageTitle>
                
                <div className="flex items-center justify-center flex-col gap-4">
                    <input 
                        ref={inputRef}
                        type="text" 
                        placeholder="Enter shareable link here or ID" 
                        className="w-full p-4 border border-gray-700 dark:border-gray-600 text-gray-500 focus:border-blue-500 focus:outline-none focus:text-black dark:focus:text-white rounded transition duration-200 ease-in-out" 
                    />
                    <div className="flex flex-wrap items-center justify-center items-center">
                        <button 
                            type="submit"
                            onClick={handleSubmit}
                            className="w-max bg-blue-500 text-white px-8 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
                        >
                            Submit
                        </button>

                        <ImageScanButton />
                        <CameraScanButton />
                    </div>

                    <RouteLink to="/upload">&#x2B; Upload new files</RouteLink>
                </div>
            </div>
        </div>
    )
}