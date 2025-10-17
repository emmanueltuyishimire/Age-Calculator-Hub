
import MortgagePayoffCalculator from '@/components/calculators/mortgage-payoff-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Mortgage Payoff Calculator – Pay Off Your Mortgage Faster',
    description: 'Use our free Mortgage Payoff Calculator to see how extra payments can shorten your loan term and save you thousands in interest. Compare payoff scenarios easily.',
    alternates: {
        canonical: '/mortgage-payoff-calculator',
    },
};

export default function MortgagePayoffCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Mortgage Payoff Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                   This calculator helps evaluate how adding extra payments can save on interest and shorten your mortgage term.
                </p>
            </div>

            <MortgagePayoffCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                 <Card>
                    <CardHeader>
                        <CardTitle>What Is Amortization?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>
                            In the context of a loan, amortization is a way of spreading the loan into a series of payments over a period of time. Using this technique, the loan balance will fall with each payment, and the borrower will pay off the balance after completing the series of scheduled payments. You can see a full schedule with our <Link href="/amortization-calculator" className="text-primary hover:underline">Amortization Calculator</Link>.
                        </p>
                        <p>
                           In most cases, the amortized payments are fixed monthly payments spread evenly throughout the loan term. Each payment is composed of two parts, interest and principal. Interest is the fee for borrowing the money, usually a percentage of the outstanding loan balance. The principal is the portion of the payment devoted to paying down the loan balance.
                        </p>
                         <p>
                           Over time, the balance of the loan falls as the principal repayment gradually increases. In other words, the interest portion of each payment will decrease as the loan's remaining principal balance falls.
                        </p>
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader>
                        <CardTitle>Amortizing a Mortgage Faster and Saving Money</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                         <p>
                            Assuming a mortgage agreement allows for faster repayment, a borrower can employ the following techniques to reduce mortgage balances more quickly and save money:
                        </p>
                        <div>
                            <h4 className="font-semibold text-foreground">Increasing Regular Payments</h4>
                            <p>One way to pay off a mortgage faster is to make small additional payments each month. This technique can save borrowers a considerable amount of money. For example, a borrower who has a $150,000 mortgage amortized over 25 years at an interest rate of 5.45% can pay it off 2.5 years sooner by paying an extra $50 a month over the life of the mortgage. This would result in a savings of over $14,000.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Accelerating Payments</h4>
                            <p>Most financial institutions offer several payment frequency options besides making one payment per month. Switching to a more frequent mode of payment, such as biweekly payments, has the effect of a borrower making an extra annual payment. This will result in significant savings on a mortgage.</p>
                        </div>
                         <div>
                            <h4 className="font-semibold text-foreground">Making Lump Sum Payments or Prepayments</h4>
                            <p>A prepayment is a lump sum payment made in addition to regular mortgage installments. These additional payments reduce the outstanding balance of a mortgage, resulting in a shorter mortgage term. The earlier a borrower makes prepayments, the more it reduces the overall interest paid, typically leading to quicker mortgage repayment.</p>
                        </div>
                         <div>
                            <h4 className="font-semibold text-foreground">Refinancing a Mortgage</h4>
                            <p>Refinancing involves replacing an existing mortgage with a new mortgage loan contract. While this usually means a different interest rate and new loan conditions, it also involves a new application, an underwriting process, and a closing, amounting to significant fees and other costs. To evaluate refinancing options, visit our <Link href="/refinance-calculator" className="text-primary hover:underline">Refinance Calculator</Link>.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Drawbacks of Amortizing a Mortgage Faster</CardTitle>
                    </CardHeader>
                     <CardContent className="space-y-4 text-muted-foreground">
                        <p>
                           Before paying back a mortgage early, borrowers should also understand the disadvantages of paying ahead on a mortgage. Overall, mortgage rates are relatively low compared to the interest rates on other loan types such as personal loans or credit cards. Hence, paying ahead on a mortgage means the borrower cannot use the money to invest and make higher returns elsewhere. In other words, a borrower can incur a significant opportunity cost by paying off a mortgage with a 4% interest rate when they could earn a 10% return by investing that money.
                        </p>
                        <p>
                           Prepayment penalties or lost mortgage interest deductions on tax returns are other examples of opportunity costs. Borrowers should consider such factors before making additional payments.
                        </p>
                     </CardContent>
                </Card>
            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/mortgage-payoff-calculator" />
      </div>
    </div>
  );
}
