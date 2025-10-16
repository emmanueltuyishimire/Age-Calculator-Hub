
import RmdCalculator from '@/components/calculators/rmd-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'RMD Calculator – Required Minimum Distribution',
    description: 'Use our free Required Minimum Distribution (RMD) Calculator to estimate the minimum amount you must withdraw from your retirement accounts each year after age 73.',
    alternates: {
        canonical: '/rmd-calculator',
    },
};

export default function RmdCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">RMD Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Once a person reaches the age of 73, the IRS requires retirement account holders to withdraw a minimum amount of money each year – this amount is referred to as the Required Minimum Distribution (RMD). This calculator calculates the RMD depending on your age and account balance. The calculations are based on the IRS Publication 590-B, so the calculator is intended for residents of the United States only.
                </p>
            </div>

            <RmdCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>RMDs: Required Minimum Distributions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>A required minimum distribution (RMD) is the minimum amount the IRS mandates you to withdraw from certain tax-deferred retirement accounts. The specific amount varies based on your account balance and life expectancy as determined by the IRS. As you withdraw your RMD, you will also pay taxes. (Note that RMDs are just that: required minimum distributions. So, if you need to pull more money from your accounts after reaching retirement age, you can.)</p>
                        
                        <h4 className="font-semibold text-foreground pt-2">Important Dates for Taking RMDs</h4>
                        <p>You're required to take your first RMD by April 1st in the calendar year after you turn 73. This age was increased from 72 due to the passage of the SECURE Act 2.0 in December 2022. It is scheduled to increase again to 75 in 2033. Prior to 2019, the RMD age was 70.5. It was then increased to 72 due to the passage of the SECURE Act in 2019.</p>
                        <p>Technically RMDs are due every December 31, but the IRS allows you to delay the first withdrawal. If you take this route, you'll have to take a second RMD before December 31. Taking two RMDs in one year creates two taxable events – and might even push you into a higher tax bracket.</p>
                        
                        <h4 className="font-semibold text-foreground pt-2">How to Delay RMD Deadlines</h4>
                        <p>Another way to delay your RMD is by continuing employment at the company that sponsors your retirement account after your 73rd birthday. Assuming you own less than 5% of the company in question, you can delay your first RMD until retirement. That said, you'll still have to take RMDs from any other retirement accounts you have, such as IRA account. And once you leave the company, the RMD mandate kicks in for that account, too.</p>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>How RMDs are Calculated</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Calculating your RMD follows these steps based on IRS guidelines:</p>
                        <ol className="list-decimal list-inside ml-4 space-y-1">
                            <li>Determine the individual retirement account balance as of December 31 of the prior year.</li>
                            <li>Find the distribution period (or "life expectancy") that corresponds to your age on the appropriate IRS table.</li>
                            <li>Divide #1 by #2 to determine your RMD amount.</li>
                        </ol>
                        <p>The exact IRS table you'll need depends on your marital or inheritance situation. If you're married to a spouse over ten years younger and they're your sole beneficiary, you'll use the IRS Joint Life and Last Survivor Expectancy Table. Otherwise, you'll use the Uniform Lifetime Table.</p>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>What Accounts Do RMDs Apply to?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Most tax-advantaged and defined contribution retirement accounts impose RMD requirements. These include:</p>
                         <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>Traditional IRAs, SEP IRAs, SIMPLE IRAs</li>
                            <li>Traditional 401(k), 403(b), and 457(b) plans</li>
                            <li>Profit-sharing plans</li>
                        </ul>
                        <p>A notable exception is for Roth IRAs, which don't require RMDs for the original owner.</p>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Penalties and Taxes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                         <h4 className="font-semibold text-foreground">What Happens If You Don't Take RMDs?</h4>
                         <p>The IRS charges a 25% excise tax on the undistributed amount. If the mistake is corrected during a two-year "correction window", the penalty can be further reduced to 10%.</p>
                        <h4 className="font-semibold text-foreground pt-2">RMDs and Taxes</h4>
                        <p>RMDs are generally taxed as ordinary income at the state and federal levels. If you're working or withdrawing from other accounts, RMDs may push you into a higher tax bracket.</p>
                        <h4 className="font-semibold text-foreground pt-2">Minimizing Taxes on RMDs</h4>
                        <p>A qualified charitable distribution (QCD) allows you to donate your RMD directly to charity. This satisfies your RMD and the distribution is not included in your taxable income.</p>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Inherited RMDs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>When you inherit a retirement account, the rules vary based on your relationship with the original owner. Generally, non-spouse beneficiaries must distribute the full amount of the IRA within ten years after the original accountholder's death. Surviving spouses have more options, such as rolling the funds into their own IRA. These rules are complex, and consulting a financial advisor is recommended.</p>
                    </CardContent>
                </Card>

            </section>
        </main>
        <RelatedCalculators currentCategory="Financial" currentHref="/rmd-calculator" />
      </div>
    </div>
  );
}
