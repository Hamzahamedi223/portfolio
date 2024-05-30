"use client"
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToCreatePage = () => {
    router.replace("/create");
  };

  return (
    <div>
      <h2>hello</h2>
      <UserButton />
      <button onClick={navigateToCreatePage}>Create</button>
    </div>
  );
}
