
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { ShieldAlert, PiggyBank, Target } from 'lucide-react';

const article = articles.find(a => a.slug === 'emergency-fund-guide');

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
        question: "How much should I have in my emergency fund?",
        answer: "A common rule of thumb is to have 3 to 6 months' worth of essential living expenses. Essential expenses include your rent/mortgage, utilities, food, transportation, and minimum debt payments."
    },
    {
        question: "Where should I keep my emergency fund?",
        answer: "It should be kept in a liquid and safe account, separate from your regular checking account. A <a href='/articles/high-yield-savings-vs-stocks' class='text-primary hover:underline'>high-yield savings account (HYSA)</a> is the ideal place. It's easily accessible, FDIC-insured, and earns a competitive interest rate."
    },
    {
        question: "What counts as an 'emergency'?",
        answer: "An emergency is an unexpected and necessary expense. The three main categories are: job loss, a major medical or dental event, or an urgent home or car repair. It is *not* for vacations, holiday gifts, or a new phone."
    },
    {
        question: "Should I pay off debt or build an emergency fund first?",
        answer: "Most financial advisors recommend a hybrid approach. Start by saving a small 'starter' emergency fund of $1,000. Then, aggressively pay down high-interest debt (like credit cards). Once that's done, shift your focus to building your full 3-6 month emergency fund."
    }
];

export default function EmergencyFundPage() {
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
            An emergency fund is the bedrock of financial security. It's a pool of money set aside specifically for unexpected life events, like a job loss, a medical crisis, or a major car repair. Without it, a surprise expense can force you into high-interest debt, derail your financial goals, and create immense stress. Think of it as your personal financial safety net.
          </p>
          
          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <ShieldAlert className="h-8 w-8 text-primary" />
                    <CardTitle>Why You Absolutely Need an Emergency Fund</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                   Life is unpredictable. An emergency fund acts as a buffer between you and financial disaster. It gives you the freedom to handle a crisis without having to sell your investments at a bad time or rack up credit card debt. It provides peace of mind.
                </p>
            </CardContent>
          </Card>
          
          <h2 className="text-3xl font-bold">How to Build Your Emergency Fund</h2>
          <div className="space-y-6">
                <Card>
                    <CardHeader><div className="flex items-center gap-4"><Target className="h-6 w-6 text-primary" /><h3 className="font-bold text-xl m-0">Step 1: Determine Your Target Amount</h3></div></CardHeader>
                    <CardContent><p className="text-muted-foreground">Calculate your essential monthly expenses: housing, utilities, food, transportation, insurance, and minimum debt payments. Multiply that number by 3 to 6. If your income is unstable, you have dependents, or you're a homeowner, aim for the higher end of that range.</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><div className="flex items-center gap-4"><PiggyBank className="h-6 w-6 text-primary" /><h3 className="font-bold text-xl m-0">Step 2: Start Small and Automate</h3></div></CardHeader>
                    <CardContent><p className="text-muted-foreground">The big number can be intimidating. Start with a goal of saving $1,000. Open a separate high-yield savings account and set up an automatic transfer from your checking account every payday. This 'pay yourself first' strategy is the key to consistency. Use our <Link href="/savings-goal-calculator" className="text-primary hover:underline">Savings Goal Calculator</Link> to see how quickly even small amounts can add up.</p></CardContent>
                </Card>
                 <Card>
                    <CardHeader><div className="flex items-center gap-4"><ShieldAlert className="h-6 w-6 text-primary" /><h3 className="font-bold text-xl m-0">Step 3: Build to a Full Fund and Protect It</h3></div></CardHeader>
                    <CardContent><p className="text-muted-foreground">Once you've paid off any high-interest debt, direct that extra cash flow toward building your full 3-6 month fund. Once it's built, protect it. Only use it for true emergencies, and if you do, make replenishing it your top financial priority.</p></CardContent>
                </Card>
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
