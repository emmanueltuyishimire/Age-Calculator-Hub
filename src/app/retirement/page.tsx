
import RetirementAgeCalculator from "@/components/calculators/retirement-age-calculator";
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from "@/components/layout/related-calculators";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Retirement Age Calculator – Find Your Full Retirement Age by Birth Year',
    description: 'Use our free Retirement Age Calculator to determine your full retirement age based on your birth year. Plan your Social Security, pension, and retirement timing easily.',
    openGraph: {
        title: 'Retirement Age Calculator – Find Your Full Retirement Age by Birth Year',
        description: 'Use our free Retirement Age Calculator to determine your full retirement age based on your birth year. Plan your Social Security, pension, and retirement timing easily.',
        type: 'website',
        url: '/retirement',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Retirement Age Calculator – Find Your Full Retirement Age by Birth Year',
        description: 'Use our free Retirement Age Calculator to determine your full retirement age based on your birth year. Plan your Social Security, pension, and retirement timing easily.',
    },
    alternates: {
        canonical: '/retirement',
    },
};

const faqs = [
    {
        question: "How is my full retirement age calculated?",
        answer: "Your full retirement age is determined by the U.S. Social Security Administration (SSA) based on your year of birth. For anyone born in 1960 or later, the full retirement age is 67. The age gradually increases from 65 to 67 for those born between 1938 and 1959."
    },
    {
        question: "What is the earliest I can start receiving Social Security benefits?",
        answer: "You can start receiving Social Security retirement benefits as early as age 62. However, be aware that your monthly benefits will be permanently reduced if you claim them before reaching your full retirement age."
    },
    {
        question: "What happens if I delay my retirement past my full retirement age?",
        answer: "If you delay taking your benefits, your monthly benefit amount will increase. For each year you delay past your full retirement age, up to age 70, you earn 'delayed retirement credits' that result in a higher payout. There is no additional benefit to delaying past age 70."
    },
     {
        question: "Is this calculator accurate for all countries?",
        answer: "No. This calculator is based specifically on the rules set by the U.S. Social Security Administration. Retirement ages, rules, and benefits vary significantly by country, so it should not be used for other systems."
    },
    {
        question: "Does this calculator tell me how much my benefit will be?",
        answer: "No, this tool only calculates your retirement age eligibility. To get a personalized estimate of your benefit amount, you should use the official calculator on the Social Security Administration's website."
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

export default function RetirementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Retirement Age Calculator – Find Your Full Retirement Age by Birth Year</h1>
            <p className="text-md md:text-lg text-muted-foreground">
                Use our free Retirement Age Calculator to determine when you can retire with full Social Security benefits. Enter your date of birth to see your full retirement age, explore early retirement options, and understand the advantages of delaying benefits.
            </p>
            </div>

            <RetirementAgeCalculator />
            
            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>How to Use the Retirement Age Calculator</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Your Date of Birth:</strong> Provide your exact birth date using the DD, MM, and YYYY fields to get the most accurate retirement age calculation based on SSA rules.</li>
                            <li><strong>Click "Calculate Retirement Age":</strong> Press the button to instantly see the age at which you are eligible for full Social Security benefits.</li>
                            <li><strong>Review Your Retirement Options:</strong> The results will clearly show your full retirement age, the date you become eligible, and how your benefits are affected by retiring early (at 62) or delaying (until 70).</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Understanding Your Retirement Options</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <h3 className="font-semibold text-lg">Early Retirement (Age 62)</h3>
                            <p className="text-sm text-muted-foreground">You can start benefits at 62, but they will be permanently reduced by up to 30% compared to waiting for your full retirement age.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Full Retirement Age (FRA)</h3>
                            <p className="text-sm text-muted-foreground">This is the age you are entitled to 100% of your earned Social Security benefits. Our calculator shows this age and date for you.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Delayed Retirement (Age 70)</h3>
                            <p className="text-sm text-muted-foreground">For every year you delay past your FRA, your benefit increases by about 8%, up to age 70. This can significantly boost your monthly income.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Smart Retirement Planning Tips</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>Start Saving Early:</strong> The sooner you begin saving in accounts like a 401(k) or IRA, the more time your investments have to grow, thanks to the power of compound interest.</li>
                            <li><strong>Know Your Number:</strong> Use your calculated full retirement age as a baseline for your financial plan.</li>
                            <li><strong>Consider Healthcare Costs:</strong> Medicare eligibility begins at 65, which may not align with your full retirement age. Plan for potential healthcare costs in the gap.</li>
                            <li><strong>Pay Off High-Interest Debt:</strong> Entering retirement debt-free, especially from high-interest sources like credit cards, frees up your income for living expenses.</li>
                            <li><strong>Create a Retirement Budget:</strong> Understand your expected expenses in retirement to ensure your savings will be sufficient. Read our <Link href="/articles/planning-for-retirement-at-any-age" className="text-primary hover:underline">decade-by-decade retirement guide</Link> for more tips.</li>
                        </ul>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions (FAQs)</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
        <RelatedCalculators currentCategory="Retirement & Social" currentHref="/retirement" />
      </div>
    </div>
  );
}
