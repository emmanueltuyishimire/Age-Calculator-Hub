
import MatrixCalculator from '@/components/calculators/matrix-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
            <h2>What Is a Matrix?</h2>
            <p>A matrix, in a mathematical context, is a rectangular array of numbers, symbols, or expressions that are arranged in rows and columns. Matrices are often used in scientific fields such as physics, computer graphics, probability theory, statistics, calculus, numerical analysis, and more.</p>
            <p>The dimensions of a matrix, A, are typically denoted as m × n. This means that A has m rows and n columns. When referring to a specific value in a matrix, called an element, a variable with two subscripts is often used to denote each element based on its position in the matrix. For example, given a<sub>i,j</sub>, where i = 1 and j = 3, a<sub>1,3</sub> is the value of the element in the first row and the third column of the given matrix.</p>
            
            <h2>Matrix Operations Explained</h2>
            <p>Our matrix calculator performs operations similar to what you might find in tools like a Desmos matrix calculator, but with detailed explanations.</p>
            
            <h3>Matrix Addition & Subtraction</h3>
            <p>Matrix addition and subtraction can only be performed on matrices of the same size. This means that you can only add or subtract matrices if both matrices are m × n. If the matrices are the same size, the operation is performed by adding or subtracting the corresponding elements.</p>
            
            <h3>Matrix Multiplication (Scalar and Matrix-Matrix)</h3>
            <p>Multiplying a matrix by a scalar value involves multiplying each element in the matrix by that scalar. For matrix-matrix multiplication, the number of columns in the first matrix must match the number of rows in the second. The process involves calculating the dot product of rows and columns.</p>
            
            <h3>Power of a Matrix</h3>
            <p>You can raise any square matrix to a power. A<sup>2</sup> means A × A. Our calculator handles this computation for you.</p>

            <h3>Transpose of a Matrix</h3>
            <p>The transpose of a matrix (A<sup>T</sup>) is found by flipping the matrix over its main diagonal, effectively switching the row and column indices.</p>

            <h2 id="determinant">Determinant of a Matrix</h2>
            <p>The determinant is a single number that can be computed from the elements of a square matrix. It is used in linear algebra, calculus, and other mathematical contexts. For example, the determinant can be used to compute the inverse of a matrix or to solve a system of linear equations.</p>
            <p>Note: Only square matrices (same number of rows and columns) have a determinant.</p>
            
            <Card>
                <CardHeader><CardTitle>Determinant Formulas by Size</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold">For a 1×1 matrix: A = [a]</h4>
                        <p className="font-mono bg-muted p-2 rounded-md mt-2">det(A) = a</p>
                    </div>
                     <div>
                        <h4 className="font-semibold">For a 2×2 matrix:</h4>
                        <p className="font-mono bg-muted p-2 rounded-md mt-2">det(A) = ad - bc</p>
                    </div>
                     <div>
                        <h4 className="font-semibold">For a 3×3 matrix:</h4>
                        <p className="font-mono bg-muted p-2 rounded-md mt-2">det(A) = a(ei - fh) - b(di - fg) + c(dh - eg)</p>
                    </div>
                     <div>
                        <h4 className="font-semibold">For an n×n matrix (n > 3):</h4>
                        <p>For larger matrices, the determinant is typically found using cofactor expansion. This involves recursively breaking the matrix down into smaller 2x2 matrices. The formula for expansion along the first row is:</p>
                        <p className="font-mono bg-muted p-2 rounded-md mt-2">det(A) = ∑<sup>n</sup><sub>j=1</sub>(-1)<sup>1+j</sup> a<sub>1j</sub> × det(M<sub>1j</sub>)</p>
                        <p>Where a<sub>1j</sub> is the element in the first row and j<sup>th</sup> column, and M<sub>1j</sub> is the minor matrix formed by deleting the first row and j<sup>th</sup> column.</p>
                    </div>
                </CardContent>
            </Card>

            <h3>Inverse of a Matrix</h3>
            <p>The inverse of a matrix A is another matrix A<sup>-1</sup> such that A × A<sup>-1</sup> results in the identity matrix. Only non-singular matrices (those with a non-zero determinant) have an inverse. This tool functions as an efficient inverse of a matrix calculator for your needs.</p>
            
            <h2 id="rref">Augmented Matrix and RREF</h2>
            <p>One of the most powerful uses for this tool is as an augmented matrix calculator. To solve a system of linear equations (e.g., 2x + y = 5, x - 3y = -1), you can input the augmented matrix and use the RREF (Reduced Row Echelon Form) operation. The calculator will perform Gauss-Jordan elimination to find the solution.</p>
            <p>For example, the system:</p>
            <p className="text-center font-mono p-2 bg-muted rounded-md">x + 2y = 8<br/>3x - y = 9</p>
            <p>Can be represented as the augmented matrix:</p>
            <p className="text-center font-mono p-2 bg-muted rounded-md">[1 2 | 8]<br/>[3 -1 | 9]</p>
            <p>Entering this into the calculator and computing the RREF will yield the solution in the final column.</p>
            
        </section>
        <RelatedCalculators currentCategory="Math" currentHref="/matrix-calculator" />
      </main>
    </div>
  );

    