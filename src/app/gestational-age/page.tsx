
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
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


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
        answer: "Gestational age is the medical term for how far along a pregnancy is. It's measured in weeks and days from the first day of your last menstrual period (LMP) to the current date."
    },
    {
        question: "How accurate is this calculator?",
        answer: "It provides a very close estimate based on the LMP you provide. It uses the same standard method that healthcare providers use for initial dating. However, for the most accurate results, especially for dating from an ultrasound scan, you should always consult your healthcare provider."
    },
    {
        question: "Is gestational age the same as fetal age?",
        answer: "No. Gestational age includes the roughly two weeks before conception. Fetal age is the actual age of the growing baby from the date of conception. Fetal age is typically two weeks less than the gestational age."
    },
    {
        question: "Can I calculate gestational age without knowing my LMP?",
        answer: "If you know your exact conception date, you can use our <a href='/due-date-calculator' class='text-primary hover:underline'>Due Date Calculator</a> with the 'Conception Date' method, which will also provide your gestational age. If you are unsure of either date, your doctor can determine gestational age with an ultrasound."
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
    { weeks: "1–4", trimester: "First", highlights: "Conception occurs; embryo implants in the uterus. You're officially pregnant, though you may not know it yet!" },
    { weeks: "5–8", trimester: "First", highlights: "Baby's heart begins to beat, and all major organs like the brain and spinal cord start to form." },
    { weeks: "9–13", trimester: "First", highlights: "Embryo is now a fetus. Facial features develop, and the fetus can make a fist." },
    { weeks: "14–17", trimester: "Second", highlights: "You might feel the first flutters of movement (quickening). Baby's skeleton is hardening." },
    { weeks: "18–22", trimester: "Second", highlights: "Anatomy scan ultrasound is usually performed. The baby can hear sounds and swallow." },
    { weeks: "23–27", trimester: "Second", highlights: "Baby reaches viability (has a chance of survival if born). Lungs continue to develop rapidly." },
    { weeks: "28–31", trimester: "Third", highlights: "Baby can open and close their eyes and may have a full head of hair. They are gaining weight steadily." },
    { weeks: "32–35", trimester: "Third", highlights: "Baby practices breathing movements, and their bones are fully formed but still soft." },
    { weeks: "36–40+", trimester: "Third", highlights: "Baby is considered full-term. They get into position for birth, and their lungs are mature." },
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Gestational Age Calculator – Calculate Pregnancy Age by LMP</h1>
            <p className="text-md md:text-lg text-muted-foreground">
                Our Gestational Age Calculator estimates how many weeks and days pregnant you are based on your last menstrual period (LMP). It’s a reliable way to track your pregnancy’s progress, understand fetal development, and anticipate your baby’s due date.
            </p>
            </div>
            
            <GestationalAgeCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>How to Use the Gestational Age Calculator</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Your Last Menstrual Period (LMP):</strong> Use the input fields to provide the first day of your last period (Day, Month, Year).</li>
                            <li><strong>Click “Calculate Gestational Age”:</strong> Press the button to get your results instantly.</li>
                            <li><strong>See Your Results:</strong> The calculator will show your estimated gestational age in weeks and days, your current trimester, your estimated due date, and a key development milestone for your current week.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>What Is Gestational Age?</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Gestational age is the standard measurement used by medical professionals to date a pregnancy. It is measured in weeks, starting from the first day of your last menstrual period (LMP). This means that by the time you have a positive pregnancy test, you are typically considered to be about 4 weeks pregnant, as conception usually occurs about two weeks after your LMP.
                        </p>
                        <p className="text-muted-foreground">
                            This method is used because most people know when their last period started, whereas the exact date of conception is often unknown. This creates a consistent timeline for everyone.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Why Knowing Your Gestational Age is Crucial</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                        Tracking gestational age is crucial for a healthy pregnancy. It allows you and your healthcare provider to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>Monitor Fetal Development:</strong> Ensure the baby is growing at a healthy and expected rate according to established milestones.</li>
                            <li><strong>Schedule Prenatal Care:</strong> Time important tests, screenings (like for genetic conditions), and ultrasounds correctly.</li>
                            <li><strong>Estimate the Due Date:</strong> Provide a timeline for the baby's arrival, which is essential for personal and medical planning.</li>
                            <li><strong>Guide Health Decisions:</strong> Inform recommendations for nutrition, exercise, and any necessary medical interventions throughout the pregnancy.</li>
                        </ul>
                    </CardContent>
                </Card>

                <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Fetal Development by Gestational Week</h2>
                <p className="text-muted-foreground mb-4">Here’s a summary of what’s happening as the weeks go by. Our calculator will show you the specific highlight for your current week.</p>
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
                            <TableRow key={row.weeks}>
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
                                <AccordionContent>
                                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
        <RelatedCalculators currentCategory="Pregnancy & Baby" currentHref="/gestational-age" />
      </div>
    </div>
  );
}
