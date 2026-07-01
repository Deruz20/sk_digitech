import { motion } from "motion/react";
import { 
  Activity, 
  Anchor, 
  Hexagon, 
  Hotel, 
  Droplets, 
  ShieldCheck, 
  Sparkles, 
  Bike, 
  BadgeCheck, 
  MapPin, 
  Waves, 
  Coffee 
} from "lucide-react";

const CLIENTS = [
  { name: "Pharmalink", Icon: Activity, colorClass: "group-hover:text-blue-500" },
  { name: "TABOO OF THE SEAS", Icon: Anchor, uppercase: true, colorClass: "group-hover:text-red-500" },
  { name: "Pharmalys", Icon: Hexagon, colorClass: "group-hover:text-emerald-500" },
  { name: "HOTELLINE", Icon: Hotel, uppercase: true, colorClass: "group-hover:text-indigo-500" },
  { name: "safi", Icon: Droplets, lowercase: true, colorClass: "group-hover:text-cyan-500" },
  { name: "swisslac", Icon: ShieldCheck, lowercase: true, colorClass: "group-hover:text-sky-500" },
  { name: "DERMOLYS", Icon: Sparkles, uppercase: true, colorClass: "group-hover:text-pink-500" },
  { name: "MOTO TOUAREG", Icon: Bike, uppercase: true, colorClass: "group-hover:text-orange-500" },
  { name: "PrimaSure Total", Icon: BadgeCheck, colorClass: "group-hover:text-teal-500" },
  { name: "MYAGENT RENT", Icon: MapPin, uppercase: true, colorClass: "group-hover:text-rose-500" },
  { name: "Safi H2O", Icon: Waves, colorClass: "group-hover:text-cyan-400" },
  { name: "Safi Milk", Icon: Coffee, colorClass: "group-hover:text-amber-600" },
];

interface ClientLogosProps {
  sectionPrefix?: string;
}

export function ClientLogos({ sectionPrefix = "02 — Our Clients" }: ClientLogosProps) {
  return (
    <div className="w-full mt-40 border-t border-gray-200 pt-32">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-8">
        
        {/* Left Column: Heading */}
        <div className="lg:w-1/3 flex flex-col">
          <span className="text-gray-400 font-['Inter'] text-sm mb-6 block uppercase tracking-widest font-semibold">
            {sectionPrefix}
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-[56px] leading-[1.1] tracking-tight font-medium"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.03em" }}
          >
            We are<br />trusted
          </motion.h2>
        </div>

        {/* Right Column: Logo Grid */}
        <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16 items-center">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`flex items-center gap-3 text-[#A1A1AA] transition-colors duration-300 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 cursor-default group ${client.colorClass}`}
            >
              <div className="transition-transform duration-300 group-hover:-translate-y-1">
                <client.Icon size={32} strokeWidth={1.5} />
              </div>
              <span 
                className="font-bold text-xl leading-tight text-gray-400 transition-colors duration-300 group-hover:text-[#111]"
                style={{ 
                  fontFamily: "'Inter', sans-serif",
                  textTransform: client.uppercase ? 'uppercase' : client.lowercase ? 'lowercase' : 'none',
                  letterSpacing: client.uppercase ? '0.05em' : 'normal'
                }}
              >
                {client.name.split(' ').map((word, idx) => (
                  <span key={idx} className={idx > 0 ? "block text-sm font-medium" : ""}>
                    {word}
                  </span>
                ))}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
