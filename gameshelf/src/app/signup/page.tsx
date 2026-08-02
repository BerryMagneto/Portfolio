"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/app/actions/auth";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const result = await signUp(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // Auto sign-in right after successful sign-up
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    router.push("/library");
  }

  return (
    <div className="max-w-sm mx-auto mt-24 p-6">
      <h1 className="font-display text-3xl font-bold mb-1">RespawnList</h1>
      <p className="text-shelf-muted text-sm mb-8">Create your list</p>

      <form action={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          type="text"
          placeholder="Name (optional)"
          className="bg-shelf-surface border border-shelf-border rounded-lg px-4 py-2.5 text-shelf-text placeholder:text-shelf-muted focus:outline-none focus:border-shelf-amber"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="bg-shelf-surface border border-shelf-border rounded-lg px-4 py-2.5 text-shelf-text placeholder:text-shelf-muted focus:outline-none focus:border-shelf-amber"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={8}
          className="bg-shelf-surface border border-shelf-border rounded-lg px-4 py-2.5 text-shelf-text placeholder:text-shelf-muted focus:outline-none focus:border-shelf-amber"
        />
        {error && <p className="text-shelf-red text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-shelf-amber text-shelf-bg font-medium rounded-lg px-4 py-2.5 mt-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="text-shelf-muted text-sm mt-6 text-center">
        Already have an account?{" "}
        <a href="/login" className="text-shelf-amber hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
}