
import RetirementSavingsGoalCalculator from '@/components/calculators/retirement-savings-goal-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Retirement Savings Goal Calculator – How Much Do I Need to Retire?',
    description: 'Use our free Retirement Savings Goal Calculator to estimate your total nest egg needed. Based on your desired income, age, and a safe withdrawal rate.',
    alternates: {
        canonical: '/retirement-savings-goal-calculator',
    },
};

const faqs = [
    {
        question: "How much money do I need to retire?",
        answer: "A common method is to use the 4% rule. Estimate your desired annual income in retirement and divide it by 0.04 (or multiply by 25). This calculator automates that and also projects your savings growth to see if you're on track."
    },
    {
        question: "What is a 'safe withdrawal rate'?",
        answer: "A safe withdrawal rate is the percentage of your savings you can withdraw each year in retirement with a low probability of running out of money. 4% is a widely used and historically successful rate, but some financial planners now recommend a more conservative 3-3.5%."
    },
    {
        question: "What is a good pre-retirement rate of return to use?",
        answer: "A common estimate for a diversified stock portfolio is 7-10% annually. However, past performance is no guarantee of future results. It's often wise to use a more conservative number, like 5-7%, for planning purposes."
    },
    {
        question: "Does this calculator account for Social Security?",
        answer: "No. The 'Desired Annual Income' should be the amount you need *from your savings*, after accounting for other income sources like Social Security or pensions."
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

export default function RetirementSavingsGoalCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Retirement Savings Goal Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Answer the big question: "How much do I need to retire?" This calculator helps you determine your target nest egg and whether your current strategy is on track to get you there.
                </p>
            </div>

            <RetirementSavingsGoalCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Retirement Planning</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/guide-to-retirement-savings" className="text-primary hover:underline">A Guide to Retirement Savings: How Much Do You Really Need?</Link></li>
                             <li><Link href="/social-security-retirement-age-calculator" className="text-primary hover:underline">Social Security Retirement Age Calculator</Link></li>
                        </ul>
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
        <RelatedCalculators currentCategory="Retirement & Social Security" currentHref="/retirement-savings-goal-calculator" />
      </div>
    </div>
  );
}
