
import GestationalAgeCalculator from "@/components/calculators/gestational-age-calculator";
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import RelatedCalculators from "@/components/layout/related-calculators";


export const metadata: Metadata = {
    title: 'Gestational Age Calculator – Estimate Pregnancy Age by LMP or Conception Date',
    description: 'Use our free Gestational Age Calculator to estimate your pregnancy week and fetal development based on your last menstrual period (LMP) or conception date. Fast, accurate, and easy to use.',
    openGraph: {
        title: 'Gestational Age Calculator – Estimate Pregnancy Age by LMP or Conception Date',
        description: 'Use our free Gestational Age Calculator to estimate your pregnancy week and fetal development based on your last menstrual period (LMP) or conception date. Fast, accurate, and easy to use.',
        type: 'website',
        url: '/gestational-age',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Gestational Age Calculator – Estimate Pregnancy Age by LMP or Conception Date',
        description: 'Use our free Gestational Age Calculator to estimate your pregnancy week and fetal development based on your last menstrual period (LMP) or conception date. Fast, accurate, and easy to use.',
    },
    alternates: {
        canonical: '/gestational-age',
    }
};

const faqs = [
    {
        question: "What is gestational age?",
        answer: "Gestational age is the time measured from the first day of your last menstrual period (LMP) to the current date, expressed in weeks and days."
    },
    {
        question: "How accurate is this calculator?",
        answer: "It provides a close estimate based on the LMP you provide. For the most accurate results, including dating from an ultrasound scan, always consult your healthcare provider."
    },
    {
        question: "Can I calculate gestational age without knowing my LMP?",
        answer: "If you know your conception date, you can use it to estimate your LMP by subtracting two weeks. However, using the actual LMP is more standard. If you are unsure, consult your doctor."
    },
    {
        question: "Is this calculator a substitute for medical advice?",
        answer: "No. This tool is for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for any pregnancy-related questions."
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

const chartData = [
    { weeks: "1–12", trimester: "First", highlights: "Embryo development, heartbeat begins, major organs form." },
    { weeks: "13–27", trimester: "Second", highlights: "Baby grows rapidly, you may feel movement, baby can hear sounds." },
    { weeks: "28–40", trimester: "Third", highlights: "Final growth and preparation for birth, lungs mature, baby gets into position." },
];

export default function GestationalAgePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Gestational Age Calculator – Calculate Pregnancy Age by LMP or Conception Date</h1>
            <p className="text-md md:text-lg text-muted-foreground">
                Our Gestational Age Calculator estimates how many weeks and days pregnant you are based on your last menstrual period (LMP). It’s a reliable way to track your pregnancy’s progress, understand fetal development, and anticipate your baby’s due date.
            </p>
            </div>
            
            <GestationalAgeCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Use the Gestational Age Calculator</h2>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li><strong>Enter Your Last Menstrual Period (LMP):</strong> Use the input fields to provide the first day of your last period.</li>
                        <li><strong>Click “Calculate”:</strong> Press the button to get your results instantly.</li>
                        <li><strong>See Your Results:</strong> View your estimated gestational age in weeks and days, your current trimester, and your estimated due date.</li>
                    </ol>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">What Is Gestational Age?</h2>
                    <p className="text-muted-foreground mb-4">
                        Gestational age is the standard measurement used by medical professionals to date a pregnancy. It is measured in weeks, starting from the first day of your last menstrual period (LMP). This means that by the time you have a positive pregnancy test, you are typically considered to be about 4 weeks pregnant.
                    </p>
                    <p className="text-muted-foreground">
                        This method is used because most people know when their last period started, whereas the exact date of conception is often unknown. Fetal age, in contrast, refers to the actual age of the growing baby, which is typically two weeks less than the gestational age.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Knowing Gestational Age Matters</h2>
                    <p className="text-muted-foreground mb-4">
                        Tracking gestational age is crucial for a healthy pregnancy. It allows you and your healthcare provider to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><strong>Monitor Fetal Development:</strong> Ensure the baby is growing at a healthy and expected rate.</li>
                        <li><strong>Schedule Prenatal Care:</strong> Time important tests, screenings, and ultrasounds correctly.</li>
                        <li><strong>Estimate the Due Date:</strong> Provide a timeline for the baby's arrival, which is essential for planning.</li>
                        <li><strong>Guide Health Decisions:</strong> Inform recommendations for nutrition, exercise, and medical interventions throughout the pregnancy.</li>
                    </ul>
                </div>

                <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Gestational Age Chart (Weeks to Months)</h3>
                <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Weeks Pregnant</TableHead>
                            <TableHead>Trimester</TableHead>
                            <TableHead>Baby Development Highlights</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {chartData.map((row) => (
                            <TableRow key={row.trimester}>
                                <TableCell className="font-medium">{row.weeks}</TableCell>
                                <TableCell>{row.trimester}</TableCell>
                                <TableCell>{row.highlights}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </div>
                </div>

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
        <RelatedCalculators currentCategory="Pregnancy Calculators" currentHref="/gestational-age" />
      </div>
    </div>
  );
}
