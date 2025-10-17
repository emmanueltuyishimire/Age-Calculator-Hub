
import MatrixCalculator from '@/components/calculators/matrix-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Matrix Calculator: RREF, Inverse, Determinant, Eigenvalues',
    description: 'A free online Matrix Calculator to perform arithmetic (add, subtract, multiply), find the Reduced Row Echelon Form (RREF), and other key matrix operations for solving linear equations.',
    alternates: {
        canonical: '/matrix-calculator',
    },
};

export default function MatrixCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Matrix Calculator</h1>
          <p className="text-md md:text-lg text-muted-foreground">
            A powerful online tool to perform matrix arithmetic, RREF calculation, and more.
          </p>
        </div>

        <MatrixCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
           <Card>
            <CardHeader>
              <CardTitle>How to Use the Matrix Calculator</CardTitle>
              <CardDescription>A guide to performing various matrix operations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <ol className="list-decimal list-inside space-y-2">
                    <li><strong>Set Dimensions:</strong> Use the '+' and '-' buttons to set the number of rows and columns for each matrix.</li>
                    <li><strong>Enter Values:</strong> Input the numbers into the matrix cells. You can use the "Random" button to populate them with sample data.</li>
                    <li><strong>Perform Two-Matrix Operations:</strong> Use the main operations buttons (A+B, A-B, AB) for calculations involving both matrices.</li>
                    <li><strong>Perform Single-Matrix Operations:</strong> Use the buttons within each matrix card (e.g., RREF) for operations on a single matrix. The result will be displayed at the bottom.</li>
                     <li><strong>Solve Systems of Equations:</strong> To solve a system of linear equations, create an **augmented matrix** (e.g., 3x4 for a 3-variable system) and then calculate its **RREF**.</li>
                </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>What are Matrices?</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>A matrix is a rectangular array of numbers arranged in rows and columns. They are fundamental tools in linear algebra and are used to represent linear transformations and solve systems of equations.</p>
                 <h4 className="font-semibold text-foreground">Reduced Row Echelon Form (RREF)</h4>
                <p>RREF is a simplified form of a matrix obtained through elementary row operations. It is most commonly used to solve systems of linear equations by creating an augmented matrix. The final RREF matrix provides a clear solution set.</p>
            </CardContent>
          </Card>
        </section>
        <RelatedCalculators currentCategory="Math" currentHref="/matrix-calculator" />
      </main>
    </div>
  );
}
