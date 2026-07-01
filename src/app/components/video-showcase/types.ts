export type ServiceSectionId =
  | "aura-ai"
  | "performance-matrix"
  | "creation-canvas";

export interface ServiceSection {
  id: ServiceSectionId;
  label: string;
  overlay: string;
  durationMs: number;
}

export const SERVICE_SECTIONS: ServiceSection[] = [
  {
    id: "aura-ai",
    label: "AURA AI Engine",
    overlay: "NEXT-GEN AI RE-ENGINEERING BUSINESS LOGIC",
    durationMs: 4500,
  },
  {
    id: "performance-matrix",
    label: "Performance Matrix",
    overlay: "WEB ENGINEERING THAT DEFIES THE PERFORMANCE CEILING",
    durationMs: 4500,
  },
  {
    id: "creation-canvas",
    label: "Creation Canvas",
    overlay: "WE DO NOT IMITATE. WE DEFINE THE STANDARD.",
    durationMs: 4500,
  },
];
