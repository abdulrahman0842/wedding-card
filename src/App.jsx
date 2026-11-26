// import { useEffect, useRef, useState } from 'react';
// import { ToastProvider } from './context/ToastContext';
// import InvitationCover from './components/InvitationCover';
// import Navbar from './components/Navbar';
// import HeroSection from './components/HeroSection';
// import WeddingCountdown from './components/WeddingCountdown';
// import EventsSection from './components/EventsSection';
// import EventTimeline from './components/EventTimeline';
// import IslamicMessage from './components/IslamicMessage';
// import FamilySection from './components/FamilySection';
// import Footer from './components/Footer';
// import BackToTop from './components/BackToTop';
// import MusicControl from './components/MusicControl';
// import PrintCard from './components/PrintCard';
//  import GuestForm from "./pages/GuestForm";

// export default function App() {
//   const [opening, setOpening] = useState(false); // doors started to open
//   const [opened, setOpened] = useState(false); // cover fully gone
//   const pageRef = useRef(null);

//   // Lock scrolling and hide the page from assistive tech / keyboard while the cover is up
//   useEffect(() => {
//     document.body.style.overflow = opened ? '' : 'hidden';
//     if (pageRef.current) pageRef.current.inert = !opened;
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [opened]);

//   return (
//     <ToastProvider>
//       {!opened && <InvitationCover onStart={() => setOpening(true)} onDone={() => setOpened(true)} />}


//       <Route
//         path="/admin/guests"
//         element={
//           <ProtectedRoute>
//             <GuestForm />
//           </ProtectedRoute>
//         }
//       />
//       <div ref={pageRef} className="print:hidden">
//         <Navbar />
//         <main>
//           <HeroSection ready={opening} />
//           <EventsSection />
//           <WeddingCountdown />
//           <EventTimeline />
//           <IslamicMessage />
//           <FamilySection />

//         </main>
//         <Footer />
//       </div>

//       <PrintCard />
//       <BackToTop />
//       {/* <MusicControl /> */}
//     </ToastProvider>
//   );
// }


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./components/ProtectedRoute";

import GuestForm from "./pages/GuestForm";
import Login from "./pages/Login";
import GuestInvitation, { ErrorPage } from "./pages/GuestInvitation";
import GuestList from "./pages/GuestList";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>

          {/* Guest invitation */}
          <Route
            path="/invite/:token"
            element={<GuestInvitation />}
          />

          {/* Admin login */}
          <Route
            path="/admin/login"
            element={<Login />}
          />

          {/* Protected admin pages */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/admin/guests"
              element={<GuestForm />}
            />
            <Route
              path="/admin/guests-list"
              element={<GuestList />}
            />
          </Route>


          {/* Invalid or missing invitation */}
          <Route path="/" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
