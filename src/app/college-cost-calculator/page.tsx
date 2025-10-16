
import CollegeCostCalculator from '@/components/calculators/college-cost-calculator';
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

export const metadata: Metadata = {
    title: 'College Cost Calculator – Estimate Future Tuition & Savings',
    description: 'Use our free College Cost Calculator to estimate the future cost of college and how much you need to save. Factor in tuition, inflation, savings, and investment returns.',
    alternates: {
        canonical: '/college-cost-calculator',
    },
};

const collegeCosts = [
    { type: '4-year private', cost: '$62,990' },
    { type: '4-year public (in-state)', cost: '$29,910' },
    { type: '4-year public (out-of-state)', cost: '$49,080' },
    { type: '2-year public', cost: '$20,570' },
];

export default function CollegeCostCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">College Cost Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    The College Cost Calculator can help determine rough estimates of what to expect from college costs, and in turn, how much to begin budgeting for it. To estimate the costs of more specific colleges, the College Navigator can be used to get more precise annual college costs data. This calculator is mainly intended for use in the U.S.
                </p>
            </div>

            <CollegeCostCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>Related Calculators</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/student-loan-calculator" className="text-primary hover:underline">Student Loan Calculator</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                
                 <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Average Annual U.S. College Cost, Including Tuition, Fee, and Living Cost for 2024-2025</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>School Type</TableHead>
                                <TableHead className="text-right">Average Annual Cost</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {collegeCosts.map((item) => (
                                <TableRow key={item.type}>
                                    <TableCell className="font-medium">{item.type}</TableCell>
                                    <TableCell className="text-right">{item.cost}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                     <p className="text-xs text-muted-foreground mt-2">Source: The College Board</p>
                </div>

                <Card>
                    <CardHeader><CardTitle>College-Specific Net Price Calculators</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            It is now required under U.S. law that every college and university have their own net price calculator available on college websites. They all serve the same purpose, which is to help students estimate how much it costs to attend a specific college. Usually, it requires spending several minutes filling out basic student information, sometimes requiring documents such as tax returns and W2s, or academic information such as SAT scores and GPA; some will be more comprehensive than others. It's important to use these calculators only as rough estimates of the amount required for each prospective institution because although they often consider potential to receive financial aid, there are many other considerations that aren't accounted for. In addition, many of the calculators do things differently, so it can help prospective students to be precise when computing final figures for comparison. The College Cost Calculator above can be used in conjunction with official college net price calculators to figure out the cost of attending college.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Higher Education in the U.S.</CardTitle></CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>50 years ago, only 10% of the population attended college, mainly because it was generally reserved for a privileged few, and high school education was sufficient to enter the job market and build a comfortable career. Due to many different factors, this is no longer the case today, and the percentage of the population that has a college education has risen to more than 65%. In this period of time, the cost of tuition skyrocketed and continues to do so. In the U.S., total student loan debt is twice the amount of total credit card debt.</p>
                        <p>On average, students that graduate with college degrees earn significantly more throughout their lifetime and are more likely to hold a job than those with only a high school degree. In addition, jobs that require at least a bachelor's degree tend to have benefits such as healthcare, retirement investment accounts, and other perks. There are many other benefits that come with higher education; college graduates have lower smoking rates (leading to a healthier life), show fewer symptoms of depression, and participate in exercise more regularly than people who do not graduate from college. While the debt of student loans can be burdensome, it should be weighed against the benefits that come with higher education.</p>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader><CardTitle>Financial Aid</CardTitle></CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Although the cost of higher education in the U.S. is increasing, financial aid exists to help students and their families pay for college. Most colleges will require that students apply for financial aid before they are admitted. There are four basic types of financial aid: grants, loans, scholarships, or work-studies, and students are generally allowed to use any combination of them all.</p>
                        <div><h4 className="font-semibold text-foreground">529 Savings Plan</h4><p>One method of saving for college education is through a 529 Savings Plan, which is a college savings account that can be opened at any point. Contributions are not federally tax-deductible, but earnings grow tax-free and are not taxed on withdrawal when used for qualified education expenses. This makes it a powerful tool for college savings, and why our calculator allows for a 0% tax rate on investment returns for these plans.</p></div>
                    </CardContent>
                </Card>
            </section>
        </main>
      </div>
    </div>
  );
}
