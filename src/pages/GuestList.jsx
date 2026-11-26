
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Copy, Check, Search, RefreshCw, Users, Loader2, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GuestList() {
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [copiedId, setCopiedId] = useState(null);
    const navigate = useNavigate();
    const fetchGuests = async () => {
        setLoading(true);
        setError("");

        const { data, error } = await supabase
            .from("wedding_guests")
            .select("id, title, name, token, created_at")
            .order("created_at", { ascending: false });

        if (error) {
            console.error(error);
            setError("Unable to fetch guests. Please try again.");
        } else {
            setGuests(data || []);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchGuests();
    }, []);

    const copyLink = async (guest) => {
        const url = `${window.location.origin}/invite/${guest.token}`;

        try {
            await navigator.clipboard.writeText(url);
            setCopiedId(guest.id);

            setTimeout(() => {
                setCopiedId(null);
            }, 2000);
        } catch (error) {
            console.error("Copy failed:", error);
            setError("Unable to copy invitation link.");
        }
    };

    const filteredGuests = guests.filter((guest) => {
        const query = search.toLowerCase();

        return (
            guest.name.toLowerCase().includes(query) ||
            guest.title.toLowerCase().includes(query) ||
            guest.token.toLowerCase().includes(query)
        );
    });

    return (
        <div className="min-h-screen bg-[#f8f5ef] px-4 py-10">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <p className="text-xs tracking-[0.3em] uppercase text-[#a18458]">
                            Wedding Management
                        </p>

                        <h1 className="text-3xl font-serif text-[#3d2817] mt-2">
                            Guest List
                        </h1>

                        <p className="text-sm text-[#8c7b68] mt-1">
                            Manage guests and their invitation links.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                        <button
                            onClick={() => navigate("/admin/guests")}
                            className="flex items-center justify-center gap-2 bg-[#3d2817] text-white rounded-lg px-4 py-2.5 hover:bg-[#523923] transition-colors"
                        >
                            <UserPlus size={16} />
                            Register Guest
                        </button>

                        <button
                            onClick={fetchGuests}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 border border-[#dfd0b8] text-[#3d2817] rounded-lg px-4 py-2.5 hover:bg-[#f1e9dc] disabled:opacity-50"
                        >
                            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-white border border-[#e8ddcc] rounded-xl p-5 mb-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#f5efe4] flex items-center justify-center">
                        <Users size={22} className="text-[#a18458]" />
                    </div>

                    <div>
                        <p className="text-sm text-[#8c7b68]">
                            Total Registered Guests
                        </p>
                        <p className="text-2xl font-semibold text-[#3d2817]">
                            {guests.length}
                        </p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-5">
                    <Search
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a18458]"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by guest name or token..."
                        className="w-full bg-white border border-[#e5dacb] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#b18a45] text-[#3d2817]"
                    />
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-50 text-red-600 rounded-lg p-4 mb-5 text-sm">
                        {error}
                    </div>
                )}

                {/* Guest records */}
                <div className="bg-white border border-[#e8ddcc] rounded-xl overflow-hidden">

                    {loading ? (
                        <div className="py-16 flex flex-col items-center gap-3 text-[#a18458]">
                            <Loader2 size={25} className="animate-spin" />
                            <p className="text-sm">Loading guests...</p>
                        </div>
                    ) : filteredGuests.length === 0 ? (
                        <div className="py-16 text-center">
                            <Users size={32} className="mx-auto text-[#c5b69f] mb-3" />

                            <p className="font-medium text-[#3d2817]">
                                {search ? "No guests found" : "No guests registered yet"}
                            </p>

                            <p className="text-sm text-[#9b8b79] mt-1">
                                {search
                                    ? "Try searching with another name or token."
                                    : "Registered guests will appear here."}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-[#eee5d9]">
                            {filteredGuests.map((guest, index) => (
                                <div
                                    key={guest.id}
                                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                >
                                    <div className="flex items-start gap-3 min-w-0">
                                        <div className="w-9 h-9 shrink-0 rounded-full bg-[#f5efe4] flex items-center justify-center text-sm text-[#a18458] font-medium">
                                            {index + 1}
                                        </div>

                                        <div className="min-w-0">
                                            <h3 className="font-medium text-[#3d2817]">
                                                {guest.title} {guest.name}
                                            </h3>

                                            <p className="text-xs font-mono text-[#9b8b79] mt-1 break-all">
                                                {guest.token}
                                            </p>

                                            <p className="text-xs text-[#a99a87] mt-1">
                                                {new Date(guest.created_at).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => copyLink(guest)}
                                        className="flex items-center justify-center gap-2 shrink-0 rounded-lg border border-[#dfd0b8] px-4 py-2.5 text-sm text-[#8a693c] hover:bg-[#faf7f0] transition-colors"
                                    >
                                        {copiedId === guest.id ? (
                                            <>
                                                <Check size={16} />
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={16} />
                                                Copy Link
                                            </>
                                        )}
                                    </button>
                                </div>
                            ))}
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
