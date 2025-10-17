
import FractionCalculator from '@/components/calculators/fraction-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Fraction Calculator – Add, Subtract, Multiply & Divide Fractions',
    description: 'A free online fraction calculator for addition, subtraction, multiplication, and division. Also includes tools to simplify fractions, convert between fractions and decimals, and handle mixed numbers.',
    alternates: {
        canonical: '/fraction-calculator',
    },
};

export default function FractionCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Fraction Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Below are multiple fraction calculators capable of addition, subtraction, multiplication, division, simplification, and conversion between fractions and decimals. Fields above the solid black line represent the numerator, while fields below represent the denominator.
                </p>
            </div>

            <FractionCalculator />

            <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
                <Card>
                    <CardHeader>
                        <CardTitle>Understanding Fractions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>In mathematics, a fraction is a number that represents a part of a whole. It consists of a numerator and a denominator. The numerator represents the number of equal parts of a whole, while the denominator is the total number of parts that make up said whole. For example, in the fraction of 3/8, the numerator is 3, and the denominator is 8.</p>
                        <p>A more illustrative example could involve a pie with 8 slices. 1 of those 8 slices would constitute the numerator of a fraction, while the total of 8 slices that comprises the whole pie would be the denominator. If a person were to eat 3 slices, the remaining fraction of the pie would therefore be 5/8. Note that the denominator of a fraction cannot be 0, as it would make the fraction undefined. Fractions can undergo many different operations, some of which are mentioned below.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Addition</CardTitle></CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Unlike adding and subtracting integers such as 2 and 8, fractions require a common denominator to undergo these operations. One method for finding a common denominator involves multiplying the numerators and denominators of all of the fractions involved by the product of the denominators of each fraction. Multiplying all of the denominators ensures that the new denominator is certain to be a multiple of each individual denominator. The numerators also need to be multiplied by the appropriate factors to preserve the value of the fraction as a whole. This is arguably the simplest way to ensure that the fractions have a common denominator. However, in most cases, the solutions to these equations will not appear in simplified form (the provided calculator computes the simplification automatically).</p>
                        <div className="p-4 bg-muted rounded-md font-mono text-center">a/b + c/d = (ad + bc) / bd</div>
                        <p>An alternative method for finding a common denominator is to determine the least common multiple (LCM) for the denominators, then add or subtract the numerators as one would an integer. Using the least common multiple can be more efficient and is more likely to result in a fraction in simplified form.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Subtraction</CardTitle></CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Fraction subtraction is essentially the same as fraction addition. A common denominator is required for the operation to occur. Refer to the addition section as well as the equations below for clarification.</p>
                        <div className="p-4 bg-muted rounded-md font-mono text-center">a/b - c/d = (ad - bc) / bd</div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader><CardTitle>Multiplication</CardTitle></CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Multiplying fractions is fairly straightforward. Unlike adding and subtracting, it is not necessary to compute a common denominator in order to multiply fractions. Simply, the numerators and denominators of each fraction are multiplied, and the result forms a new numerator and denominator. If possible, the solution should be simplified.</p>
                         <div className="p-4 bg-muted rounded-md font-mono text-center">a/b × c/d = ac/bd</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Division</CardTitle></CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                       <p>The process for dividing fractions is similar to that for multiplying fractions. In order to divide fractions, the fraction in the numerator is multiplied by the reciprocal of the fraction in the denominator. The reciprocal of a number a is simply 1/a. When a is a fraction, this essentially involves exchanging the position of the numerator and the denominator.</p>
                       <div className="p-4 bg-muted rounded-md font-mono text-center">(a/b) / (c/d) = a/b × d/c = ad/bc</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Simplification & Conversion</CardTitle></CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>It is often easier to work with simplified fractions. As such, fraction solutions are commonly expressed in their lowest forms by dividing both numerator and denominator by their greatest common factor.</p>
                        <p>Converting from decimals to fractions is straightforward. It requires determining what power of 10 the decimal extends to, using that as the denominator, and putting the decimal digits in the numerator. For example, 0.1234 becomes 1234/10000, which simplifies to 617/5000.</p>
                        <p>Converting fractions to decimals requires the operation of long division.</p>
                    </CardContent>
                </Card>
            </section>
        </main>
        <RelatedCalculators currentCategory="Math Calculators" currentHref="/fraction-calculator" />
      </div>
    </div>
  );
}
