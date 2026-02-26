import type { Route } from "./+types/home";
import { HomeLayout } from "./components/HomeLayout";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Sharefile" },
        { name: "description", content: "Home" },
    ];
}

export default function Home() {
    return <HomeLayout />;
}