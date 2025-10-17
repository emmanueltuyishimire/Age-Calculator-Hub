
import MatrixCalculator from '@/components/calculators/matrix-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Matrix Calculator – RREF, Inverse, Determinant & Eigenvalues',
    description: 'A comprehensive free online Matrix Calculator. An alternative to Desmos for matrix operations. Perform addition, subtraction, multiplication, and find the inverse, determinant, RREF for augmented matrices, and eigenvalues for diagonalization.',
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
            A powerful online tool to perform various matrix operations, including addition, multiplication, finding the determinant, inverse, Row Reduced Echelon Form (RREF), and eigenvalues.
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
                    <li><strong>Perform Operations:</strong>
                        <ul className="list-disc list-inside ml-6">
                           <li>For single-matrix operations (like Transpose, Determinant, Inverse, RREF, or Eigenvalues), use the buttons directly under the matrix you want to analyze.</li>
                           <li>To solve a system of linear equations, create an <strong>augmented matrix</strong> and use the <strong>RREF</strong> button.</li>
                           <li>To find eigenvalues for diagonalization, use the <strong>Eigenvalues</strong> button.</li>
                           <li>For two-matrix operations (like A+B, A-B, or AB), use the buttons in the "Operations" section.</li>
                        </ul>
                    </li>
                     <li><strong>View Results:</strong> The resulting matrix or value will be displayed at the bottom of the page.</li>
                </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Matrix Addition</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>Matrix addition can only be performed on matrices of the same size. This means that you can only add matrices if both matrices are m × n. If the matrices are the same size, matrix addition is performed by adding the corresponding elements in the matrices.</p>
                <p className="text-center font-mono">[a<sub>1,1</sub>] + [b<sub>1,1</sub>] = [a<sub>1,1</sub> + b<sub>1,1</sub>]</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader><CardTitle>Matrix Subtraction</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>Matrix subtraction is performed in much the same way as matrix addition, with the exception that the values are subtracted rather than added. Like matrix addition, the matrices being subtracted must be the same size.</p>
                 <p className="text-center font-mono">[a<sub>1,1</sub>] - [b<sub>1,1</sub>] = [a<sub>1,1</sub> - b<sub>1,1</sub>]</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader><CardTitle>Matrix Multiplication</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>Scalar multiplication involves multiplying each element in the matrix by a scalar. Matrix-matrix multiplication is more involved. In order to multiply two matrices, the number of columns in the first matrix must match the number of rows in the second matrix. Matrices are multiplied by performing the dot product of the rows of the first matrix with the columns of the second.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Power of a Matrix</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>This means to raise a given matrix to a given power. For example, A² = A × A. Only square matrices (matrices with an equal number of rows and columns) can be raised to a power.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Transpose of a Matrix</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>The transpose of a matrix, typically indicated with a "T" as an exponent (A<sup>T</sup>), is an operation that flips a matrix over its diagonal. This results in switching the row and column indices of the matrix.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Determinant of a Matrix</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>The determinant of a matrix is a special value that can be computed from the elements of a square matrix. It is used in linear algebra to find the inverse of a matrix and to solve systems of linear equations.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Inverse of a Matrix</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>The inverse of a matrix A is denoted as A<sup>-1</sup>. For an inverse to exist, the matrix must be square and its determinant must be non-zero. A matrix multiplied by its inverse results in the identity matrix.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Row Reduced Echelon Form (RREF)</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>RREF is a simplified form of a matrix obtained by performing a series of elementary row operations. It is particularly useful for solving systems of linear equations. To solve a system, you can create an "augmented matrix" (where the final column represents the constants of the equations) and then find its RREF. The resulting matrix will give you the solutions.</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader><CardTitle>Eigenvalues and Eigenvectors</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>For a given square matrix A, an eigenvector is a non-zero vector that, when multiplied by A, yields a scaled version of the original vector. The scaling factor is the eigenvalue. They are crucial in many areas of math and physics, including in the process of diagonalization. This calculator computes both the eigenvalues and their corresponding eigenvectors for a given matrix.</p>
            </CardContent>
          </Card>
        </section>
        <RelatedCalculators currentCategory="Math" currentHref="/matrix-calculator" />
      </main>
    </div>
  );
}
