
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { PiggyBank, AlertTriangle, Scale } from 'lucide-react';

const article = articles.find(a => a.slug === 'statute-of-limitations-for-debt');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const debtTypes = [
    { type: "Written Contracts", examples: "Most credit card agreements, personal loans, and mortgages. These typically have longer statutes of limitations (e.g., 4-6 years in many states)." },
    { type: "Oral Contracts", examples: "Verbal agreements. These are harder to prove and often have a shorter statute of limitations (e.g., 2-3 years)." },
    { type: "Promissory Notes", examples: "A written promise to pay a specific amount, like a student loan. These follow the rules for written contracts." },
    { type: "Open-Ended Accounts", examples: "Revolving credit lines, like credit cards, where the balance can fluctuate. The clock often starts from the date of the last payment." }
];

export default function DebtStatuteArticlePage() {
  if (!article) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <article className="prose dark:prose-invert lg:prose-xl max-w-none">
          <div className="text-center mb-12">
            <p className="text-base text-primary font-semibold">{article.category}</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{article.title}</h1>
            <p className="text-md md:text-lg text-muted-foreground">{article.description}</p>
          </div>

          <p className="lead">
            Dealing with old debt can be confusing and stressful, especially when collectors reappear for debts you thought were long forgotten. The statute of limitations for debt is a critical consumer protection law that sets a time limit on how long a creditor or debt collector can use the legal system to force you to pay. Understanding this concept is key to protecting your rights.
          </p>

          <Card className="my-8 bg-muted border-l-4 border-primary">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <PiggyBank className="h-8 w-8 text-primary" />
                    <CardTitle>What Happens When the Statute of Limitations Expires?</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    When the statute of limitations on a debt expires, it becomes "time-barred." This means a creditor can **no longer file a lawsuit** against you to collect the money. If they sue you anyway, you can have the case dismissed by showing the court that the deadline has passed. This prevents them from using legal tools like wage garnishment or placing a lien on your property.
                </p>
            </CardContent>
          </Card>

          <Card variant="destructive" className="my-12">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><AlertTriangle />The Debt Does Not Disappear</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="font-semibold">
                    Crucially, the expiration of the statute of limitations does **not** erase the debt. You still technically owe the money, and debt collectors can still contact you to try and collect it (though they must follow rules set by the Fair Debt Collection Practices Act).
                </p>
                <p className="font-semibold mt-2">
                    **Warning:** Making any payment—even a small one—or acknowledging the debt in writing can **restart the clock** on the statute of limitations in many states, giving the creditor a new window to sue you.
                </p>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold text-center my-8">How Long is the Statute of Limitations for Debt?</h2>
          <p>This is where it gets complicated. There is no single national deadline; it varies significantly by state and by the type of debt. Our <Link href="/statute-of-limitations" className="text-primary hover:underline">Statute of Limitations Calculator</Link> can provide a basic estimate for some claim types, but you must verify with your state's laws.</p>
          
          <div className="space-y-6">
            {debtTypes.map((debt, index) => (
              <Card key={index}>
                <CardHeader>
                    <CardTitle className="text-2xl">{debt.type}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{debt.examples}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="my-12">
             <CardHeader>
                <CardTitle className="flex items-center gap-2"><Scale />What to Do If You're Contacted About Old Debt</CardTitle>
            </CardHeader>
            <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Do not admit you owe the debt or agree to make a payment until you have more information.</li>
                    <li>Ask the collector for a written validation notice, which they are required to provide by law. This notice should detail the amount owed and the original creditor.</li>
                    <li>Check your state's statute of limitations for that type of debt. You can often find this on your state attorney general's website.</li>
                    <li>If you believe the debt is time-barred, you can send the collector a letter stating this and demanding they stop contacting you.</li>
                    <li>If you are sued for a time-barred debt, you must show up in court and raise the statute of limitations as your defense.</li>
                </ol>
                 <p className="text-muted-foreground mt-4">
                    When in doubt, consider consulting with a consumer law attorney or a non-profit credit counseling agency for advice.
                </p>
            </CardContent>
          </Card>
        </article>
      </main>
    </div>
  );
}
