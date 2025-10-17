
import MatrixCalculator from '@/components/calculators/matrix-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Matrix Calculator – Add, Subtract & Multiply Matrices',
    description: 'A free online Matrix Calculator to perform basic arithmetic operations like addition, subtraction, and multiplication. A simple and easy-to-use tool for matrix math.',
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
            A powerful online tool to perform various matrix operations.
          </p>
        </div>

        <MatrixCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
           <Card>
            <CardHeader><CardTitle>How to Use the Matrix Calculator</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <ol className="list-decimal list-inside space-y-2">
                    <li><strong>Set Dimensions:</strong> Use the '+' and '-' buttons to set the number of rows and columns for Matrix A and Matrix B.</li>
                    <li><strong>Enter Values:</strong> Input the numbers into the cells of each matrix. You can use the "Random" button to populate them with sample data.</li>
                    <li><strong>Perform Operations:</strong> Use the buttons in the "Operations" section for two-matrix calculations (like A+B, A-B, or AB).</li>
                     <li><strong>View Results:</strong> The resulting matrix will be displayed at the bottom of the page.</li>
                     <li><strong>For advanced operations</strong> like RREF, Determinant, or Inverse, please visit our dedicated calculator pages.</li>
                </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>What are Matrices?</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>A matrix is a rectangular array of numbers arranged in rows and columns. They are fundamental tools in linear algebra and are used to represent linear transformations and solve systems of equations.</p>
            </CardContent>
          </Card>
          
           <Card>
            <CardHeader><CardTitle>Advanced Matrix Calculators</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>This calculator is focused on basic arithmetic. For more advanced functions, please see our specialized tools:</p>
                 <ul className="list-disc list-inside">
                  <li><Link href="/rref-calculator" className="text-primary hover:underline">RREF Calculator</Link> - For solving systems of linear equations with an augmented matrix.</li>
                  <li>More calculators for Inverse, Determinant, and Eigenvalues are coming soon!</li>
                </ul>
            </CardContent>
          </Card>
        </section>
        <RelatedCalculators currentCategory="Math" currentHref="/matrix-calculator" />
      </main>
    </div>
  );
}
