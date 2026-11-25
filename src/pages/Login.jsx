
import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase";
import { LockKeyhole, Loader2 } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            });
            if (error) throw error;

            navigate("/admin/guests", { replace: true });
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f5ef] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <div className="text-3xl text-[#b18a45] mb-3">✦</div>

                    <p className="text-xs tracking-[0.3em] uppercase text-[#a18458]">
                        Wedding Management
                    </p>

                    <h1 className="text-3xl font-serif text-[#3d2817] mt-3">
                        Admin Login
                    </h1>

                    <p className="text-sm text-[#8c7b68] mt-2">
                        Sign in to manage wedding guests.
                    </p>
                </div>

                <div className="bg-white border border-[#e8ddcc] rounded-2xl shadow-sm p-6 sm:p-8">

                    <div className="flex items-center gap-3 mb-7">
                        <div className="w-11 h-11 rounded-full bg-[#f5efe4] flex items-center justify-center">
                            <LockKeyhole size={20} className="text-[#a18458]" />
                        </div>

                        <div>
                            <h2 className="font-serif text-xl text-[#3d2817]">
                                Welcome Back
                            </h2>
                            <p className="text-xs text-[#9b8b79]">
                                Enter your admin credentials
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">

                        <div>
                            <label className="block text-sm text-[#59432f] mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                autoComplete="username"
                                required
                                className="w-full rounded-lg border border-[#e5dacb] bg-[#fdfcf9] px-4 py-3 text-[#3d2817] outline-none focus:border-[#b18a45]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-[#59432f] mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                                className="w-full rounded-lg border border-[#e5dacb] bg-[#fdfcf9] px-4 py-3 text-[#3d2817] outline-none focus:border-[#b18a45]"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#3d2817] hover:bg-[#523923] disabled:opacity-60 text-white py-3.5 transition-colors"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>

                    </form>
                </div>

                <p className="text-center text-xs text-[#a99a87] mt-6">
                    Authorized access only
                </p>
            </div>
        </div>
    );
}
