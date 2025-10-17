
import HalfLifeCalculator from '@/components/calculators/half-life-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Half-Life Calculator – Calculate Exponential Decay',
    description: 'Use our free Half-Life Calculator to solve for any variable in the half-life formula. Also includes a tool to convert between half-life, mean lifetime, and decay constant.',
    alternates: {
        canonical: '/half-life-calculator',
    },
};

const faqs = [
    {
        question: "What is half-life?",
        answer: "Half-life is the amount of time it takes for a given quantity of a substance to decrease to half of its initial value. It's most commonly used in the context of radioactive decay."
    },
    {
        question: "How do I use the main half-life calculator?",
        answer: "Select the tab for the value you want to find (e.g., 'Remaining Quantity'). Enter the other three known values into the input fields and click 'Calculate' to get your result."
    },
    {
        question: "What is the difference between half-life, mean lifetime, and decay constant?",
        answer: "They are all related measures of decay. Half-life is the time to decay by half. Mean lifetime (τ) is the average lifetime of a particle before decay. The decay constant (λ) is the probability of decay per unit time. They are all inter-convertible (τ = 1/λ, t1/2 = τ * ln(2))."
    },
    {
        question: "Can I use this calculator for carbon dating?",
        answer: "Yes. For example, if a fossil has 25% of its original Carbon-14, you would enter 100 for 'Initial Quantity', 25 for 'Quantity Remains', and 5730 years for 'Half-life'. The calculator can then solve for the time 't' to find the fossil's age."
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

export default function HalfLifeCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main role="main" className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Half-Life Calculator</h1>
          <p className="text-md md:text-lg text-muted-foreground">
            The following tools can generate any one of the values from the other three in the half-life formula for a substance undergoing decay to decrease by half.
          </p>
        </div>

        <HalfLifeCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
            
            <Card>
                <CardHeader>
                    <CardTitle>Definition and Formula</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>Half-life is defined as the amount of time it takes a given quantity to decrease to half of its initial value. The term is most commonly used in relation to atoms undergoing radioactive decay, but can be used to describe other types of decay, whether exponential or not. One of the most well-known applications of half-life is carbon-14 dating. The half-life of carbon-14 is approximately 5,730 years, and it can be reliably used to measure dates up to around 50,000 years ago. The process of carbon-14 dating was developed by William Libby, and is based on the fact that carbon-14 is constantly being made in the atmosphere. It is incorporated into plants through photosynthesis, and then into animals when they consume plants. The carbon-14 undergoes radioactive decay once the plant or animal dies, and measuring the amount of carbon-14 in a sample conveys information about when the plant or animal died.</p>
                    <p>Below are shown three equivalent formulas describing exponential decay:</p>
                    <div className="font-mono bg-muted p-4 rounded-md text-center">
                        <p>N<sub>t</sub> = N<sub>0</sub>(1/2)<sup>t/t₁/₂</sup></p>
                        <p>N<sub>t</sub> = N<sub>0</sub>e<sup>-t/τ</sup></p>
                        <p>N<sub>t</sub> = N<sub>0</sub>e<sup>-λt</sup></p>
                    </div>
                     <ul className="list-none p-0">
                        <li><strong>N<sub>0</sub></strong> is the initial quantity</li>
                        <li><strong>N<sub>t</sub></strong> is the remaining quantity after time, t</li>
                        <li><strong>t<sub>1/2</sub></strong> is the half-life</li>
                        <li><strong>τ</strong> is the mean lifetime</li>
                        <li><strong>λ</strong> is the decay constant</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Derivation of the Relationship Between Half-Life Constants</CardTitle>
                </CardHeader>
                 <CardContent className="space-y-4 text-muted-foreground">
                    <p>Using the above equations, it is also possible for a relationship to be derived between t<sub>1/2</sub>, τ, and λ. This relationship enables the determination of all values, as long as at least one is known.</p>
                     <div className="font-mono bg-muted p-4 rounded-md text-center">
                        <p>t<sub>1/2</sub> = τ × ln(2)</p>
                        <p>t<sub>1/2</sub> = ln(2) / λ</p>
                    </div>
                </CardContent>
            </Card>

            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                         <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>
                                <p>{faq.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
        <RelatedCalculators currentCategory="Math Calculators" currentHref="/half-life-calculator" />
      </main>
    </div>
  );
}
