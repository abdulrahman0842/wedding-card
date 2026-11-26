
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Copy, Check, UserPlus, Loader2, Users } from "lucide-react";
import { useNavigate } from "react-router";

const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Master", "Miss"];

function generateToken() {
    const values = crypto.getRandomValues(new Uint8Array(5));
    const random = Array.from(values)
        .map((value) => value.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();

    return `WED-${random}`;
}

export default function GuestForm() {
    const [title, setTitle] = useState("Mr.");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [guest, setGuest] = useState(null);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [invitationUrl, setinvitationUrl] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Please enter guest name.");
            return;
        }

        setLoading(true);
        setError("");
        setGuest(null);
        setCopied(false);
        setinvitationUrl(null)
        try {
            let savedGuest = null;

            // Retry in the unlikely event of a token collision.
            for (let attempt = 0; attempt < 3; attempt++) {
                const token = generateToken();

                const { data, error } = await supabase
                    .from("wedding_guests")
                    .insert({
                        title,
                        name: name.trim(),
                        token,
                    })
                    .select()
                    .single();

                if (!error) {
                    savedGuest = data;
                    break;
                }

                if (error.code !== "23505") {
                    throw error;
                }
            }

            if (!savedGuest) {
                throw new Error("Could not generate a unique token. Try again.");
            }

            setGuest(savedGuest);
            setinvitationUrl(`${window.location.origin}/invite/${savedGuest.token}`)
            setName("");
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const copyInvitationUrl = async () => {
        if (!invitationUrl) return;

        try {
            await navigator.clipboard.writeText(invitationUrl);
            setCopied(true);

            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy invitation URL:", error);
            setError("Unable to copy URL. Please copy it manually.");
        }
    };

    const navigate = useNavigate();


    return (
        <div className="min-h-screen bg-[#f8f5ef] px-4 py-12 flex items-center justify-center">

            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <div className="text-[#b18a45] text-3xl mb-3">✦</div>
                    <p className="text-xs tracking-[0.3em] uppercase text-[#a18458]">
                        Wedding Management
                    </p>
                    <h1 className="text-3xl font-serif text-[#3d2817] mt-3">
                        Guest Registration
                    </h1>
                    <p className="text-sm text-[#8c7b68] mt-2">
                        Register a guest and generate their invitation token.
                    </p>
                </div>

                <div className="bg-white border border-[#e8ddcc] rounded-2xl shadow-sm p-6 sm:p-8">

                    <div className="flex items-center gap-3 mb-7">
                        <div className="w-11 h-11 rounded-full bg-[#f5efe4] flex items-center justify-center">
                            <UserPlus className="text-[#a18458]" size={21} />
                        </div>
                        <div>
                            <h2 className="font-serif text-xl text-[#3d2817]">
                                Guest Details
                            </h2>
                            <p className="text-xs text-[#9b8b79]">
                                Enter the invitation details
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-sm text-[#59432f] mb-2">
                                Title
                            </label>
                            <select
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full rounded-lg border border-[#e5dacb] bg-[#fdfcf9] px-4 py-3 text-[#3d2817] outline-none focus:border-[#b18a45]"
                            >
                                {titles.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-[#59432f] mb-2">
                                Guest Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter full name"
                                maxLength={150}
                                required
                                className="w-full rounded-lg border border-[#e5dacb] bg-[#fdfcf9] px-4 py-3 text-[#3d2817] outline-none focus:border-[#b18a45] placeholder:text-[#b8aa99]"
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
                                    Generating Token...
                                </>
                            ) : (
                                <>
                                    <UserPlus size={18} />
                                    Register Guest
                                </>
                            )}
                        </button>
                    </form>
                    <button
                        type="button"
                        onClick={() => navigate("/admin/guests-list")}
                        className="mt-5 w-full flex items-center justify-center gap-2 rounded-lg border border-[#b18a45] text-[#3d2817] hover:bg-[#f5efe4] py-3 transition-colors"
                    >
                        <Users size={18} />
                        View Guest List
                    </button>


                    {guest && (

                        <div className="mt-7 border border-[#dfd0b8] bg-[#faf7f0] rounded-xl p-5">
                            <div className="flex items-center gap-2 text-green-700 mb-3">
                                <Check size={18} />
                                <span className="text-sm font-medium">
                                    Guest registered successfully!
                                </span>
                            </div>

                            <p className="text-xs text-[#8c7b68] mb-1">
                                Guest Name
                            </p>
                            <p className="text-[#3d2817] font-medium mb-4">
                                {guest.title} {guest.name}
                            </p>

                            <p className="text-xs text-[#8c7b68] mb-2">
                                Invitation URL
                            </p>
                            <div className="flex items-center gap-2 bg-white border border-[#e5dacb] rounded-lg p-3">
                                <span className="font-mono text-sm text-[#3d2817] break-all flex-1">
                                    {invitationUrl}
                                </span>

                                <button
                                    type="button"
                                    onClick={copyInvitationUrl()}
                                    className="text-[#a18458] hover:text-[#3d2817] shrink-0"
                                    title="Copy invitation URL"
                                >
                                    {copied ? <Check size={19} /> : <Copy size={19} />}
                                </button>
                            </div>

                            <p className="text-xs text-[#9b8b79] mt-3">
                                {copied
                                    ? "Invitation URL copied successfully!"
                                    : "Copy and share this link with the guest."}
                            </p>
                        </div>
                    )}

                </div>

                <p className="text-center text-xs text-[#a99a87] mt-6">
                    Wedding Guest Management
                </p>
            </div>
        </div>
    );
}
