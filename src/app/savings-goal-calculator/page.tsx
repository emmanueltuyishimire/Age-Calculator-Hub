
import SavingsGoalCalculator from '@/components/calculators/savings-goal-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Savings Goal Calculator – Plan & Track Your Financial Goals',
    description: 'Use our free Savings Goal Calculator to find out how long it will take to reach your financial goals. Plan for a down payment, a new car, or a vacation with our easy-to-use tool.',
    alternates: {
        canonical: '/savings-goal-calculator',
    },
};

const faqs = [
    {
        question: "How long will it take me to save $10,000?",
        answer: "It depends on your starting amount, monthly contribution, and interest rate. Our calculator is designed to give you a precise timeline based on these inputs. Simply enter your numbers to find out."
    },
    {
        question: "What is a realistic annual interest rate to use?",
        answer: "A common estimate for a high-yield savings account is around 4-5%. For long-term investments in a diversified stock market portfolio, a historical average is around 7-10%, but this comes with more risk. It's best to be conservative with your estimate."
    },
    {
        question: "How can I reach my savings goal faster?",
        answer: "There are three main ways: increase your monthly contribution, find a savings account or investment with a higher interest rate, or make a larger initial deposit. Even small increases can significantly shorten your timeline."
    },
    {
        question: "Does this calculator account for taxes on interest?",
        answer: "No, this calculator shows pre-tax growth. The interest earned in regular savings or brokerage accounts may be subject to taxes. Tax-advantaged accounts like a Roth IRA have different rules."
    },
    {
        question: "Can I use this for my retirement goal?",
        answer: "While this tool can give you a general idea, our specialized <a href='/retirement-savings-goal-calculator' class='text-primary hover:underline'>Retirement Savings Goal Calculator</a> is better suited for long-term retirement planning as it considers factors like your current age and retirement age."
    }
];

export default function SavingsGoalCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Savings Goal Calculator</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Whether you're saving for a down payment, a new car, a dream vacation, or an emergency fund, our calculator will show you how long it will take to reach your goal.
                </p>
            </div>

            <SavingsGoalCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use the Savings Goal Calculator</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Set Your Savings Goal:</strong> Enter the total amount you want to save.</li>
                            <li><strong>Enter Your Current Savings:</strong> Input how much you've already saved toward this goal. You can start with 0.</li>
                            <li><strong>Define Your Contribution:</strong> Specify how much you plan to contribute to your savings each month.</li>
                            <li><strong>Estimate Your Interest Rate:</strong> Provide the expected annual percentage yield (APY) on your savings. A high-yield savings account is a good baseline.</li>
                            <li><strong>Click “Calculate Goal”:</strong> Get an instant projection of when you'll reach your goal and see a chart of your savings growth over time.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>The Power of Compound Interest</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">This calculator demonstrates one of the most powerful concepts in finance: compound interest. It’s the interest you earn not just on your initial savings, but also on the accumulated interest. The chart in the results visually breaks down your progress:</p>
                        <ul className="space-y-3 mt-4">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Principal:</strong> This represents the money you personally contribute (your initial savings plus your monthly contributions).</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Interest Earned:</strong> This is the "free money" your savings generate over time. Notice how the interest portion grows faster and faster as your balance increases.</span></li>
                        </ul>
                         <p className="text-muted-foreground mt-4">By starting early and contributing consistently, you give compound interest more time to work its magic, helping you reach your goals significantly faster.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Tips for Reaching Your Savings Goals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>Automate Your Savings:</strong> Set up automatic transfers from your checking account to your savings account each payday. This "pay yourself first" strategy is the most effective way to save consistently.</li>
                            <li><strong>Use a High-Yield Savings Account (HYSA):</strong> Don't let your money sit in a traditional savings account earning close to 0% interest. HYSAs offer significantly higher rates, helping your money grow faster.</li>
                            <li><strong>Track Your Spending:</strong> Use a budgeting app or a simple spreadsheet to see where your money is going. You might find easy places to cut back and redirect that cash toward your goal.</li>
                            <li><strong>Set Realistic, Specific Goals:</strong> A clear goal (e.g., "Save $15,000 for a car down payment in 24 months") is more motivating than a vague one ("Save more money").</li>
                            <li><strong>Celebrate Milestones:</strong> When you hit a savings milestone (like reaching 25% or 50% of your goal), acknowledge your progress to stay motivated.</li>
                        </ul>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md-text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
        <RelatedCalculators currentCategory="Financial Planning" currentHref="/savings-goal-calculator" />
      </div>
    </div>
  );
}
