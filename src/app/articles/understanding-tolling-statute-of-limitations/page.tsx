
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { PauseCircle, Baby, Plane, AlertTriangle } from 'lucide-react';

const article = articles.find(a => a.slug === 'understanding-tolling-statute-of-limitations');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const tollingScenarios = [
    { icon: Baby, title: "Victim is a Minor", description: "This is one of the most common reasons for tolling. In many states, the statute of limitations for an injury to a minor is paused until the child turns 18. This gives them the opportunity to file a lawsuit as an adult." },
    { icon: Plane, title: "Defendant Leaves the State", description: "If the person you need to sue leaves the jurisdiction to avoid being served with a lawsuit, the court may toll the statute of limitations for the period they are absent." },
    { icon: AlertTriangle, title: "Victim is Mentally Incompetent", description: "If the injured party is legally deemed mentally incompetent or incapacitated at the time of the injury, the statute of limitations may be tolled until they regain their competency." }
];

export default function TollingStatuteArticlePage() {
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
            In the legal world, a statute of limitations acts like a ticking clock, setting a firm deadline for filing a lawsuit. But what if that clock could be paused? This is the concept of **"tolling."** Tolling is a legal doctrine that temporarily stops the statute of limitations from running, effectively giving a plaintiff more time to file their claim. Understanding tolling is crucial, as it can be the difference between having a valid case and having it dismissed.
          </p>

          <Card className="my-8 bg-muted border-l-4 border-primary">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <PauseCircle className="h-8 w-8 text-primary" />
                    <CardTitle>What Does "Tolling" Mean?</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    To "toll" a statute of limitations means to pause it. The time during which the statute is tolled does not count toward the time limit for filing the claim. Once the condition that caused the tolling is resolved (e.g., a child turns 18), the clock starts running again.
                </p>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold text-center my-8">Tolling vs. The Discovery Rule</h2>
          <p>It's important to distinguish tolling from the <Link href="/articles/understanding-the-discovery-rule" className="text-primary hover:underline">Discovery Rule</Link>. The Discovery Rule dictates **when the clock starts**, delaying the start date until an injury is found. Tolling, on the other hand, **pauses a clock that has already started** or would have otherwise started. Both result in giving the plaintiff more time, but they are distinct legal concepts.</p>

          <h2 className="text-3xl font-bold text-center my-8">Common Scenarios Where a Statute May Be Tolled</h2>
          <p>The specific rules for tolling vary by state, but here are some of the most common situations where a court might pause the clock:</p>
          
          <div className="space-y-6">
            {tollingScenarios.map((scenario, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center gap-4">
                    <scenario.icon className="h-8 w-8 text-primary shrink-0" />
                    <CardTitle className="text-2xl">{scenario.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{scenario.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card variant="destructive" className="my-12">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><AlertTriangle />A Complex Legal Issue</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="font-semibold">
                    Whether tolling applies to your situation is a highly specific legal question that depends on the laws of your state and the facts of your case. Our <Link href="/statute-of-limitations" className="font-bold underline hover:text-destructive-foreground/80">Statute of Limitations Calculator</Link> does NOT account for any tolling provisions. You must consult a qualified attorney to determine if your filing deadline might be extended.
                </p>
            </CardContent>
          </Card>
        </article>
      </main>
    </div>
  );
}
