interface Props {
    message: string
}

const GuideBox = ({ message }: Props) => {
  if(!message) return null;

  return (
    <div className="absolute top-[24px] left-0 right-0 w-full flex items-center justify-center pointer-events-none z-10">
        <p className="bg-black bg-opacity-50 text-white p-2 rounded text-sm">{message}</p>
    </div>
  )
}

export default GuideBox