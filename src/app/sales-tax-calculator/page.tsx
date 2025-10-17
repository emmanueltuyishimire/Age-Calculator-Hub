
import SalesTaxCalculator from '@/components/calculators/sales-tax-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Sales Tax Calculator – Find Price Before or After Tax',
    description: 'Use our free Sales Tax Calculator to find the price of a good or service before or after tax. Enter any two values to solve for the third.',
    alternates: {
        canonical: '/sales-tax-calculator',
    },
};

const salesTaxRates = [
    { state: "Alabama", general: "4%", max: "13.50%" },
    { state: "Alaska", general: "0%", max: "7%" },
    { state: "Arizona", general: "5.60%", max: "10.725%" },
    { state: "Arkansas", general: "6.50%", max: "11.625%" },
    { state: "California", general: "7.25%", max: "10.50%" },
    { state: "Colorado", general: "2.90%", max: "10%" },
    { state: "Connecticut", general: "6.35%", max: "6.35%" },
    { state: "Delaware", general: "0%", max: "0%" },
    { state: "District of Columbia", general: "6%", max: "6%" },
    { state: "Florida", general: "6%", max: "7.50%" },
    { state: "Georgia", general: "4%", max: "8%" },
    { state: "Guam", general: "4%", max: "4%" },
    { state: "Hawaii", general: "4.166%", max: "4.712%" },
    { state: "Idaho", general: "6%", max: "8.50%" },
    { state: "Illinois", general: "6.25%", max: "10.25%" },
    { state: "Indiana", general: "7%", max: "7%" },
    { state: "Iowa", general: "6%", max: "7%" },
    { state: "Kansas", general: "6.50%", max: "11.60%" },
    { state: "Kentucky", general: "6%", max: "6%" },
    { state: "Louisiana", general: "4.45%", max: "11.45%" },
    { state: "Maine", general: "5.50%", max: "5.50%" },
    { state: "Maryland", general: "6%", max: "6%" },
    { state: "Massachusetts", general: "6.25%", max: "6.25%" },
    { state: "Michigan", general: "6%", max: "6%" },
    { state: "Minnesota", general: "6.875%", max: "7.875%" },
    { state: "Mississippi", general: "7%", max: "7.25%" },
    { state: "Missouri", general: "4.225%", max: "10.85%" },
    { state: "Montana", general: "0%", max: "0%" },
    { state: "Nebraska", general: "5.50%", max: "7.50%" },
    { state: "Nevada", general: "6.85%", max: "8.375%" },
    { state: "New Hampshire", general: "0%", max: "0%" },
    { state: "New Jersey", general: "6.625%", max: "12.625%" },
    { state: "New Mexico", general: "5.125%", max: "8.688%" },
    { state: "New York", general: "4%", max: "8.875%" },
    { state: "North Carolina", general: "4.75%", max: "7.50%" },
    { state: "North Dakota", general: "5%", max: "8%" },
    { state: "Ohio", general: "5.75%", max: "8%" },
    { state: "Oklahoma", general: "4.50%", max: "11%" },
    { state: "Oregon", general: "0%", max: "0%" },
    { state: "Pennsylvania", general: "6%", max: "8%" },
    { state: "Puerto Rico", general: "10.50%", max: "11.50%" },
    { state: "Rhode Island", general: "7%", max: "7%" },
    { state: "South Carolina", general: "6%", max: "9%" },
    { state: "South Dakota", general: "4%", max: "6%" },
    { state: "Tennessee", general: "7%", max: "9.75%" },
    { state: "Texas", general: "6.25%", max: "8.25%" },
    { state: "Utah", general: "6.1%", max: "8.35%" },
    { state: "Vermont", general: "6%", max: "7%" },
    { state: "Virginia", general: "5.30%", max: "7%" },
    { state: "Washington", general: "6.50%", max: "10.60%" },
    { state: "West Virginia", general: "6%", max: "7%" },
    { state: "Wisconsin", general: "5%", max: "6.9%" },
    { state: "Wyoming", general: "4%", max: "6%" },
];


