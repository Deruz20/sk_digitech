import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Upload, Loader2, Check, ChevronDown } from "lucide-react";

const COUNTRIES = [
  { name: 'Uganda', code: 'UG', dialCode: '+256', flag: '🇺🇬' },
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧' },
  { name: 'Singapore', code: 'SG', dialCode: '+65', flag: '🇸🇬' },
  { name: 'Slovakia (Slovensko)', code: 'SK', dialCode: '+421', flag: '🇸🇰' },
  { name: 'Slovenia (Slovenija)', code: 'SI', dialCode: '+386', flag: '🇸🇮' },
  { name: 'Solomon Islands', code: 'SB', dialCode: '+677', flag: '🇸🇧' },
  { name: 'Somalia (Soomaaliya)', code: 'SO', dialCode: '+252', flag: '🇸🇴' },
  { name: 'South Africa', code: 'ZA', dialCode: '+27', flag: '🇿🇦' },
  { name: 'South Korea (대한민국)', code: 'KR', dialCode: '+82', flag: '🇰🇷' },
  { name: 'Kenya', code: 'KE', dialCode: '+254', flag: '🇰🇪' },
  { name: 'Tanzania', code: 'TZ', dialCode: '+255', flag: '🇹🇿' },
  { name: 'Rwanda', code: 'RW', dialCode: '+250', flag: '🇷🇼' },
  { name: 'Nigeria', code: 'NG', dialCode: '+234', flag: '🇳🇬' },
];

const SERVICES = ["all", "design", "web", "ecom", "pro", "Aura AI"];
const TASKS = [
  "logo", "landing page", "branding", "corporate web", "redesign",
  "multipage web", "advertising", "online store", "packaging",
  "mobile dev", "social networks", "social commerce", "illustrations",
  "custom AI chatbots", "AI automation", "other",
];

function InputEl({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <div className="flex flex-col bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-[16px] px-4 py-2 transition-all duration-300 focus-within:border-white focus-within:bg-[rgba(255,255,255,0.05)] w-full">
      {label && <span className="text-[10px] text-gray-500 font-['Inter'] mb-1 tracking-wide">{label}</span>}
      <input 
        {...props}
        className="bg-transparent border-none outline-none text-white font-['Inter'] text-[15px] placeholder-white/80 w-full"
      />
    </div>
  );
}

function TextareaEl({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <div className="flex flex-col bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-[16px] px-4 py-2 transition-all duration-300 focus-within:border-white focus-within:bg-[rgba(255,255,255,0.05)] w-full h-full">
      {label && <span className="text-[10px] text-gray-500 font-['Inter'] mb-1 tracking-wide">{label}</span>}
      <textarea 
        {...props}
        className="bg-transparent border-none outline-none text-white font-['Inter'] text-[15px] placeholder-white/80 w-full h-full resize-none custom-scrollbar"
      />
    </div>
  );
}

