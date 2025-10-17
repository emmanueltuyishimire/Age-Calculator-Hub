
import MatrixCalculator from '@/components/calculators/matrix-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';

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
        </div>

        <MatrixCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
            <p>A matrix, in a mathematical context, is a rectangular array of numbers, symbols, or expressions that are arranged in rows and columns. Matrices are often used in scientific fields such as physics, computer graphics, probability theory, statistics, calculus, numerical analysis, and more.</p>
            <p>The dimensions of a matrix, A, are typically denoted as m × n. This means that A has m rows and n columns. When referring to a specific value in a matrix, called an element, a variable with two subscripts is often used to denote each element based on its position in the matrix. For example, given a<sub>i,j</sub>, where i = 1 and j = 3, a<sub>1,3</sub> is the value of the element in the first row and the third column of the given matrix.</p>
            <p>Matrix operations such as addition, multiplication, subtraction, etc., are similar to what most people are likely accustomed to seeing in basic arithmetic and algebra, but do differ in some ways, and are subject to certain constraints. Below are descriptions of the matrix operations that this calculator can perform.</p>

            <h2>Matrix addition</h2>
            <p>Matrix addition can only be performed on matrices of the same size. This means that you can only add matrices if both matrices are m × n. For example, you can add two or more 3 × 3, 1 × 2, or 5 × 4 matrices. You cannot add a 2 × 3 and a 3 × 2 matrix, a 4 × 4 and a 3 × 3, etc. The number of rows and columns of all the matrices being added must exactly match.</p>
            <p>If the matrices are the same size, matrix addition is performed by adding the corresponding elements in the matrices. For example, given two matrices, A and B, with elements a<sub>i,j</sub>, and b<sub>i,j</sub>, the matrices are added by adding each element, then placing the result in a new matrix, C, in the corresponding position in the matrix:</p>
            <div className="flex justify-center gap-4 font-mono text-center">
                <span>A = <div className="border-l-2 border-r-2 border-current px-2 py-1 inline-block"><div>1 2</div><div>3 4</div></div></span>
                <span>B = <div className="border-l-2 border-r-2 border-current px-2 py-1 inline-block"><div>5 6</div><div>7 8</div></div></span>
            </div>
            <p>In the above matrices, a<sub>1,1</sub> = 1; a<sub>1,2</sub> = 2; b<sub>1,1</sub> = 5; b<sub>1,2</sub> = 6; etc. We add the corresponding elements to obtain c<sub>i,j</sub>. Adding the values in the corresponding rows and columns:</p>
            <ul className="list-none pl-0 font-mono">
                <li>a<sub>1,1</sub> + b<sub>1,1</sub> = 1 + 5 = 6 = c<sub>1,1</sub></li>
                <li>a<sub>1,2</sub> + b<sub>1,2</sub> = 2 + 6 = 8 = c<sub>1,2</sub></li>
                <li>a<sub>2,1</sub> + b<sub>2,1</sub> = 3 + 7 = 10 = c<sub>2,1</sub></li>
                <li>a<sub>2,2</sub> + b<sub>2,2</sub> = 4 + 8 = 12 = c<sub>2,2</sub></li>
            </ul>
            <p>Thus, matrix C is:</p>
            <div className="flex justify-center font-mono text-center">
                <span>C = <div className="border-l-2 border-r-2 border-current px-2 py-1 inline-block"><div>6 8</div><div>10 12</div></div></span>
            </div>

            <h2>Matrix subtraction</h2>
            <p>Matrix subtraction is performed in much the same way as matrix addition, described above, with the exception that the values are subtracted rather than added. If necessary, refer to the information and examples above for a description of notation used in the example below. Like matrix addition, the matrices being subtracted must be the same size. If the matrices are the same size, then matrix subtraction is performed by subtracting the elements in the corresponding rows and columns:</p>
            <div className="flex justify-center gap-4 font-mono text-center">
                <span>A = <div className="border-l-2 border-r-2 border-current px-2 py-1 inline-block"><div>1 2</div><div>3 4</div></div></span>
                <span>B = <div className="border-l-2 border-r-2 border-current px-2 py-1 inline-block"><div>5 6</div><div>7 8</div></div></span>
            </div>
            <p>Thus, matrix C is:</p>
            <div className="flex justify-center font-mono text-center">
                <span>C = <div className="border-l-2 border-r-2 border-current px-2 py-1 inline-block"><div>-4 -4</div><div>-4 -4</div></div></span>
            </div>
            
            <h2>Matrix multiplication</h2>
            <h3>Scalar multiplication:</h3>
            <p>Matrices can be multiplied by a scalar value by multiplying each element in the matrix by the scalar. For example, given a matrix A and a scalar c:</p>
            <div className="flex justify-center items-center gap-4 font-mono text-center">
                 <span>A = <div className="border-l-2 border-r-2 border-current px-2 py-1 inline-block"><div>1 2</div><div>3 4</div></div> ;</span>
                 <span>c = 5</span>
            </div>
             <p>The product of c and A is:</p>
             <div className="flex justify-center items-center gap-4 font-mono text-center">
                 <span>5 × <div className="border-l-2 border-r-2 border-current px-2 py-1 inline-block"><div>1 2</div><div>3 4</div></div> = <div className="border-l-2 border-r-2 border-current px-2 py-1 inline-block"><div>5 10</div><div>15 20</div></div></span>
            </div>

            <h3>Matrix-matrix multiplication:</h3>
            <p>Multiplying two (or more) matrices is more involved than multiplying by a scalar. In order to multiply two matrices, the number of columns in the first matrix must match the number of rows in the second matrix. For example, you can multiply a 2 × 3 matrix by a 3 × 4 matrix, but not a 2 × 3 matrix by a 4 × 3.</p>
            <p>If the matrices are the correct sizes, and can be multiplied, matrices are multiplied by performing what is known as the dot product. The dot product involves multiplying the corresponding elements in the row of the first matrix, by that of the columns of the second matrix, and summing up the result, resulting in a single value.</p>
            
            <h2>Power of a matrix</h2>
            <p>For the intents of this calculator, "power of a matrix" means to raise a given matrix to a given power. For example, when using the calculator, "Power of 2" for a given matrix, A, means A<sup>2</sup>. Exponents for matrices function in the same way as they normally do in math, except that matrix multiplication rules also apply, so only square matrices (matrices with an equal number of rows and columns) can be raised to a power.</p>
            
            <h2>Transpose of a matrix</h2>
            <p>The transpose of a matrix, typically indicated with a "T" as an exponent, is an operation that flips a matrix over its diagonal. This results in switching the row and column indices of a matrix, meaning that a<sub>ij</sub> in matrix A, becomes a<sub>ji</sub> in A<sup>T</sup>.</p>
            
            <h2>Determinant of a matrix</h2>
            <p>The determinant of a matrix is a value that can be computed from the elements of a square matrix. It is used in linear algebra, calculus, and other mathematical contexts. For example, the determinant can be used to compute the inverse of a matrix or to solve a system of linear equations.</p>
            
            <h2>Inverse of a matrix</h2>
            <p>The inverse of a matrix A is denoted as A<sup>-1</sup>, where A<sup>-1</sup> is the inverse of A if the following is true:</p>
            <p className="text-center font-mono">A×A<sup>-1</sup> = A<sup>-1</sup>×A = I, where I is the identity matrix</p>
            <p>An identity matrix is a square matrix with "1" across its diagonal, and "0" everywhere else. Only non-singular matrices (matrices whose determinants are not zero) have an inverse.</p>

        </section>
        <RelatedCalculators currentCategory="Math" currentHref="/matrix-calculator" />
      </main>
    </div>
  );
}
