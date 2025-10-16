
import DownPaymentCalculator from '@/components/calculators/down-payment-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Down Payment Calculator – Estimate Your Home Down Payment',
    description: 'Use our free Down Payment Calculator to estimate an affordable home price from your cash on hand, or see how much cash you need for a given home price. Helps you plan your home purchase.',
    alternates: {
        canonical: '/down-payment-calculator',
    },
};

export default function DownPaymentCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Down Payment Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    This calculator offers three different ways to help you plan for your home down payment and upfront costs.
                </p>
            </div>

            <DownPaymentCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>What is a Down Payment?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            A down payment is the upfront portion of a payment that is often required to finalize the purchase of items that are typically more expensive, such as a home or a car. When purchasing a home, after a down payment is paid by a home-buyer, any remaining balance will be amortized as a mortgage loan that must be fulfilled by the buyer. In other words, the purchase price of a house should equal the total amount of the mortgage loan and the down payment. Often, a down payment for a home is expressed as a percentage of the purchase price. As an example, for a $250,000 home, a down payment of 3.5% is $8,750, while 20% is $50,000.
                        </p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Closing Costs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            It is important to remember that a down payment only makes up one upfront payment during a home purchase, even though it is often the most substantial. There are also many other costs that may be involved, such as upfront points of the loan, insurance, lender's title insurance, inspection fee, appraisal fee, and a survey fee. A very rough estimate for the amount needed to cover closing costs is 3% of the purchase price, which is set as the default for the calculator.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Different Loans, Different Down Payment Requirements</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                         <p>
                            In the U.S., most conventional loans adhere to guidelines and requirements set by Freddie Mac and Fannie Mae, which are two government-sponsored corporations that purchase loans from lenders. Conventional loans normally require a down payment of 20%, but some lenders may go lower, such as 10%, 5%, or 3% at the very least. If the down payment is lower than 20%, borrowers will be asked to purchase Private Mortgage Insurance (PMI) to protect the mortgage lenders. The PMI is normally paid as a monthly fee added to the mortgage until the balance of the loan falls below 80 or 78% of the home purchase price.
                        </p>
                        <p>
                           To help low-income buyers in the U.S., the Department of Housing and Urban Development (HUD) requires all <Link href="/fha-loan-calculator" className="text-primary hover:underline">FHA loans</Link> to provide insurance to primary residence home-buyers so that they can purchase a home with a down payment as low as 3.5% and for terms as long as 30 years. However, home-buyers must pay an upfront mortgage insurance premium at closing that is worth 1.75% of the loan amount, on top of the down payment. In addition, monthly mortgage insurance payments last for the life of the loan unless refinanced to a conventional loan. 
                        </p>
                         <p>
                           Also, in the U.S., the Department of Veterans Affairs (VA) has the ability to subsidize VA loans, which do not require a down payment. Only two other entities, the USDA and Navy Federal, allow the purchase of a home without a down payment. 
                        </p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Where to Get Down Payment Funds</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p><strong>Savings:</strong> Most home-buyers save up for their down payments by setting aside savings until they reach their desired target, whether it's 20% or 3.5%. Having the savings in an interest-bearing account such as a <Link href="/savings-goal-calculator" className="text-primary hover:underline">savings account</Link> or in Certificates of Deposit (CDs) can provide the opportunity to earn some interest.</p>
                        <p><strong>Piggyback Loan:</strong> In situations where the home-buyer doesn't have sufficient funds, they can try to split their mortgage into two loans. This is also called an 80-10-10 loan and may help avoid PMI.</p>
                        <p><strong>Down Payment Assistance Programs:</strong> Local county or city governments, local housing authorities, and charitable foundations sometimes provide grants to first-time home-buyers. State-wide programs can be found on the HUD website.</p>
                        <p><strong>Gift Funds:</strong> FHA loans allow for the down payment to be a gift from a friend or family member, as long as there is a gift letter stating that it is a gift that does not require repayment.</p>
                        <p><strong>Retirement Accounts:</strong> It is possible to withdraw from an IRA or take a loan from a 401(k) for a first home purchase, but there are strict rules and potential drawbacks. It's crucial to understand the tax implications, penalties, and repayment terms. Consult a financial advisor before considering this option.</p>
                    </CardContent>
                </Card>
            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/down-payment-calculator" />
      </div>
    </div>
  );
}
