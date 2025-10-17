
import PercentErrorCalculator from '@/components/calculators/percent-error-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Percent Error Calculator – Find Percentage Error',
    description: 'Use our free Percent Error Calculator to measure the discrepancy between an observed (measured) value and a true (known) value. See the formula and examples.',
    alternates: {
        canonical: '/percent-error-calculator',
    },
};

const faqs = [
    {
        question: "What is the formula for percent error?",
        answer: "The formula is: Percent Error = (|Observed Value - True Value| / |True Value|) * 100%. It measures the relative difference between your measurement and the accepted value."
    },
    {
        question: "Can percent error be negative?",
        answer: "Typically, percent error is expressed as a positive value because the absolute difference is used. However, if you don't take the absolute value, a negative result simply means your observed value is less than the true value, while a positive result means it's greater."
    },
    {
        question: "What is a good percentage error?",
        answer: "A 'good' percentage error depends on the context. In high-precision scientific experiments, an error below 1% might be required. In other fields, 5-10% might be acceptable. A low percent error generally indicates your measurement is close to the true value."
    },
    {
        question: "What is the difference between percent error and percent difference?",
        answer: "Percent error compares an experimental value to a known 'true' value. Percent difference, on the other hand, compares two experimental values to each other when there is no known true value. See our <a href='/percentage-calculator' class='text-primary hover:underline'>Percentage Calculator</a> for this."
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

export default function PercentErrorCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Percent Error Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                   A simple tool to measure the discrepancy between an observed (measured) and a true (expected) value.
                </p>
            </div>

            <PercentErrorCalculator />

            <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Percent Error Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Observed Value:</strong> This is the value you measured or obtained from an experiment.</li>
                            <li><strong>Enter True Value:</strong> This is the known, accepted, or theoretical value.</li>
                            <li><strong>Click “Calculate”:</strong> Instantly get the percentage error. The result is typically shown as an absolute value, which is standard practice.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>What is Percentage Error?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Percentage error is a measurement of the discrepancy between an observed (measured) and a true (expected, accepted, known etc.) value. It is typically used to compare measured vs. known values as well as to assess whether the measurements taken are valid.</p>
                        <p>When measuring data, whether it be the density of some material, standard acceleration due to gravity of a falling object, or something else entirely, the measured value often varies from the true value. Error can arise due to many different reasons that are often related to human error, but can also be due to estimations and limitations of devices used in measurement. Calculating the percentage error provides a means to quantify the degree by which a measured value varies relative to the true value. A small percentage error means that the observed and true value are close while a large percentage error indicates that the observed and true value vary greatly. In most cases, a small percentage error is desirable, while a large percentage error may indicate an error, or that an experiment or measurement technique may need to be re-evaluated. If, for example, the measured value varies from the expected value by 90%, there is likely an error, or the method of measurement may not be accurate.</p>
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader>
                        <CardTitle>Computing Percentage Error</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>The computation of percentage error involves the use of the absolute error, which is simply the difference between the observed and the true value. The absolute error is then divided by the true value, resulting in the relative error, which is multiplied by 100 to obtain the percentage error. Refer to the equations below for clarification.</p>
                        <p><strong>Absolute error = |V<sub>observed</sub> – V<sub>true</sub>|</strong></p>
                        <p><strong>Relative error = |V<sub>observed</sub> – V<sub>true</sub>| / |V<sub>true</sub>|</strong></p>
                        <p className="font-bold">Percentage error = (|V<sub>observed</sub> – V<sub>true</sub>| / |V<sub>true</sub>|) × 100%</p>
                        <p>For example, if the observed value is 56.891 and the true value is 62.327, the percentage error is:</p>
                        <p className="p-2 bg-muted rounded-md font-mono text-center">|56.891 – 62.327| / 62.327 × 100% = 8.722%</p>
                        <p>The equations above are based on the assumption that true values are known. True values are often unknown, and under these situations, standard deviation is one way to represent the error.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Negative Percentage Error</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Based on the formula above, when the true value is positive, percentage error is always positive due to the absolute value. In most cases, only the error is important, and not the direction of the error. However, it is possible to have a negative percentage error. This occurs if we do not take the absolute value of the error, the observed value is smaller than the true value, and the true value is positive. For example, given an observed value of 7, a true value of 9, and allowing for a negative percentage, the percentage error is:</p>
                        <p className="p-2 bg-muted rounded-md font-mono text-center">(7 - 9) / 9 × 100% = -22.222%</p>
                        <p>A negative percentage error simply means that the observed value is smaller than the true value. If the observed value is larger than the true value, the percentage error will be positive. Thus, in the context of an experiment, a negative percentage error just means that the measured value is smaller than expected. It does not indicate that the observed value is somehow better than expected, since the best possible outcome for percentage error is that the observed and true values are equal, resulting in a percentage error of 0.</p>
                    </CardContent>
                </Card>
                
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
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
        <RelatedCalculators currentCategory="Math Calculators" currentHref="/percent-error-calculator" />
      </div>
    </div>
  );
}
