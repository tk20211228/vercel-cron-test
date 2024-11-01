import { headers } from "next/headers";
import Image from "next/image";
import SubmitButton from "./components/submit-button";

export default function Home() {
  const Submit = async () => {
    "use server"; // この行を追加[ Server ] Error: Failed to parse URL from /api/submit
    // ヘッダーからホストを取得
    const headersList = await headers();
    const host = headersList.get("host"); // "localhost:3000"// "localhost:3000"
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;
    console.log(baseUrl);
    const res = await fetch(`${baseUrl}/api/`, {
      method: "GET",
    });
    if (res) {
      alert(res);
    } else {
      alert(res);
    }
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <p>これはVercelのCronをTESTするプロジェクトです。</p>
        <form action={Submit}>
          <SubmitButton onSubmit={Submit} />
        </form>
      </main>
    </div>
  );
}
