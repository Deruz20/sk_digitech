export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Design' | 'Web' | 'AI' | 'Agency';
  date: string;          // ISO format: "2025-06-15"
  readingTime: number;   // minutes
  featured: boolean;     // true for exactly ONE post
  gradient: string;      // Tailwind gradient string OR CSS value
  thumbnailColor: string; // fallback solid color hex
};

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'aura-ai-engine-deep-dive',
    title: 'Inside the AURA AI Engine: How We Built It',
    excerpt: 'A behind-the-scenes look at the architecture powering our most advanced AI capability to date.',
    category: 'AI',
    date: '2025-06-15',
    readingTime: 8,
    featured: true,
    gradient: 'linear-gradient(135deg, #5A53C8, #E91E63)',
    thumbnailColor: '#5A53C8',
  },
  {
    id: '2',
    slug: 'design-system-2025',
    title: 'Rebuilding Our Design System from Scratch',
    excerpt: 'Why we threw out our old component library and what we replaced it with.',
    category: 'Design',
    date: '2025-05-28',
    readingTime: 6,
    featured: false,
    gradient: 'linear-gradient(135deg, #F7A521, #E91E63)',
    thumbnailColor: '#F7A521',
  },
  {
    id: '3',
    slug: 'performance-matrix-explained',
    title: 'The Performance Matrix: Measuring What Matters',
    excerpt: 'Our internal framework for tracking speed, accessibility, and business impact in one dashboard.',
    category: 'Web',
    date: '2025-05-10',
    readingTime: 5,
    featured: false,
    gradient: 'linear-gradient(135deg, #5A53C8, #00BCD4)',
    thumbnailColor: '#00BCD4',
  },
  {
    id: '4',
    slug: 'client-onboarding-playbook',
    title: 'Our 30-Day Client Onboarding Playbook',
    excerpt: 'The exact steps we follow to launch every new engagement without friction.',
    category: 'Agency',
    date: '2025-04-22',
    readingTime: 7,
    featured: false,
    gradient: 'linear-gradient(135deg, #E91E63, #F7A521)',
    thumbnailColor: '#E91E63',
  },
  {
    id: '5',
    slug: 'motion-react-scroll-animations',
    title: 'Scroll Animations That Actually Perform',
    excerpt: 'How we use motion/react to animate without tanking Core Web Vitals.',
    category: 'Web',
    date: '2025-04-05',
    readingTime: 4,
    featured: false,
    gradient: 'linear-gradient(135deg, #43A047, #5A53C8)',
    thumbnailColor: '#43A047',
  },
  {
    id: '6',
    slug: 'ai-brand-identity-tools',
    title: 'AI Tools We Actually Use for Brand Identity Work',
    excerpt: 'Separating the useful from the hype after 6 months of real client projects.',
    category: 'AI',
    date: '2025-03-18',
    readingTime: 6,
    featured: false,
    gradient: 'linear-gradient(135deg, #5A53C8, #F7A521)',
    thumbnailColor: '#5A53C8',
  },
];

export const CATEGORIES = ['All', 'Design', 'Web', 'AI', 'Agency'] as const;
export type Category = typeof CATEGORIES[number];
