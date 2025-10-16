
import CdCalculator from '@/components/calculators/cd-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'CD Calculator – Certificate of Deposit',
    description: 'Use our free Certificate of Deposit (CD) Calculator to find the future value and interest earned on your investment. Accounts for taxes and compounding frequency.',
    alternates: {
        canonical: '/cd-calculator',
    },
};

export default function CdCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
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
                        <CardTitle>Learn More About Investing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/investment-calculator" className="text-primary hover:underline">Investment Calculator</Link></li>
                            <li><Link href="/interest-calculator" className="text-primary hover:underline">Interest Calculator</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>What is a Certificate of Deposit?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>A certificate of deposit is an agreement to deposit money for a fixed period that will pay interest. Common term lengths range from three months to five years. The lengthier the term, the higher the exposure to interest rate risk. Generally, the larger the initial deposit, or the longer the investment period, the higher the interest rate. As a type of investment, CDs fall on the low-risk, low-return end of the spectrum. Historically, interest rates of CDs tend to be higher than rates of savings accounts and money markets, but much lower than the historical average return rate of the equity market. There are also different types of CDs with varying rates of interest or rates linked to indexes of various kinds, but the calculator can only do calculations based on fixed-rate CDs.</p>
                        <p>The gains from CDs are taxable as income in the U.S. unless they are in accounts that are tax-deferred or tax-free, such as an IRA or Roth IRA. For more information about or to do calculations involving a traditional IRA or Roth IRA, please visit the <Link href="/ira-calculator" className="text-primary hover:underline">IRA Calculator</Link> or <Link href="/roth-ira-calculator" className="text-primary hover:underline">Roth IRA Calculator</Link>.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use CDs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                         <p>CDs are effective financial instruments when it comes to protecting savings, building short-term wealth, and ensuring returns without risk. With these key benefits in mind, it is possible to capitalize on CDs by using them to:</p>
                        <ul className="list-disc list-inside space-y-2">
                           <li>Supplement diversified portfolios to reduce total risk exposure. This can come in handy as retirees get closer to their retirement date and require a more guaranteed return to ensure they have savings in retirement to live off of.</li>
                           <li>Act as a short-term (5 years or less) place to put extra money that isn't needed or is required until a set future date. This can come in handy when saving for a down payment for a home or car several years in the future.</li>
                           <li>Estimate future returns accurately because most CDs have fixed rates. The result of this is a useful investment for people who prefer predictability.</li>
                        </ul>
                    </CardContent>
                </Card>
            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/cd-calculator" />
      </div>
    </div>
  );
}

