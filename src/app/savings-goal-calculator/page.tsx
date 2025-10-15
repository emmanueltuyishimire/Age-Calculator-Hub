
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
    title: 'Savings Goal Calculator – What to Save Monthly, Daily & Hourly',
    description: 'Use our free Savings Goal Calculator to find out how much you need to save monthly, daily, and hourly to reach your financial goals by a specific date. Plan your savings with actionable steps.',
    alternates: {
        canonical: '/savings-goal-calculator',
    },
};

const faqs = [
    {
        question: "How much should I save per month for a $10,000 goal?",
        answer: "It depends on your timeframe. Use our calculator to get a precise answer. Simply enter $10,000 as your goal, your current savings, and your target date to see the required monthly, daily, and even hourly savings amount."
    },
    {
        question: "What is a realistic annual interest rate to use?",
        answer: "For a high-yield savings account, an APY of 4-5% is a common estimate today. For long-term investments in a diversified stock market portfolio, a historical average is around 7-10%, but this comes with more risk and is not guaranteed. It's often wise to be conservative with your estimate."
    },
    {
        question: "How can I reach my savings goal if the required contribution is too high?",
        answer: "If the required amount is too high, you have a few options: extend your target date to give yourself more time, find a savings or investment account with a higher interest rate, or look for ways to increase your income or reduce expenses to free up more cash for saving."
    },
    {
        question: "Does this calculator account for taxes on interest?",
        answer: "No, this calculator shows pre-tax growth. The interest earned in regular savings or brokerage accounts may be subject to taxes. Tax-advantaged accounts like a Roth IRA or 401(k) have different rules."
    },
    {
        question: "Can I use this for my retirement goal?",
        answer: "While this tool can give you a general idea, our specialized <a href='/retirement-savings-goal-calculator' class='text-primary hover:underline'>Retirement Savings Goal Calculator</a> is better suited for long-term retirement planning as it considers factors like your current age, retirement age, and desired income."
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
                    Have a financial goal? Find out exactly how much you need to save per month, day, and even hour to reach it by your target date.
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
                            <li><strong>Set Your Target Date:</strong> Choose the date by which you want to achieve your goal.</li>
                            <li><strong>Estimate Your Interest Rate:</strong> Provide the expected annual percentage yield (APY) on your savings.</li>
                            <li><strong>Click “Calculate”:</strong> Get an instant breakdown of the required savings on a monthly, daily, and hourly basis.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Making Your Goal Actionable</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">Seeing a large savings goal can be intimidating. This tool breaks it down into actionable steps. Seeing that you need to save '$X per day' or '$Y per hour' of your working time can make the goal feel much more manageable and helps you contextualize your spending habits.</p>
                        <ul className="space-y-3 mt-4">
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Daily Savings:</strong> This number can help you make better daily spending decisions. Can you skip a coffee or pack a lunch to meet your daily target?</span></li>
                            <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span><strong>Monthly Savings:</strong> This is the most important number for budgeting. Set up an automatic transfer for this amount from your checking to your savings account each month.</span></li>
                        </ul>
                         <p className="text-muted-foreground mt-4">By starting early and contributing consistently, you give compound interest more time to work its magic, reducing the amount you need to save out of pocket.</p>
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
                            <li><strong>Set Realistic, Specific Goals:</strong> A clear goal (e.g., "Save $15,000 for a car down payment by June 2026") is more motivating than a vague one ("Save more money").</li>
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
