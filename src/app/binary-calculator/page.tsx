
import BinaryCalculator from '@/components/calculators/binary-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
    title: 'Binary Calculator – Add, Subtract, Multiply, Divide & Convert',
    description: 'Use our free online Binary Calculator to perform arithmetic (add, subtract, multiply, divide) on binary numbers and easily convert between binary and decimal values.',
    alternates: {
        canonical: '/binary-calculator',
    },
};

const binaryDecimalTable = [
    { decimal: 0, binary: "0" },
    { decimal: 1, binary: "1" },
    { decimal: 2, binary: "10" },
    { decimal: 3, binary: "11" },
    { decimal: 4, binary: "100" },
    { decimal: 7, binary: "111" },
    { decimal: 8, binary: "1000" },
    { decimal: 10, binary: "1010" },
    { decimal: 16, binary: "10000" },
    { decimal: 20, binary: "10100" },
];

export default function BinaryCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Binary Calculator</h1>
          <p className="text-md md:text-lg text-muted-foreground">
            Use the following calculators to perform the addition, subtraction, multiplication, or division of two binary values, as well as convert binary values to decimal values, and vice versa.
          </p>
        </div>

        <BinaryCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
          
          <Card>
            <CardHeader><CardTitle>How to Use the Binary Calculators</CardTitle></CardHeader>
            <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li><strong>For Arithmetic:</strong> Enter the two binary values in the top calculator, select your operation (+, -, ×, ÷), and click '=' to see the result.</li>
                    <li><strong>For Binary to Decimal:</strong> Enter your binary value in the second calculator and click '=' to see its decimal equivalent.</li>
                    <li><strong>For Decimal to Binary:</strong> Enter your decimal number in the third calculator and click '=' to see its binary equivalent.</li>
                </ol>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle>What is The Binary System?</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>The binary system is a numerical system that functions virtually identically to the decimal number system that people are likely more familiar with. While the decimal number system uses the number 10 as its base, the binary system uses 2. Furthermore, although the decimal system uses the digits 0 through 9, the binary system uses only 0 and 1, and each digit is referred to as a bit. Apart from these differences, operations such as addition, subtraction, multiplication, and division are all computed following the same rules as the decimal system.</p>
              <p>Almost all modern technology and computers use the binary system due to its ease of implementation in digital circuitry using logic gates. It is much simpler to design hardware that only needs to detect two states, on and off (or true/false, present/absent, etc.). Using a decimal system would require hardware that can detect 10 states for the digits 0 through 9, and is more complicated.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Binary/Decimal Conversion Table</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Decimal</TableHead><TableHead>Binary</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {binaryDecimalTable.map(row => (
                    <TableRow key={row.decimal}>
                      <TableCell>{row.decimal}</TableCell>
                      <TableCell>{row.binary}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

           <Card>
                <CardHeader>
                    <CardTitle>Binary Conversion Explained</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>While working with binary may initially seem confusing, understanding that each binary place value represents 2<sup>n</sup>, just as each decimal place represents 10<sup>n</sup>, should help clarify. Take the number 8 for example. In the decimal number system, 8 is positioned in the first decimal place left of the decimal point, signifying the 10<sup>0</sup> place. Essentially this means:</p>
                    <p className="p-2 bg-muted rounded-md font-mono text-center">8 × 10<sup>0</sup> = 8 × 1 = 8</p>
                    <p>In binary, 8 is represented as 1000. Reading from right to left, the first 0 represents 2<sup>0</sup>, the second 2<sup>1</sup>, the third 2<sup>2</sup>, and the fourth 2<sup>3</sup>; just like the decimal system, except with a base of 2 rather than 10. Since 2<sup>3</sup> = 8, a 1 is entered in its position yielding 1000.</p>
                    <p>The step by step process to convert from the decimal to the binary system is:</p>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>Find the largest power of 2 that lies within the given number</li>
                        <li>Subtract that value from the given number</li>
                        <li>Find the largest power of 2 within the remainder found in step 2</li>
                        <li>Repeat until there is no remainder</li>
                        <li>Enter a 1 for each binary place value that was found, and a 0 for the rest</li>
                    </ol>
                    <p>Converting from the binary to the decimal system is simpler. Determine all of the place values where 1 occurs, and find the sum of the values. For example, 10111 = (1 × 2<sup>4</sup>) + (0 × 2<sup>3</sup>) + (1 × 2<sup>2</sup>) + (1 × 2<sup>1</sup>) + (1 × 2<sup>0</sup>) = 16 + 0 + 4 + 2 + 1 = 23.</p>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Binary Arithmetic</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-muted-foreground">
                    <div>
                        <h4 className="font-semibold text-foreground">Binary Addition</h4>
                        <p>Binary addition follows the same rules as addition in the decimal system except that rather than carrying a 1 over when the values added equal 10, carry over occurs when the result of addition equals 2. (0+0=0, 0+1=1, 1+0=1, 1+1=10).</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">Binary Subtraction</h4>
                        <p>Similar to binary addition, there is little difference between binary and decimal subtraction except those that arise from using only the digits 0 and 1. Borrowing occurs in any instance where the number that is subtracted is larger than the number it is being subtracted from.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">Binary Multiplication</h4>
                        <p>Binary multiplication is arguably simpler than its decimal counterpart. Since the only values used are 0 and 1, the results that must be added are either the same as the first term, or 0.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">Binary Division</h4>
                        <p>The process of binary division is similar to long division in the decimal system. The dividend is still divided by the divisor in the same manner, with the only significant difference being the use of binary rather than decimal subtraction.</p>
                    </div>
                </CardContent>
            </Card>

        </section>
        <RelatedCalculators currentCategory="Math Calculators" currentHref="/binary-calculator" />
      </main>
    </div>
  );
}