function CheckboxEl({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center gap-3 cursor-pointer w-fit group" onClick={onChange}>
      <div className={`w-[22px] h-[22px] rounded-[6px] border flex flex-shrink-0 items-center justify-center transition-all ${checked ? 'border-transparent bg-gradient-primary' : 'border-[rgba(255,255,255,0.3)] group-hover:border-white'}`}>
        {checked && <Check size={14} color="black" strokeWidth={3} />}
      </div>
      <span className={`text-[15px] font-['Inter'] transition-colors select-none ${checked ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{label}</span>
    </div>
  );
}

function FileDropZone({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[13px] text-white font-['Inter']">{title}</span>
      <button type="button" className="bg-white text-black rounded-full px-6 py-2.5 text-[15px] font-bold w-fit hover:bg-gray-200 transition-colors">
        Add files
      </button>
      <span className="text-[12px] text-gray-500 font-['Inter'] mt-1">{subtitle}</span>
    </div>
  );
}

function CustomPhoneInput({ value, onChange }: { value: string | undefined, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Uganda
  const [phoneNumber, setPhoneNumber] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhoneNumber(val);
    onChange(selectedCountry.dialCode + " " + val);
  };

  const handleCountrySelect = (c: typeof COUNTRIES[0]) => {
    setSelectedCountry(c);
    setIsOpen(false);
    onChange(c.dialCode + " " + phoneNumber);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        className="flex items-center w-full focus-within:border-white focus-within:bg-[rgba(255,255,255,0.05)] transition-all duration-300 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-[16px]"
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-3 border-r border-white/20 hover:bg-white/5 transition-colors"
        >
          <span className="text-xl leading-none">{selectedCountry.flag}</span>
          <ChevronDown size={14} className="text-white/50" />
          <span className="text-white font-bold text-[15px] ml-1">{selectedCountry.dialCode}</span>
        </button>
        <input
          type="tel"
          placeholder="00-000-0000"
          value={phoneNumber}
          onChange={handlePhoneChange}
          className="flex-1 bg-transparent border-none text-white outline-none px-4 py-3 placeholder-gray-500 font-['Inter'] text-[15px]"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 bottom-[calc(100%+8px)] w-full md:w-[360px] bg-white rounded-2xl shadow-2xl overflow-hidden z-[9999]"
          >
            <div className="max-h-[280px] overflow-y-auto flex flex-col py-2">
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleCountrySelect(c)}
                  className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="text-[#111111] font-['Inter'] text-sm font-medium">{c.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 font-['Inter'] text-sm w-10 text-right">{c.dialCode}</span>
                    <span className="text-lg leading-none">{c.flag}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type Props = {
  onClose: () => void;
};

export function ContactSection({ onClose }: Props) {
  const [step, setStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [phoneValue, setPhoneValue] = useState<string | undefined>();
  
  const toggleService = (s: string) => {
    setSelectedServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const toggleTask = (t: string) => {
    setSelectedTasks(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      nextStep();
      return;
    }
    
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] overflow-y-auto flex justify-center items-start md:items-center p-4 md:p-8 bg-black/40 backdrop-blur-lg"
    >
      <div className="min-h-full w-full flex items-center justify-center py-8">
        <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[1100px] bg-[#07070A] border border-white/10 rounded-[24px] md:rounded-[32px] overflow-hidden relative shadow-2xl flex flex-col"
        style={{ minHeight: "60vh", maxHeight: "90vh" }}
      >
        {/* Abstract subtle background glow to match digitall but with our colors */}
        <div className="absolute -left-20 top-0 w-[500px] h-[500px] bg-gradient-primary rounded-full mix-blend-screen filter blur-[120px] opacity-30 pointer-events-none" />
        <div className="absolute -right-20 bottom-0 w-[500px] h-[500px] bg-gradient-primary rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-20"
        >
          <X size={24} />
        </button>

        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col flex-1 p-6 md:p-12">
          
          <div className="flex-grow flex flex-col md:flex-row gap-6 md:gap-12 pr-2 pb-2">
            
            {/* Left Side: Titles, Progress, and Step-Specific Left Content */}
            <div className="w-full md:w-[35%] flex flex-col gap-4">
              <h2 className="text-3xl md:text-[40px] font-bold font-['Inter'] leading-[1.1] tracking-tight text-white mb-1">
                {step === 1 && "Tell us about\nyour company"}
                {step === 2 && "What services are\nyou interested in?"}
                {step === 3 && "Tell us about\nyour project"}
                {step === 4 && "Contact\ndetails"}
              </h2>

              {/* Progress Bar */}
              <div className="w-[120px] h-[12px] bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden mt-2">
                <motion.div 
                  className="h-full bg-gradient-primary shadow-[0_0_15px_rgba(247,165,33,0.5)]"
                  initial={{ width: "25%" }}
                  animate={{ width: `${(step / 4) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Step 2 Left Sidebar: Services Box */}
              <AnimatePresence>
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 bg-[rgba(255,255,255,0.04)] border border-white/5 rounded-[24px] p-5 w-full"
                  >
                    <h3 className="text-white font-bold font-['Inter'] text-lg mb-4">Services</h3>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                      {SERVICES.map(s => (
                        <CheckboxEl key={s} label={s} checked={selectedServices.includes(s)} onChange={() => toggleService(s)} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3 Left Sidebar: Attach Files */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-8"
                  >
                    <FileDropZone title="attach files (optional)" subtitle="You can upload multiple files (max: 10)" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Side: Form Content */}
            <div className="w-full md:w-[65%] relative">
              <AnimatePresence mode="wait">
                
                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div 
                    key="s1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full"
                  >
                    <div className="flex flex-col gap-4">
                      <InputEl label="company name*" placeholder="skdigitech.com" required />
                      <InputEl label="company website" placeholder="" />
                      <InputEl label="links to social networks" placeholder="" />
                    </div>
                    <div className="flex flex-col gap-3 h-full">
                      <div className="flex-1 min-h-[120px]">
                        <TextareaEl label="what does the company do*" placeholder="ai automation" required />
                      </div>
                      <div className="mt-2">
                        <FileDropZone title="attach files about company (optional)" subtitle="You can upload multiple files (max: 10)" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div 
                    key="s2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="bg-[rgba(255,255,255,0.04)] border border-white/5 rounded-[24px] p-5 w-full h-full flex flex-col overflow-hidden">
                      <h3 className="text-white font-bold font-['Inter'] text-lg mb-4">Tasks</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4 overflow-y-auto custom-scrollbar flex-1 pr-2">
                        {TASKS.map(t => (
                          <CheckboxEl key={t} label={t} checked={selectedTasks.includes(t)} onChange={() => toggleTask(t)} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <motion.div 
                    key="s3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="h-[90px] flex-shrink-0">
                        <TextareaEl label="describe the task*" placeholder="web" required />
                      </div>
                      <div className="py-1">
                         <FileDropZone title="attach files (optional)" subtitle="You can upload multiple files (max: 10)" />
                      </div>
                      <InputEl label="deadlines*" placeholder="2 months" required />
                      <InputEl label="planned budget*" placeholder="5m" required />
                    </div>
                    <div className="flex flex-col gap-3 h-full">
                      <div className="flex-1 min-h-[80px]">
                        <TextareaEl label="links to competitors" placeholder="" />
                      </div>
                      <div className="flex-1 min-h-[80px]">
                        <TextareaEl label="links to references" placeholder="" />
                      </div>
                      <div className="flex-1 min-h-[80px]">
                        <TextareaEl label="expectations from cooperation" placeholder="" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <motion.div 
                    key="s4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full"
                  >
                    <div className="flex flex-col gap-3">
                      <InputEl label="name*" placeholder="Hassan" required />
                      <InputEl label="email*" placeholder="hardinderuz@gmail.com" type="email" required />
                      <CustomPhoneInput value={phoneValue} onChange={setPhoneValue} />
                      <div className="mt-2 pl-1">
                        <CheckboxEl label="I agree with terms of Privacy Policy" checked={agreed} onChange={() => setAgreed(!agreed)} />
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-1 min-h-[140px]">
                        <TextareaEl label="comments" placeholder="cool" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SUCCESS STATE */}
                {success && (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-[#07070A] z-50 rounded-3xl"
                  >
                    <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(247,165,33,0.5)]">
                      <Check size={48} strokeWidth={3} color="white" />
                    </div>
                    <h3 className="text-4xl font-bold font-['Inter'] text-white mb-4">Request Received!</h3>
                    <p className="text-gray-400 text-lg">We'll review your details and get back to you soon.</p>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Buttons */}
          {!success && (
            <div className="w-full flex justify-end items-center gap-4 pt-6 border-t border-white/10 mt-auto shrink-0">
              {step > 1 && (
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="px-8 py-[16px] min-w-[160px] md:w-[240px] rounded-full border border-white/20 text-white font-['Inter'] hover:bg-white/5 transition-colors font-semibold text-[17px]"
                >
                  ← back
                </button>
              )}
              
              <button 
                type="submit"
                disabled={sending}
                className="px-8 py-[16px] min-w-[200px] md:w-[320px] rounded-full bg-gradient-primary text-white font-['Inter'] font-bold text-[17px] flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(247,165,33,0.6)] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>{step === 4 ? "send" : "next"} →</>
                )}
              </button>
            </div>
          )}
        </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
