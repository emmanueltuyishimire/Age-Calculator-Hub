
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';

const article = articles.find(a => a.slug === 'understanding-life-insurance');

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
        question: "How much life insurance do I really need?",
        answer: "A common rule of thumb is 10-12 times your annual income. However, a more personalized figure depends on your specific debts, mortgage, future education costs for children, and existing savings. Our <a href='/life-insurance-calculator' class='text-primary hover:underline font-semibold'>Life Insurance Calculator</a> uses the DIME method to give you a detailed estimate."
    },
    {
        question: "Is term life insurance a waste of money if it expires?",
        answer: "No. Think of it like car or home insurance. You pay for protection for a specific period when your financial risk is highest (e.g., while you have a mortgage and young children). If the term ends and you didn't use it, that's a good thing—it means you lived. The peace of mind and protection it offers is the product you're buying."
    },
    {
        question: "Can I have more than one life insurance policy?",
        answer: "Yes, it's common to have multiple policies. For example, you might have a group policy through your employer and a separate, individual term policy that you own privately. This strategy, known as 'laddering', can also involve having multiple term policies with different lengths."
    },
    {
        question: "What's the difference between a beneficiary and the policy owner?",
        answer: "The policy owner is the person who owns and controls the policy (and pays the premiums). The insured is the person whose life is covered. The beneficiary is the person or entity who receives the death benefit. In many cases, the owner and the insured are the same person."
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

export default function LifeInsuranceArticlePage() {
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
            Life insurance can seem complicated, but its core purpose is simple: to provide a financial safety net for your loved ones if you were to pass away. It's a fundamental part of responsible financial planning, especially if you have a spouse, children, or anyone else who depends on your income.
          </p>
          <p>
            This guide will demystify life insurance, breaking down the two main types—Term and Whole Life—and helping you understand which one might be right for you and how much coverage you actually need.
          </p>
          
          <div className="my-10 text-center">
            <Link href="/life-insurance-calculator">
                <Button size="lg" className="text-lg">Estimate Your Insurance Needs</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Get a personalized coverage estimate in minutes.</p>
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-8">Term vs. Whole Life Insurance: The Great Debate</h2>
          <p>This is the most common question people have about life insurance. The two types serve very different purposes.</p>

          <div className="grid md:grid-cols-2 gap-8 my-8">
             <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Term Life Insurance</CardTitle>
                    <CardDescription>Pure Protection for a Specific Period</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p>Think of term life insurance like renting. You pay for coverage for a specific "term," typically 10, 20, or 30 years. If you pass away during that term, your beneficiaries receive a tax-free death benefit. If the term ends and you're still alive, the policy expires (often with an option to renew at a much higher rate).</p>
                    <ul className="list-disc list-inside space-y-2 mt-4">
                        <li><strong>Pro:</strong> Simple and incredibly affordable.</li>
                        <li><strong>Pro:</strong> Ideal for covering specific, temporary needs like a mortgage or the years your children are growing up.</li>
                        <li><strong>Con:</strong> Provides no value if you outlive the term.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Whole Life Insurance</CardTitle>
                    <CardDescription>Lifelong Coverage with an Investment Component</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p>Think of whole life insurance like owning. It provides coverage for your entire life and includes a savings component called "cash value" that grows over time. You can borrow against this cash value or surrender the policy for it.</p>
                    <ul className="list-disc list-inside space-y-2 mt-4">
                        <li><strong>Pro:</strong> Permanent coverage that never expires as long as you pay premiums.</li>
                        <li><strong>Pro:</strong> Builds cash value you can use later in life.</li>
                        <li><strong>Con:</strong> Significantly more expensive (often 5 to 15 times the cost of term insurance).</li>
                    </ul>
                </CardContent>
            </Card>
          </div>

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>Which is Right for Most People?</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    For the vast majority of families, **term life insurance is the better and more cost-effective choice**. It allows you to get a large amount of coverage for a low price during the years your financial obligations are highest.
                </p>
                 <p className="text-muted-foreground mt-2">
                    A popular financial strategy is "buy term and invest the difference." This means you buy an affordable term policy and invest the money you would have spent on a whole life policy into your own retirement accounts, like a 401(k) or IRA. Our <Link href="/retirement-savings-goal-calculator" className="font-bold text-primary hover:underline">Retirement Savings Goal Calculator</Link> can help you see how powerful that can be.
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
