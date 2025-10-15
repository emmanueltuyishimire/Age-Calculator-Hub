
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { PieChart, Zap, Shield, ArrowRight } from 'lucide-react';

const article = articles.find(a => a.slug === 'understanding-asset-allocation');

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
        question: "What is a simple asset allocation for a beginner?",
        answer: "A common starting point is a target-date fund, which automatically adjusts its allocation based on your planned retirement year. Another simple approach is a 'three-fund portfolio,' which might consist of a total U.S. stock market index fund, a total international stock market index fund, and a total U.S. bond market index fund."
    },
    {
        question: "What is the '110 minus your age' rule?",
        answer: "This is a simple guideline for determining your stock allocation. You subtract your age from 110, and the result is the percentage of your portfolio that should be in stocks. For example, a 30-year-old would have 80% in stocks (110 - 30). It's a rule of thumb, not a hard rule, and it reflects the principle of reducing risk as you age."
    },
    {
        question: "How often should I rebalance my portfolio?",
        answer: "Most financial advisors recommend rebalancing once a year, or whenever your target allocation drifts by more than 5%. For example, if your 80/20 portfolio drifts to 85/15, it's time to sell some stocks and buy some bonds to get back to your target."
    },
    {
        question: "Does this apply to my savings account?",
        answer: "No, asset allocation applies to your investment accounts (like your 401(k) and IRA) where you are taking on market risk for long-term growth. Your emergency fund and short-term savings should be kept in safe, accessible accounts like a <a href='/articles/high-yield-savings-vs-stocks' class='text-primary hover:underline'>high-yield savings account</a>."
    }
];

export default function AssetAllocationPage() {
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
            When it comes to long-term investing, the single most important decision you'll make isn't which hot stock to pick, but how you divide your money among different types of investments. This strategy is called asset allocation, and it's the primary driver of your portfolio's performance over time.
          </p>

          <Card className="my-8 bg-muted border-l-4 border-primary">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <PieChart className="h-8 w-8 text-primary" />
                    <CardTitle>What is Asset Allocation?</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                   Asset allocation is the practice of dividing your investment portfolio among different asset categories, primarily stocks and bonds. The goal is to balance risk and reward by diversifying your holdings. Different asset classes behave differently in various market conditions, so owning a mix can help smooth out your returns.
                </p>
            </CardContent>
          </Card>
          
          <h2 className="text-3xl font-bold">The Two Main Asset Classes</h2>
          <div className="grid md:grid-cols-2 gap-8 my-8">
             <Card className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Zap className="h-8 w-8 text-primary" />
                        <CardTitle>Stocks (Equities)</CardTitle>
                    </div>
                    <CardDescription>The Engine of Growth</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p>Stocks represent ownership in a company. They offer the highest potential for long-term growth but also come with the most volatility (risk). They are the "gas pedal" of your portfolio.</p>
                </CardContent>
            </Card>
            <Card className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Shield className="h-8 w-8 text-primary" />
                        <CardTitle>Bonds (Fixed Income)</CardTitle>
                    </div>
                    <CardDescription>The Shock Absorber</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                     <p>Bonds are essentially loans you make to a government or corporation in exchange for regular interest payments. They are less risky than stocks and provide stability to your portfolio. They are the "brakes" of your portfolio.</p>
                </CardContent>
            </Card>
          </div>

          <h2 className="text-3xl font-bold">How to Determine Your Allocation</h2>
          <p>Your ideal asset allocation depends almost entirely on your **time horizon** (when you'll need the money) and your **risk tolerance**.</p>
           <div className="flex items-center gap-4 my-4">
                <p className="text-xl font-bold">Younger Investor (e.g., in their 20s or 30s)</p>
                <ArrowRight className="h-6 w-6 text-primary shrink-0" />
                <p className="text-xl font-bold">More Aggressive (e.g., 80-90% Stocks)</p>
           </div>
            <p className="text-muted-foreground">A younger investor has decades until retirement, so they can afford to take on more risk for higher growth potential. They have plenty of time to recover from market downturns.</p>

            <div className="flex items-center gap-4 my-4">
                <p className="text-xl font-bold">Older Investor (e.g., nearing retirement)</p>
                <ArrowRight className="h-6 w-6 text-primary shrink-0" />
                <p className="text-xl font-bold">More Conservative (e.g., 50-60% Stocks)</p>
           </div>
            <p className="text-muted-foreground">An investor nearing retirement needs to protect their accumulated savings. They shift more of their portfolio to bonds to reduce volatility and preserve capital.</p>


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
