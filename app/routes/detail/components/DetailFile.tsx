interface DetailFileProps {
    uuid: string,
    filename: string,
    url: string,
    timeLeft: string,
    downloadFile: (url: string, filename: string) => Promise<void>
}

const DetailFile = ({ uuid, filename, url, timeLeft, downloadFile }: DetailFileProps) => {
  return (
    <div key={`${uuid}-${filename}`} className="mt-2 grid grid-cols-3 md:grid-cols-4 gap-2 items-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-4">
        <img src={url} className="max-h-[64px]" alt={filename} />
        <p className="col-span-2 text-sm break-all w-full">{filename}</p>
        <div className="text-gray-500 col-span-3 text-sm flex items-end justify-between md:col-span-1 md:block">
        <p>Zbývá: {timeLeft}</p>
        <button
            type="button" 
            onClick={ () => downloadFile(url, filename) }
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
            Stáhnout
        </button>
        </div>
    </div>
  )
}

export default DetailFile