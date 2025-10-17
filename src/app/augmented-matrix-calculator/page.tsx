
import AugmentedMatrixCalculator from '@/components/calculators/augmented-matrix-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Augmented Matrix Calculator – RREF Solver',
    description: 'A free online Augmented Matrix Calculator to solve systems of linear equations by finding the Reduced Row Echelon Form (RREF) of your matrix. Step-by-step logic explained.',
    alternates: {
        canonical: '/augmented-matrix-calculator',
    },
};

export default function AugmentedMatrixCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Augmented Matrix Calculator (RREF)</h1>
          <p className="text-md md:text-lg text-muted-foreground">
            Solve systems of linear equations by computing the Reduced Row Echelon Form (RREF) of an augmented matrix.
          </p>
        </div>

        <AugmentedMatrixCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
           <Card>
            <CardHeader>
              <CardTitle>How to Use the Augmented Matrix Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <ol className="list-decimal list-inside space-y-2">
                    <li><strong>Set Dimensions:</strong> Adjust the rows and columns to match your system of equations. For a system with 'n' variables, you will typically need 'n' rows and 'n+1' columns.</li>
                    <li><strong>Enter Your Augmented Matrix:</strong> Input the coefficients of your variables in the main part of the matrix and the constants in the final column.</li>
                    <li><strong>Compute RREF:</strong> Click the "Calculate RREF" button to perform Gauss-Jordan elimination.</li>
                     <li><strong>Read the Solution:</strong> The resulting RREF matrix will show the solution. If the left side of the matrix is the identity matrix, the rightmost column will contain the values for your variables.</li>
                </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>What is an Augmented Matrix?</CardTitle>
              <CardDescription>And how RREF helps solve it.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>An augmented matrix is a compact way to represent a system of linear equations. It combines the coefficient matrix of the variables with the constant terms from the right-hand side of the equations.</p>
                <p>For example, the system:</p>
                <div className="font-mono p-2 bg-muted rounded-md text-sm">
                    <p>x + 2y = 8</p>
                    <p>3x - y = 9</p>
                </div>
                 <p>becomes the augmented matrix:</p>
                 <div className="font-mono p-2 bg-muted rounded-md text-sm">
                    <p>[ 1  2 | 8 ]</p>
                    <p>[ 3 -1 | 9 ]</p>
                </div>
                <p>By applying row operations to transform this matrix into **Reduced Row Echelon Form (RREF)**, we simplify the system into its solution. The goal is to get an identity matrix on the left, which leaves the solution in the augmented column on the right.</p>
            </CardContent>
          </Card>
        </section>
        <RelatedCalculators currentCategory="Math" currentHref="/augmented-matrix-calculator" />
      </main>
    </div>
  );
}
