
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';

const article = articles.find(a => a.slug === 'guide-to-retirement-savings');

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
  };
}

const faqs = [
    {
        question: "What's the difference between a 401(k) and a Roth IRA?",
        answer: "A 401(k) is an employer-sponsored plan. Traditional 401(k) contributions are pre-tax, lowering your taxable income now, and you pay taxes on withdrawals in retirement. A Roth IRA uses after-tax money, so your contributions don't lower your current tax bill, but qualified withdrawals in retirement are completely tax-free. Many people use both."
    },
    {
        question: "Is the 4% rule still valid?",
        answer: "The 4% rule is a guideline, not an ironclad law. It was based on historical market returns. Some financial planners now suggest a more conservative 3% or 3.5% withdrawal rate, especially for those planning a long retirement. It's a great starting point for discussion with a financial advisor."
    },
    {
        question: "What if I'm behind on saving for retirement?",
        answer: "Don't despair. The most important step is to start now. Increase your savings rate, take full advantage of employer matches and catch-up contributions (if you're over 50), and consider working a few years longer. Use our <a href='/retirement-savings-goal-calculator' class='text-primary hover:underline font-semibold'>Retirement Savings Calculator</a> to see how small changes can have a big impact."
    },
    {
        question: "Does my Social Security retirement age matter for my savings goal?",
        answer: "Yes, it's a key part of the puzzle. Knowing your Full Retirement Age helps you decide when to claim Social Security benefits. Delaying your benefits can significantly increase your monthly payout, which might mean you need a smaller personal nest egg to meet your income needs. Find your FRA with our <a href='/social-security-retirement-age-calculator' class='text-primary hover:underline font-semibold'>Social Security Age Calculator</a>."
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
        "name": "Age Calculator Hub"
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

export default function RetirementSavingsGuidePage() {
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
            Retirement planning can feel overwhelming. How much is enough? Am I on track? These are questions everyone asks. While there's no magic number that works for everyone, there are powerful guidelines and tools that can help you set a clear, achievable goal for your financial future.
          </p>
          <p>
            This guide will introduce you to key concepts like savings benchmarks by age and the famous '4% rule', empowering you to take control of your retirement plan.
          </p>
          
          <div className="my-10 text-center">
            <Link href="/retirement-savings-goal-calculator">
                <Button size="lg" className="text-lg">Calculate Your Retirement Goal</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Get a personalized estimate of your retirement nest egg.</p>
          </div>
          
          <h2 className="text-3xl font-bold">A Quick Benchmark: How Much Should You Have Saved?</h2>
          <p>Financial experts at Fidelity have proposed a simple set of guidelines for retirement savings based on your age and salary. While this is just a rule of thumb, it's a great way to quickly gauge if you're generally on track.</p>
          <ul className="list-disc list-inside space-y-3 my-4 text-xl">
              <li><strong>By age 30:</strong> 1x your annual salary</li>
              <li><strong>By age 40:</strong> 3x your annual salary</li>
              <li><strong>By age 50:</strong> 6x your annual salary</li>
              <li><strong>By age 60:</strong> 8x your annual salary</li>
              <li><strong>By age 67:</strong> 10x your annual salary</li>
          </ul>
          <p>Don't worry if you're not there yet! These are ambitious goals. The key is to have a plan to catch up. For a more detailed look at what to do in each decade, read our <Link href="/articles/planning-for-retirement-at-any-age" className="font-bold text-primary hover:underline">decade-by-decade retirement guide</Link>.</p>


          <h2 className="text-3xl font-bold">The 4% Rule: Calculating Your Total Nest Egg</h2>
          <Card className="my-8 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>What is the 4% Rule?</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    The 4% rule is a guideline that suggests you can safely withdraw 4% of your total retirement savings in your first year of retirement, and then adjust that amount for inflation each year after, with a high probability of your money lasting for 30 years.
                </p>
            </CardContent>
          </Card>
          <p>This rule is incredibly powerful because you can use it in reverse to determine your target nest egg. Simply decide how much annual income you'll need from your savings in retirement and divide it by 4% (or multiply by 25).</p>
          <p className="text-center text-2xl font-mono p-6 bg-background rounded-md shadow-sm">Desired Annual Income / 0.04 = Your Retirement Goal</p>
          <p>For example, if you need $50,000 per year from your savings, your goal would be $1,250,000 ($50,000 / 0.04).</p>
          <p>Our <Link href="/retirement-savings-goal-calculator" className="font-bold text-primary hover:underline">Retirement Savings Goal Calculator</Link> automates this for you and projects whether your current savings plan is on track.</p>

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
