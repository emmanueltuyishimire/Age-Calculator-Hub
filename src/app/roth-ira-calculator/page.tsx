
import RothIraCalculator from '@/components/calculators/roth-ira-calculator';
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
    title: 'Roth IRA Calculator – Compare with Taxable Savings',
    description: 'Use our free Roth IRA Calculator to estimate the future value of your retirement savings and compare it against a regular taxable investment account. See the power of tax-free growth.',
    alternates: {
        canonical: '/roth-ira-calculator',
    },
};

export default function RothIraCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Roth IRA Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    This calculator estimates the balances of Roth IRA savings and compares them with a regular taxable account. It is mainly intended for use by U.S. residents.
                </p>
            </div>

            <RothIraCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Related Calculators</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/retirement-savings-goal-calculator" className="text-primary hover:underline">Retirement Savings Goal Calculator</Link></li>
                            <li><Link href="/investment-calculator" className="text-primary hover:underline">Investment Calculator</Link></li>
                            <li><Link href="/annuity-payout-calculator" className="text-primary hover:underline">Annuity Payout Calculator</Link></li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>What is a Roth IRA?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>A Roth IRA is a type of Individual Retirement Arrangement (IRA) that provides tax-free growth and tax-free income in retirement. The major difference between Roth IRAs and traditional IRAs is that contributions to the former are not tax-deductible, and contributions (not earnings) may be withdrawn tax-free at any time without penalty. Roth IRA was first introduced and established by the Taxpayer Relief Act of 1997 and is named after Senator William Roth.</p>
                        <p>Roth IRA accounts can be opened at many different institutions, from the largest, most well-known financial companies, to online-only investment companies and financial service firms. The IRS regulates all of these institutions, and all of them must meet certain requirements, but each can still have its own differentiating perks.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Roth IRA Contributions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <ul className="list-disc list-inside space-y-2">
                           <li>Made using after-tax dollars.</li>
                           <li>Not tax-deductible. However, there is a tax credit, the Saver's Tax Credit, on IRS Form 8880 that can be claimed for up to 50% on the first $2,000 in contributions.</li>
                           <li>Contributions can be withdrawn tax-free at any time without penalty. However, earnings withdrawn may be subject to tax and/or penalty if withdrawn before the account holder is 59½ years old or if the account is less than five years old.</li>
                           <li>People with incomes above certain thresholds cannot qualify to make Roth IRA contributions. For the 2025 tax year, the threshold is anything above an adjusted gross income of $165,000 (up from $161,000 in 2024) for those filing as single or head-of-household. For those who are married and filing jointly, the amount is increased to an adjusted gross income of $246,000 (up from $240,000 in 2024). Furthermore, to qualify to make Roth IRA contributions, filers must have earned income (i.e. wages, tips, bonuses, self-employment income) in the year contributions are made.</li>
                           <li>The contribution limit in 2025 for those aged 49 and below is $7,000. For those aged 50 and above, the limit is $8,000.</li>
                           <li>Contributions for a given tax year can be made to a Roth IRA up until taxes are filed in April of the next year.</li>
                        </ul>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Roth IRA Distribution Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <ul className="list-disc list-inside space-y-2">
                            <li>Direct contributions can be withdrawn tax-free and penalty-free anytime.</li>
                            <li>Concerning Roth IRAs five years or older, tax-free and penalty-free withdrawal on earnings can occur after the age of 59 ½.</li>
                            <li>Withdrawals on earnings from Roth IRAs that are less than five years old are subject to both taxes and penalties. However, given a number of situations (listed below), it is possible to avoid a penalty, but not the taxes, on accounts less than five years old as long as any one (or more) of the conditions below is met. For accounts older than five years old, these same conditions apply and result in a tax only if none of the conditions are met, or neither a tax nor a penalty if any one of the conditions is met.
                                <ul className="list-disc list-inside pl-6 mt-2">
                                    <li>The account holder is 59 ½ or older.</li>
                                    <li>The account holder becomes disabled.</li>
                                    <li>The money is being used for a first-time home purchase up to a $10,000 lifetime maximum, to pay for qualified education expenses, to pay the beneficiary after the death of the account holder, or to pay for unreimbursed medical expenses or health insurance during unemployment.</li>
                                </ul>
                            </li>
                            <li>There is no required minimum distribution (RMD) for Roth IRAs (unlike those required for traditional IRAs or 401(k)s). Roth IRAs are the only tax-sheltered retirement plans that do not impose RMDs.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Pros and Cons of Roth IRAs</CardTitle>
                    </CardHeader>
                     <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-foreground">Pros</h4>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li><strong>Free withdrawals on contributions:</strong> Because contributions are made with after-tax dollars, they can be withdrawn at any time tax-free and penalty-free.</li>
                                <li><strong>Liquidity:</strong> This withdrawal flexibility allows a Roth IRA to double as an emergency fund, though it's best used for retirement.</li>
                                <li><strong>Tax-Free Retirement Income:</strong> Qualified distributions in retirement are not taxed.</li>
                                <li><strong>Investment Options:</strong> Many investment options are available through various financial institutions.</li>
                                <li><strong>Heir-friendly:</strong> Inherited Roth IRAs are not subject to income tax for beneficiaries.</li>
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold text-foreground">Cons</h4>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li><strong>Taxes are paid upfront:</strong> Contributions are made with after-tax dollars, so there's no immediate tax deduction.</li>
                                <li><strong>Low contribution limit:</strong> Annual contribution limits are much lower than for employer-sponsored plans like 401(k)s.</li>
                                <li><strong>Income limit:</strong> High-income earners are prohibited from contributing directly.</li>
                                <li><strong>Minimum holding period:</strong> To withdraw earnings tax-free, the account must be at least five years old.</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
        <RelatedCalculators currentCategory="Retirement & Social Security" currentHref="/roth-ira-calculator" />
      </div>
    </div>
  );
}
