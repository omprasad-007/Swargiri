import GodBhajanClient from "./GodBhajanClient";

export function generateStaticParams() {
  return [
    { god: "vitthal" },
    { god: "krishna" },
    { god: "shiv" },
    { god: "ram" },
  ];
}

export default async function GodBhajanPage({ params }: { params: Promise<{ god: string }> }) {
  const { god } = await params;
  return <GodBhajanClient god={god} />;
}
