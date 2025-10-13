
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
    title: 'Ovulation Calculator – Find Your Fertile Days and Ovulation Date',
    description: 'Plan or track pregnancy with our Ovulation Calculator. Enter your last period date and cycle length to find your fertile window and ovulation day.',
};

const faqs = [
    { question: "What is ovulation?", answer: "Ovulation is the release of an egg from your ovary, which typically happens about 14 days before your next period begins. The days leading up to ovulation are your most fertile." },
    { question: "How does the ovulation calculator work?", answer: "It predicts your fertile window and ovulation day by using your last menstrual period (LMP) and average cycle length. The fertile window includes the five days before ovulation and the day of ovulation itself." },
    { question: "How accurate is this calculator?", answer: "This calculator provides a good estimate for women with regular cycles. For higher accuracy, consider tracking basal body temperature (BBT) or using ovulation predictor kits (OPKs)." },
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
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Ovulation Calculator – Predict Your Fertile Window</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Plan your pregnancy with our Ovulation Calculator. Enter your last period date and cycle length to discover your most fertile days and estimated ovulation date.
        </p>
      </div>

      <OvulationCalculator />

      <section className="mt-12 space-y-8 max-w-4xl mx-auto">
          <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Use the Ovulation Calculator</h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li><strong>Enter Your Last Period Date:</strong> Select the first day of your most recent menstrual period.</li>
                  <li><strong>Provide Your Cycle Length:</strong> Input the average length of your menstrual cycle.</li>
                  <li><strong>Click “Calculate Fertile Window”:</strong> Instantly receive your estimated ovulation date and fertile days.</li>
              </ol>
          </div>
           <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">What Is Ovulation?</h2>
               <p className="text-muted-foreground">
                 Ovulation is the process where a mature egg is released from the ovary. It's a key part of the menstrual cycle and is essential for conception. After release, the egg is viable for about 12-24 hours. Since sperm can survive in the female reproductive tract for up to five days, having intercourse during the days leading up to ovulation can increase the chances of pregnancy.
              </p>
          </div>
           <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How Ovulation Impacts Conception</h2>
               <p className="text-muted-foreground">
                 Your "fertile window" is the period when you are most likely to conceive. This window includes the five days before ovulation and the day of ovulation itself. This calculator helps you identify this timeframe so you can plan accordingly.
              </p>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <Link href="/pregnancy-calculator" className="text-primary hover:underline">Pregnancy Calculator</Link>
                  <Link href="/due-date-calculator" className="text-primary hover:underline">Due Date Calculator</Link>
                  <Link href="/gestational-age" className="text-primary hover:underline">Gestational Age Calculator</Link>
              </div>
          </div>
      </section>
    </div>
  );
}
