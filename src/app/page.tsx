import ThemeToggle from "@/components/shared/theme-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center">
        Welcome to Karumari Amman Temple
      </h1>
      <Image src="/next.svg" alt="Next.js Logo" width={300} height={300} />
    </main>
  );
}
