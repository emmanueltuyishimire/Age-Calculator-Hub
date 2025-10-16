
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const article = articles.find(a => a.slug === 'understanding-your-paycheck');

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

const paycheckComponents = [
    { item: "Gross Pay", description: "This is your total earnings before any deductions are taken out. It's calculated by your salary or your hourly rate multiplied by the hours worked." },
    { item: "Pre-Tax Deductions", description: "These are amounts taken out of your gross pay before taxes are calculated, thus lowering your taxable income. Common examples include contributions to a 401(k) retirement plan or health insurance premiums." },
    { item: "Taxes (Withholding)", description: "This is what's withheld for federal, state, and local income taxes, as well as FICA taxes (Social Security and Medicare)." },
    { item: "Post-Tax Deductions", description: "These are amounts taken out after taxes have been calculated, such as contributions to a Roth 401(k) or disability insurance." },
    { item: "Net Pay (Take-Home Pay)", description: "This is the final amount you receive after all deductions and taxes. It's the money that gets deposited into your bank account." },
];

const faqs = [
    {
        question: "How can I increase my take-home pay?",
        answer: "You can potentially increase your take-home pay by adjusting your tax withholding (be careful not to under-withhold), contributing to pre-tax retirement accounts to lower your taxable income, or reviewing your benefits elections to see if there are more cost-effective options."
    },
    {
        question: "What is the difference between a 401(k) and a Roth 401(k)?",
        answer: "A traditional 401(k) uses pre-tax dollars, lowering your taxable income now, but you pay taxes on withdrawals in retirement. A Roth 401(k) uses post-tax dollars, so there's no immediate tax break, but qualified withdrawals in retirement are tax-free."
    },
    {
        question: "Why are my paychecks different amounts sometimes?",
        answer: "This can happen due to overtime pay, bonuses, changes in your tax withholding, or adjustments to your benefits contributions. Always review your pay stub to understand any differences."
    },
    {
        question: "Is it better to get a bonus or a raise?",
        answer: "A raise increases your gross pay for all future pay periods and contributes to a higher base for retirement contributions. A bonus is a one-time payment. While a large bonus is great, a raise is generally better for your long-term financial health."
    }
];

const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.publishedDate,
    "author": {
        "@type": "Organization",
        "name": "Calculators"
    }
} : null;

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

export default function PaycheckGuidePage() {
  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
        {articleSchema && <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />}
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
            Your paycheck is the cornerstone of your financial life, yet many of us don't fully understand what happens to our money between the 'gross pay' we earn and the 'net pay' we take home. Understanding the components of your pay stub is the first step toward effective budgeting, smart saving, and taking control of your financial future.
          </p>
          
          <div className="my-10 text-center">
            <Link href="/take-home-pay-calculator">
                <Button size="lg" className="text-lg">Estimate Your Take-Home Pay</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">See how much of your paycheck you actually take home.</p>
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-8">Anatomy of a Paycheck</h2>
          
          <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Component</TableHead>
                        <TableHead>Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paycheckComponents.map((item) => (
                        <TableRow key={item.item}>
                            <TableCell className="font-medium">{item.item}</TableCell>
                            <TableCell>{item.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </Card>

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>Making Your Paycheck Work for You</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                   Knowing your net pay is the starting point for creating a budget. It's the real amount you have to work with each month for your expenses and savings. The difference between your gross and net pay is money that is working for you in other ways—funding your retirement, paying for your health coverage, and contributing to public services. 
                </p>
                 <p className="text-muted-foreground mt-2">
                   Once you know your take-home pay, you can use our <a href="/savings-goal-calculator" class="text-primary hover:underline font-bold">Savings Goal Calculator</a> to allocate it effectively and our <Link href="/retirement-savings-goal-calculator" className="font-bold text-primary hover:underline">Retirement Savings Calculator</Link> to see if your pre-tax contributions are on track.
                </p>
            </CardContent>
          </Card>

           <h2 className="text-3xl font-bold text-center mt-12 mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base">
                           <p>{faq.answer}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </article>
      </main>
    </div>
  );
}
