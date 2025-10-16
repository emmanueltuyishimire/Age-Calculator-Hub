
import CdCalculator from '@/components/calculators/cd-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'CD Calculator – Certificate of Deposit',
    description: 'Use our free Certificate of Deposit (CD) Calculator to determine the accumulated interest earnings on CDs over time, factoring in taxes for more accurate results.',
    alternates: {
        canonical: '/cd-calculator',
    },
};

export default function CdCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">CD Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    The Certificate of Deposit (CD) Calculator can help determine the accumulated interest earnings on CDs over time. It also takes into consideration taxes to provide more accurate results.
                </p>
            </div>

            <CdCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Related Calculators</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/investment-calculator" className="text-primary hover:underline">Investment Calculator</Link></li>
                            <li><Link href="/interest-rate-calculator" className="text-primary hover:underline">Interest Calculator</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>What is a Certificate of Deposit?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>A certificate of deposit is an agreement to deposit money for a fixed period that will pay interest. Common term lengths range from three months to five years. The lengthier the term, the higher the exposure to interest rate risk. Generally, the larger the initial deposit, or the longer the investment period, the higher the interest rate. As a type of investment, CDs fall on the low-risk, low-return end of the spectrum. Historically, interest rates of CDs tend to be higher than rates of savings accounts and money markets, but much lower than the historical average return rate of the equity market. There are also different types of CDs with varying rates of interest or rates linked to indexes of various kinds, but the calculator can only do calculations based on fixed-rate CDs.</p>
                        <p>The gains from CDs are taxable as income in the U.S. unless they are in accounts that are tax-deferred or tax-free, such as an IRA or Roth IRA. For more information about or to do calculations involving a traditional IRA or Roth IRA, please visit the IRA Calculator or Roth IRA Calculator.</p>
                        <p>CDs are called "certificates of deposit" because before electronic transfers were invented, buyers of CDs were issued certificates in exchange for their deposits as a way for financial institutions to keep track of buyers of their CDs. Receiving actual certificates for making deposits is no longer practiced today, as transactions are done electronically.</p>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>FDIC-Backed</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>One of the defining characteristics of CDs in the U.S. is that they are protected by the Federal Deposit Insurance Corporation (FDIC). CDs that originate from FDIC-insured banks are insured for up to $250,000, meaning that if banks fail, up to $250,000 of each depositor's funds is guaranteed to be safe. Anyone who wishes to deposit more than the $250,000 limit and wants all of it to be FDIC-insured can simply buy CDs from other FDIC-insured banks. Due to this insurance, there are few lower-risk investments. Similarly, credit unions are covered by insurance from the National Credit Union Administration (NCUA insurance), which provides essentially the same insurance coverage on deposits as the FDIC.</p>
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader>
                        <CardTitle>Where and How to Purchase CDs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>"Buying" a CD is effectively lending money to the seller of the CD. Financial institutions use the funds from sold CDs to re-lend (and profit from the difference), hold in their reserves, spend for their operations, or take care of other miscellaneous expenses. Along with the federal funds rate, all of these factors play a part in determining the interest rates that each financial institution will pay on their CDs.</p>
                    </CardContent>
                </Card>

            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/cd-calculator" />
      </div>
    </div>
  );
}
