
import HexCalculator from '@/components/calculators/hex-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
    title: 'Hex Calculator – Add, Subtract, Multiply, Divide & Convert Hex',
    description: 'Use our free online Hex Calculator to perform arithmetic on hexadecimal numbers and easily convert between hex and decimal values. Includes detailed explanations and tables.',
    alternates: {
        canonical: '/hex-calculator',
    },
};

const hexDecimalTable = [
    { hex: '0', binary: '0', decimal: '0' },
    { hex: '1', binary: '1', decimal: '1' },
    { hex: '2', binary: '10', decimal: '2' },
    { hex: '3', binary: '11', decimal: '3' },
    { hex: '4', binary: '100', decimal: '4' },
    { hex: '5', binary: '101', decimal: '5' },
    { hex: '6', binary: '110', decimal: '6' },
    { hex: '7', binary: '111', decimal: '7' },
    { hex: '8', binary: '1000', decimal: '8' },
    { hex: '9', binary: '1001', decimal: '9' },
    { hex: 'A', binary: '1010', decimal: '10' },
    { hex: 'B', binary: '1011', decimal: '11' },
    { hex: 'C', binary: '1100', decimal: '12' },
    { hex: 'D', binary: '1101', decimal: '13' },
    { hex: 'E', binary: '1110', decimal: '14' },
    { hex: 'F', binary: '1111', decimal: '15' },
];

const faqs = [
    {
        question: "How do you calculate hexadecimal?",
        answer: "Hexadecimal calculations like addition, subtraction, multiplication, and division follow the same rules as the decimal system, but you must remember that the base is 16. This means you 'carry over' or 'borrow' in units of 16, not 10. Our calculator automates this for you."
    },
    {
        question: "How do you convert hex to decimal?",
        answer: "To convert a hex number to decimal, you multiply each digit by its corresponding power of 16 and sum the results. For example, 2A in hex is (2 * 16^1) + (10 * 16^0) = 32 + 10 = 42 in decimal."
    },
    {
        question: "How do you convert decimal to hex?",
        answer: "To convert decimal to hex, you repeatedly divide the decimal number by 16 and record the remainders. The hex digits are the remainders read from bottom to top. For example, 257 divided by 16 is 16 with a remainder of 1. 16 divided by 16 is 1 with a remainder of 0. The final 1 is the last remainder. Reading up: 101, which is 101 in hex."
    },
    {
        question: "Why does hex use letters A-F?",
        answer: "Since hex is a base-16 system, it needs 16 unique digits. After using the standard digits 0-9, the letters A, B, C, D, E, and F are used to represent the decimal values 10, 11, 12, 13, 14, and 15, respectively."
    }
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
};

export default function HexCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Hex Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Use the following calculators to perform the addition, subtraction, multiplication, or division of two hexadecimal values, as well as convert hex values to decimal values, and vice versa.
                </p>
            </div>

            <HexCalculator />

            <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
                 <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Hex Calculators</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>For Arithmetic:</strong> Enter the two hex values in the top calculator, select your operation (+, -, ×, ÷), and click '=' to see the result.</li>
                            <li><strong>For Hex to Decimal:</strong> Enter your hexadecimal value in the second calculator and click '=' to see its decimal equivalent.</li>
                            <li><strong>For Decimal to Hex:</strong> Enter your decimal number in the third calculator and click '=' to see its hexadecimal equivalent.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>The Hexadecimal System</CardTitle></CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>The hexadecimal number system (hex) functions virtually identically to the decimal and binary systems. Instead of using a base of 10 or 2 respectively, it uses a base of 16. Hex uses 16 digits including 0-9, just as the decimal system does, but also uses the letters A, B, C, D, E, and F (equivalent to a, b, c, d, e, f) to represent the numbers 10-15. Every hex digit represents 4 binary digits, called nibbles, which makes representing large binary numbers simpler. For example, the binary value of 1010101010 can be represented as 2AA in hex. This helps computers to compress large binary values in a manner that can be easily converted between the two systems.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Hex, Binary & Decimal Conversion Table</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Hex</TableHead>
                                    <TableHead>Binary</TableHead>
                                    <TableHead>Decimal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {hexDecimalTable.map(row => (
                                    <TableRow key={row.hex}>
                                        <TableCell>{row.hex}</TableCell>
                                        <TableCell>{row.binary}</TableCell>
                                        <TableCell>{row.decimal}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Hex Arithmetic</CardTitle></CardHeader>
                    <CardContent className="space-y-6 text-muted-foreground">
                        <div>
                            <h4 className="font-semibold text-foreground">Hex Addition</h4>
                            <p>Hex addition follows the same rules as decimal addition with the only difference being the added numerals A, B, C, D, E, and F. It may be convenient to have the decimal equivalent values of A through F handy when performing hex operations if the values have not yet been committed to memory. Hex addition involves calculating basic decimal addition while converting between hex and decimal when values larger than 9 are present. When the sum of a column is greater than 15, you carry over the value of 1 to the next column.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Hex Subtraction</h4>
                            <p>The most significant difference between hex and decimal subtraction involves borrowing. When borrowing in hex, the "1" that is borrowed represents 16decimal rather than 10decimal. This is because the column that is being borrowed from is 16 times larger than the borrowing column. As long as this is noted, and conversions of the letter numerals A-F are done carefully, hex subtraction is not any more difficult than decimal subtraction.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Hex Multiplication & Division</h4>
                            <p>Hex multiplication and division can be tricky because the conversions between hex and decimal while performing the operations require more effort. It is often easiest to convert the hex values to decimal, perform the operation, and then convert the result back to hexadecimal, which is the method our calculator uses.</p>
                        </div>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p>{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
        <RelatedCalculators currentCategory="Math Calculators" currentHref="/hex-calculator" />
      </div>
    </div>
  );
}
