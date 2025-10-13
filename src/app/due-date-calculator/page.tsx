
import DueDateCalculator from "@/components/calculators/due-date-calculator";
import { type Metadata } from 'next';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Due Date Calculator – Estimate Your Baby’s Delivery Date',
    description: 'Find your expected delivery date using our accurate Due Date Calculator. Enter your LMP, conception, or IVF date to estimate when your baby will arrive.',
};

const faqs = [
    { question: "How is the due date calculated?", answer: "The most common method is Naegele's rule, which adds 280 days (40 weeks) to the first day of your last menstrual period (LMP). Our calculator also allows calculations based on conception or IVF transfer date for more flexibility." },
    { question: "How accurate is the estimated due date?", answer: "It's an estimate, not a guarantee. Only about 4% of babies are born on their exact due date. It provides a timeframe for when you can expect to go into labor." },
    { question: "Can my due date change?", answer: "Yes, your healthcare provider may adjust your due date based on ultrasound measurements, especially in the first trimester. An early ultrasound is the most accurate way to date a pregnancy." },
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

export default function DueDateCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Due Date Calculator – Find Your Baby’s Estimated Delivery Date</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Find your expected delivery date with our accurate Due Date Calculator. Enter your last menstrual period (LMP), conception date, or IVF transfer date to estimate when your baby will arrive.
        </p>
      </div>

      <DueDateCalculator />

      <section className="mt-12 space-y-8 max-w-4xl mx-auto">
          <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Use the Due Date Calculator</h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li><strong>Choose a Calculation Method:</strong> Select from Last Menstrual Period (LMP), Conception Date, or IVF Date.</li>
                  <li><strong>Enter the Relevant Date:</strong> Provide the date based on your chosen method.</li>
                  <li><strong>Click “Calculate Due Date”:</strong> Instantly see your estimated delivery date and other key pregnancy milestones.</li>
              </ol>
          </div>
           <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How Is the Due Date Calculated?</h2>
               <p className="text-muted-foreground">
                 Due dates are most commonly estimated using the first day of your last menstrual period (LMP). A typical pregnancy lasts about 40 weeks (280 days) from the LMP. Our calculator uses this standard method but also provides options for those who know their exact conception date or have undergone IVF, offering a more personalized estimate.
              </p>
          </div>
           <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Average Pregnancy Duration Explained</h2>
               <p className="text-muted-foreground">
                 While 40 weeks is the standard, a full-term pregnancy can range from 38 to 42 weeks. Factors like genetics, lifestyle, and first-time pregnancies can influence the length. Your due date is the midpoint of this range, so it’s normal for your baby to arrive a week or two before or after.
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
                  <Link href="/ovulation-calculator" className="text-primary hover:underline">Ovulation Calculator</Link>
                  <Link href="/gestational-age" className="text-primary hover:underline">Gestational Age Calculator</Link>
              </div>
          </div>
      </section>
    </div>
  );
}
