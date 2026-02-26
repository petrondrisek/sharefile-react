import { Link } from "react-router";

export default function RouteLink({ to, children, className }: { to: string, children: React.ReactNode, className?: string }) {
    return (
        <Link
            to={to}
            className={`mt-4 w-max text-gray-400 hover:text-gray-300 transition cursor-pointer ${className ?? ""}`}
        >
            {children}
        </Link>
    );
}