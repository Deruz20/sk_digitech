import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';
import { SupportParticleEngine } from '../utils/SupportParticleEngine';
import './Support.css';

export const Support = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = useState<SupportParticleEngine | null>(null);
  const [text, setText] = useState('');
  const fullText = "Find answers in our docs\nor go to our community";
  const [showCanvas, setShowCanvas] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Initial blink before typing
    const startTypingDelay = setTimeout(() => {
      let i = 0;
      const intervalId = setInterval(() => {
        setText(fullText.slice(0, i + 1));
        i++;
        if (i >= fullText.length) {
          clearInterval(intervalId);
          setIsTyping(false);
          setTimeout(() => setShowCanvas(true), 200);
        }
      }, 30); // Typing speed

      return () => clearInterval(intervalId);
    }, 800);

    return () => clearTimeout(startTypingDelay);
  }, []);

  useEffect(() => {
    if (showCanvas && canvasRef.current && !engine) {
      const newEngine = new SupportParticleEngine(canvasRef.current);
      setEngine(newEngine);
    }
    return () => {
      if (engine) {
        engine.destroy();
      }
    };
  }, [showCanvas, engine]);

  const handleSocialHover = (platform: 'x' | 'youtube' | 'linkedin' | 'default') => {
    if (engine) {
      engine.setShape(platform);
    }
  };

  return (
    <div className="support-page">
      {/* Particle Canvas */}
      <div className={`support-canvas-container ${showCanvas ? 'visible' : ''}`}>
        <canvas ref={canvasRef} />
      </div>

      {/* Main Content */}
      <main className="support-main">
        <div className="support-hero">
          <h1 className="support-hero-title">
            {(() => {
                // To allow wrapping like "Find answers in our docs\nor go to our community"
                // we can just render the typed text and let css handle wrapping,
                // or match the exact text.
                return (
                    <>
                        {text}
                        {isTyping && <span className="blinking-cursor"></span>}
                    </>
                );
            })()}
          </h1>
          <button className="support-view-docs-btn">
            View docs
          </button>
        </div>

        <div className="support-cards-container">
          <a href="#" className="support-card" 
             onMouseEnter={() => handleSocialHover('x')}
             onMouseLeave={() => handleSocialHover('default')}>
            <div className="support-card-icon-wrapper">
              <svg className="support-card-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
            <h3 className="support-card-title">X</h3>
            <p className="support-card-desc">Join the conversation</p>
            <div className="support-card-link">
              Visit
              <span className="arrow-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </span>
            </div>
          </a>

          <a href="#" className="support-card"
             onMouseEnter={() => handleSocialHover('youtube')}
             onMouseLeave={() => handleSocialHover('default')}>
            <div className="support-card-icon-wrapper">
              <svg className="support-card-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <h3 className="support-card-title">Youtube</h3>
            <p className="support-card-desc">Watch our videos</p>
            <div className="support-card-link">
              Visit
              <span className="arrow-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </span>
            </div>
          </a>

          <a href="#" className="support-card"
             onMouseEnter={() => handleSocialHover('linkedin')}
             onMouseLeave={() => handleSocialHover('default')}>
            <div className="support-card-icon-wrapper">
              <svg className="support-card-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <h3 className="support-card-title">LinkedIn</h3>
            <p className="support-card-desc">Stay updated</p>
            <div className="support-card-link">
              Visit
              <span className="arrow-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </span>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
};