export default function SalesTaxCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Sales Tax Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    The Sales Tax Calculator can compute any one of the following, given inputs for the remaining two: before-tax price, sale tax rate, and final, or after-tax price.
                </p>
            </div>

            <SalesTaxCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>What is Sales Tax?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            A sales tax is a consumption tax paid to a government on the sale of certain goods and services. Usually, the vendor collects the sales tax from the consumer as the consumer makes a purchase. In most countries, the sales tax is called value-added tax (VAT) or goods and services tax (GST), which is a different form of consumption tax. In some countries, the listed prices for goods and services are the before-tax value, and a sales tax is only applied during the purchase. In other countries, the listed prices are the final after-tax values, which include the sales tax.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>U.S. Sales Tax</CardTitle>
                    </CardHeader>
                     <CardContent className="space-y-4 text-muted-foreground">
                        <p>In the United States, sales tax at the federal level does not exist. At the state level, all (including District of Columbia, Puerto Rico, and Guam) but five states do not have statewide sales tax. These are Alaska, Delaware, Montana, New Hampshire, and Oregon. States that impose a sales tax have different rates, and even within states, local or city sales taxes can come into play. Unlike VAT (which is not imposed in the U.S.), sales tax is only enforced on retail purchases; most transactions of goods or services between businesses are not subject to sales tax.</p>
                        <p>The sales tax rate ranges from 0% to 16% depending on the state and the type of good or service, and all states differ in their enforcement of sales tax. In Texas, prescription medicine and food seeds are exempt from taxation. Vermont has a 6% general sales tax, but an additional 10% tax is added to purchases of alcoholic drinks that are immediately consumed. These are only several examples of differences in taxation in different jurisdictions. Rules and regulations regarding sales tax vary widely from state to state.</p>
                     </CardContent>
                </Card>
                
                 <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">U.S. Sales Tax Rates by State</h2>
                    <div className="h-[400px] overflow-y-auto border rounded-md">
                        <Table>
                            <TableHeader className="sticky top-0 bg-secondary">
                                <TableRow>
                                    <TableHead>State</TableHead>
                                    <TableHead>General State Sales Tax</TableHead>
                                    <TableHead>Max Tax Rate with Local/City Sale Tax</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {salesTaxRates.map((row) => (
                                    <TableRow key={row.state}>
                                        <TableCell className="font-medium">{row.state}</TableCell>
                                        <TableCell>{row.general}</TableCell>
                                        <TableCell>{row.max}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>How to Deduct Sales Tax in the U.S.</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>When filing federal income tax, taxpayers need to choose to either take the standard deduction or itemize deductions. This decision will be different for everyone, but most Americans choose the standard deduction. Sales tax can be deducted from federal income tax only if deductions are itemized. In general, taxpayers with sales tax as their only deductible expense may find that itemizing deductions is not worth the time. Itemizing deductions also involves meticulous record-keeping and can be tedious work because the IRS requires the submission of sales tax records, such as a year's worth of purchase receipts. Anyone who plans to itemize should be keeping detailed records, as it will be very helpful in determining the amount of sales tax paid.</p>
                        <p>After the choice between standard or itemized deductions has been made, taxpayers have to make another decision regarding whether or not to claim either state and local income taxes or sales taxes (but not both). Most taxpayers choose to deduct income taxes as it typically results in a larger figure. With that said, it may be better for taxpayers who made large purchases during the year to deduct sales tax instead of income tax if their total sales tax payments exceed state income tax. Taxpayers who paid for a new car, wedding, engagement ring, vacation, or multiple major appliances during a tax year can potentially have a greater sales tax payment than income tax payment. In reality, less than 2% of Americans claim sales tax as a deduction each year.</p>
                        <p>For more information about or to do calculations involving income tax, please visit the <Link href="/income-tax-calculator" className="text-primary hover:underline">Income Tax Calculator</Link>.</p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Value-Added Tax (VAT)</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground">VAT is the version of sales tax commonly used outside of the U.S. in over 160 countries. VAT is an indirect tax that is imposed at different stages of the production of goods and services, whenever value is added. Countries that impose a VAT can also impose it on imported and exported goods. All participants in a supply chain, such as wholesalers, distributors, suppliers, manufacturers, and retailers, will usually need to pay VAT, not just the end consumer, as is done with U.S. sales tax. VAT can be calculated as the sales price minus the costs of materials or parts used that have been taxed already.</p>
                         <p className="text-muted-foreground mt-4">For more information about or to do calculations involving VAT, please visit the <Link href="/vat-calculator" className="text-primary hover:underline">VAT Calculator</Link>.</p>
                    </CardContent>
                </Card>
                
            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/sales-tax-calculator" />
      </div>
    </div>
  );
}
