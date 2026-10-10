
"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";


const SingInPage = () => {
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fromdata = new FormData(e.currentTarget);
    const user = Object.fromEntries(fromdata.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message || "সাইন ইন করা যায়নি!");
      return;
    }

    if (data) {
      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
    }


  };

  const handel = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      // callbackURL: "/",
        callbackURL: "/?socialLogin=success",
    });

    if (error) {
      toast.error(error.message || "Google দিয়ে সাইন ইন করা যায়নি!");
    }
  };
  const handelgit = async () => {
    const { error } = await authClient.signIn.social({
      provider: "github",
      // callbackURL: "/",
        callbackURL: "/?socialLogin=success",
    });

    if (error) {
      toast.error(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি!");
    }
  };

  return (
    // <div className="mt-4 flex flex-col items-center justify-center">
    //   <h1 className="text-2xl font-bold text-green-700">সাইন ইন</h1>
    //   <p className="text-gray-500 text-[12px]">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
    //   <form onSubmit={onSubmit}>
    //     <fieldset className="fieldset bg-base-200 border-base-300 w-xs rounded-box border p-4">
    //       <label className="label">ইমেইল</label>
    //       <input
    //         name="email"
    //         type="email"
    //         className="input w-full"
    //         placeholder="Email"
    //         required
    //       />

    //       <label className="label">পাসওয়ার্ড</label>
    //       <input
    //         name="password"
    //         type="password"
    //         className="input w-full"
    //         placeholder="Password"
    //         required
    //       />

    //       <button
    //         type="submit"
    //         className="btn mt-4 w-full bg-green-600 text-white hover:bg-green-700"
    //       >
    //         সাইন ইন করুন
    //       </button>
    //     </fieldset>
    //   </form>

    //   <div className="mt-3 flex gap-3">
    //     <button
    //       type="button"
    //       onClick={handel}
    //       className="btn  border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2"
    //     >
    //       <FcGoogle size={22} />
    //       Google দিয়ে সাইন ইন করুন
    //     </button>
    //     <button
    //       type="button"
    //       onClick={handelgit}
    //       className="btn flex  items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
    //     >
    //       <FaGithub size={22} />
    //       Github দিয়ে সাইন ইন করুন
    //     </button>

    //   </div>
    //   <Link
    //     href="/"
    //     className="mt-4 text-sm text-green-700 hover:text-green-800 hover:underline"
    //   >
    //     ← হোম পেজে ফিরে যান
    //   </Link>
    // </div>
    <div className="flex min-h-dvh items-center justify-center bg-[#f1f6f2] px-3 py-6 sm:px-6 sm:py-10">
      <div className="w-full max-w-md rounded-xl border border-[#dce7df] bg-[#f9fbf9] p-4 shadow-sm sm:rounded-2xl sm:p-6 md:p-8">


        <div className="mb-6 text-center sm:mb-7">
          <h1 className="text-xl font-bold text-green-700 sm:text-2xl">
            সাইন ইন
          </h1>

          <p className="mt-2 text-xs leading-5 text-gray-500 sm:text-sm">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>


        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-800">
              ইমেইল
            </label>

            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="h-10 w-full min-w-0 rounded-lg border border-[#cbd5ce] bg-transparent px-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-800">
              পাসওয়ার্ড
            </label>

            <input
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="পাসওয়ার্ড লিখুন"
              required
              className="h-10 w-full min-w-0 rounded-lg border border-[#cbd5ce] bg-transparent px-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <button
            type="submit"
            className="mt-2 min-h-10 w-full rounded-lg bg-green-700 px-3 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 active:scale-[0.99] sm:text-base"
          >
            সাইন ইন করুন
          </button>
        </form>


        <div className="my-5 flex items-center gap-3 sm:gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="shrink-0 text-sm text-gray-600">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>


        <div className="grid grid-cols-1 gap-2.5 min-[360px]:grid-cols-2 sm:gap-2">
          <button
            type="button"
            onClick={handel}
            className="flex min-h-10 w-full min-w-0 items-center justify-center gap-2 rounded-lg border border-gray-800 px-2 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-100"
          >
            <FcGoogle size={19} className="shrink-0" />
            <span className="text-center leading-5">
              Google দিয়ে সাইন ইন করুন
            </span>
          </button>

          <button
            type="button"
            onClick={handelgit}
            className="flex min-h-10 w-full min-w-0 items-center justify-center gap-2 rounded-lg border border-gray-800 px-2 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-100"
          >
            <FaGithub size={18} className="shrink-0" />
            <span className="text-center leading-5">
              GitHub দিয়ে সাইন ইন করুন
            </span>
          </button>
        </div>


        <p className="mt-5 text-center text-xs leading-6 text-gray-600 sm:text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-medium text-green-700 underline underline-offset-2 hover:text-green-800"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>


        <div className="mt-3 text-center">
          <Link
            href="/"
            className="text-sm text-green-700 transition hover:text-green-800 hover:underline"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>

      </div>
    </div>

  );
};

export default SingInPage;

