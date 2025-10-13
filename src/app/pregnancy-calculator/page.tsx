
import PregnancyCalculator from "@/components/calculators/pregnancy-calculator";
import { type Metadata } from 'next';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Pregnancy Calculator – Estimate How Far Along You Are by LMP',
    description: 'Use our free Pregnancy Calculator to estimate how many weeks pregnant you are and when your baby is due. Fast, accurate, and based on your last menstrual period (LMP).',
    openGraph: {
        title: 'Pregnancy Calculator – Estimate How Far Along You Are by LMP',
        description: 'Use our free Pregnancy Calculator to estimate how many weeks pregnant you are and when your baby is due. Fast, accurate, and based on your last menstrual period (LMP).',
        type: 'website',
        url: '/pregnancy-calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pregnancy Calculator – Estimate How Far Along You Are by LMP',
        description: 'Use our free Pregnancy Calculator to estimate how many weeks pregnant you are and when your baby is due. Fast, accurate, and based on your last menstrual period (LMP).',
    },
    alternates: {
        canonical: '/pregnancy-calculator',
    },
};

const faqs = [
    { question: "How does the pregnancy calculator work?", answer: "It calculates your estimated due date and gestational age by adding 280 days (40 weeks) to the first day of your last menstrual period (LMP). It also provides an estimated conception date." },
    { question: "Is this calculator accurate?", answer: "This calculator provides a reliable estimate for most pregnancies with a regular 28-day cycle. However, an ultrasound is the most accurate method. Always consult your healthcare provider." },
    { question: "What if I have an irregular cycle?", answer: "If your cycle is not a typical 28 days, the estimate may be less accurate. You can adjust the cycle length in the calculator, but consulting a doctor is recommended for precise dating." },
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

export default function PregnancyCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Pregnancy Calculator – Estimate Your Pregnancy Week and Due Date</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Our free Pregnancy Calculator helps you estimate how many weeks pregnant you are, your estimated due date, and your conception date based on your last menstrual period (LMP).
        </p>
      </div>

      <PregnancyCalculator />

      <section className="mt-12 space-y-8 max-w-4xl mx-auto">
          <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Use the Pregnancy Calculator</h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li><strong>Enter Your Last Menstrual Period (LMP):</strong> Select the first day of your last period.</li>
                  <li><strong>Adjust Cycle Length (Optional):</strong> The default is 28 days, but you can adjust it for better accuracy.</li>
                  <li><strong>Click “Calculate”:</strong> Get your results instantly.</li>
              </ol>
          </div>
           <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">What Does This Calculator Show?</h2>
               <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Gestational Age:</strong> How many weeks and days pregnant you are.</li>
                  <li><strong>Estimated Due Date:</strong> The projected date your baby will arrive.</li>
                  <li><strong>Estimated Conception Date:</strong> The approximate date you likely conceived.</li>
                  <li><strong>Trimester:</strong> Which of the three trimesters you are currently in.</li>
              </ul>
          </div>
           <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Understanding Pregnancy Weeks and Trimesters</h2>
               <p className="text-muted-foreground">
                 Pregnancy is typically measured in weeks, starting from the first day of your last menstrual period. A full-term pregnancy is about 40 weeks. This duration is divided into three trimesters, each marking different stages of fetal development.
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link href="/due-date-calculator" className="text-primary hover:underline">Due Date Calculator</Link>
                  <Link href="/ovulation-calculator" className="text-primary hover:underline">Ovulation Calculator</Link>
                  <Link href="/gestational-age" className="text-primary hover:underline">Gestational Age Calculator</Link>
              </div>
          </div>
      </section>
    </div>
  );
}
