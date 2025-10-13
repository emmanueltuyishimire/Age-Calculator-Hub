
import HealthAssessmentCalculator from "@/components/calculators/health-assessment-calculator";
import { type Metadata } from 'next';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Health Assessment Tools - Monitor Your Wellness',
    description: 'Explore our collection of free health assessment tools. Check your biological age, blood pressure risks, and other key health markers to stay informed about your wellness.',
    openGraph: {
        title: 'Health Assessment Tools - Monitor Your Wellness',
        description: 'Explore our collection of free health assessment tools. Check your biological age, blood pressure risks, and other key health markers to stay informed about your wellness.',
        type: 'website',
        url: '/health-assessments',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Health Assessment Tools - Monitor Your Wellness',
        description: 'Explore our collection of free health assessment tools. Check your biological age, blood pressure risks, and other key health markers to stay informed about your wellness.',
    },
    alternates: {
        canonical: '/health-assessments',
    },
};

const faqs = [
    {
        question: "Why should I use health assessment calculators?",
        answer: "Health assessment calculators are useful tools for gaining a preliminary understanding of your health status. They can highlight potential risk factors and motivate you to adopt a healthier lifestyle. However, they are not a substitute for professional medical advice."
    },
    {
        question: "How accurate are these health calculators?",
        answer: "Our calculators provide estimates based on general population data and common health guidelines. For an accurate and personal assessment, you should always consult with a qualified healthcare provider who can evaluate your individual health profile."
    },
    {
        question: "Are these tools free to use?",
        answer: "Yes, all our health assessment tools are completely free to use. We believe everyone should have access to information that can help them on their wellness journey."
    },
    {
        question: "Do you store my personal health data?",
        answer: "No, we do not store any of the personal health data you enter into our calculators. All calculations are performed in your browser, and your information is not saved on our servers."
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

export default function HealthAssessmentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Health Assessment Tools</h1>
            <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore our collection of free health assessment tools designed to help you stay informed about your wellness. From understanding your biological age to checking key health markers, these calculators provide valuable insights to support your health journey.
            </p>
        </div>
        <HealthAssessmentCalculator />

        <section className="mt-12 space-y-8 max-w-4xl mx-auto">
             <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Monitor Your Health?</h2>
                 <p className="text-muted-foreground">
                   Regularly monitoring your health can empower you to make informed decisions and take proactive steps toward a healthier life. These tools can help you track changes over time, understand the impact of your lifestyle choices, and identify areas where you can make improvements. Remember, these calculators are for informational purposes and should not replace professional medical advice.
                </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">FAQs About Health Assessments</h2>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Related Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <Link href="/biological-age" className="text-primary hover:underline">Biological Age Calculator</Link>
                  <Link href="/age-calculator" className="text-primary hover:underline">Age Calculator</Link>
                  <Link href="/retirement" className="text-primary hover:underline">Retirement Age Calculator</Link>
              </div>
          </div>
        </section>
    </div>
  );
}
