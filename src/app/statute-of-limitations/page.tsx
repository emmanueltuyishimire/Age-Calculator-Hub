
import StatuteOfLimitationsCalculator from '@/components/calculators/statute-of-limitations-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Scale, BookOpen } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Statute of Limitations Calculator – Estimate Filing Deadlines',
    description: 'Use our free Statute of Limitations Calculator to get a simple estimate for legal filing deadlines based on claim type and date of incident. For informational purposes only.',
    alternates: {
        canonical: '/statute-of-limitations',
    },
};

const faqs = [
    {
        question: "What is a statute of limitations?",
        answer: "A statute of limitations is a law that sets the maximum amount of time that parties in a dispute have to initiate legal proceedings. The time limit typically begins from the date of the incident or the date the injury/claim was discovered."
    },
    {
        question: "Is this calculator legally accurate for my state?",
        answer: "No. This calculator provides a simplified, educational estimate based on general data for a limited number of states and claims. It does not account for specific nuances, exceptions (like the discovery rule), or recent changes in law. It is for informational purposes only."
    },
    {
        question: "What happens if I miss the statute of limitations deadline?",
        answer: "If you fail to file a lawsuit within the statute of limitations period, the court will likely dismiss your case, and you will lose your right to sue for that claim permanently, regardless of the merits of your case."
    },
    {
        question: "Does the 'discovery rule' affect the deadline?",
        answer: "Yes. The 'discovery rule' is a major exception in many jurisdictions that can toll, or pause, the statute of limitations until the injury or claim is discovered (or reasonably should have been discovered). Our calculator does not account for this complex rule."
    },
    {
        question: "What should I do to find the exact deadline for my case?",
        answer: "You must consult with a qualified attorney licensed in your jurisdiction. Only a legal professional can provide accurate advice based on the specific facts of your situation. This tool is not a substitute for legal advice."
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

export default function StatuteOfLimitationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Statute of Limitations Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Get a basic estimate of the potential deadline to file a legal claim. This tool is for informational purposes only.
                </p>
            </div>

            <StatuteOfLimitationsCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive" />Legal Disclaimer: For Educational Use Only</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-destructive-foreground font-semibold">
                            This calculator provides a simplified estimate and is NOT a substitute for professional legal advice. Statutes of limitations are complex, vary significantly by jurisdiction, and are subject to numerous exceptions and changes. DO NOT rely on this tool to make any legal decisions. Missing a deadline can permanently bar your claim. You MUST consult with a qualified attorney for advice on your specific situation.
                        </p>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Learn More About Legal Timelines</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/what-is-statute-of-limitations" className="text-primary hover:underline">What Is a Statute of Limitations? A Complete Guide</Link></li>
                            <li><Link href="/articles/understanding-the-discovery-rule" className="text-primary hover:underline">The Discovery Rule: An Exception to the Statute of Limitations</Link></li>
                            <li><Link href="/articles/understanding-tolling-statute-of-limitations" className="text-primary hover:underline">How 'Tolling' Can Pause the Statute of Limitations Clock</Link></li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>What is a Statute of Limitations?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">A statute of limitations is a law that prescribes the time limit for bringing a legal action. Once the deadline has passed, the claim is 'time-barred,' and the defendant can have the lawsuit dismissed, regardless of its merits. These laws exist to ensure fairness and prevent the litigation of stale claims where evidence may be lost and memories have faded.</p>
                        <p className="text-muted-foreground mt-2">Our estimator uses general timeframes for a few common claim types in a sample of states to demonstrate how these deadlines work. The actual deadline for your case could be different.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Common Factors That Can Change the Deadline</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground mb-4">
                            The simple calculation of "Date of Incident + Time Period" is often complicated by various legal doctrines. Our calculator does NOT account for these. They include:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <BookOpen className="h-8 w-8 text-primary mt-1 shrink-0"/>
                                <div>
                                    <h3 className="font-semibold">The Discovery Rule</h3>
                                    <p className="text-sm text-muted-foreground">In many cases, the clock doesn't start until the injury or harm is actually discovered (or reasonably should have been discovered).</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Scale className="h-8 w-8 text-primary mt-1 shrink-0"/>
                                <div>
                                    <h3 className="font-semibold">Tolling for Minors</h3>
                                    <p className="text-sm text-muted-foreground">For minors, the statute of limitations is often paused ('tolled') until they reach the age of 18.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <BookOpen className="h-8 w-8 text-primary mt-1 shrink-0"/>
                                <div>
                                    <h3 className="font-semibold">Claims Against Government</h3>
                                    <p className="text-sm text-muted-foreground">Filing a claim against a government entity often involves much shorter notice periods and different procedures not covered here.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Scale className="h-8 w-8 text-primary mt-1 shrink-0"/>
                                <div>
                                    <h3 className="font-semibold">Specific State Nuances</h3>
                                    <p className="text-sm text-muted-foreground">Every state has its own unique rules and exceptions for different types of claims.</p>
                                </div>
                            </div>
                        </div>
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
        <RelatedCalculators currentCategory="Legal Estimators" currentHref="/statute-of-limitations" />
      </div>
    </div>
  );
}

    