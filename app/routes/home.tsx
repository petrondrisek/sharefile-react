export function meta() {
    return [
        { title: "Sharefile" },
        { name: "description", content: "Home" },
    ];
}

export default function Home() {
    throw new Response("Not Found", { status: 404 });
}