interface Props {
    children: React.ReactNode
}

const TransparentContainer = ({children} : Props) => {
  return (
    <main className="min-h-[90vh] flex flex-col gap-4 items-center justify-center mx-auto text-center">
        <div className="w-[600px] max-w-full min-h-[200px] p-8 flex flex-col items-center mx-auto overflow-x-hidden">
            {children}
        </div>
    </main>
  )
}

export default TransparentContainer