'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const OnLogin = ()=>{
    router.push('/login')
  }

  return (
    <main>
      <div className="flex flex-row-reverse p-4">
        <button className="border p-2 rounded" onClick={OnLogin}>Login</button>
      </div>
    </main>
  );
}
