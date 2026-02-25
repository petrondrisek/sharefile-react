interface PageSubtitleProps {
    children: React.ReactNode
}

const PageSubtitle = ({ children }: PageSubtitleProps) => {
  return (
    <p className="mt-4 text-gray-500 text-center mb-8">
        {children}
    </p>
  )
}

export default PageSubtitle