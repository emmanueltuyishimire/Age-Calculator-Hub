
import RetirementAgeCalculator from "@/components/calculators/retirement-age-calculator";
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Retirement Age Calculator – Find Your Full Retirement Age by Birth Year',
    description: 'Use our free Retirement Age Calculator to determine your full retirement age based on your birth year. Plan your Social Security, pension, and retirement timing easily.',
    openGraph: {
        title: 'Retirement Age Calculator – Find Your Full Retirement Age by Birth Year',
        description: 'Use our free Retirement Age Calculator to determine your full retirement age based on your birth year. Plan your Social Security, pension, and retirement timing easily.',
        type: 'website',
        url: '/retirement',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Retirement Age Calculator – Find Your Full Retirement Age by Birth Year',
        description: 'Use our free Retirement Age Calculator to determine your full retirement age based on your birth year. Plan your Social Security, pension, and retirement timing easily.',
    },
    alternates: {
        canonical: '/retirement',
    },
};

const faqs = [
    {
        question: "How is full retirement age calculated?",
        answer: "Full retirement age depends on your birth year. For example, people born in 1960 or later reach full retirement age at 67. The age gradually increases for those born between 1943 and 1959."
    },
    {
        question: "What is the earliest I can retire?",
        answer: "You can start receiving Social Security retirement benefits as early as age 62. However, your benefits will be permanently reduced if you start them before your full retirement age."
    },
    {
        question: "What happens if I delay my retirement?",
        answer: "If you delay taking your benefits until after your full retirement age, your monthly benefit amount will increase. For each year you delay, up to age 70, you get a higher payout."
    },
     {
        question: "Is this calculator accurate for all countries?",
        answer: "This calculator is based on the U.S. Social Security Administration's rules. Retirement ages and benefits vary significantly by country, so it should not be used for other systems."
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

export default function RetirementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main role="main">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Retirement Age Calculator – Find Your Full Retirement Age by Birth Year</h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Use our free Retirement Age Calculator to determine when you can retire with full benefits. Enter your birth year to see your retirement age, early retirement options, and delayed benefit increases. Perfect for Social Security, pension, and retirement planning.
          </p>
        </div>

        <RetirementAgeCalculator />
        
        <section className="mt-12 space-y-8 max-w-4xl mx-auto">
            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Use the Retirement Age Calculator</h2>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li><strong>Enter Your Date of Birth:</strong> Provide your exact birth date to get the most accurate retirement age calculation.</li>
                    <li><strong>Calculate Your Full Retirement Age:</strong> Click the button to see the age at which you are eligible for full Social Security benefits.</li>
                    <li><strong>Review Your Options:</strong> The results will show your full retirement age, the date you become eligible, and how your benefits may be affected by retiring early or delaying.</li>
                </ol>
            </div>

            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Retirement Planning Tips</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>Start Saving Early:</strong> The sooner you begin, the more time your investments have to grow, thanks to the power of compound interest.</li>
                    <li><strong>Consider Delaying Benefits:</strong> If you can wait, delaying your Social Security benefits past your full retirement age (up to age 70) will increase your monthly payment.</li>
                    <li><strong>Diversify Your Investments:</strong> Spreading your investments across different asset classes can help manage risk and improve returns.</li>
                    <li><strong>Pay Off High-Interest Debt:</strong> Entering retirement debt-free, especially from high-interest sources like credit cards, frees up your income for living expenses.</li>
                    <li><strong>Create a Retirement Budget:</strong> Understand your expected expenses in retirement to ensure your savings will be sufficient.</li>
                </ul>
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

    </div>
  );
}
