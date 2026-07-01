import { useState } from "react";
import { Link } from "react-router";
import "./Footer.css";
import PolicyModal from "./PolicyModal";
import { PrivacyPolicyContent, CookiePolicyContent, TermsContent } from "./policies";

const SERVICE_LINKS = [
  { label: "Design", href: "/services/design" },
  { label: "Web Engineering", href: "/services/web" },
  { label: "Pro", href: "/services/pro" },
  { label: "E-Commerce", href: "/services/e-com" },
  { label: "Aura AI", href: "/services/aura-ai" },
];

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const [activeModal, setActiveModal] = useState<'privacy' | 'cookies' | 'terms' | null>(null);

  const getModalContent = () => {
    switch (activeModal) {
      case 'privacy': return { title: 'Privacy Policy', content: <PrivacyPolicyContent /> };
      case 'cookies': return { title: 'Cookies Policy', content: <CookiePolicyContent /> };
      case 'terms': return { title: 'Terms and Conditions', content: <TermsContent /> };
      default: return { title: '', content: null };
    }
  };

  const currentModal = getModalContent();

  return (
    <>
      <footer className="sk-footer">
        <div className="sk-footer-container">
          {/* Top Section: Tagline & Link Columns */}
          <div className="sk-footer-top">
            {/* Left: Tagline */}
            <div className="sk-footer-tagline">
              <h2>Experience liftoff</h2>
            </div>

            {/* Right: Link Columns */}
            <div className="sk-footer-columns">
              {/* Services */}
              <div className="sk-footer-col">
                <span className="sk-footer-col-heading">Services</span>
                {SERVICE_LINKS.map(link => (
                  <Link key={link.label} to={link.href} className="sk-footer-link">
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Company */}
              <div className="sk-footer-col">
                <span className="sk-footer-col-heading">Company</span>
                {COMPANY_LINKS.map(link => (
                  <Link key={link.label} to={link.href} className="sk-footer-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Massive Brand Text */}
          <div className="sk-footer-brand">
            <span className="sk-footer-brand-text">
              <span className="brand-sk">SK</span>
              <span className="brand-digitech">DIGITECH</span>
            </span>
          </div>

          {/* Bottom Bar */}
          <div className="sk-footer-bottom">
            <div className="sk-footer-bottom-left">
              <span className="sk-footer-bottom-logo">
                <span className="brand-sk">SK</span>
                <span className="brand-digitech-bottom">Digitech</span>
              </span>
            </div>

            <div className="sk-footer-bottom-right">
              <span className="sk-footer-copyright">
                © SK DIGITECH 2025. All rights reserved.
              </span>
              <button onClick={() => setActiveModal('privacy')} className="sk-footer-legal-link text-left">Privacy Policy</button>
              <button onClick={() => setActiveModal('cookies')} className="sk-footer-legal-link text-left">Cookie Policy</button>
              <button onClick={() => setActiveModal('terms')} className="sk-footer-legal-link text-left">Terms</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Policy Modal Overlay */}
      <PolicyModal 
        isOpen={activeModal !== null} 
        onClose={() => setActiveModal(null)}
        title={currentModal.title}
        content={currentModal.content}
      />
    </>
  );
}
