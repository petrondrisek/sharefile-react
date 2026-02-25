interface ContainerProps {
    children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <main className="min-h-[90vh] flex flex-col gap-4 items-center justify-center mx-auto text-center">
      <div className="w-[600px] max-w-full min-h-screen min-h-[100dvh] p-8 mx-auto bg-gray-100 dark:bg-gray-800 overflow-x-hidden">
          {children}
      </div>
    </main>
  )
}

export default Container