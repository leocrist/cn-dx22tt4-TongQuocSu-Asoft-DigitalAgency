export interface Work {
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description?: string;
  details?: {
    client?: string;
    role?: string;
    duration?: string;
    tools?: string[];
  };
}

export interface Insight {
  slug: string;
  title: string;
  author: string;
  date: string;
  image: string;
  content?: string;
}
