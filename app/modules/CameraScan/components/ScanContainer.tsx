interface Props {
  hidden?: boolean;
  children: React.ReactNode;
}

const ScanContainer = ({ hidden, children }: Props) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 ${hidden ? "hidden" : "block"}`}>
        <div className="relative max-w-full w-[320px] h-[320px] bg-white dark:bg-gray-800 flex flex-col items-center justify-around p-4">
            {children}
        </div>
    </div>
  )
}

export default ScanContainer