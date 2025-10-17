
import RoundingCalculator from '@/components/calculators/rounding-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: 'Rounding Calculator – Round Numbers to Any Precision',
    description: 'A free online Rounding Calculator with multiple methods (half up, half down, ceiling, floor, etc.). Round to the nearest integer, decimal place, or fraction.',
    alternates: {
        canonical: '/rounding-calculator',
    },
};

const roundingMethods = [
    {
        title: "Round half up",
        description: "This common method rounds values that are halfway between the chosen rounding precision up. For example, 5.5 rounds to 6, but 5.49 rounds to 5. For negative numbers, it rounds towards the more positive value (-5.5 becomes -5)."
    },
    {
        title: "Round half down",
        description: "This method rounds halfway values down. For example, 5.5 rounds to 5. For negative numbers, it rounds towards the more negative value (-5.5 becomes -6)."
    },
    {
        title: "Round up (ceiling)",
        description: "This rounds any non-integer value up to the next highest integer. For example, 5.01 rounds to 6. For negative numbers, it rounds towards the more positive integer (-5.99 becomes -5)."
    },
    {
        title: "Round down (floor)",
        description: "This rounds any non-integer value down to the next lowest integer. For example, 5.99 rounds to 5. For negative numbers, it rounds towards the more negative integer (-5.01 becomes -6)."
    },
    {
        title: "Round half to even",
        description: "A tie-breaking rule where half values are rounded to the nearest even integer. It's unbiased. For example, 5.5 rounds to 6, and 6.5 also rounds to 6."
    },
    {
        title: "Round half to odd",
        description: "A tie-breaking rule where half values are rounded to the nearest odd integer. For example, 5.5 rounds to 5, and 6.5 rounds to 7."
    },
    {
        title: "Round half away from zero",
        description: "This method rounds half values away from zero. It has a bias away from zero. For example, 5.5 rounds to 6, and -5.5 rounds to -6."
    },
    {
        title: "Round half towards zero",
        description: "This method rounds half values towards zero. For example, 5.5 rounds to 5, and -5.5 rounds to -5."
    }
];

export default function RoundingCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Rounding Calculator</h1>
          <p className="text-md md:text-lg text-muted-foreground">
            A versatile tool for rounding numbers to any precision using various rounding methods.
          </p>
        </div>

        <RoundingCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
            
            <Card>
                <CardHeader>
                    <CardTitle>What is Rounding?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>Rounding a number involves replacing the number with an approximation that is shorter, simpler, or more explicit. For example, if rounding the number 2.7 to the nearest integer, 2.7 would be rounded to 3.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Rounding Methods Explained</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {roundingMethods.map((method, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{method.title}</AccordionTrigger>
                                <AccordionContent>
                                    <p>{method.description}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Rounding to Fractions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>Rounding to fractions involves rounding a given value to the nearest multiple of the chosen fraction. For example, rounding to the nearest 1/8:</p>
                    <ul className="list-disc list-inside">
                        <li>15.65 ⇒ 15 5/8 (15.625)</li>
                        <li>15.70 ⇒ 15 6/8 (15.75)</li>
                    </ul>
                    <p>This can be particularly useful in the context of engineering, where fractions are widely used to describe the size of components such as pipes and bolts.</p>
                </CardContent>
            </Card>

        </section>
        <RelatedCalculators currentCategory="Math" currentHref="/rounding-calculator" />
      </main>
    </div>
  );
}
