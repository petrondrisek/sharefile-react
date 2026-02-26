interface Props {
    files: File[],
    removeFile: (file: File) => void
}

export const UploadList = ({ files, removeFile }: Props) => {
  return (<>
    {files.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm">
          {files.map((file) => (
            <li
              key={file.name}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-500 dark:bg-gray-600 hover:bg-gray-700  dark:hover:bg-gray-700 focus:outline-none cursor-pointer"
              onClick={() => removeFile(file)}
            >
              {file.name.length > 30 ? `${file.name.slice(0, 30)}...` : file.name}
              &nbsp; &#10005;
            </li>
          ))}
        </ul>
      )}
  </>)
}
