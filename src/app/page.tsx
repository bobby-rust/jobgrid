"use client";

import { Button } from "@/components/ui/button";
import { paths } from "@/config/paths";
import { useUser } from "@/lib/auth";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user.data) {
      router.replace(decodeURIComponent(paths.auth.login.getHref()));
    }
  }, [user.data, router])

  return (
    <div className="w-full h-full flex flex-col items-center p-10 gap-5">
      <h1 className="text-center text-6xl font-extrabold tracking-tight text-balance">Welcome to Griddle, {user.data && user.data.email.split("@")[0]}</h1>
      <div className="flex flex-col justify-center items-center gap-5">
        <div>
          <h2 className="text-3xl font-semibold">No jobs yet</h2>
        </div>
        <Button size="lg"><Plus /> Add Job</Button>
      </div>
    </div>
  );
}