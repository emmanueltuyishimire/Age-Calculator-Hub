
export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedDate: string;
};

export const articles: Article[] = [
  {
    slug: 'understanding-chronological-age',
    title: 'Understanding Chronological Age: More Than Just a Number',
    description: 'Dive deep into what chronological age really means and how it has been perceived throughout history. Learn the difference between chronological, biological, and social age.',
    category: 'Core Concepts',
    publishedDate: '2024-10-15',
  },
  {
    slug: 'how-to-improve-biological-age',
    title: '5 Actionable Tips to Lower Your Biological Age',
    description: 'Your biological age is a better indicator of your health than your chronological age. Discover five evidence-based lifestyle changes you can make today to turn back the clock.',
    category: 'Health & Wellness',
    publishedDate: '2024-10-14',
  },
  {
    slug: 'the-science-behind-pet-age-calculators',
    title: 'The Science Behind Dog and Cat Age Calculators',
    description: 'Is one dog year really equal to seven human years? We explore the modern science behind converting pet age to human years and why it matters for their health.',
    category: 'Pet Health',
    publishedDate: '2024-10-12',
  },
  {
    slug: 'planning-for-retirement-at-any-age',
    title: 'Planning for Retirement: A Decade-by-Decade Guide',
    description: 'Retirement planning looks different in your 20s than in your 50s. This guide breaks down the key steps you should be taking based on your current age.',
    category: 'Financial Planning',
    publishedDate: '2024-10-10',
  },
  {
    slug: 'navigating-pregnancy-milestones',
    title: 'Navigating Your Pregnancy: A Trimester-by-Trimester Milestone Guide',
    description: 'From the first positive test to the final countdown, understand the key milestones and developmental stages of your pregnancy journey.',
    category: 'Pregnancy',
    publishedDate: '2024-10-08',
  },
   {
    slug: 'what-is-chronological-age',
    title: 'What Is Chronological Age and Why Is It Important?',
    description: 'Explore the definition of chronological age and its significance in medical, legal, and social contexts. Understand how this fundamental measure shapes our lives.',
    category: 'Core Concepts',
    publishedDate: '2024-10-05',
  },
];
