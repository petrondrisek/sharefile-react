export default function PageTitle({ children }: { children: React.ReactNode }) {
    return <h1 className="text-3xl font-bold mb-8 text-center text-gray-500">{children}</h1>;
}