
import MatrixCalculator from '@/components/calculators/matrix-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';

export const metadata: Metadata = {
    title: 'Matrix Calculator: RREF, Inverse, Determinant, & More',
    description: 'A free online Matrix Calculator to perform arithmetic (add, subtract, multiply), find the Reduced Row Echelon Form (RREF), inverse, determinant, and other key matrix operations.',
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
        </div>

        <MatrixCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
            <p>A matrix, in a mathematical context, is a rectangular array of numbers, symbols, or expressions that are arranged in rows and columns. Matrices are often used in scientific fields such as physics, computer graphics, probability theory, statistics, calculus, numerical analysis, and more.</p>
            <p>The dimensions of a matrix, A, are typically denoted as m × n. This means that A has m rows and n columns. When referring to a specific value in a matrix, called an element, a variable with two subscripts is often used to denote each element based on its position in the matrix. For example, given a<sub>ij</sub>, where i = 1 and j = 3, a<sub>1,3</sub> is the value of the element in the first row and the third column of the given matrix.</p>
            <p>Matrix operations such as addition, multiplication, subtraction, etc., are similar to what most people are likely accustomed to seeing in basic arithmetic and algebra, but do differ in some ways, and are subject to certain constraints. Below are descriptions of the matrix operations that this calculator can perform.</p>

            <h2>Matrix addition</h2>
            <p>Matrix addition can only be performed on matrices of the same size. This means that you can only add matrices if both matrices are m × n. For example, you can add two or more 3 × 3, 1 × 2, or 5 × 4 matrices. You cannot add a 2 × 3 and a 3 × 2 matrix, a 4 × 4 and a 3 × 3, etc. The number of rows and columns of all the matrices being added must exactly match.</p>
            
            <h2>Matrix subtraction</h2>
            <p>Matrix subtraction is performed in much the same way as matrix addition, described above, with the exception that the values are subtracted rather than added. Like matrix addition, the matrices being subtracted must be the same size.</p>
            
            <h2>Matrix multiplication</h2>
            <p>Multiplying two (or more) matrices is more involved than multiplying by a scalar. In order to multiply two matrices, the number of columns in the first matrix must match the number of rows in the second matrix. For example, you can multiply a 2 × 3 matrix by a 3 × 4 matrix, but not a 2 × 3 matrix by a 4 × 3.</p>
            
            <h2>Power of a matrix</h2>
            <p>For the intents of this calculator, "power of a matrix" means to raise a given matrix to a given power. For example, when using the calculator, "Power of 2" for a given matrix, A, means A<sup>2</sup>. Exponents for matrices function in the same way as they normally do in math, except that matrix multiplication rules also apply, so only square matrices (matrices with an equal number of rows and columns) can be raised to a power.</p>
            
            <h2>Transpose of a matrix</h2>
            <p>The transpose of a matrix, typically indicated with a "T" as an exponent, is an operation that flips a matrix over its diagonal. This results in switching the row and column indices of a matrix, meaning that a<sub>ij</sub> in matrix A, becomes a<sub>ji</sub> in A<sup>T</sup>.</p>
            
            <h2>Determinant of a matrix</h2>
            <p>The determinant of a matrix is a value that can be computed from the elements of a square matrix. It is used in linear algebra, calculus, and other mathematical contexts. For example, the determinant can be used to compute the inverse of a matrix or to solve a system of linear equations.</p>
            
            <h2>Inverse of a matrix</h2>
            <p>The inverse of a matrix A is denoted as A<sup>-1</sup>, where A<sup>-1</sup> is the inverse of A if the following is true:</p>
            <p className="text-center font-mono">A×A<sup>-1</sup> = A<sup>-1</sup>×A = I, where I is the identity matrix</p>
            <p>An identity matrix is a square matrix with "1" across its diagonal, and "0" everywhere else. The identity matrix is the matrix equivalent of the number "1." Only non-singular matrices (matrices whose determinants are not zero) have an inverse.</p>

            <h2>Reduced Row Echelon Form (RREF)</h2>
            <p>The Reduced Row Echelon Form (RREF) of a matrix is a specific form of a matrix obtained through a series of elementary row operations, a process known as Gauss-Jordan elimination. It is particularly useful for solving systems of linear equations. A matrix is in RREF if it satisfies all the following conditions:</p>
            <ul className="list-disc pl-6">
                <li>The first non-zero number in each row (called the leading entry) is 1. This is known as the pivot.</li>
                <li>Each leading 1 is the only non-zero number in its column.</li>
                <li>Each leading 1 is in a column to the right of the leading 1 in the row above it.</li>
                <li>All rows consisting entirely of zeros are at the bottom of the matrix.</li>
            </ul>

        </section>
        <RelatedCalculators currentCategory="Math" currentHref="/matrix-calculator" />
      </main>
    </div>
  );
}
