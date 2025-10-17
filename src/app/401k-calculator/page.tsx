
import FourOhOneKCalculator from '@/components/calculators/401k-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '401(k) Calculator – Retirement, Early Withdrawal & Employer Match',
    description: 'A comprehensive 401(k) Calculator to estimate your retirement savings, see the costs of early withdrawal, and maximize your employer match. For U.S. residents.',
    alternates: {
        canonical: '/401k-calculator',
    },
};

const faqs = [
    {
        question: "How much can I contribute to a 401(k) in 2025?",
        answer: "For 2025, the employee contribution limit is $23,500. If you are age 50 or over, you can contribute an additional $7,500 as a 'catch-up' contribution, for a total of $31,000."
    },
    {
        question: "What is an employer match?",
        answer: "An employer match is when your employer contributes to your 401(k) based on your own contributions. A common example is a 50% match on the first 6% of your salary you contribute. It's essentially 'free money' and a key benefit."
    },
    {
        question: "What is the penalty for early withdrawal from a 401(k)?",
        answer: "If you withdraw funds before age 59½, you will typically pay ordinary income tax on the withdrawal, plus a 10% penalty. Our Early Withdrawal Calculator can estimate this cost. Some exceptions apply."
    },
    {
        question: "Should I roll over my old 401(k) when I change jobs?",
        answer: "It's often a good idea. Rolling it over to an IRA or your new employer's 401(k) can give you more investment options and makes it easier to manage your retirement savings in one place."
    }
];

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

export default function FourOhOneKCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-5xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">401(k) Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    A suite of tools to estimate your 401(k) balance at retirement, calculate early withdrawal costs, and maximize your employer match.
                </p>
            </div>

            <FourOhOneKCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the 401(k) Calculators</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Retirement Calculator:</strong> Enter your current financial situation, including age, salary, and existing balance, along with your contribution details and expected returns to project your total 401(k) balance at retirement.</li>
                            <li><strong>Early Withdrawal Calculator:</strong> If you're considering taking money out before age 59½, use this tab to estimate the financial impact, including taxes and the 10% penalty.</li>
                            <li><strong>Maximize Match Calculator:</strong> Input your salary and your employer's matching formula to find the minimum contribution percentage required to get the full employer match—ensuring you don't leave "free money" on the table.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>401(k) Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            A 401(k) is a form of retirement savings plan in the U.S. with tax benefits that are mainly available through an employer. It is named after subsection 401(k) in the Internal Revenue Code, which was made possible by the Revenue Act of 1978. Contributions to a 401(k) are made as pre-tax deductions during payroll, and the dividends, interest, and capital gains of the 401(k) all benefit from tax deferment. This means that assets in a 401(k) grow tax-free and won't be taxed until a later point, usually during retirement. For more details on different account types, see our <Link href="/articles/guide-to-retirement-accounts" className="text-primary hover:underline">guide to retirement accounts</Link>.
                        </p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Pros and Cons of a 401(k)</CardTitle>
                    </CardHeader>
                     <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-lg mb-4">Pros</h3>
                            <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                                <li>Tax-deferred growth on investments.</li>
                                <li>Employer matching contributions are like "free money".</li>
                                <li>Contributions are tax-deductible, lowering your taxable income now.</li>
                                <li>High annual contribution limits compared to <Link href="/ira-calculator" className="text-primary hover:underline">IRAs</Link>.</li>
                                <li>Funds are generally protected from bankruptcy creditors.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-4">Cons</h3>
                            <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                                <li>Limited investment options chosen by the employer.</li>
                                <li>Can have higher administrative fees than other accounts.</li>
                                <li>Funds are illiquid and subject to penalties if withdrawn before age 59 ½.</li>
                                <li>Employer contributions may have vesting periods.</li>
                                <li>Some plans have waiting periods before new employees can participate.</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader><CardTitle>401(k) Distributions in Retirement</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Between the ages of 59 ½ and 73, participants have several options: receive distributions as a lump sum or installments, roll over the funds to an IRA or another plan, convert to an annuity, or do nothing until required minimum distributions (RMDs) begin at age 73. Use our <Link href="/rmd-calculator" className="text-primary hover:underline">RMD Calculator</Link> to estimate your required withdrawals.
                        </p>
                    </CardContent>
                </Card>

                 <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p>{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
        <RelatedCalculators currentCategory="Financial" currentHref="/401k-calculator" />
      </div>
    </div>
  );
}
