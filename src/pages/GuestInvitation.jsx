
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { supabase } from "../lib/supabase";

import InvitationCover from "../components/InvitationCover";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import WeddingCountdown from "../components/WeddingCountdown";
import EventsSection from "../components/EventsSection";
import EventTimeline from "../components/EventTimeline";
import IslamicMessage from "../components/IslamicMessage";
import FamilySection from "../components/FamilySection";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import PrintCard from "../components/PrintCard";

export function ErrorPage() {
  return (
    <div className="min-h-screen bg-[#f8f5ef] flex items-center justify-center px-5">
      <div className="max-w-md w-full text-center bg-white border border-[#e8ddcc] rounded-2xl p-8 shadow-sm">
        <div className="text-5xl text-[#b18a45] mb-5">✦</div>

        <h1 className="text-3xl font-serif text-[#3d2817]">
          Invalid Invitation
        </h1>

        <p className="text-[#8c7b68] mt-4 leading-relaxed">
          Sorry, this invitation link is invalid or has been modified.
          Please contact the host for a valid invitation.
        </p>
      </div>
    </div>
  );
}

export default function GuestInvitation() {
  const { token } = useParams();

  const [status, setStatus] = useState("checking");
  const [guest, setGuest] = useState(null);

  useEffect(() => {
    let active = true;

    const verifyToken = async () => {
      setStatus("checking");
      setGuest(null);

      if (!token) {
        setStatus("invalid");
        return;
      }

      const { data, error } = await supabase.rpc(
        "verify_guest_token",
        { p_token: token }
      );

      if (!active) return;

      if (error) {
        console.error("Token verification failed:", error);
        setStatus("invalid");
        return;
      }

      if (!data || data.length === 0) {
        setStatus("invalid");
        return;
      }

      setGuest(data[0]);
      setStatus("valid");
    };

    verifyToken();

    return () => {
      active = false;
    };
  }, [token]);

  if (status === "checking") {
    return (
      <div className="min-h-screen bg-[#f8f5ef] flex items-center justify-center">
        <p className="font-serif text-[#a18458] animate-pulse">
          Preparing your invitation...
        </p>
      </div>
    );
  }

  if (status === "invalid") {
    return <ErrorPage />;
  }

  return <WeddingCard guest={guest} />;
}

function WeddingCard({ guest }) {
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);
  const pageRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";

    if (pageRef.current) {
      pageRef.current.inert = !opened;
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <>
      {!opened && (
        <InvitationCover
          onStart={() => setOpening(true)}
          onDone={() => setOpened(true)}
          guestName={`${guest.guest_title} ${guest.guest_name}`}
        />
      )}

      <div ref={pageRef} className="print:hidden">
        <Navbar />

        <main>
          <HeroSection ready={opening} />
          <EventsSection />
          <WeddingCountdown />
          <EventTimeline />
          <IslamicMessage />
          <FamilySection />
        </main>

        <Footer />
      </div>

      <PrintCard />
      <BackToTop />
    </>
  );
}
