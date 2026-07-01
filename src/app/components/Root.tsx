import { Outlet, useSearchParams } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { FloatingScrollButton } from "./FloatingScrollButton";
import { ContactSection } from "./ContactSection";
import { AnimatePresence } from "motion/react";

export function Root() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isContactOpen = searchParams.get("contact") === "true";

  const closeContact = () => {
    setSearchParams((prev) => {
      prev.delete("contact");
      return prev;
    });
  };

  return (
    <div
      className="min-h-screen text-[#E8E7FF] flex flex-col"
      style={{ backgroundColor: "#060509", fontFamily: "'Inter', 'Inter', sans-serif" }}
    >
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <FloatingScrollButton />

      <AnimatePresence>
        {isContactOpen && <ContactSection onClose={closeContact} />}
      </AnimatePresence>
    </div>
  );
}
