
import SocialSecurityRetirementAgeCalculator from "@/components/calculators/social-security-retirement-age-calculator";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata: Metadata = {
    title: 'Social Security Retirement Age Calculator – Find Full Retirement Age by Birth Year',
    description: 'Use our free Social Security Retirement Age Calculator to determine your full retirement age (FRA) and benefit eligibility. Plan when to start or delay your retirement benefits effectively.',
    alternates: {
        canonical: '/social-security-retirement-age-calculator',
    },
};

const faqs = [
    {
        question: "What is the full retirement age for Social Security?",
        answer: "It depends on your birth year. For those born in 1960 or later, the full retirement age is 67. For those born between 1943 and 1954, it is 66, with incremental increases for birth years between 1955 and 1959. Our calculator determines this for you."
    },
    {
        question: "Can I claim benefits before my full retirement age?",
        answer: "Yes. You can start receiving retirement benefits as early as age 62. However, your monthly benefit will be permanently reduced if you claim before your full retirement age. The reduction can be up to 30% if your FRA is 67."
    },
    {
        question: "What happens if I delay claiming benefits past my FRA?",
        answer: "Your benefits will increase by a certain percentage for each month you delay after your full retirement age, up until you reach age 70. This can result in a significantly higher monthly payout for the rest of your life."
    },
    {
        question: "Does this calculator show my benefit amount?",
        answer: "No, this tool is designed to calculate your age eligibility only. To get a personalized estimate of your benefit amount based on your earnings history, you should create an account on the official <a href='https://www.ssa.gov/myaccount/' target='_blank' rel='noopener noreferrer' class='text-primary hover:underline'>my Social Security</a> website."
    },
     {
        question: "Is my FRA the same for all types of Social Security benefits?",
        answer: "Your Full Retirement Age is the same for retirement and spousal benefits. However, eligibility for disability or survivor benefits follows different rules."
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

const fraChart = [
    { birthYear: "1943-1954", fra: "66 years" },
    { birthYear: "1955", fra: "66 years and 2 months" },
    { birthYear: "1956", fra: "66 years and 4 months" },
    { birthYear: "1957", fra: "66 years and 6 months" },
    { birthYear: "1958", fra: "66 years and 8 months" },
    { birthYear: "1959", fra: "66 years and 10 months" },
    { birthYear: "1960 or later", fra: "67 years" },
];

export default function SocialSecurityRetirementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Social Security Retirement Age Calculator</h1>
            <p className="text-md md:text-lg text-muted-foreground">
                Use our free Social Security Retirement Age Calculator to find your Full Retirement Age (FRA) based on your birth year. Instantly see your FRA and understand your options for claiming early or delayed retirement benefits.
            </p>
            </div>

            <SocialSecurityRetirementAgeCalculator />
            
            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>How to Use the Calculator</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Your Birth Year:</strong> Input the 4-digit year you were born.</li>
                            <li><strong>Click "Calculate":</strong> Press the button to get your results.</li>
                            <li><strong>Review Your Retirement Details:</strong> The tool will show your Full Retirement Age (FRA) and the approximate reduction or increase in benefits for claiming early or delaying.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>How is Social Security Retirement Age Determined?</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                        Your Full Retirement Age (FRA)—the age at which you are entitled to 100% of your Social Security benefits—is determined by the year you were born. The age has gradually increased by law from 65 to 67. Our calculator uses the official Social Security Administration (SSA) rules to pinpoint your exact FRA. Knowing this date is the first and most critical step in making a smart claiming decision.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Full Retirement Age (FRA) by Birth Year</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">This chart from the SSA shows how the FRA changes based on your birth year.</p>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Year of Birth</TableHead>
                                    <TableHead>Full Retirement Age (FRA)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {fraChart.map((row) => (
                                    <TableRow key={row.birthYear}>
                                        <TableCell className="font-medium">{row.birthYear}</TableCell>
                                        <TableCell>{row.fra}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Smart Retirement Planning Tips</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>Estimate Your Benefits:</strong> Your benefit amount is based on your lifetime earnings. Create an account on the official SSA website to get a personalized estimate.</li>
                            <li><strong>Consider Delaying:</strong> If you are in good health and have other sources of income, delaying your benefits until age 70 will maximize your monthly payout for the rest of your life. This provides valuable longevity insurance.</li>
                            <li><strong>Coordinate with Your Spouse:</strong> If you are married, there are many strategies for coordinating benefits to maximize your combined lifetime income. Consider consulting a financial advisor.</li>
                            <li><strong>Understand the Earnings Test:</strong> If you claim benefits early and continue to work, your benefits may be temporarily reduced if your earnings exceed a certain limit.</li>
                            <li><strong>Read More:</strong> For more decade-specific tips, check out our <Link href="/articles/planning-for-retirement-at-any-age" className="text-primary hover:underline">guide to retirement planning</Link>.</li>
                        </ul>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions (FAQs)</h2>
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
        <RelatedCalculators currentCategory="Retirement & Social" currentHref="/social-security-retirement-age-calculator" />
      </div>
    </div>
  );
}
