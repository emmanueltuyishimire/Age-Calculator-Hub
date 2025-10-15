
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { Briefcase, User, Sun } from 'lucide-react';

const article = articles.find(a => a.slug === 'guide-to-retirement-accounts');

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
        question: "What's the main difference between Traditional and Roth accounts?",
        answer: "The main difference is when you pay taxes. **Traditional (pre-tax):** You get a tax deduction now, and you pay taxes on withdrawals in retirement. **Roth (after-tax):** You pay taxes on your contributions now, and qualified withdrawals in retirement are completely tax-free."
    },
    {
        question: "Should I choose a Traditional or Roth account?",
        answer: "A common guideline is: if you expect to be in a higher tax bracket in retirement, a Roth account is often better. If you expect to be in a lower tax bracket in retirement, a Traditional account might be more advantageous. Many people use a mix of both."
    },
    {
        question: "What is an employer match?",
        answer: "An employer match is when your employer contributes money to your 401(k) based on your own contributions. For example, they might match 100% of your contributions up to 3% of your salary. This is essentially free money, and you should always contribute enough to get the full match."
    },
    {
        question: "How much should I be saving for retirement?",
        answer: "A common goal is to save at least 15% of your pre-tax income for retirement. Our <a href='/retirement-savings-goal-calculator' class='text-primary hover:underline'>Retirement Savings Goal Calculator</a> can help you create a more personalized goal based on your desired lifestyle."
    }
];

export default function RetirementAccountsPage() {
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
            Saving for retirement is one of the most important financial goals, but the alphabet soup of account types—401(k), IRA, Roth—can be confusing. Each account is a different type of 'bucket' for your investments, and each comes with its own unique set of tax advantages. Understanding the basics of the most common accounts is the first step to building a powerful retirement strategy.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-8">
             <Card className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Briefcase className="h-8 w-8 text-primary" />
                        <CardTitle>The 401(k): Employer-Sponsored Plan</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <ul className="list-disc list-inside space-y-2 m-0 p-0">
                        <li><strong>How it works:</strong> An account offered by your employer. Contributions are automatically deducted from your paycheck.</li>
                        <li><strong>Key Advantage:</strong> The employer match. Many companies will match your contributions up to a certain percentage, which is a 100% return on your investment.</li>
                        <li><strong>Contribution Limits:</strong> Have high annual contribution limits set by the IRS.</li>
                        <li><strong>Types:</strong> Can be Traditional (pre-tax) or Roth (after-tax).</li>
                    </ul>
                </CardContent>
            </Card>
            <Card className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <User className="h-8 w-8 text-primary" />
                        <CardTitle>The IRA: Individual Retirement Account</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                     <ul className="list-disc list-inside space-y-2 m-0 p-0">
                        <li><strong>How it works:</strong> An account you open on your own at a brokerage firm. Anyone with earned income can contribute.</li>
                        <li><strong>Key Advantage:</strong> Investment choice. You have nearly unlimited investment options, unlike the limited menu in most 401(k)s.</li>
                        <li><strong>Contribution Limits:</strong> Have lower annual contribution limits than 401(k)s.</li>
                        <li><strong>Types:</strong> Can be Traditional (pre-tax, may be tax-deductible) or Roth (after-tax).</li>
                    </ul>
                </CardContent>
            </Card>
          </div>

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Sun className="h-8 w-8 text-primary" />
                    <CardTitle>The Roth Advantage: Tax-Free Growth</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                   Roth accounts (both Roth 401(k) and Roth IRA) are incredibly powerful. You contribute with after-tax money, meaning no upfront tax break. However, all your investment earnings grow completely tax-free, and qualified withdrawals in retirement are also tax-free. This can be a huge advantage, especially for younger savers who anticipate being in a higher tax bracket in the future.
                </p>
                 <p className="text-muted-foreground mt-2">
                   For more on planning, see our <Link href="/articles/planning-for-retirement-at-any-age" className="font-bold text-primary hover:underline">decade-by-decade retirement guide</Link>.
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
