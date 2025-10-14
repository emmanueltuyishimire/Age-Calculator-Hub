
import BirthdayAgeCalculator from '@/components/calculators/birthday-age-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';

export const metadata: Metadata = {
    title: 'Birthday Age Calculator – Calculate Your Exact Age in Years, Months & Days',
    description: 'Use our Birthday Age Calculator to instantly find your age in years, months, days, hours, minutes, and seconds. Perfect for fun, planning, or tracking milestones. Free and easy to use online!',
    openGraph: {
        title: 'Birthday Age Calculator – Calculate Your Exact Age in Years, Months & Days',
        description: 'Use our Birthday Age Calculator to instantly find your age in years, months, days, hours, minutes, and seconds. Perfect for fun, planning, or tracking milestones. Free and easy to use online!',
        type: 'website',
        url: '/birthday-age-calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Birthday Age Calculator – Calculate Your Exact Age in Years, Months & Days',
        description: 'Use our Birthday Age Calculator to instantly find your age in years, months, days, hours, minutes, and seconds. Perfect for fun, planning, or tracking milestones. Free and easy to use online!',
    },
    alternates: {
        canonical: '/birthday-age-calculator',
    },
};

const faqs = [
    { question: "How do I use the Birthday Age Calculator?", answer: "Simply enter your date of birth using the calendar and click the 'Calculate Age & Birthday' button. Your exact age and a countdown to your next birthday will appear instantly." },
    { question: "Can I see my age in hours and minutes?", answer: "Yes! The calculator provides a detailed breakdown of your age in years, months, days, hours, minutes, and seconds, all updating in real time." },
    { question: "Is this calculator free to use online?", answer: "Absolutely. This is a 100% free online tool designed for easy and accurate age calculation and birthday tracking." },
    { question: "How accurate is the birthday countdown?", answer: "The countdown is highly accurate. It calculates the time remaining until your next birthday down to the second, based on the current date and time." },
    { question: "Can I find out what day of the week I was born on?", answer: "While this specific tool focuses on age and birthday countdowns, many calendar tools can tell you the day of the week for any given date. Our calculator is optimized for time duration." },
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

export default function BirthdayAgeCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Birthday Age Calculator – Find Your Exact Age Instantly</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Find out your exact age and count down to your next birthday in real-time. This tool is perfect for tracking milestones, planning celebrations, or simply for fun!
                </p>
            </div>

            <BirthdayAgeCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Use the Birthday Age Calculator</h2>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li><strong>Input Your Birth Date:</strong> Use the easy-to-navigate calendar to select your exact date of birth.</li>
                        <li><strong>Calculate Age in Real-Time:</strong> Click the "Calculate Age & Birthday" button.</li>
                        <li><strong>View Age in Years, Months, Days, Hours, Minutes & Seconds:</strong> The calculator instantly displays your current age, with the seconds ticking up live. It also shows a separate countdown to your next birthday.</li>
                    </ol>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Features of Our Age Calculator</h2>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>Real-Time Updates:</strong> Watch your age and birthday countdown change every second.</li>
                    <li><strong>Complete Breakdown:</strong> Get your age in years, months, days, and even down to hours, minutes, and seconds.</li>
                    <li><strong>Next Birthday Countdown:</strong> See exactly how long you have to wait for your next celebration.</li>
                    <li><strong>Simple & Fast:</strong> A clean, intuitive interface that gives you instant results on any device.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Knowing Your Exact Age Matters</h2>
                    <p className="text-muted-foreground">
                    Knowing your precise age is useful for more than just fun. It's often required for official documents, applications, and verifying eligibility for age-related benefits or events. This tool gives you the accuracy needed for any situation, from legal forms to planning the perfect surprise party.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Tips for Using Your Age Data</h2>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><strong>Fun Uses for Age Calculator:</strong> Celebrate half-birthdays or find out exactly when you turn a certain number of days or minutes old.</li>
                        <li><strong>Milestone Tracking:</strong> Keep an eye on major life milestones and anniversaries with second-by-second precision.</li>
                        <li><strong>Event Planning:</strong> Use the birthday countdown to perfectly time your party invitations and preparations.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">FAQs About Birthday Age Calculation</h2>
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
        <RelatedCalculators currentCategory="Core Age Calculation" currentHref="/birthday-age-calculator" />
      </div>
    </div>
  );
}
