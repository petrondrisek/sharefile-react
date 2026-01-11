import type { Route } from "./+types/detail";

type File = {
    id: number;
    uuid: string;
    filename: string;
    validUntil: string;
}

interface BackendResponse {
    uuid: string;
    files: File[];
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Detail of shared files" },
    { name: "description", content: "Detail of shared files" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
    const {id}  = params;
    const res = await fetch(import.meta.env.VITE_API_URL + `/files/${id}`);
    
    if(!res.ok) {
        throw new Error(res.statusText);
    }

    const data: BackendResponse = await res.json();

    if(data.files.length === 0) {
        throw new Error("No files found");
    }

    return { data };
}

export default function Detail({ loaderData }: Route.ComponentProps) {
  if (!loaderData) return <p>Loading…</p>;

  const uuid = loaderData.data.uuid;

  const parseDateRemaining = (date: string) => {
    const now = new Date();
    const diff = new Date(date).getTime() - now.getTime();
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours} h ${minutes} min`;
  };

  const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Chyba při stahování:", error);
      alert("Soubor se nepodařilo stáhnout.");
    }
  };

  return (
    <div className="w-[600px] max-w-full min-h-screen min-h-[100dvh] p-8 mx-auto bg-gray-100 dark:bg-gray-800 overflow-x-hidden">
      <h1 className="text-3xl font-bold text-center">Sdílené soubory</h1>
      <p className="mt-4 text-gray-500 text-center mb-8">ID: {loaderData.data.uuid}</p>
    
      {loaderData.data.files.map((file) => (
        <div key={file.id} className="mt-2 grid grid-cols-3 md:grid-cols-4 gap-2 items-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-4">
          <img src={import.meta.env.VITE_API_URL + `/files/show/${uuid}/${file.filename}`} className="max-h-[64px]" alt={file.filename} />
          <p className="col-span-2 text-sm break-all w-full">{file.filename}</p>
          <div className="text-gray-500 col-span-3 text-sm flex items-end justify-between md:col-span-1 md:block">
            <p>Zbývá: {parseDateRemaining(file.validUntil)}</p>
            <button
              type="button" 
              onClick={ () => handleDownload(import.meta.env.VITE_API_URL + `/files/show/${uuid}/${file.filename}`, file.filename) }
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
                Stáhnout
            </button>
          </div>
        </div>
      ))}

    </div>
  );
}
