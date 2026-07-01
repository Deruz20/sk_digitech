import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe, ShoppingCart, Palette, Bot, Sparkles, ArrowUpRight, Menu, X } from "lucide-react";
import skLogo from "../../imports/sk_digitech_logo-1.png";
import "./Navbar.css";

const dropdownContent = {
  capabilities: {
    statement: "Our service capabilities",
    description: "End-to-end digital solutions engineered for outcomes.",
    link: "See overview",
    linkHref: "/capabilities",
    items: [
      { icon: <Palette size={18} />, label: "Design", href: "/services/design" },
      { icon: <Globe size={18} />, label: "Web Engineering", href: "/services/web" },
      { icon: <Sparkles size={18} />, label: "Pro", href: "/services/pro" },
      { icon: <ShoppingCart size={18} />, label: "E-Commerce", href: "/services/e-com" },
      { icon: <Bot size={18} />, label: "Aura AI", href: "/services/aura-ai" }
    ],
  },
  useCases: {
    statement: "Built for every sector",
    description: "Tailored digital solutions for diverse industries.",
    link: "See overview",
    linkHref: "/use-cases",
    items: [
      { label: "Education", href: "/use-cases?filter=education" },
      { label: "Healthcare", href: "/use-cases?filter=healthcare" },
      { label: "NGOs", href: "/use-cases?filter=ngos" },
      { label: "Professional Services", href: "/use-cases?filter=professional" },
      { label: "E-Commerce", href: "/use-cases?filter=e-com" }
    ],
  },
  resources: {
    statement: "Everything you need to stay up-to-date and get help",
    description: null,
    link: null,
    linkHref: null,
    items: [
      { label: "Case Studies", href: "/resources/case-studies" },
      { label: "Guides", href: "/resources/guides" },
      { label: "Insights", href: "/resources/insights" },
      { label: "FAQs", href: "/resources/faqs" },
      { label: "Support", href: "/support" }
    ],
  },
};

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [navHidden, setNavHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state
      setScrolled(currentScrollY > 10);

      // Update hidden state
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleNavClick = (href: string) => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (!isHome) {
        navigate("/");
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMobileDropdown(null);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const toggleMobileDropdown = (key: string) => {
    if (mobileDropdown === key) {
      setMobileDropdown(null);
    } else {
      setMobileDropdown(key);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.25, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.04,
        delayChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      transition: { duration: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const renderDropdown = (key: keyof typeof dropdownContent) => {
    const content = dropdownContent[key];
    const isOpen = activeDropdown === key;
    
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className={`dropdown-panel ${isOpen ? 'open' : ''}`}
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="dropdown-inner" style={{ display: "grid", gridTemplateColumns: "280px 400px" }}>
              {/* Left Column */}
              <div className="dropdown-left">
                <motion.div variants={itemVariants} className="dropdown-heading">{content.statement}</motion.div>
                {content.description && <motion.div variants={itemVariants} className="dropdown-description">{content.description}</motion.div>}
                {content.link && (
                  <motion.button 
                    variants={itemVariants}
                    className="dropdown-overview-btn group"
                    onClick={() => handleNavClick(content.linkHref!)}
                  >
                    <span className="gradient-glow-hover">{content.link}</span>
                    <ArrowUpRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 icon-glow-hover" />
                  </motion.button>
                )}
              </div>

              {/* Right Column */}
              <div className="dropdown-right">
                {content.items.map((item, idx) => (
                  <motion.button
                    key={idx}
                    variants={itemVariants}
                    className="dropdown-link"
                    onClick={() => handleNavClick(item.href || "#")}
                  >
                    {item.icon && <span className="link-icon">{item.icon}</span>}
                    <span className="dropdown-link-text">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <>
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6200EE" />
            <stop offset="100%" stopColor="#FF5F00" />
          </linearGradient>
        </defs>
      </svg>
      <div className={`navbar ${navHidden ? 'hidden' : ''} ${scrolled ? 'scrolled' : ''}`}>
        <nav
          className="flex items-center w-full relative h-full"
          style={{ padding: "0 5vw" }}
        >
          {/* Logo */}
          <button
            onClick={() => handleNavClick("/")}
            className="flex items-center flex-shrink-0 transition-opacity hover:opacity-80 mr-12 gap-2"
            aria-label="Home"
          >
            <img
              src={skLogo}
              alt="SK Logo"
              className="object-contain"
              style={{ height: "32px" }}
            />
            <span style={{
              fontFamily: "'Google Sans Flex', 'Inter', sans-serif",
              fontSize: "20px",
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center"
            }}>
              <span style={{ 
                  fontWeight: 800, 
                  background: "linear-gradient(90deg, #6200EE, #FF5F00)", 
                  WebkitBackgroundClip: "text", 
                  WebkitTextFillColor: "transparent" 
              }}>SK</span>
              <span style={{ 
                  fontWeight: 500, 
                  color: "#0F172A",
                  marginLeft: "0.15em"
              }}>Digitech</span>
            </span>
          </button>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 flex-1 h-full">
            {/* Capabilities */}
            <div 
              className="h-full flex items-center relative"
              onMouseEnter={() => handleMouseEnter("capabilities")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`nav-link-btn flex items-center gap-1 ${activeDropdown === "capabilities" ? "nav-link-active" : "text-[#4B5563]"}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                <span className="nav-link-label">Capabilities</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === "capabilities" ? "rotate-180" : ""}`} color={activeDropdown === "capabilities" ? "#FF5F00" : "currentColor"} />
              </button>
            </div>

            {/* Use Cases */}
            <div 
              className="h-full flex items-center relative"
              onMouseEnter={() => handleMouseEnter("useCases")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`nav-link-btn flex items-center gap-1 ${activeDropdown === "useCases" ? "nav-link-active" : "text-[#4B5563]"}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                <span className="nav-link-label">Use Cases</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === "useCases" ? "rotate-180" : ""}`} color={activeDropdown === "useCases" ? "#FF5F00" : "currentColor"} />
              </button>
            </div>

            {/* About */}
            <button
              onClick={() => handleNavClick("/about")}
              className="nav-link-btn flex items-center text-[#4B5563]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              <span className="nav-link-label">About</span>
            </button>

            {/* Blog */}
            <button
              onClick={() => handleNavClick("/blog")}
              className="nav-link-btn flex items-center text-[#4B5563]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              <span className="nav-link-label">Blog</span>
            </button>

            {/* Resources */}
            <div 
              className="h-full flex items-center relative"
              onMouseEnter={() => handleMouseEnter("resources")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`nav-link-btn flex items-center gap-1 ${activeDropdown === "resources" ? "nav-link-active" : "text-[#4B5563]"}`}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                <span className="nav-link-label">Resources</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === "resources" ? "rotate-180" : ""}`} color={activeDropdown === "resources" ? "#FF5F00" : "currentColor"} />
              </button>
            </div>
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center ml-auto gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavClick("/contact")}
              className="btn-primary hidden lg:flex items-center gap-1 group"
            >
              <span className="gradient-glow-hover">Start Project</span>
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 icon-glow-hover" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`lg:hidden flex items-center justify-center p-2 transition-all duration-300 group ${
                isMobileMenuOpen 
                  ? "bg-[#121317] text-white rounded-full px-4" 
                  : "text-[#0F172A] rounded-md"
              }`}
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={20} strokeWidth={2.5} className="icon-glow-hover" /> : <Menu size={24} />}
            </motion.button>
          </div>
        </nav>

        {/* Render Dropdowns */}
        {renderDropdown("capabilities")}
        {renderDropdown("useCases")}
        {renderDropdown("resources")}
      </div>

      {/* Backdrop overlay for dropdowns */}
      <div className={`nav-overlay ${activeDropdown && !isMobileMenuOpen ? 'visible' : ''}`} />

      {/* Mobile Menu Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu-overlay lg:hidden"
          >
            <motion.div 
              className="mobile-menu-content"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                }
              }}
              initial="hidden"
              animate="show"
            >
              
              {/* Capabilities Mobile Dropdown */}
              <motion.div className="mobile-menu-item" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } } }}>
                <button 
                  className="mobile-menu-btn group" 
                  onClick={() => toggleMobileDropdown("capabilities")}
                >
                  <span className="mobile-menu-label">Capabilities</span>
                  <ChevronDown size={24} className={`transition-transform duration-300 ${mobileDropdown === "capabilities" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileDropdown === "capabilities" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="mobile-sub-menu overflow-hidden"
                    >
                      {dropdownContent.capabilities.items.map((item, idx) => (
                        <button
                          key={idx}
                          className="mobile-sub-link group"
                          onClick={() => handleNavClick(item.href || "#")}
                        >
                          <div className="flex items-center gap-3 w-full group-hover:bg-[#EFF2F7] rounded-lg px-3 py-2 transition-colors">
                            <span className="text-[#A1A1AA] transition-colors group-hover:text-[#6200EE] icon-glow-hover">{item.icon}</span>
                            <span className="group-hover:text-[#000000] gradient-glow-hover">{item.label}</span>
                          </div>
                        </button>
                      ))}
                      {dropdownContent.capabilities.link && (
                        <button 
                          className="mobile-sub-link-pill mt-4 group"
                          onClick={() => handleNavClick(dropdownContent.capabilities.linkHref!)}
                        >
                          <span className="gradient-glow-hover">{dropdownContent.capabilities.link}</span>
                          <ArrowUpRight size={18} className="ml-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 icon-glow-hover" />
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Use Cases Mobile Dropdown */}
              <motion.div className="mobile-menu-item" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } } }}>
                <button 
                  className="mobile-menu-btn group" 
                  onClick={() => toggleMobileDropdown("useCases")}
                >
                  <span className="mobile-menu-label">Use Cases</span>
                  <ChevronDown size={24} className={`transition-transform duration-300 ${mobileDropdown === "useCases" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileDropdown === "useCases" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="mobile-sub-menu overflow-hidden"
                    >
                      {dropdownContent.useCases.items.map((item, idx) => (
                        <button
                          key={idx}
                          className="mobile-sub-link group"
                          onClick={() => handleNavClick("#")}
                        >
                          <div className="flex items-center w-full group-hover:bg-[#EFF2F7] rounded-lg px-3 py-2 transition-colors">
                            <span className="group-hover:text-[#000000] gradient-glow-hover">{item.label}</span>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* About Mobile */}
              <motion.div className="mobile-menu-item" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } } }}>
                <button 
                  className="mobile-menu-btn group" 
                  onClick={() => handleNavClick("/about")}
                >
                  <span className="mobile-menu-label">About</span>
                </button>
              </motion.div>

              {/* Blog Mobile */}
              <motion.div className="mobile-menu-item" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } } }}>
                <button 
                  className="mobile-menu-btn group" 
                  onClick={() => handleNavClick("/blog")}
                >
                  <span className="mobile-menu-label">Blog</span>
                </button>
              </motion.div>

              {/* Resources Mobile Dropdown */}
              <motion.div className="mobile-menu-item" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } } }}>
                <button 
                  className="mobile-menu-btn group" 
                  onClick={() => toggleMobileDropdown("resources")}
                >
                  <span className="mobile-menu-label">Resources</span>
                  <ChevronDown size={24} className={`transition-transform duration-300 ${mobileDropdown === "resources" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileDropdown === "resources" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="mobile-sub-menu overflow-hidden"
                    >
                      {dropdownContent.resources.items.map((item, idx) => (
                        <button
                          key={idx}
                          className="mobile-sub-link group"
                          onClick={() => handleNavClick("#")}
                        >
                          <div className="flex items-center w-full group-hover:bg-[#EFF2F7] rounded-lg px-3 py-2 transition-colors">
                            <span className="group-hover:text-[#000000] gradient-glow-hover">{item.label}</span>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Mobile Start Project CTA */}
              <motion.div className="mt-8 pt-8 border-t border-slate-100" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } } }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavClick("/contact")}
                  className="w-full py-5 text-lg btn-primary flex justify-center items-center gap-2 group"
                  style={{ borderRadius: "12px", width: "100%" }}
                >
                  <span className="gradient-glow-hover">Start Project</span>
                  <ArrowUpRight size={22} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 icon-glow-hover" />
                </motion.button>
              </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
