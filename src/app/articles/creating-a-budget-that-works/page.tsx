
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

const article = articles.find(a => a.slug === 'creating-a-budget-that-works');

export function generateMetadata(): Metadata {
  if (!article) {
    return {};
  }
  return {
    title: article.title,
    description: article.description,
    alternates: {
        canonical: `/articles/${article.slug}`,
    },
  };
}

const faqs = [
    {
        question: "What is the 50/30/20 rule?",
        answer: "It's a simple budgeting framework that allocates 50% of your after-tax income to Needs (housing, utilities, transportation), 30% to Wants (dining out, hobbies, entertainment), and 20% to Savings & Debt Repayment."
    },
    {
        question: "What if my 'Needs' are more than 50% of my income?",
        answer: "This is common, especially in high cost-of-living areas. In this case, you'll need to reduce your 'Wants' category to compensate. The key is to always prioritize the 20% for savings and debt repayment."
    },
    {
        question: "Is paying off debt considered 'Savings'?",
        answer: "Yes, in the 50/30/20 rule, the 20% category covers both saving for the future and paying down past debt (beyond minimum payments). Paying off high-interest debt is one of the best 'investments' you can make. See how extra payments help with our <a href='/loan-payoff-calculator' class='text-primary hover:underline'>Loan Payoff Calculator</a>."
    },
    {
        question: "I've tried budgeting before and failed. What can I do differently?",
        answer: "The key is to find a method that works for you. Start simple. Don't try to track every penny. Automate your savings by setting up direct transfers on payday. And remember, a budget is not a straitjacket; it's a plan. It's okay to adjust it as you go."
    }
];


export default function BudgetingGuidePage() {
  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <article className="prose dark:prose-invert lg:prose-xl max-w-none">
          <div className="text-center mb-12">
            <p className="text-base text-primary font-semibold">{article.category}</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{article.title}</h1>
            <p className="text-md md:text-lg text-muted-foreground">
              {article.description}
            </p>
          </div>

          <p className="lead">
            A budget isn't about restricting yourself; it's about empowering yourself. It's a plan that gives you control over your money, allowing you to direct it toward what's most important to you. The most effective budgets are simple and sustainable. One of the most popular and effective frameworks is the 50/30/20 rule.
          </p>

          <h2 className="text-3xl font-bold">The 50/30/20 Rule Explained</h2>
          <Card className="my-8 bg-muted border-l-4 border-primary">
            <CardHeader>
                <CardTitle className="text-center">How to Divide Your After-Tax Income</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                    <p className="text-4xl font-bold text-primary">50%</p>
                    <p className="font-semibold">Needs</p>
                    <p className="text-sm text-muted-foreground">Essentials like housing, utilities, groceries, and transportation.</p>
                </div>
                 <div>
                    <p className="text-4xl font-bold text-primary">30%</p>
                    <p className="font-semibold">Wants</p>
                    <p className="text-sm text-muted-foreground">Lifestyle choices like dining out, hobbies, and entertainment.</p>
                </div>
                 <div>
                    <p className="text-4xl font-bold text-primary">20%</p>
                    <p className="font-semibold">Savings & Debt</p>
                    <p className="text-sm text-muted-foreground">Investing, saving for goals, and extra debt payments.</p>
                </div>
            </CardContent>
          </Card>
          
          <h2 className="text-3xl font-bold">How to Create Your Budget in 3 Simple Steps</h2>
           <ul className="space-y-4">
              <li className="flex items-start"><span className="text-primary font-bold text-2xl mr-4">1.</span><div><h3 className="font-bold text-xl m-0">Calculate Your After-Tax Income</h3><p className="text-muted-foreground m-0">This is your take-home pay. If you have a regular salary, this is easy. If your income varies, use an average of the last few months. Our guide to <Link href="/articles/understanding-your-paycheck" className="font-bold text-primary hover:underline">understanding your paycheck</Link> can help.</p></div></li>
              <li className="flex items-start"><span className="text-primary font-bold text-2xl mr-4">2.</span><div><h3 className="font-bold text-xl m-0">Track Your Spending</h3><p className="text-muted-foreground m-0">For one month, track where your money goes. Use a budgeting app or just a simple notebook. At the end of the month, categorize your spending into Needs, Wants, and Savings/Debt to see how it aligns with the 50/30/20 guideline.</p></div></li>
              <li className="flex items-start"><span className="text-primary font-bold text-2xl mr-4">3.</span><div><h3 className="font-bold text-xl m-0">Automate and Adjust</h3><p className="text-muted-foreground m-0">The most important step is to "pay yourself first." Set up automatic transfers to your savings and investment accounts for the 20% portion. If your spending doesn't align with the 50/30/20 rule, find areas in the "Wants" category to cut back. Use our <Link href="/savings-goal-calculator" className="font-bold text-primary hover:underline">Savings Goal Calculator</Link> to see how these contributions add up.</p></div></li>
           </ul>


           <h2 className="text-3xl font-bold text-center mt-12 mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base">
                           <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </article>
      </main>
    </div>
  );
}
