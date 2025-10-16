
import LoanCalculator from '@/components/calculators/loan-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Loan Calculator – Amortized, Deferred Payment & Bond Loans',
    description: 'Use our free Loan Calculator for various loan types. Calculate payments for amortized loans (mortgages, auto), lump sum payments for deferred loans, and present value for bonds.',
    alternates: {
        canonical: '/loan-calculator',
    },
};

export default function LoanCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Loan Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    A loan is a contract between a borrower and a lender in which the borrower receives an amount of money (principal) that they are obligated to pay back in the future. Most loans can be categorized into one of three categories.
                </p>
            </div>

            <LoanCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Amortized Loan: Fixed Amount Paid Periodically</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Many consumer loans fall into this category of loans that have regular payments that are amortized uniformly over their lifetime. Routine payments are made on principal and interest until the loan reaches maturity (is entirely paid off). Some of the most familiar amortized loans include mortgages, car loans, student loans, and personal loans. The word "loan" will probably refer to this type in everyday conversation, not the type in the second or third calculation. Below are links to calculators related to loans that fall under this category, which can provide more information or allow specific calculations involving each type of loan. Instead of using this Loan Calculator, it may be more useful to use any of the following for each specific need:
                        </p>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <Link href="/mortgage-calculator" className="text-primary hover:underline">Mortgage Calculator</Link>
                            <Link href="/auto-loan-calculator" className="text-primary hover:underline">Auto Loan Calculator</Link>
                            <Link href="/student-loan-calculator" className="text-primary hover:underline">Student Loan Calculator</Link>
                            <Link href="/fha-loan-calculator" className="text-primary hover:underline">FHA Loan Calculator</Link>
                            <Link href="/compound-interest-calculator" className="text-primary hover:underline">Investment Calculator</Link>
                            <Link href="/payment-calculator" className="text-primary hover:underline">Personal Loan Calculator</Link>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Deferred Payment Loan: Single Lump Sum Due at Loan Maturity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Many commercial loans or short-term loans are in this category. Unlike the first calculation, which is amortized with payments spread uniformly over their lifetimes, these loans have a single, large lump sum due at maturity. Some loans, such as balloon loans, can also have smaller routine payments during their lifetimes, but this calculation only works for loans with a single payment of all principal and interest due at maturity.
                        </p>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Bond: Predetermined Lump Sum Paid at Loan Maturity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            This kind of loan is rarely made except in the form of bonds. Technically, bonds operate differently from more conventional loans in that borrowers make a predetermined payment at maturity. The face, or par value of a bond, is the amount paid by the issuer (borrower) when the bond matures, assuming the borrower doesn't default. Face value denotes the amount received at maturity.
                        </p>
                         <p className="text-muted-foreground mt-2">
                            Two common bond types are coupon and zero-coupon bonds. With coupon bonds, lenders base coupon interest payments on a percentage of the face value. Coupon interest payments occur at predetermined intervals, usually annually or semi-annually. Zero-coupon bonds do not pay interest directly. Instead, borrowers sell bonds at a deep discount to their face value, then pay the face value when the bond matures. Users should note that the calculator above runs calculations for zero-coupon bonds.
                        </p>
                         <p className="text-muted-foreground mt-2">
                           After a borrower issues a bond, its value will fluctuate based on interest rates, market forces, and many other factors. While this does not change the bond's value at maturity, a bond's market price can still vary during its lifetime.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Loan Basics for Borrowers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <div>
                            <h3 className="font-semibold text-foreground">Interest Rate</h3>
                            <p>Nearly all loan structures include interest, which is the profit that banks or lenders make on loans. Interest rate is the percentage of a loan paid by borrowers to lenders. For most loans, interest is paid in addition to principal repayment. Loan interest is usually expressed in APR, or annual percentage rate, which includes both interest and fees. The rate usually published by banks for saving accounts, money market accounts, and CDs is the annual percentage yield, or APY. It is important to understand the difference between APR and APY. Borrowers seeking loans can calculate the actual interest paid to lenders based on their advertised rates by using the <Link href="/interest-rate-calculator" className="text-primary hover:underline">Interest Calculator</Link>. For more information about or to do calculations involving APR, please visit the APR Calculator.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">Compounding Frequency</h3>
                            <p>Compound interest is interest that is earned not only on the initial principal but also on accumulated interest from previous periods. Generally, the more frequently compounding occurs, the higher the total amount due on the loan. In most loans, compounding occurs monthly. Use the <Link href="/articles/the-power-of-compound-interest" className="text-primary hover:underline">Compound Interest Calculator</Link> to learn more about or do calculations involving compound interest.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">Loan Term</h3>
                            <p>A loan term is the duration of the loan, given that required minimum payments are made each month. The term of the loan can affect the structure of the loan in many ways. Generally, the longer the term, the more interest will be accrued over time, raising the total cost of the loan for borrowers, but reducing the periodic payments.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Consumer Loans</CardTitle>
                        <CardDescription>There are two basic kinds of consumer loans: secured or unsecured.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <div>
                            <h3 className="font-semibold text-foreground">Secured Loans</h3>
                            <p>A secured loan means that the borrower has put up some asset as a form of collateral before being granted a loan. The lender is issued a lien, which is a right to possession of property belonging to another person until a debt is paid. In other words, defaulting on a secured loan will give the loan issuer the legal ability to seize the asset that was put up as collateral. The most common secured loans are mortgages and auto loans.</p>
                        </div>
                         <div>
                            <h3 className="font-semibold text-foreground">Unsecured Loans</h3>
                            <p>An unsecured loan is an agreement to pay a loan back without collateral. Because there is no collateral involved, lenders need a way to verify the financial integrity of their borrowers. This can be achieved through the five C's of credit: Character, Capacity, Capital, Collateral, and Conditions. Unsecured loans generally feature higher interest rates, lower borrowing limits, and shorter repayment terms than secured loans.</p>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Calculators" currentHref="/loan-calculator" />
      </div>
    </div>
  );
}
