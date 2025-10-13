
import SocialSecurityRetirementAgeCalculator from "@/components/calculators/social-security-retirement-age-calculator";
import { type Metadata } from 'next';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Social Security Retirement Age Calculator – Find Full Retirement Age by Birth Year',
    description: 'Use our free Social Security Retirement Age Calculator to determine your full retirement age (FRA) and benefit eligibility. Plan when to start or delay your retirement benefits effectively.',
    alternates: {
        canonical: '/social-security-retirement-age-calculator',
    },
};

const faqs = [
    {
        question: "What is the full retirement age for Social Security?",
        answer: "It depends on your birth year. For those born in 1960 or later, the full retirement age is 67. For those born between 1943 and 1954, it is 66, with incremental increases for birth years between 1955 and 1959."
    },
    {
        question: "Can I claim benefits before my full retirement age?",
        answer: "Yes. You can start receiving benefits as early as age 62. However, your monthly benefit will be permanently reduced if you start them before your full retirement age, by up to 30%."
    },
    {
        question: "What happens if I delay claiming benefits?",
        answer: "Your benefits will increase for each month you delay after your full retirement age, up to age 70. This can result in a significantly higher monthly payout."
    },
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

export default function SocialSecurityRetirementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Social Security Retirement Age Calculator – Find Your Full Retirement Age (FRA)</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Use our free Social Security Retirement Age Calculator to find out when you can claim full retirement benefits based on your birth year. Instantly see your Full Retirement Age (FRA) and explore options for early or delayed retirement benefits.
        </p>
      </div>

      <SocialSecurityRetirementAgeCalculator />
      
      <section className="mt-12 space-y-8 max-w-4xl mx-auto">
          <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How Social Security Retirement Age is Determined</h2>
              <p className="text-muted-foreground">
                The Full Retirement Age (FRA) depends on your birth year. For example, if you were born in 1960 or later, your FRA is 67. Starting benefits early (at age 62) reduces your payments, while delaying beyond your FRA increases them. For a detailed breakdown, you can view the <a href="https://www.ssa.gov/benefits/retirement/planner/ageincrease.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">official SSA Retirement Age Chart</a>.
              </p>
          </div>

          <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Smart Retirement Planning Tips</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Estimate Your Benefits:</strong> Use the official Social Security Administration (SSA) calculator to get a personalized estimate of your future benefits.</li>
                  <li><strong>Consider Delaying:</strong> If you can afford to, delaying your benefits until age 70 will maximize your monthly payout.</li>
                  <li><strong>Pay Off Debts:</strong> Entering retirement debt-free gives you more financial freedom. Focus on high-interest debts first.</li>
                  <li><strong>Diversify Income Sources:</strong> Don't rely solely on Social Security. Build a portfolio with savings, 401(k)s, or IRAs.</li>
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

          <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Related Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link href="/retirement" className="text-primary hover:underline">Retirement Age Calculator</Link>
                  <Link href="/age-calculator" className="text-primary hover:underline">Age Calculator</Link>
                  <Link href="/biological-age" className="text-primary hover:underline">Biological Age Calculator</Link>
              </div>
          </div>
      </section>

    </div>
  );
}
