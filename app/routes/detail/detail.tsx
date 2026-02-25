import type { Route } from "./+types/detail";
import type { BackendFile, BackendResponse } from "~/_shared/types";
import DetailInfo from "~/routes/detail/components/DetailLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Detail of shared files" },
    { name: "description", content: "Detail of shared files" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
    const {id}  = params;

    const res = await fetch(import.meta.env.VITE_API_URL + `/files/${id}`);
    if(!res.ok) throw new Error(res.statusText);

    const data: BackendResponse = await res.json();
    if(data.files.length === 0) throw new Error("No files found");

    return { data };
}

export default function DetailPage({ loaderData }: Route.ComponentProps) {
  if (!loaderData) return <p>Loading…</p>;

  const uuid = loaderData.data.uuid;
  const files: BackendFile[] = loaderData.data.files;

  return <DetailInfo 
            uuid={uuid}
            files={files}
         />;
}
