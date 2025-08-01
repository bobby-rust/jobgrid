"use client";

import { paths } from "@/config/paths";
import { useUser } from "@/lib/auth";
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
    <>
      Welcome to JobGrid,
      {user.data && user.data.email}
    </>
  );
}