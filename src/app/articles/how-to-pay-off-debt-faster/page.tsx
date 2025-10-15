
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';

const article = articles.find(a => a.slug === 'how-to-pay-off-debt-faster');

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
        question: "Does making an extra payment actually make a big difference?",
        answer: "Yes, it makes a huge difference. Every dollar of an extra payment goes directly to reducing your principal. This means you stop paying interest on that portion of the loan for the rest of its term. Over years, this can save you thousands and help you become debt-free much sooner."
    },
    {
        question: "Should I pay off high-interest debt or low-interest debt first?",
        answer: "Mathematically, you'll save the most money by prioritizing high-interest debt (like credit cards). This is called the 'debt avalanche' method. However, some people prefer the 'debt snowball' method—paying off the smallest debts first for psychological wins. Both are effective strategies."
    },
    {
        question: "How do I make an 'extra' payment? Do I just send more money?",
        answer: "It's crucial to specify that the extra amount is to be applied directly to the principal. If you don't, the lender might just apply it to your next month's payment. Most online loan portals have a specific option for 'principal-only' payments."
    },
    {
        question: "Is it better to make one large extra payment a year or smaller extra payments each month?",
        answer: "Smaller, consistent extra payments each month are generally more effective. This is because you reduce the principal sooner, and the interest for the following month is calculated on a smaller balance. It also builds a consistent habit."
    }
];

const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article?.title,
    "description": article?.description,
    "datePublished": article?.publishedDate,
    "author": {
        "@type": "Organization",
        "name": "Calculator Hub"
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
};

export default function LoanPayoffArticlePage() {
  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
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
            Being in debt can feel like running a race with weights on your ankles. Every month, a chunk of your hard-earned money goes to interest instead of building your wealth. But what if you could accelerate your journey to the finish line? The single most powerful tool at your disposal is making extra payments.
          </p>
          <p>
            This guide will explain the simple but profound impact of extra payments, show you how to visualize their effect, and provide actionable strategies to become debt-free years sooner.
          </p>
          
          <div className="my-10 text-center">
            <Link href="/loan-payoff-calculator">
                <Button size="lg" className="text-lg">Calculate Your Payoff Date</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">See how extra payments change your debt-free date.</p>
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-8">How Amortization Works (and How to Beat It)</h2>
          <p>Most loans, like mortgages and car loans, are 'amortizing'. This means your fixed monthly payment is split between two buckets: principal (the money you actually borrowed) and interest (the lender's profit).</p>
          <p>In the early years of a loan, a huge portion of your payment goes to interest. As you pay down the principal, the interest portion shrinks, and more of your payment goes toward the actual debt. This is why the last few years of a mortgage feel so powerful—almost every dollar is going toward building your equity.</p>
          <p><strong>The secret is to attack the principal directly.</strong> When you make an extra payment, you must specify that it should be applied to the principal. This reduces the balance on which future interest is calculated, creating a snowball effect that shortens your loan term and saves you a significant amount of money.</p>

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>Visualize the Impact</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                   The best way to get motivated is to see the numbers for yourself. Use our <Link href="/loan-payoff-calculator" className="font-bold text-primary hover:underline">Loan Payoff Calculator</Link> to input your current loan details. First, see your current payoff date. Then, add a hypothetical extra monthly payment—even just $50 or $100—and watch how many months or years it shaves off your loan.
                </p>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold">Actionable Strategies for Making Extra Payments</h2>
            <ul className="list-disc list-inside space-y-3 my-4">
                <li><strong>The 'Round Up' Method:</strong> If your monthly payment is $455, round it up to $500. That extra $45 a month makes a big difference over time.</li>
                <li><strong>The 'Bi-Weekly' Method:</strong> Make half of your monthly payment every two weeks. This results in 26 half-payments a year, which equals 13 full monthly payments—one extra payment per year, effortlessly.</li>
                <li><strong>The 'Windfall' Method:</strong> Whenever you receive unexpected money—a bonus, a tax refund, or a gift—apply a portion or all of it directly to your loan's principal.</li>
                <li><strong>The 'Snowball' or 'Avalanche' Method:</strong> If you have multiple debts, focus on paying off one at a time. Once it's paid off, roll that entire payment amount into the next debt, creating a "snowball" of payments that accelerates your progress. For more on this, read our <Link href="/articles/debt-snowball-vs-avalanche" className="text-primary hover:underline">guide on debt payoff strategies</Link>.</li>
            </ul>

           <h2 className="text-3xl font-bold text-center mt-12 mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base">
                           <p>{faq.answer}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </article>
      </main>
    </div>
  );
}
