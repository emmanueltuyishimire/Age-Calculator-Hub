
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { TrendingUp } from 'lucide-react';

const article = articles.find(a => a.slug === 'the-power-of-compound-interest');

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
        question: "What is the formula for compound interest?",
        answer: "The formula is A = P(1 + r/n)^(nt), where A is the future value, P is the principal, r is the annual interest rate, n is the number of times interest is compounded per year, and t is the number of years."
    },
    {
        question: "How is compound interest different from simple interest?",
        answer: "Simple interest is calculated only on the principal amount. Compound interest is calculated on the principal amount plus the accumulated interest from previous periods. This 'interest on interest' is what makes it so powerful."
    },
    {
        question: "Does compound interest work for debt too?",
        answer: "Yes, and it's why high-interest debt (like credit card debt) can be so dangerous. The interest you don't pay off gets added to your balance, and then you're charged interest on that larger balance, creating a cycle that's hard to break."
    },
    {
        question: "How can I see the effect of compound interest on my savings?",
        answer: "Our <a href='/savings-goal-calculator' class='text-primary hover:underline'>Savings Goal Calculator</a> and <a href='/retirement-savings-goal-calculator' class='text-primary hover:underline'>Retirement Savings Calculator</a> are perfect for this. You can input your savings, contribution, and interest rate to see how your money can grow over time."
    }
];

export default function CompoundInterestPage() {
  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
            Albert Einstein reportedly called compound interest the "eighth wonder of the world." While the quote's origin is debated, its sentiment is not. Compound interest is the single most powerful force in personal finance. Understanding and harnessing it is the key to building significant wealth over time.
          </p>
          
           <h2 className="text-3xl font-bold">What is Compound Interest?</h2>
          <Card className="my-8 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>Interest on Your Interest</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Simply put, compound interest is the interest you earn not only on your initial principal but also on the accumulated interest from previous periods. Your money starts working for you, and then the money it earns also starts working for you, creating a snowball effect that can lead to exponential growth.
                </p>
            </CardContent>
          </Card>

           <h2 className="text-3xl font-bold">Why Starting Early is Everything</h2>
           <p>The most crucial ingredient for compound interest is **time**. Let's look at a simple example:</p>

            <div className="grid md:grid-cols-2 gap-8 my-8">
                <Card>
                    <CardHeader><CardTitle>Saver A: Starts Early</CardTitle></CardHeader>
                    <CardContent>
                        <p>Starts saving $5,000 per year at age 25. After 10 years, at age 35, she stops saving completely.</p>
                        <p className="font-bold text-lg mt-4">Total Contribution: $50,000</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Saver B: Starts Later</CardTitle></CardHeader>
                    <CardContent>
                        <p>Starts saving $5,000 per year at age 35 and continues for 30 years until age 65.</p>
                        <p className="font-bold text-lg mt-4">Total Contribution: $150,000</p>
                    </CardContent>
                </Card>
            </div>
            <p>Assuming a 7% annual return, who has more money at age 65?</p>
            <p className="text-center text-3xl font-bold my-4">Saver A, the early starter, ends up with more money despite contributing only a third of the amount. That's the power of giving your money more time to compound.</p>

            <div className="my-10 text-center">
                <Link href="/retirement-savings-goal-calculator">
                    <Button size="lg" className="text-lg">See Your Own Growth Potential</Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-2">Model your retirement savings with our calculator.</p>
            </div>

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
