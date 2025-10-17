
import MatrixCalculator from '@/components/calculators/matrix-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Matrix Calculator – Add, Subtract, Multiply & Invert Matrices',
    description: 'A comprehensive free online Matrix Calculator to perform addition, subtraction, multiplication, and other operations. Includes transpose, determinant, inverse, and power functions.',
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
            A matrix, in a mathematical context, is a rectangular array of numbers, symbols, or expressions that are arranged in rows and columns. Matrices are often used in scientific fields such as physics, computer graphics, probability theory, statistics, calculus, numerical analysis, and more.
          </p>
        </div>

        <MatrixCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
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
        </section>
        <RelatedCalculators currentCategory="Math" currentHref="/matrix-calculator" />
      </main>
    </div>
  );
}
