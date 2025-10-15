
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { Scale, Shield, Zap } from 'lucide-react';

const article = articles.find(a => a.slug === 'high-yield-savings-vs-stocks');

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
        question: "What is a High-Yield Savings Account (HYSA)?",
        answer: "An HYSA is a type of savings account, usually offered by online banks, that pays a much higher interest rate than traditional brick-and-mortar bank savings accounts. Your money is FDIC-insured (up to $250,000), making it a very safe place to store cash."
    },
    {
        question: "What's the main risk of investing in the stock market?",
        answer: "The main risk is market volatility. The value of your investments can go down, and you could lose money, especially in the short term. However, over long periods, the stock market has historically provided returns that significantly outpace inflation."
    },
    {
        question: "Can I lose money in a high-yield savings account?",
        answer: "You cannot lose your principal in an FDIC-insured HYSA (up to the limit). However, your 'purchasing power' can decrease if the interest rate you're earning is lower than the rate of inflation."
    },
    {
        question: "How do I decide which one to use?",
        answer: "Use your time horizon as your guide. If you need the money in less than 5 years (for a down payment, emergency fund, etc.), an HYSA is the safer choice. If your goal is more than 5 years away (like retirement), investing in the stock market offers the best potential for growth."
    }
];

export default function SavingsVsStocksPage() {
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
            Once you've committed to saving, the next big question is: where should that money go? Two of the most common options are a High-Yield Savings Account (HYSA) and the stock market. They represent two ends of the risk-and-return spectrum, and understanding their differences is crucial for aligning your savings strategy with your financial goals.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-8">
             <Card className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Shield className="h-8 w-8 text-primary" />
                        <CardTitle>High-Yield Savings Accounts (HYSAs)</CardTitle>
                    </div>
                    <CardDescription>The Choice for Safety and Accessibility</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <ul className="list-disc list-inside space-y-2 m-0 p-0">
                        <li><strong>Best for:</strong> Short-term goals (1-5 years), like an emergency fund, a down payment for a house, or a car purchase.</li>
                        <li><strong>Key Feature:</strong> Safety. Your money is FDIC-insured, so you can't lose your principal.</li>
                        <li><strong>Return:</strong> Modest. Rates are variable but typically much higher than traditional savings accounts.</li>
                        <li><strong>Risk:</strong> Very low. The main risk is that your returns might not keep up with inflation, meaning your money loses purchasing power over time.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Zap className="h-8 w-8 text-primary" />
                        <CardTitle>The Stock Market</CardTitle>
                    </div>
                    <CardDescription>The Engine for Long-Term Growth</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                     <ul className="list-disc list-inside space-y-2 m-0 p-0">
                        <li><strong>Best for:</strong> Long-term goals (5+ years), like retirement.</li>
                        <li><strong>Key Feature:</strong> Growth potential. Historically, the stock market has offered the highest returns over long periods.</li>
                        <li><strong>Return:</strong> Potentially high, but variable. The S&P 500 has an average annual return of about 10%.</li>
                        <li><strong>Risk:</strong> High in the short term. The market is volatile, and you can lose money.</li>
                    </ul>
                </CardContent>
            </Card>
          </div>

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Scale className="h-8 w-8 text-primary" />
                    <CardTitle>The Balanced Approach: Use Both</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                   For most people, the answer isn't "either/or" but "both." Use an HYSA for your emergency fund and short-term savings goals. For long-term goals like retirement, use investment accounts (like a 401(k) or IRA) to invest in a diversified portfolio of stocks and bonds. This strategy gives you both safety for your immediate needs and growth potential for your future.
                </p>
                <p className="text-muted-foreground mt-2">
                    Use our <Link href="/savings-goal-calculator" className="font-bold text-primary hover:underline">Savings Goal Calculator</Link> to model different interest rates and see how it affects your timeline. For retirement, see our <Link href="/retirement-savings-goal-calculator" className="font-bold text-primary hover:underline">Retirement Savings Calculator</Link>.
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
