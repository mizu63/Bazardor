
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SocialLoginToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (searchParams.get("socialLogin") !== "success") return;
    if (isPending) return;

    if (session) {
      toast.success("Google/GitHub দিয়ে সফলভাবে সাইন ইন হয়েছে!");
    } else {
      toast.error("সাইন ইন নিশ্চিত করা যায়নি। আবার চেষ্টা করো।");
    }

    router.replace("/");
  }, [searchParams, session, isPending, router]);

  return null;
}
