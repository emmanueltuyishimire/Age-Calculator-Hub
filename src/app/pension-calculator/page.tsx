
import PensionCalculator from '@/components/calculators/pension-calculator';
import { type Metadata } from 'next';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Pension Calculator – Lump Sum, Survivor Benefits & Payoff Options',
    description: 'A free Pension Calculator to evaluate common retirement decisions. Compare lump sum vs. monthly income, single-life vs. joint-and-survivor plans, and the benefit of working longer.',
    alternates: {
        canonical: '/pension-calculator',
    },
};

export default function PensionCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Pension Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    A suite of tools to help you evaluate common pension-related decisions, from lump sum payouts to survivor benefits.
                </p>
            </div>

            <PensionCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>What is a Pension?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Traditionally, employee pensions are funds that employers contribute to as a benefit for their employees. Upon retirement, money can be drawn from a pension pot or sold to an insurance company to be distributed as periodic payments until death (a life annuity). In many modern instances, the term "pension" is used interchangeably with the term "retirement plan" rather than as a form of it.
                        </p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Defined-Benefit (DB) vs. Defined-Contribution (DC) Plans</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg">Defined-Benefit (DB) Plan</h3>
                            <p className="text-muted-foreground">This is the traditional pension plan. Employers guarantee employees a defined benefit upon retirement, based on factors like age, earnings history, and years of service. The employer bears the investment risk. Social Security is the most common example of a DB plan in the U.S.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Defined-Contribution (DC) Plan</h3>
                            <p className="text-muted-foreground">In this plan (e.g., a 401(k) or 403(b)), both employers and employees can contribute. The final retirement amount is not guaranteed and depends on the contributions and investment performance. The employee bears the investment risk but has more control and portability.</p>
                        </div>
                         <p className="text-muted-foreground">The calculators on this page are primarily designed for evaluating scenarios related to Defined-Benefit plans.</p>
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader>
                        <CardTitle>Lump Sum vs. Monthly Benefit Payout</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            One of the biggest pension decisions is whether to take your benefit as a one-time lump sum or as a guaranteed monthly payment for life. A monthly payment provides security against outliving your money, while a lump sum offers flexibility and the potential to leave an inheritance (by rolling it into an IRA). Our first calculator helps you compare the financial outcomes of these two choices based on your investment assumptions.
                        </p>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Single-Life or Joint-and-Survivor Plans?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           If you choose monthly payments, you often have to decide between a single-life plan and a joint-and-survivor plan. A single-life plan provides a higher monthly payment but stops when you die. A joint-and-survivor plan provides a lower monthly payment but continues to pay a benefit to your surviving spouse. Our second calculator helps you analyze the total lifetime payout of each option to make an informed decision.
                        </p>
                    </CardContent>
                </Card>

            </section>
        </main>
        <RelatedCalculators currentCategory="Financial" currentHref="/pension-calculator" />
      </div>
    </div>
  );
}
