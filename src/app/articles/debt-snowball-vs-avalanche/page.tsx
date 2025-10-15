
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { Snowflake, Zap, Brain, Goal } from 'lucide-react';

const article = articles.find(a => a.slug === 'debt-snowball-vs-avalanche');

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
        question: "Which method saves more money?",
        answer: "The Debt Avalanche method will always save you the most money in interest, because you are tackling the highest-interest debt first. The difference can be significant, especially if you have high-interest credit card debt."
    },
    {
        question: "Which method is faster?",
        answer: "Mathematically, the Debt Avalanche is also slightly faster because you are paying less in total interest. However, if the psychological boost of the Debt Snowball helps you stay motivated and make consistent payments, it could end up being faster for you in practice."
    },
    {
        question: "Can I combine the two methods?",
        answer: "Yes! Some people start with the Snowball method to get a quick win by paying off a small debt, then switch to the Avalanche method to tackle the larger, high-interest debts. The best method is the one you can stick with."
    },
    {
        question: "Where can I see the impact of extra payments?",
        answer: "Our <a href='/loan-payoff-calculator' class='text-primary hover:underline'>Loan Payoff Calculator</a> is perfect for this. While it doesn't compare Snowball vs. Avalanche directly, it clearly shows how making extra payments on any loan can drastically reduce your payoff time and total interest paid."
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
        "name": "Calculator Hub"
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

export default function DebtMethodPage() {
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
            When you're ready to get serious about paying off debt, having a clear strategy is crucial. Two of the most popular and effective methods are the Debt Snowball and the Debt Avalanche. Both involve making minimum payments on all your debts and then directing any extra money toward one specific debt. The only difference is which debt you choose to target.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-8">
             <Card className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Snowflake className="h-8 w-8 text-primary" />
                        <CardTitle>The Debt Snowball</CardTitle>
                    </div>
                    <CardDescription>Focuses on Behavior and Motivation</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="font-bold mb-2">The Strategy:</p>
                    <p>List your debts from the smallest balance to the largest. Make minimum payments on everything, and throw all your extra cash at the smallest debt. Once it's paid off, you "roll" that entire payment amount onto the next-smallest debt.</p>
                    <p className="font-bold mt-4 mb-2">Why it Works:</p>
                    <p>It's all about psychology. Paying off that first small debt provides a quick, powerful win, which builds momentum and keeps you motivated to continue. It feels great to eliminate a bill completely.</p>
                </CardContent>
            </Card>
            <Card className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Zap className="h-8 w-8 text-primary" />
                        <CardTitle>The Debt Avalanche</CardTitle>
                    </div>
                    <CardDescription>Focuses on Math and Efficiency</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                     <p className="font-bold mb-2">The Strategy:</p>
                    <p>List your debts from the highest interest rate to the lowest. Make minimum payments on everything, and throw all your extra cash at the debt with the highest interest rate. Once it's paid off, you apply that payment to the debt with the next-highest rate.</p>
                    <p className="font-bold mt-4 mb-2">Why it Works:</p>
                    <p>It's the most financially optimal strategy. By eliminating high-interest debt first, you save the maximum amount of money on interest payments over the long run.</p>
                </CardContent>
            </Card>
          </div>

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Goal className="h-8 w-8 text-primary" />
                    <CardTitle>Which Method is Best for You?</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                   There's no single right answer—it depends on your personality.
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                    <li>If you need quick wins to stay motivated, choose the **Debt Snowball**.</li>
                    <li>If you're disciplined and want to save the most money possible, choose the **Debt Avalanche**.</li>
                </ul>
                 <p className="text-muted-foreground mt-2">
                   The most important thing is to pick one and stick with it. Both methods are powerful tools for achieving financial freedom. To see how extra payments on any loan can impact your payoff date, use our <Link href="/loan-payoff-calculator" className="font-bold text-primary hover:underline">Loan Payoff Calculator</Link>.
                </p>
            </CardContent>
          </Card>

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
