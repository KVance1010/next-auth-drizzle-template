import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex h-screen w-screen flex-1 flex-col items-center justify-center">
      <h1>Home Page</h1>
      <button className="mt-4 border-2 border-white px-[10px] py-[5px]">
        <Link href="/login">login</Link>
      </button>
      <button className="mt-4 border-2 border-white px-[10px] py-[5px]">
        <Link href="/register">sign up</Link>
      </button>
    </div>
  );
}
