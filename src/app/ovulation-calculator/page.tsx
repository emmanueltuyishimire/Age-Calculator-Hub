
import OvulationCalculator from "@/components/calculators/ovulation-calculator";
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from "@/components/layout/related-calculators";
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
    { question: "How accurate is an ovulation calculator?", answer: "An ovulation calculator provides a very good estimate based on your average cycle data. It's a great starting point. However, since ovulation can vary month-to-month, you can improve accuracy by combining this tool with other methods, such as using ovulation predictor kits (OPKs) or tracking your basal body temperature (BBT)." },
    { question: "Can I use this for natural family planning (to avoid pregnancy)?", answer: "While this calculator identifies your fertile days, relying on it alone to avoid pregnancy (the rhythm method) has a high failure rate. It is much more effective for conceiving. For reliable contraception, it's essential to consult your healthcare provider about other methods." },
    { question: "What if my menstrual cycle is irregular?", answer: "This calculator works best for women with regular cycles. If your cycles vary by more than a few days each month, the predicted fertile window may be less accurate. Tracking your cycles for several months to find an average can help, but using OPKs might be a more reliable option for you." },
    { question: "What are the signs of ovulation I can look for?", answer: "Common signs include a change in cervical mucus (it becomes clear and slippery, like egg whites), a slight rise in basal body temperature after ovulation, and sometimes mild pelvic cramping (mittelschmerz). Some women also experience increased libido." },
    { question: "How long does the 'fertile window' last?", answer: "The fertile window is typically about 6 days long. It includes the five days leading up to ovulation and the day of ovulation itself. This is because sperm can survive in the female reproductive tract for up to five days, waiting for the egg to be released." },
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
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Ovulation Calculator – Find Your Most Fertile Days Instantly</h1>
            <p className="text-md md:text-lg text-muted-foreground">
                Whether you're trying to conceive or simply want to understand your cycle better, our Ovulation Calculator helps you pinpoint your most fertile days.
                Enter the first day of your last menstrual period (LMP) and your average cycle length to see your estimated ovulation date, your key fertile window, and your next expected period.
            </p>
            </div>

            <OvulationCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>How to Use the Ovulation Calculator</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter the First Day of Your Last Period:</strong> Use the date fields to input the start date of your last menstrual period.</li>
                            <li><strong>Enter Your Average Cycle Length:</strong> Provide the average number of days from the start of one period to the start of the next. The average is 28 days, but it can vary.</li>
                            <li><strong>Click "Calculate":</strong> See your personalized fertility calendar instantly.</li>
                            <li><strong>Plan Accordingly:</strong> The results will show your estimated ovulation date and your most fertile days, helping you time intercourse to maximize your chances of conception.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Understanding Your Fertile Window</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                        Your "fertile window" is the time in your menstrual cycle when you are most likely to conceive. This period is determined by the lifespan of both the sperm and the egg. Sperm can survive in the female reproductive tract for up to five days under ideal conditions. An egg, however, is only viable for about 12-24 hours after it's released during ovulation.
                        </p>
                         <p className="text-muted-foreground mt-2">
                        Therefore, your most fertile days are the five days leading up to ovulation and the day of ovulation itself. Having intercourse during this six-day window ensures that sperm are present and ready to fertilize the egg as soon as it is released.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>How the Ovulation Calculator Works</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                        Ovulation—the release of an egg from the ovary—typically occurs about 14 days before your next period begins. This final phase of the cycle, the luteal phase, is usually consistent. Our calculator works by taking your average cycle length, subtracting 14 days to estimate your ovulation date, and then mapping out your fertile window around that date. For example, in a 28-day cycle, ovulation is estimated on day 14. In a 32-day cycle, it's estimated on day 18.
                        </p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader><CardTitle>Tips to Increase Your Chances of Conception</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>Have intercourse every 1–2 days during your fertile window. This maximizes the chances of healthy sperm being available when the egg is released.</li>
                            <li>Maintain a healthy lifestyle. A balanced diet rich in folate, antioxidants, and other essential nutrients can support reproductive health.</li>
                            <li>Reduce or eliminate smoking, excessive alcohol, and high levels of caffeine, as they can negatively impact fertility in both partners.</li>
                            <li>Manage stress and prioritize getting adequate, quality sleep.</li>
                            <li>For more precision, consider using ovulation predictor kits (OPKs), which detect the surge in luteinizing hormone (LH) that triggers ovulation.</li>
                            <li>Once you think you're pregnant, use our <Link href="/due-date-calculator" className="text-primary hover:underline">Due Date Calculator</Link> to estimate your baby's arrival!</li>
                        </ul>
                    </CardContent>
                </Card>

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
        <RelatedCalculators currentCategory="Pregnancy & Baby" currentHref="/ovulation-calculator" />
      </div>
    </div>
  );
}
