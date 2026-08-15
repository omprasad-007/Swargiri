import { GodBhajanClient } from "./GodBhajanClient";

export function generateStaticParams() {
  return [
    { god: "vitthal" },
    { god: "krishna" },
    { god: "shiv" },
    { god: "ram" },
    { god: "ganesh" },
    { god: "hanuman" },
    { god: "devi" }
  ];
}

export default async function GodBhajanPage({ params }: { params: Promise<{ god: string }> }) {
  const resolvedParams = await params;
  return <GodBhajanClient god={resolvedParams?.god || "vitthal"} />;
}
