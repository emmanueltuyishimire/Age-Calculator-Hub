
import VolumeCalculator from '@/components/calculators/volume-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Volume Calculator – Sphere, Cube, Cylinder, Cone & More',
    description: 'A free online Volume Calculator to find the volume of common shapes, including a sphere, cone, cube, cylinder, capsule, and more. Formulas and diagrams included for easy calculation.',
    alternates: {
        canonical: '/volume-calculator',
    },
};

const faqs = [
    {
        question: "What is volume?",
        answer: "Volume is the measure of the three-dimensional space occupied by a substance or object. It is usually expressed in cubic units, such as cubic meters (m³), cubic centimeters (cm³), or cubic feet (ft³)."
    },
    {
        question: "How do you calculate the volume of a shape?",
        answer: "The formula for calculating volume depends on the shape. For a simple shape like a cube, you multiply its length, width, and height. For more complex shapes like a sphere or cone, you use specific mathematical formulas involving Pi (π) and the shape's dimensions, such as its radius and height."
    },
    {
        question: "What is the difference between volume and capacity?",
        answer: "Volume is the amount of space an object occupies, while capacity is the amount of substance (like a liquid) a container can hold. They are related but distinct concepts. For example, a bottle has a volume (the space the plastic takes up) and a capacity (how much water it can hold)."
    },
    {
        question: "Why does the spherical cap calculator only require two values?",
        answer: "The three dimensions of a spherical cap (ball radius, cap base radius, and cap height) are geometrically related. If you know any two of these values, the third can be derived, allowing the volume to be calculated. Our calculator handles this logic for you."
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

export default function VolumeCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main role="main" className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Volume Calculator</h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-4xl mx-auto">
            A comprehensive suite of free online volume calculators for several common 3D shapes. Just enter the required dimensions, and our tool will instantly compute the volume for you, providing the formula for reference.
          </p>
        </div>

        <VolumeCalculator />

        <section className="mt-12 space-y-8 animate-fade-in">
             <Card>
                <CardHeader>
                    <CardTitle>Learn More About Math & Finance</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Solve for percentages with our <Link href="/percentage-calculator" className="text-primary hover:underline">Percentage Calculator</Link>.</li>
                        <li>Explore advanced functions with the <Link href="/scientific-calculator" className="text-primary hover:underline">Scientific Calculator</Link>.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>How to Use the Volume Calculators</CardTitle>
                    <CardDescription>
                        Each calculator is designed for a specific shape. Follow these simple steps:
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li><strong>Find the Right Shape:</strong> Scroll to the calculator for the shape you want to measure (e.g., Sphere, Cylinder, Cube).</li>
                        <li><strong>Enter Dimensions:</strong> Input the required dimensions, such as radius, height, or edge length, into the corresponding fields. The diagrams next to the inputs will show you which part of the shape each dimension represents.</li>
                        <li><strong>Select Units:</strong> Choose the unit of measurement you are using (e.g., meters, inches, feet).</li>
                        <li><strong>Click "Calculate":</strong> Press the button to instantly see the calculated volume, displayed in cubic units. The formula used for the calculation will also be shown.</li>
                    </ol>
                </CardContent>
            </Card>

             <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
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
      </main>
      <RelatedCalculators currentCategory="Math Calculators" currentHref="/volume-calculator" />
    </div>
  );
}
