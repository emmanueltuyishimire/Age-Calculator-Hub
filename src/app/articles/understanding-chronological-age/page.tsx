
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';

const article = articles.find(a => a.slug === 'understanding-chronological-age');

export function generateMetadata(): Metadata {
  if (!article) {
    return {};
  }
  return {
    title: article.title,
    description: article.description,
    alternates: {
        canonical: `/articles/${article.slug}`,
    },
    openGraph: {
        title: article.title,
        description: article.description,
        type: 'article',
        publishedTime: article.publishedDate,
        url: `/articles/${article.slug}`,
    },
    twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.description,
    },
  };
}

const faqs = [
    {
        question: "Is chronological age the most important measure of aging?",
        answer: "Historically, yes. But today, it's seen as just one piece of the puzzle. <a href='/biological-age' class='text-primary hover:underline'>Biological age</a>, which reflects your health, is often considered a more important predictor of healthspan (healthy years of life)."
    },
    {
        question: "How do I calculate my exact chronological age?",
        answer: "The easiest and most accurate way is to use a digital tool. Our <a href='/age-calculator' class='text-primary hover:underline'>Chronological Age Calculator</a> subtracts your birth date from the current date, accounting for all complexities like leap years, to give you an age down to the second."
    },
    {
        question: "Can two people with the same chronological age have different biological ages?",
        answer: "Absolutely. A 50-year-old who exercises, eats well, and doesn't smoke could have the biological age of a 40-year-old. Conversely, a 50-year-old with an unhealthy lifestyle could have the biological age of a 60-year-old."
    },
    {
        question: "Why is chronological age so important for legal matters?",
        answer: "It provides a clear, objective, and universally accepted standard. It's an unambiguous benchmark for determining rights and responsibilities, leaving no room for interpretation, which is essential for laws and regulations."
    }
];

const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article?.title,
    "description": article?.description,
    "datePublished": article?.publishedDate,
    "author": {
        "@type": "Organization",
        "name": "Calculators"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Calculators",
        "logo": {
            "@type": "ImageObject",
            "url": "https://innerpeacejournals.com/logo.png"
        }
    }
  };

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
};

export default function ChronologicalAgeArticlePage() {
  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main role="main" className="max-w-4xl mx-auto">
        <article className="prose dark:prose-invert lg:prose-xl max-w-none">
          <div className="text-center mb-12">
            <p className="text-base text-primary font-semibold">{article.category}</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{article.title}</h1>
            <p className="text-md md:text-lg text-muted-foreground">
              {article.description}
            </p>
          </div>

          <p className="lead">
            Chronological age is the most fundamental and universally understood measure of how old you are. It is the literal amount of time that has passed from the moment of your birth to the current moment. Measured in years, months, and days, this number is deeply embedded in our legal, social, and medical systems, defining everything from when we can vote to when we are eligible for retirement benefits.
          </p>
          <p>
            But is it the whole story? As science advances, we're learning that this simple number is just the beginning of understanding the complex process of aging.
          </p>

           <div className="my-10 text-center">
                <Link href="/age-calculator">
                    <Button size="lg" className="text-lg">Calculate Your Chronological Age</Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-2">Get your precise age, down to the second.</p>
            </div>

          <h2 className="text-3xl font-bold">The Three Dimensions of Age</h2>
          <p>
            To fully grasp what chronological age represents, it's helpful to compare it with two other important concepts: biological age and social age.
          </p>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card>
                <CardHeader>
                    <CardTitle>Biological Age: Your "Health Age"</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This refers to how old your body seems based on a variety of health markers, such as DNA methylation, telomere length, and inflammation levels. It's a measure of your physiological health. A healthy lifestyle can result in a biological age that is significantly lower than your chronological one. Curious? <Link href="/biological-age" className="text-primary font-semibold hover:underline">Estimate your biological age here</Link>.</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Social Age: Your "Cultural Age"</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This concept relates to societal expectations of how people should act and what roles they should occupy at certain ages. It includes cultural milestones like graduating from college, getting married, buying a home, or retiring.</p>
                </CardContent>
            </Card>
          </div>
          <p>Chronological age serves as the fixed timeline upon which these other, more fluid concepts of aging play out.</p>
          
          <h2 className="text-3xl font-bold">Why Chronological Age Still Reigns Supreme</h2>
          <p>
            Despite the growing scientific interest in biological age, chronological age remains the critical metric for structuring society. Its power lies in its objectivity and universality.
          </p>
           <Card className="my-8 bg-muted border-l-4 border-primary">
               <CardHeader><CardTitle>The Pillars of Societal Structure</CardTitle></CardHeader>
               <CardContent className="space-y-4">
                    <p>Chronological age is the bedrock of many systems we rely on daily:</p>
                   <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li><strong>Legal Milestones:</strong> It determines our rights and responsibilities. The right to drive (e.g., 16), vote (e.g., 18), or purchase alcohol (e.g., 21) are all tied to reaching a specific chronological age.</li>
                    <li><strong>Educational Systems:</strong> School entry and grade placement are organized almost entirely by chronological age, creating cohorts of peers.</li>
                    <li><strong>Medical Benchmarks:</strong> Doctors use chronological age as a baseline for developmental milestones in children (e.g., walking, talking) and for recommending critical health screenings (like mammograms or colonoscopies) in adults.</li>
                    <li><strong>Social Security & Pensions:</strong> Eligibility for retirement benefits is universally tied to reaching a specific chronological age. You can <Link href="/social-security-retirement-age-calculator" className="text-primary hover:underline">find your full retirement age here</Link>.</li>
                  </ul>
               </CardContent>
           </Card>

          <h2 className="text-3xl font-bold">Calculating Chronological Age: The Deceptive Simplicity</h2>
          <p>While it seems easy to calculate age, doing it precisely is more complex than it appears. A simple subtraction of years isn't enough. A truly accurate calculation must account for:</p>
          <ul className="list-disc list-inside space-y-2 my-4">
              <li>The exact number of days in the birth and current months.</li>
              <li>The occurrence of leap years between the two dates.</li>
          </ul>
          <p>This is why using a reliable digital tool is the best approach. An automated calculator removes the potential for human error and delivers an instant, precise result. For a rough estimate when you only have the birth year, see our guide on <Link href="/articles/how-to-calculate-age-from-year-of-birth" className="text-primary hover:underline">calculating age from year of birth</Link>.</p>

          <p className="mt-8 text-lg">
            In the end, while it's easy to get caught up in the number, remember that your chronological age is just one part of your story. It marks the passage of time, but how you feel, the health choices you make, and your outlook on life are what truly define your vitality.
          </p>

            <h2 className="text-3xl font-bold text-center mt-12 mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base">
                           <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </article>
      </main>
    </div>
  );
}
