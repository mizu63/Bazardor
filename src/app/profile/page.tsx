
"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session?.user?.name]);

  const handleUpdateName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");

    const updatedName = name.trim();

    if (!updatedName) {
      setErrorMessage("নাম লিখুন।");
      return;
    }

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: updatedName,
      });

      if (error) {
        setErrorMessage(error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      setName(updatedName);
      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      router.refresh();
    } catch {
      setErrorMessage("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    setErrorMessage("");

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setErrorMessage(error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      router.replace("/sign-in");
      router.refresh();
    } catch {
      setErrorMessage("সাইন আউট করতে সমস্যা হয়েছে।");
    } finally {
      setSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="mx-auto mt-10 max-w-3xl p-6 text-center">
        প্রোফাইল লোড হচ্ছে...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="mx-auto mt-10 max-w-3xl rounded-xl border bg-white p-6 text-center">
        <p>প্রোফাইল দেখতে আগে সাইন ইন করুন।</p>
        <button
          onClick={() => router.push("/sign-in")}
          className="mt-4 rounded-lg bg-green-700 px-5 py-2 text-white"
        >
          সাইন ইন
        </button>
      </div>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">
          আমার প্রোফাইল
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        {errorMessage && (
          <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        {/* User information */}
        <section className="mt-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white/80 p-6 sm:flex-row sm:items-center">
          {user.image ? (
            <Image
              src={user.image}
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-20 shrink-0 items-center justify-center rounded-full bg-green-700 text-2xl text-white">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-xl font-semibold text-gray-900">
              {user.name || "ব্যবহারকারী"}
            </h2>
            <p className="break-all text-gray-600">{user.email}</p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="rounded-lg border border-red-400 px-4 py-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            {signingOut ? "সাইন আউট হচ্ছে..." : "↪ সাইন আউট"}
          </button>
        </section>

        {/* Update name form */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white/80 p-5 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900">
            নাম হালনাগাদ করুন
          </h2>

          <form onSubmit={handleUpdateName} className="mt-4">
            <label htmlFor="name" className="mb-2 block text-gray-800">
              নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              placeholder="আপনার নাম লিখুন"
            />

            <button
              type="submit"
              disabled={saving || !name.trim()}
              className="mt-3 rounded-lg bg-green-700 px-4 py-2 font-semibold text-white shadow hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "আপডেট হচ্ছে..." : "নাম হালনাগাদ করুন"}
            </button>

            {message && (
              <p role="status" className="mt-3 text-sm text-green-700">
                {message}
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;