
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';

const article = articles.find(a => a.slug === 'planning-for-retirement-at-any-age');

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

const decades = [
    { 
        title: "In Your 20s: The Power of Compounding", 
        content: "This is the most powerful decade for retirement saving, not because of the amount you save, but because of the time your money has to grow. Thanks to compound interest, every dollar you invest now can grow exponentially. Your primary goal is to **start the habit**. Open a retirement account (like a 401(k) or Roth IRA) and contribute automatically, even if it's just a small percentage of your income. Aim to at least get any employer match—it's free money!" 
    },
    { 
        title: "In Your 30s: Increase and Automate", 
        content: "Your income is likely growing, and you may have more financial stability. This is the decade to **increase your savings rate**. Aim to save at least 15% of your pre-tax income for retirement. If you change jobs, make it a priority to roll over your old 401(k) into your new employer's plan or an IRA to avoid losing track of it and to maintain your investment strategy." 
    },
    { 
        title: "In Your 40s: Get Serious and Maximize", 
        content: "Your 40s are a critical time to accelerate your savings. You're likely at or near your peak earning years. This is the time to **max out your retirement accounts** if possible (e.g., your 401(k) and IRA). This is also a good time to review your investment allocation. If you've been too conservative, you may need to take on more risk for growth. If you're behind on your goals, it's time to create a serious catch-up plan." 
    },
    { 
        title: "In Your 50s: The 'Catch-Up' Decade", 
        content: "You're in the final stretch. The IRS allows for 'catch-up' contributions, letting you save even more in your 401(k) and IRA accounts once you turn 50. Take full advantage of these. Start to create a detailed retirement budget. Use our <a href='/social-security-retirement-age-calculator' class='text-primary hover:underline font-semibold'>Retirement Age Calculator</a> to understand your Social Security benefits, which are a key part of your retirement income puzzle." 
    },
    { 
        title: "In Your 60s: The Transition to Decumulation", 
        content: "It's time to finalize your retirement plan and shift your mindset from saving (accumulation) to spending (decumulation). Decide exactly when you'll start taking Social Security benefits—delaying past your full retirement age to 70 significantly increases your monthly payment. You may want to shift your investments to be more conservative to protect your principal. Consider meeting with a financial advisor to create a sustainable withdrawal strategy." 
    }
];

const faqs = [
    {
        question: "What's the difference between a 401(k) and an IRA?",
        answer: "A 401(k) is an employer-sponsored retirement plan. An IRA (Individual Retirement Account) is one you open on your own. Both offer tax advantages. A Roth IRA, where you contribute after-tax dollars and withdrawals are tax-free, is often a great choice for young people who expect to be in a higher tax bracket in the future."
    },
    {
        question: "How much money do I actually need to retire?",
        answer: "A common rule of thumb is the '4% rule,' which suggests you can safely withdraw 4% of your retirement savings in your first year of retirement, and then adjust for inflation each subsequent year. For example, to withdraw $40,000 per year, you'd need a $1 million nest egg. However, this is just a guideline; a financial advisor can provide a personalized plan."
    },
    {
        question: "Is it better to pay off my mortgage or save for retirement?",
        answer: "This is a classic financial debate with no single right answer. Mathematically, if your investment returns are higher than your mortgage interest rate, you're better off investing. Psychologically, many people value the security of a paid-off home. A balanced approach often works best: contribute enough to get your employer match, then decide whether to allocate extra funds to your mortgage or investments based on your risk tolerance and goals."
    },
    {
        question: "What is my 'full retirement age' for Social Security?",
        answer: "It depends on your birth year. For anyone born in 1960 or later, it's 67. You can start taking benefits as early as 62, but they will be permanently reduced. Our <a href='/social-security-retirement-age-calculator' class='text-primary hover:underline font-semibold'>Social Security Retirement Age Calculator</a> can give you your exact age."
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
        "name": "Age Calculator Hub"
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

export default function RetirementPlanningArticle() {
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
            Retirement planning isn't a one-time event; it's a lifelong financial journey. The steps you should take in your 20s are vastly different from the crucial moves you'll make in your 50s. Understanding the priorities for each stage of your life is the key to building a secure and comfortable future. This guide breaks down the key financial goals and strategies for each decade to help you stay on track.
          </p>
          
          <div className="my-10 text-center">
            <Link href="/retirement-calculators">
                <Button size="lg" className="text-lg">Find Your Full Retirement Age</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">The first step in any retirement plan is knowing your target.</p>
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-8">Your Retirement Roadmap by Decade</h2>

          {decades.map((decade, index) => (
             <Card key={index} className="my-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-4 text-2xl">
                         <span>{decade.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: decade.content }}></p>
                </CardContent>
             </Card>
          ))}

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>The Bottom Line: It's Never Too Late</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    No matter your age, the best time to start or re-evaluate your retirement plan is now. Whether you're just starting your career or are nearing the finish line, understanding the priorities for your current decade allows you to make smart, informed decisions that will pay dividends for years to come.
                </p>
                <p className="text-muted-foreground mt-4">
                    Use our <Link href="/retirement-calculators" className="font-bold text-primary hover:underline">retirement calculators</Link> to anchor your plan with key dates and information.
                </p>
            </CardContent>
          </Card>

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
