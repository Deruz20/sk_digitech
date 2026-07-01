import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, ChevronLeft, Heart, Star, Plus } from "lucide-react";

export function BakeryMockup() {
  const [step, setStep] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (step === 0) {
      setCartCount(0);
      timeout = setTimeout(() => setStep(1), 1000); // Slide in image
    } else if (step === 1) {
      timeout = setTimeout(() => setStep(2), 1500); // Show details
    } else if (step === 2) {
      timeout = setTimeout(() => setStep(3), 1000); // Click add to cart
    } else if (step === 3) {
      setCartCount(1); // Update cart
      timeout = setTimeout(() => setStep(4), 1500); // Wait, then show success
    } else if (step === 4) {
      timeout = setTimeout(() => setStep(0), 2000); // Reset
    }

    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div className="w-full h-full bg-[#E5D5C5] relative overflow-hidden flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-700">
      
      {/* Background Decor */}
      <div className="absolute top-[-30%] right-[-20%] w-80 h-80 bg-white/20 rounded-full blur-[40px]" />
      
      {/* Mobile Phone Frame */}
      <div className="w-[220px] h-[340px] bg-[#FAFAF8] rounded-[32px] shadow-2xl border-[6px] border-white relative overflow-hidden flex flex-col z-10 box-border ring-4 ring-gray-300">
        
        {/* Dynamic Island / Top Notch Area */}
        <div className="absolute top-0 w-full flex justify-center z-30 pt-2">
          <div className="w-16 h-4 bg-black rounded-full" />
        </div>

        {/* App Header */}
        <div className="pt-8 pb-3 px-4 flex justify-between items-center z-20">
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
            <ChevronLeft size={14} className="text-[#5C3A21]" />
          </div>
          <span className="font-bold text-[#5C3A21] font-serif tracking-tight text-sm">SK Bakery</span>
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm relative">
            <ShoppingBag size={12} className="text-[#5C3A21]" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white flex items-center justify-center"
                >
                  <span className="text-white text-[8px] font-bold">{cartCount}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Product Display Area */}
        <div className="flex-1 relative flex flex-col items-center">
          
          {/* Animated Product "Image" (CSS abstract art of a pastry) */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                initial={{ y: -50, opacity: 0, rotate: -10 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.5, duration: 1 }}
                className="relative mt-2"
              >
                {/* Realistic Bakery Image */}
                <div className="w-40 h-40 rounded-full shadow-[0_15px_35px_rgba(92,58,33,0.3)] relative flex items-center justify-center overflow-hidden border-4 border-white z-10">
                  <img 
                    src="/images/bakery_landing.png" 
                    alt="Artisan Pastries" 
                    className="w-full h-full object-cover scale-150 origin-center transition-transform duration-[2000ms] hover:scale-125"
                  />
                  {/* Inner glow to make it look premium */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]" />
                </div>
                
                {/* Floating Badge */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute bottom-2 -right-2 bg-white rounded-full p-2.5 shadow-xl z-20"
                >
                  <Heart size={16} className="text-red-500 fill-red-500" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Details */}
          <div className="w-full bg-white mt-auto rounded-t-3xl p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] flex flex-col gap-2 relative z-20">
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <div className="flex justify-between items-end mb-1">
                    <div>
                      <h3 className="text-[#5C3A21] font-bold text-sm font-serif">Signature Croissant</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star size={10} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-[9px] text-gray-500 font-medium">4.9 (120 reviews)</span>
                      </div>
                    </div>
                    <span className="text-[#D49A5B] font-bold text-sm">$4.50</span>
                  </div>
                  
                  <p className="text-[9px] text-gray-400 leading-tight mb-3">
                    Flaky, buttery, and freshly baked every morning. Made with premium French butter.
                  </p>
                  
                  {/* Add to Cart Button */}
                  <motion.button 
                    animate={step === 3 ? { scale: 0.95 } : { scale: 1 }}
                    className={`w-full py-2.5 rounded-full flex items-center justify-center gap-2 text-xs font-bold transition-colors ${step >= 4 ? 'bg-green-500 text-white' : 'bg-[#5C3A21] text-white'}`}
                  >
                    {step >= 4 ? (
                      "Added to Cart!"
                    ) : (
                      <>
                        <Plus size={14} /> Add to Cart
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </div>
  );
}
