export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  image_url?: string;
  features?: string[];
}

export interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  date: string;
  machineryType?: string;
  machinery_type?: string;
  units: number;
  description: string;
  challenge: string;
  solution: string;
  advantages: string[];
  tags: string[];
  coverImage?: string;
  cover_image?: string;
  photos?: string[];
  sections?: { title: string; content: string }[];
}

export interface TestimonialLogo {
  id: string;
  name: string;
  image_url: string;
  sort_order: number;
  created_at?: string;
}

export const categories = [
  { id: 'fire-detection',     name: 'Fire Detection & Suppression', icon: 'Flame' },
  { id: 'safety-monitoring',   name: 'Safety & Monitoring',          icon: 'Shield' },
  { id: 'proximity-detection', name: 'Proximity & Detection',        icon: 'Radar' },
  { id: 'industrial-lighting', name: 'Industrial Lighting',          icon: 'Lightbulb' },
  { id: 'advancements',        name: 'Advancements',                 icon: 'Sparkles' },
];

export interface Award {
  id: string;
  title: string;
  description: string;
  image_url: string;
  year?: string;
  sort_order: number;
  created_at?: string;
}
