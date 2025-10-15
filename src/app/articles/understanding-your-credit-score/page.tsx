
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { History, Percent, CalendarDays, Banknote, FileText } from 'lucide-react';

const article = articles.find(a => a.slug === 'understanding-your-credit-score');

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

const factors = [
    { icon: History, name: "Payment History (35%)", description: "The single most important factor. Paying your bills on time, every time, has the biggest positive impact on your score." },
    { icon: Percent, name: "Amounts Owed / Credit Utilization (30%)", description: "This is the ratio of your credit card balances to your credit limits. Keeping this ratio low (ideally below 30%) shows you're not over-reliant on credit." },
    { icon: CalendarDays, name: "Length of Credit History (15%)", description: "A longer credit history generally leads to a higher score. This is why it's a good idea not to close your oldest credit card accounts." },
    { icon: Banknote, name: "Credit Mix (10%)", description: "Lenders like to see that you can responsibly manage different types of credit, such as credit cards, a mortgage, and an auto loan." },
    { icon: FileText, name: "New Credit (10%)", description: "Opening several new credit accounts in a short period can temporarily lower your score, as it can signal financial distress." },
];

const faqs = [
    {
        question: "What is a good credit score?",
        answer: "Credit scores (like FICO) typically range from 300 to 850. A score of 700 or above is generally considered good, 740-799 is very good, and 800+ is exceptional. A good score will qualify you for the best interest rates on loans."
    },
    {
        question: "How can I check my credit score for free?",
        answer: "Many credit card companies and banks now offer free access to your credit score as a customer benefit. You are also entitled to a free credit report from each of the three major credit bureaus (Equifax, Experian, and TransUnion) once a year through AnnualCreditReport.com."
    },
    {
        question: "How long does it take to improve a credit score?",
        answer: "It depends on what's hurting your score. If you pay down a high credit card balance, you could see an improvement in a month or two. Negative marks, like a late payment or a collection, can stay on your report for up to seven years, but their impact lessens over time."
    },
    {
        question: "Does checking my own credit score hurt it?",
        answer: "No. When you check your own score, it's considered a 'soft inquiry' and has no impact. A 'hard inquiry,' which occurs when you apply for a new loan or credit card, can temporarily lower your score by a few points."
    }
];

export default function CreditScorePage() {
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
            Your credit score is one of the most important numbers in your financial life. This three-digit number is a snapshot of your creditworthiness, and it plays a huge role in determining whether you can get a loan, a mortgage, or even a credit card—and at what interest rate. Understanding what makes up your credit score is the first step to building and protecting it.
          </p>
          
          <h2 className="text-3xl font-bold text-center mb-8">The 5 Factors That Make Up Your Credit Score</h2>
          
          <div className="space-y-4">
            {factors.map((factor) => (
              <Card key={factor.name}>
                <CardHeader className="flex flex-row items-center gap-4">
                    <factor.icon className="h-8 w-8 text-primary" />
                    <CardTitle className="text-xl">{factor.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{factor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

           <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>Why Your Credit Score Matters</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                   A good credit score can save you thousands of dollars over your lifetime. It gives you access to lower interest rates on major purchases like a home or a car, which directly impacts your monthly payments and the total interest you'll pay. A better score means you're seen as a lower risk, which translates to better financial products and opportunities. You can see the impact of interest rates with our <Link href="/loan-payoff-calculator" className="font-bold text-primary hover:underline">Loan Payoff Calculator</Link>.
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
