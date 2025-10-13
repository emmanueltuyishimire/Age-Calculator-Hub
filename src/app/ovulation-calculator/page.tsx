
import OvulationCalculator from "@/components/calculators/ovulation-calculator";
import { type Metadata } from 'next';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Ovulation Calculator – Find Your Fertile Days and Ovulation Date Instantly',
    description: 'Use our free Ovulation Calculator to find your most fertile days, estimate ovulation date, and plan pregnancy naturally. Calculate using your last period and cycle length. Fast, accurate, and simple to use.',
    openGraph: {
      title: 'Ovulation Calculator – Find Your Fertile Days and Ovulation Date Instantly',
      description: 'Find your ovulation date and fertile window instantly using our free ovulation calculator. Plan pregnancy easily.',
      type: 'website',
      url: '/ovulation-calculator'
    },
    alternates: {
      canonical: '/ovulation-calculator',
    }
};

const faqs = [
    { question: "How accurate is the ovulation calculator?", answer: "It provides an estimate based on your average cycle, but ovulation may vary. Using ovulation kits or tracking body signs can improve accuracy." },
    { question: "Can I use this to avoid pregnancy?", answer: "You can use it for natural family planning, but it’s not a guarantee. Always consult your healthcare provider for reliable contraception." },
    { question: "What if my cycle is irregular?", answer: "The calculator works best with regular cycles. If your cycles vary greatly, track for several months or use an ovulation predictor kit." },
    { question: "How can I confirm if I’ve ovulated?", answer: "Signs include a rise in basal body temperature, cervical mucus changes, and positive LH test results." },
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

export default function OvulationCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main role="main">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Ovulation Calculator – Find Your Most Fertile Days Instantly</h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Trying to conceive or track your cycle? Use our Ovulation Calculator to find out when you are most likely to ovulate and your most fertile days.
            Enter the first day of your last menstrual period (LMP) and your average cycle length, and the calculator will show your next ovulation date, fertile window, and estimated next period.
            This tool uses biological data to help you plan or avoid pregnancy naturally and understand your reproductive health better.
          </p>
        </div>

        <OvulationCalculator />

        <section className="mt-12 space-y-8 max-w-4xl mx-auto">
            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Use the Ovulation Calculator</h2>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li><strong>Enter the First Day of Your Last Period:</strong> Use the date fields to input your last menstrual period start date.</li>
                    <li><strong>Enter Your Average Cycle Length:</strong> Provide the average number of days in your menstrual cycle.</li>
                    <li><strong>Click Calculate:</strong> See your estimated ovulation date and most fertile days instantly.</li>
                    <li><strong>Plan Accordingly:</strong> Use the results to plan conception or simply track your fertility patterns.</li>
                </ol>
            </div>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">How the Ovulation Calculator Works</h2>
                <p className="text-muted-foreground">
                  Ovulation typically occurs about 14 days before your next period begins. This calculator estimates your next ovulation date based on the start of your last period and your average cycle length. Your fertile window, which is the time you're most likely to conceive, includes the five days leading up to ovulation and the day of ovulation itself. This six-day period is when intercourse is most likely to result in pregnancy.
                </p>
            </div>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Understanding Your Fertile Window</h2>
                <p className="text-muted-foreground">
                  Your fertile window is determined by the lifespan of sperm and the egg. Sperm can survive in the female reproductive tract for up to five days, while an egg is only viable for about 12-24 hours after ovulation. This is why your most fertile days are the two days right before you ovulate and the day of ovulation. Having intercourse during this time maximizes the chance of conception.
                </p>
            </div>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Tips to Increase Your Chances of Pregnancy</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Have intercourse every 1–2 days during your fertile window.</li>
                    <li>Maintain a healthy diet rich in folate, antioxidants, and other essential nutrients.</li>
                    <li>Avoid smoking, excessive alcohol, and high levels of caffeine.</li>
                    <li>Manage stress and ensure you are getting adequate sleep.</li>
                    <li>Track your cycles regularly to better understand your body’s patterns.</li>
                    <li>Use ovulation test strips (LH kits) to confirm your fertile window.</li>
                </ul>
            </div>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Related Pregnancy Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link href="/pregnancy-calculator" className="text-primary hover:underline">Pregnancy Calculator</Link>
                    <Link href="/due-date-calculator" className="text-primary hover:underline">Due Date Calculator</Link>
                    <Link href="/gestational-age" className="text-primary hover:underline">Gestational Age Calculator</Link>
                    <Link href="/biological-age" className="text-primary hover:underline">Biological Age Calculator</Link>
                    <Link href="/age-calculator" className="text-primary hover:underline">Age Calculator</Link>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
