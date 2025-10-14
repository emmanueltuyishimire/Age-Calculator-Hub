
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const article = articles.find(a => a.slug === 'planning-for-retirement-at-any-age');

if (!article) {
  return null;
}

export const metadata: Metadata = {
    title: article.title,
    description: article.description,
    alternates: {
        canonical: `/articles/${article.slug}`,
    },
};

const decades = [
    { title: "In Your 20s: The Power of Time", content: "This is the most powerful decade for retirement saving, thanks to compound interest. Your primary goal is to start. Open a retirement account (like a 401(k) or Roth IRA) and contribute, even if it's a small amount. The habit is more important than the amount at this stage." },
    { title: "In Your 30s: Increasing Contributions", content: "Your income is likely growing. This is the time to increase your savings rate. Aim to save at least 15% of your pre-tax income. If you change jobs, make sure to roll over your old 401(k) to avoid losing track of it." },
    { title: "In Your 40s: Getting Serious", content: "Your 40s are a critical time to accelerate your savings. You're likely at or near your peak earning years. Max out your retirement accounts if possible. This is also a good time to review your investment allocation and ensure it aligns with your risk tolerance." },
    { title: "In Your 50s: The Final Push", content: "You can now make 'catch-up' contributions to your retirement accounts, allowing you to save even more. Start to create a detailed retirement budget. Use our <a href='/retirement' class='text-primary hover:underline'>Retirement Age Calculator</a> to understand your Social Security benefits, which are a key part of the puzzle." },
    { title: "In Your 60s: The Transition Phase", content: "It's time to finalize your retirement plan. Decide exactly when you'll start taking Social Security benefits (delaying past your full retirement age increases your monthly payment). You may want to shift your investments to be more conservative to protect your savings." }
];

export default function RetirementPlanningArticle() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <article className="prose dark:prose-invert lg:prose-xl max-w-none">
          <div className="text-center mb-8">
            <p className="text-base text-primary font-semibold">{article.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{article.title}</h1>
            <p className="text-md md:text-lg text-muted-foreground">
              {article.description}
            </p>
          </div>

          <p className="lead">
            Retirement planning isn't a one-time event; it's a lifelong journey. The steps you should take in your 20s are very different from the moves you'll make in your 50s. This guide breaks down the key financial priorities for each decade to help you stay on track for a comfortable and secure retirement.
          </p>
          
          <div className="my-10 text-center">
            <Link href="/retirement">
                <Button size="lg">Find Your Full Retirement Age</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Knowing your date is the first step.</p>
          </div>

          {decades.map((decade, index) => (
             <Card key={index} className="my-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-4">
                         <span>{decade.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: decade.content }}></p>
                </CardContent>
             </Card>
          ))}

          <Card className="my-8 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>The Bottom Line</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    No matter your age, the best time to start (or re-evaluate) your retirement plan is now. By understanding the priorities for your current decade, you can make smart, informed decisions that will pay off for years to come.
                </p>
            </CardContent>
          </Card>
        </article>
      </main>
    </div>
  );
}
