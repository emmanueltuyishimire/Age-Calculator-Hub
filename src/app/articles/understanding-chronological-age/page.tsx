
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';

const article = articles.find(a => a.slug === 'understanding-chronological-age');

if (!article) {
  return null;
}

export const metadata: Metadata = {
    title: article.title,
    description: article.description,
    alternates: {
        canonical: `/articles/${article.slug}`,
    },
};

export default function SampleArticlePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <article className="prose dark:prose-invert lg:prose-xl">
          <div className="text-center mb-8">
            <p className="text-base text-muted-foreground">{article.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{article.title}</h1>
            <p className="text-md md:text-lg text-muted-foreground">
              {article.description}
            </p>
          </div>

          <p>
            Chronological age is the most common measure of how old someone is. It's the literal amount of time that has passed since birth, typically measured in years, months, and days. While simple, this number is deeply embedded in our legal, social, and medical systems, defining everything from when we can vote to when we are eligible for retirement benefits.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground pt-4">The Difference Between Chronological, Biological, and Social Age</h2>
          <p>
            It's important to understand that chronological age is just one way to think about aging. Two other important concepts are:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Biological Age:</strong> This refers to how old your body seems based on various health markers, like blood pressure, cellular health, and lifestyle factors. You can estimate this using our <Link href="/biological-age" className="text-primary hover:underline">Biological Age Calculator</Link>. A healthy lifestyle can result in a biological age that is much lower than your chronological one.</li>
            <li><strong>Social Age:</strong> This concept relates to societal expectations of how people should act at certain ages. It includes milestones like graduating, getting married, or retiring.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-foreground pt-4">Why Chronological Age Matters</h2>
          <p>
            Despite the growing interest in biological age, chronological age remains a critical metric for many reasons:
          </p>
           <ul className="list-disc list-inside space-y-2">
            <li><strong>Legal Milestones:</strong> It determines legal rights and responsibilities, such as the right to vote, drive a car, or consent to medical treatment.</li>
            <li><strong>Medical Benchmarks:</strong> Doctors use chronological age as a baseline for developmental milestones in children and for recommending health screenings (like mammograms or colonoscopies) in adults.</li>
            <li><strong>Social Security & Pensions:</strong> Eligibility for retirement benefits is almost universally tied to reaching a specific chronological age. Find yours with our <Link href="/retirement" className="text-primary hover:underline">Retirement Age Calculator</Link>.</li>
          </ul>

          <p className="mt-8">
            While it's easy to get caught up in the number, remember that your chronological age is just one part of your story. How you feel and the health choices you make every day are just as important.
          </p>
        </article>
      </main>
    </div>
  );
}
