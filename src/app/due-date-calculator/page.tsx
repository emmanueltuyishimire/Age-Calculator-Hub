
import DueDateCalculator from "@/components/calculators/due-date-calculator";
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Due Date Calculator – Estimate Your Baby’s Delivery Date by LMP, Conception or IVF',
    description: 'Use our free Due Date Calculator to estimate your baby\'s expected delivery date from LMP, conception date, or IVF transfer. Fast, reliable, and easy—get your estimated due date and pregnancy week instantly.',
    openGraph: {
        title: 'Due Date Calculator – Estimate Your Baby’s Delivery Date by LMP, Conception or IVF',
        description: 'Use our free Due Date Calculator to estimate your baby\'s expected delivery date from LMP, conception date, or IVF transfer. Fast, reliable, and easy—get your estimated due date and pregnancy week instantly.',
        type: 'website',
        url: '/due-date-calculator',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Due Date Calculator – Estimate Your Baby’s Delivery Date by LMP, Conception or IVF',
        description: 'Use our free Due Date Calculator to estimate your baby\'s expected delivery date from LMP, conception date, or IVF transfer. Fast, reliable, and easy—get your estimated due date and pregnancy week instantly.',
    },
    alternates: {
        canonical: '/due-date-calculator',
    },
};

const faqs = [
    {
      question: "How accurate is the due date?",
      answer: "The due date is an estimate. First-trimester ultrasound dating is typically the most accurate method for establishing an exact gestational age."
    },
    {
      question: "Can I use this calculator if I had IVF?",
      answer: "Yes. Choose the IVF option and enter the embryo transfer date and embryo stage (e.g., day 3 or day 5). The calculator will compute the estimated delivery date accordingly."
    },
    {
      question: "What if my menstrual cycle is not 28 days?",
      answer: "Enter your average cycle length to refine the due date estimate. A longer or shorter cycle shifts the estimated conception and due dates."
    },
    {
      question: "Is this tool medical advice?",
      answer: "No. This tool provides informational estimates only. Always consult your healthcare provider for medical decisions and accurate pregnancy dating."
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

export default function DueDateCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main role="main">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Due Date Calculator – Find Your Baby’s Estimated Delivery Date</h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Use our Due Date Calculator to estimate when your baby is likely to arrive. Enter the first day of your last menstrual period (LMP), or — if known — your conception date or IVF transfer date, and the calculator will return an estimated delivery date, current pregnancy week, and trimester. This tool provides a reliable estimate used by many medical professionals, but remember: only an ultrasound can give the most accurate dating. Use the results to plan prenatal care, appointments, and milestones.
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
                <h2 className="text-2xl md:text-3xl font-bold mb-4">What Your Due Date Means (Weeks, Trimesters & Milestones)</h2>
                <p className="text-muted-foreground">
                  While 40 weeks is the standard, a full-term pregnancy can range from 38 to 42 weeks. Factors like genetics, lifestyle, and first-time pregnancies can influence the length. Your due date is the midpoint of this range, so it’s normal for your baby to arrive a week or two before or after.
                </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Tips for a Healthy Pregnancy</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Start prenatal care early and schedule your first appointment.</li>
                  <li>Take prenatal vitamins with folic acid.</li>
                  <li>Stay hydrated and maintain balanced nutrition.</li>
                  <li>Get regular, moderate exercise unless advised otherwise.</li>
                  <li>Avoid alcohol, smoking, and certain medications—consult your provider.</li>
                  <li>Monitor fetal movement in the third trimester and report changes.</li>
                  <li>Keep a copy of your due date and prenatal record for appointments.</li>
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
        </section>
      </main>
    </div>
  );
}
