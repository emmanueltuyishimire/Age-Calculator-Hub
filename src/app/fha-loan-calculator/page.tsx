
import FhaLoanCalculator from '@/components/calculators/fha-loan-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CheckCircle2, XCircle } from 'lucide-react';


export const metadata: Metadata = {
    title: 'FHA Loan Calculator – Estimate Your Monthly FHA Mortgage Payment',
    description: 'Use our free FHA Loan Calculator to estimate your monthly payment, including principal, interest, taxes, insurance (PITI), and FHA mortgage insurance premiums (MIP).',
    alternates: {
        canonical: '/fha-loan-calculator',
    },
};

const pros = [
    "Low down payment requirement, as low as 3.5%.",
    "Less stringent credit score requirements; accepts scores of 580 or even lower.",
    "No prepayment penalties for paying off the loan early.",
    "No strict income limits, as long as you can demonstrate the ability to repay.",
    "Allows for a higher debt-to-income ratio in certain situations.",
];

const cons = [
    "Requires both Upfront and Annual Mortgage Insurance Premiums (MIP).",
    "Annual MIP often lasts for the life of the loan, unlike PMI on conventional loans which can be removed.",
    "FHA loans generally have lower loan limits compared to conventional loans.",
    "Properties must meet certain health and safety standards to qualify.",
    "Borrowers with excellent credit might find better rates with conventional loans.",
];

const fees = [
    { name: "Sales Tax", description: "Most U.S. states charge a sales tax ranging from 4% to 8% of the boat's purchase price. Some states have tax caps and exemptions for trade-ins." },
    { name: "Loan Origination Fees", description: "Many lenders charge a loan processing fee, typically 1% to 3% of the loan amount." },
    { name: "Survey Fees", description: "Lenders often require a marine survey (similar to a home inspection) to assess the condition of used or larger boats." },
    { name: "Title and Registration Fees", description: "Boats need to be registered with state authorities, and fees vary based on location and boat size." },
];

const mipRatesLongTerm = [
    { amount: "$726,200 or Less", ltv: "95% or Less", rate: "0.50%" },
    { amount: "$726,200 or Less", ltv: "more than 95%", rate: "0.55%" },
    { amount: "More than $726,200", ltv: "95% or Less", rate: "0.70%" },
    { amount: "More than $726,200", ltv: "more than 95%", rate: "0.75%" },
];

const mipRatesShortTerm = [
    { amount: "$726,200 or Less", ltv: "90% or Less", rate: "0.15%" },
    { amount: "$726,200 or Less", ltv: "more than 90%", rate: "0.40%" },
    { amount: "More than $726,200", ltv: "78% or Less", rate: "0.15%" },
    { amount: "More than $726,200", ltv: "78% - 90%", rate: "0.40%" },
    { amount: "More than $726,200", ltv: "more than 90%", rate: "0.65%" },
];

export default function FhaLoanCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">FHA Loan Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Estimate your monthly FHA mortgage payment, including principal, interest, taxes, insurance (PITI), and the required FHA mortgage insurance premiums (MIP).
                </p>
            </div>

            <FhaLoanCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>What is an FHA Loan?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            FHA loans are mortgages insured by the Federal Housing Administration, the largest mortgage insurer in the world. The FHA was established in 1934 after The Great Depression, and its continuing mission is to create more homeowners in the U.S. It is important to remember that the FHA doesn't lend money, but insures lenders instead. The popularity of FHA loans comes from their ability to extend mortgage loans to more people trying to buy a home, especially those with lower down payments or less-than-perfect credit.
                        </p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Pros and Cons of FHA Loans</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-lg mb-4">Pros</h3>
                            <ul className="space-y-3">
                                {pros.map((pro, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-1 shrink-0" />
                                        <span className="text-muted-foreground">{pro}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-4">Cons</h3>
                            <ul className="space-y-3">
                                {cons.map((con, index) => (
                                    <li key={index} className="flex items-start">
                                        <XCircle className="h-5 w-5 text-destructive mr-3 mt-1 shrink-0" />
                                        <span className="text-muted-foreground">{con}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Mortgage Insurance Premiums (MIP)</CardTitle>
                        <CardDescription>
                            To qualify, the FHA charges both an upfront and an annual mortgage insurance premium (MIP) to protect lenders from losses.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p><strong>Upfront MIP:</strong> This is a one-time premium, currently 1.75% of the loan amount. It can be paid in cash at closing or, more commonly, financed into the total loan amount.</p>
                        <p><strong>Annual MIP:</strong> This is paid monthly as part of your mortgage payment. The rate varies based on your loan term, loan amount, and loan-to-value (LTV) ratio. For most borrowers with a down payment of less than 10%, this premium is paid for the entire life of the loan.</p>
                         <div>
                            <h4 className="font-semibold mb-2">2025 FHA Annual MIP Rates (Loan Term > 15 Years)</h4>
                            <Table>
                                <TableHeader><TableRow><TableHead>Loan Amount</TableHead><TableHead>LTV Ratio</TableHead><TableHead>Annual MIP</TableHead></TableRow></TableHeader>
                                <TableBody>{mipRatesLongTerm.map((row, i) => <TableRow key={i}><TableCell>{row.amount}</TableCell><TableCell>{row.ltv}</TableCell><TableCell>{row.rate}</TableCell></TableRow>)}</TableBody>
                            </Table>
                         </div>
                         <div>
                            <h4 className="font-semibold mb-2">2025 FHA Annual MIP Rates (Loan Term ≤ 15 Years)</h4>
                             <Table>
                                <TableHeader><TableRow><TableHead>Loan Amount</TableHead><TableHead>LTV Ratio</TableHead><TableHead>Annual MIP</TableHead></TableRow></TableHeader>
                                <TableBody>{mipRatesShortTerm.map((row, i) => <TableRow key={i}><TableCell>{row.amount}</TableCell><TableCell>{row.ltv}</TableCell><TableCell>{row.rate}</TableCell></TableRow>)}</TableBody>
                            </Table>
                         </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Learn More About Mortgages</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/house-affordability-calculator" className="text-primary hover:underline">House Affordability Calculator</Link></li>
                            <li><Link href="/mortgage-calculator" className="text-primary hover:underline">Conventional Mortgage Calculator</Link></li>
                        </ul>
                    </CardContent>
                </Card>
            </section>
        </main>
      </div>
    </div>
  );
}
