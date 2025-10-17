
import MatrixCalculator from '@/components/calculators/matrix-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Matrix Calculator: RREF, Inverse, Determinant & More | Desmos Alternative',
    description: 'A free online Matrix Calculator to find the inverse, determinant, and RREF of a matrix. Use it as an augmented matrix calculator, for matrix arithmetic, or as a powerful alternative to Desmos matrix tools. Handles inverse of a matrix calculations and more.',
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
            A comprehensive tool for all your matrix operations. Use it as an inverse matrix calculator, determinant calculator, or to solve an augmented matrix with RREF.
          </p>
        </div>

        <MatrixCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
            
            <Card>
                <CardHeader>
                    <CardTitle>What Is a Matrix?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>A matrix, in a mathematical context, is a rectangular array of numbers, symbols, or expressions that are arranged in rows and columns. Matrices are often used in scientific fields such as physics, computer graphics, probability theory, statistics, calculus, numerical analysis, and more.</p>
                    <p>The dimensions of a matrix, A, are typically denoted as m × n. This means that A has m rows and n columns. When referring to a specific value in a matrix, called an element, a variable with two subscripts is often used to denote each element based on its position in the matrix. For example, given a<sub>i,j</sub>, where i = 1 and j = 3, a<sub>1,3</sub> is the value of the element in the first row and the third column of the given matrix.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Step 1: What is the determinant?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>The determinant is a single number that summarizes certain properties of a square matrix (like invertibility, scaling factor, etc.).</p>
                    <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <p className="font-semibold m-0">Only square matrices (same number of rows and columns) have a determinant.</p>
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Step 2: Determinant formulas by size</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-lg">1. For a 1x1 matrix: A = [a]</h4>
                        <p className="font-mono bg-muted p-3 rounded-md mt-2">det(A) = a</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg">2. For a 2x2 matrix:</h4>
                        <p className="font-mono bg-muted p-3 rounded-md mt-2">det(A) = ad - bc</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg">3. For a 3x3 matrix:</h4>
                        <p className="font-mono bg-muted p-3 rounded-md mt-2">det(A) = a(ei - fh) - b(di - fg) + c(dh - eg)</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg">4. For an n x n matrix (n &gt; 3):</h4>
                        <p>For larger matrices, you use a method called recursion or "cofactor expansion." The formula for expanding along the first row is:</p>
                        <p className="font-mono bg-muted p-3 rounded-md mt-2 text-center text-sm sm:text-base">det(A) = &Sigma;<sup>n</sup><sub>j=1</sub>(-1)<sup>1+j</sup> a<sub>1j</sub> &times; det(M<sub>1j</sub>)</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>a<sub>1j</sub></strong> = element in the first row, column j</li>
                            <li><strong>M<sub>1j</sub></strong> = minor matrix formed by deleting row 1 and column j</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>What is RREF?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <p>The Reduced Row Echelon Form (RREF) of a matrix is a specific form of a matrix obtained through a series of elementary row operations, a process known as Gauss-Jordan elimination. It is particularly useful for solving systems of linear equations. A matrix is in RREF if it satisfies all the following conditions:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>The first non-zero number in each row (called the leading entry) is 1. This is known as the pivot.</li>
                        <li>Each leading 1 is the only non-zero number in its column.</li>
                        <li>Each leading 1 is in a column to the right of the leading 1 in the row above it.</li>
                        <li>All rows consisting entirely of zeros are at the bottom of the matrix.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>How to Solve an Augmented Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>One of the most powerful uses for this tool is as an augmented matrix calculator. To solve a system of linear equations (e.g., 2x + y = 5, x - 3y = -1), you can input the augmented matrix and use the RREF operation. The calculator will perform Gauss-Jordan elimination to find the solution.</p>
                    <p className="mt-2">For example, the system:</p>
                    <p className="text-center font-mono p-2 bg-muted rounded-md">x + 2y = 8<br/>3x - y = 9</p>
                    <p>Can be represented as the augmented matrix:</p>
                    <p className="text-center font-mono p-2 bg-muted rounded-md">[1  2 | 8]<br/>[3 -1 | 9]</p>
                    <p>Entering this into the calculator and computing the RREF will yield the solution in the final column.</p>
                </CardContent>
            </Card>

            <Card className="border-destructive">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive"/>Note on Numerical Precision</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-destructive-foreground">This calculator uses fractional math to handle precision. Results are rounded to 4 decimal places for display purposes. For high-precision scientific work, always verify results with a dedicated computational tool.</p>
                </CardContent>
            </Card>
        </section>
        <RelatedCalculators currentCategory="Math" currentHref="/matrix-calculator" />
      </main>
    </div>
  );
}
