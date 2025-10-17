
import SocialSecurityCalculator from "@/components/calculators/social-security-calculator";
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from "@/components/layout/related-calculators";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata: Metadata = {
    title: 'Social Security Break-Even Calculator – When Should You Claim?',
    description: 'Use our free Social Security Calculator to find your break-even age. Compare claiming benefits early vs. late to see which option maximizes your lifetime payout.',
    alternates: {
        canonical: '/social-security-calculator',
    },
};

const faqs = [
    {
        question: "What is a Social Security break-even age?",
        answer: "The break-even age is the point at which the total lifetime benefits you receive from waiting to claim Social Security surpass the total benefits you would have received by claiming earlier. If you live past this age, delaying your benefits was the more profitable choice."
    },
    {
        question: "Where can I find my estimated monthly benefit amounts?",
        answer: "The most accurate place is the official Social Security Administration (SSA) website. You can create a 'my Social Security' account at SSA.gov to see your personalized statement with benefit estimates for claiming at ages 62, your full retirement age, and 70."
    },
    {
        question: "What is the best age to claim Social Security?",
        answer: "There's no single 'best' age; it's a personal decision. If you expect to live a long life, delaying benefits is often financially advantageous. If you need the income sooner or have health concerns, claiming early might be better. This calculator helps you see the financial trade-offs."
    },
    {
        question: "Does this calculator account for Cost-of-Living Adjustments (COLA)?",
        answer: "No, for simplicity, this break-even calculator does not factor in future COLAs. COLAs would generally increase the total benefits for both scenarios over time."
    },
    {
        question: "Is this calculator a substitute for financial advice?",
        answer: "Absolutely not. This is a simplified tool for informational purposes only. The decision of when to claim Social Security is complex and should be made in consultation with a qualified financial advisor who can assess your entire financial picture."
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

export default function SocialSecurityCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Social Security Break-Even Calculator</h1>
            <p className="text-md md:text-lg text-muted-foreground">
                Deciding when to claim Social Security is a major financial decision. Use this calculator to compare two different claiming strategies and find your "break-even" age—the point where delaying benefits becomes more profitable.
            </p>
            </div>

            <SocialSecurityCalculator />
            
            <section className="mt-12 space-y-8 animate-fade-in">
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><AlertCircle className="text-destructive" />Disclaimer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-destructive-foreground font-semibold">
                            This calculator provides a simplified estimate for educational purposes only. It does not account for taxes, COLA, spousal benefits, or other complex factors. It is NOT a substitute for professional financial advice.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Learn More About Retirement Planning</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>First, find your Full Retirement Age with our <Link href="/retirement" className="text-primary hover:underline">Retirement Age Calculator</Link>.</li>
                            <li><Link href="/articles/planning-for-retirement-at-any-age" className="text-primary hover:underline">Planning for Retirement: A Decade-by-Decade Guide</Link></li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>How to Use the Break-Even Calculator</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Your Benefit Scenarios:</strong> You need two scenarios to compare. For each one, enter the age you would start claiming benefits and the corresponding monthly payment amount. You can get these estimates from your personal statement on the <a href="https://www.ssa.gov/myaccount/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SSA.gov</a> website.</li>
                            <li><strong>Set Your Life Expectancy:</strong> Input the age to which you expect to live. This is used to calculate the total lifetime benefit for each scenario.</li>
                            <li><strong>Click "Calculate Break-Even":</strong> Instantly see the results, including your break-even age and a comparison of total lifetime benefits.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Understanding Your Break-Even Age</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            When you claim Social Security early, you receive smaller payments for a longer period of time. When you delay, you receive larger payments for a shorter period. The **break-even age** is the point where the total amount received from the delayed, larger payments finally catches up to and surpasses the total received from the earlier, smaller payments.
                        </p>
                         <p className="text-muted-foreground mt-2">
                           If your life expectancy is well beyond your calculated break-even age, delaying your benefits is likely to be the more financially advantageous strategy over your lifetime. If you don't expect to live to the break-even age, claiming earlier may result in a higher total payout.
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
                                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
        <RelatedCalculators currentCategory="Financial" currentHref="/social-security-calculator" />
      </div>
    </div>
  );
}
