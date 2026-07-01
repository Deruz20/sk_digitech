import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { ParticleEngine } from '../utils/ParticleEngine';
import skLogo from "../../imports/sk_digitech_logo-1.png";
import './AntigravityHero.css';

export const AntigravityHero = () => {
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [engine, setEngine] = useState<ParticleEngine | null>(null);
    const [text, setText] = useState('');
    const fullText = "Experience liftoff with the next-gen digital agency";
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
            }, 50); // Typing speed
            
            return () => clearInterval(intervalId);
        }, 1500);
        
        return () => clearTimeout(startTypingDelay);
    }, []);

    useEffect(() => {
        if (showCanvas && canvasRef.current && !engine) {
            const newEngine = new ParticleEngine(canvasRef.current);
            setEngine(newEngine);
        }
        return () => {
            if (engine) {
                engine.destroy();
            }
        };
    }, [showCanvas, engine]);

    return (
        <section className="antigravity-hero">
            <div className={`canvas-container ${showCanvas ? 'visible' : ''}`}>
                <canvas ref={canvasRef} />
            </div>
            
            <div className="hero-content">
                <AnimatePresence>
                    {!isTyping && (
                        <motion.div 
                            className="hero-logo-container flex items-center justify-center gap-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <img src={skLogo} alt="SK Digitech Logo" className="hero-logo" />
                            <span style={{ 
                                fontFamily: "'Google Sans Flex', sans-serif", 
                                fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", 
                                letterSpacing: "-0.04em",
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
                                    fontWeight: 400, 
                                    color: "#000000",
                                    marginLeft: "0.15em"
                                }}>Digitech</span>
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <h1 className="typed-header">
                    {(() => {
                        const words = text.split(' ');
                        const lastWord = words.pop();
                        const restOfText = words.length > 0 ? words.join(' ') + ' ' : '';
                        
                        return (
                            <>
                                {restOfText}
                                <span style={{ whiteSpace: 'nowrap' }}>
                                    {lastWord}
                                    {isTyping && <span className="blinking-cursor" />}
                                </span>
                            </>
                        );
                    })()}
                </h1>

                <AnimatePresence>
                    {!isTyping && (
                        <motion.div 
                            className="hero-buttons-container"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        >
                            <button onClick={() => navigate('/contact')} className="hero-button primary group">
                                Start Project
                                <ArrowUpRight size={24} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </button>
                            <button onClick={() => navigate('/capabilities')} className="hero-button secondary">
                                Explore Services
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

