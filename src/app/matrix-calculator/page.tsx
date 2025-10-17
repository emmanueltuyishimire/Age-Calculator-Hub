
import MatrixCalculator from '@/components/calculators/matrix-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';

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
            A comprehensive tool for all your matrix operations. Use it as an inverse matrix calculator, determinant calculator, or RREF calculator for augmented matrices.
          </p>
        </div>

        <MatrixCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
            <h2>What Is a Matrix Calculator?</h2>
            <p>A matrix, in a mathematical context, is a rectangular array of numbers, symbols, or expressions that are arranged in rows and columns. Matrices are often used in scientific fields such as physics, computer graphics, probability theory, statistics, calculus, numerical analysis, and more. This calculator is a versatile tool that can perform a wide range of operations, serving as everything from an inverse of a matrix calculator to an RREF matrix calculator.</p>

            <h2>Augmented Matrix Calculator and RREF</h2>
            <p>One of the most powerful uses for this tool is as an augmented matrix calculator. To solve a system of linear equations, you can input the augmented matrix and use the RREF (Reduced Row Echelon Form) operation. The calculator will perform Gauss-Jordan elimination to find the solution. For example, the system:</p>
            <p className="text-center font-mono p-2 bg-muted rounded-md">x + 2y = 8<br/>3x - y = 9</p>
            <p>Can be represented as the augmented matrix:</p>
            <p className="text-center font-mono p-2 bg-muted rounded-md">[1 2 | 8]<br/>[3 -1 | 9]</p>
            <p>Entering this into the calculator and computing the RREF will yield the solution.</p>

            <h2>Matrix Operations Explained</h2>
            <p>Our matrix calculator performs operations similar to what you might find in tools like a Desmos matrix calculator or a Destiny matrix calculator, but with detailed explanations.</p>
            
            <h3>Matrix Addition & Subtraction</h3>
            <p>Matrix addition and subtraction can only be performed on matrices of the same size. The operation involves adding or subtracting the corresponding elements.</p>
            
            <h3>Matrix Multiplication (Scalar and Matrix-Matrix)</h3>
            <p>Multiplying a matrix by a scalar value involves multiplying each element in the matrix by that scalar. For matrix-matrix multiplication, the number of columns in the first matrix must match the number of rows in the second. The process involves calculating the dot product of rows and columns.</p>
            
            <h3>Power of a Matrix</h3>
            <p>You can raise any square matrix to a power. A<sup>2</sup> means A × A. Our calculator handles this computation for you.</p>

            <h3>Transpose of a Matrix</h3>
            <p>The transpose of a matrix (A<sup>T</sup>) is found by flipping the matrix over its main diagonal, effectively switching the row and column indices.</p>

            <h3>Determinant of a Matrix Calculator</h3>
            <p>The determinant is a special value that can be calculated from a square matrix. Our calculator can find the determinant of a matrix, which is useful for solving systems of linear equations and in other areas of linear algebra.</p>

            <h3>Inverse Matrix Calculator</h3>
            <p>The inverse of a matrix A is another matrix A<sup>-1</sup> such that A × A<sup>-1</sup> results in the identity matrix. Only non-singular matrices (those with a non-zero determinant) have an inverse. This tool functions as an efficient inverse of matrix calculator for your needs.</p>
        </section>
        <RelatedCalculators currentCategory="Math" currentHref="/matrix-calculator" />
      </main>
    </div>
  );
}
