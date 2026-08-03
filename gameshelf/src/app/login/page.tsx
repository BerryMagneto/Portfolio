"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/library");
  }

  return (
    <div className="max-w-sm mx-auto mt-24 p-6 header-glow">
      <h1 className="text-3xl mb-1 font-logo">
        Respawn<span className="text-shelf-amber">List</span>
      </h1>
      <p className="text-shelf-muted text-sm mb-8">Log in to your List</p>

      <form action={handleSubmit} className="flex flex-col gap-3">
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
          className="bg-shelf-surface border border-shelf-border rounded-lg px-4 py-2.5 text-shelf-text placeholder:text-shelf-muted focus:outline-none focus:border-shelf-amber"
        />
        {error && <p className="text-shelf-red text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-shelf-amber text-shelf-bg font-medium rounded-lg px-4 py-2.5 mt-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="text-shelf-muted text-sm mt-6 text-center">
        No account?{" "}
        <a href="/signup" className="text-shelf-amber hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}