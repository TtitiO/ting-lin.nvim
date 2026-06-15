export interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleZh: string;
  date: string;
  tags: string[];
  excerptEn: string;
  excerptZh: string;
  contentEn?: string;
  contentZh?: string;
  draft?: boolean;
}

export const blogPosts: BlogPost[] = [
  // Add posts here as you write them
];
