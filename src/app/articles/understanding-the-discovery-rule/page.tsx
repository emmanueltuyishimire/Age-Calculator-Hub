
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { Search, AlertTriangle } from 'lucide-react';

const article = articles.find(a => a.slug === 'understanding-the-discovery-rule');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const examples = [
    { title: "Medical Malpractice", scenario: "A surgeon leaves a surgical sponge inside a patient. The patient experiences pain for years but doesn't know the cause. Three years after the surgery, an X-ray reveals the sponge. The discovery rule would likely start the statute of limitations clock from the date of the X-ray, not the date of the surgery." },
    { title: "Construction Defects", scenario: "A homeowner buys a new house. Five years later, they discover severe foundational cracking caused by improper soil compaction during construction. The clock for suing the builder might start when the cracks were discovered, not when the house was built." },
    { title: "Fraud", scenario: "An investor is sold a fraudulent financial product. They don't discover the fraud until years later when the scheme collapses and is reported in the news. The statute of limitations for filing a claim against the seller would likely begin on the date the fraud became public knowledge." }
];

export default function DiscoveryRuleArticlePage() {
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
            The statute of limitations sets a strict deadline for filing a lawsuit. But what happens if you don't even know you've been harmed until after that deadline has passed? This is where the **Discovery Rule** comes into play. It's one of the most important exceptions to the statute of limitations, designed to ensure fairness in cases where an injury or claim is not immediately obvious.
          </p>

          <Card className="my-8 bg-muted border-l-4 border-primary">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Search className="h-8 w-8 text-primary" />
                    <CardTitle>What is the Discovery Rule?</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    The discovery rule is a legal principle that pauses, or "tolls," the statute of limitations clock until the injury or wrongful act is discovered, or reasonably should have been discovered, by the victim. In other words, the clock doesn't start running on the date of the incident itself, but on the date the victim knew or should have known they had a potential legal claim.
                </p>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold text-center my-8">Examples of the Discovery Rule in Action</h2>
          
          <div className="space-y-6">
            {examples.map((example, index) => (
              <Card key={index}>
                <CardHeader>
                    <CardTitle className="text-2xl">{example.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{example.scenario}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="my-12">
             <CardHeader>
                <CardTitle>The "Reasonably Should Have Known" Standard</CardTitle>
                <CardDescription>An Important Limitation</CardDescription>
            </CardHeader>
            <CardContent>
                 <p className="text-muted-foreground">
                    A crucial part of the discovery rule is the "reasonably should have known" standard. This means you cannot willfully ignore signs of a problem to extend the deadline. A court will look at what a reasonable person would have done in the same situation. If clear signs of a problem existed and you failed to investigate them, a court might rule that the clock started when those signs first appeared, not when you finally confirmed the issue.
                </p>
            </CardContent>
          </Card>

           <Card variant="destructive" className="my-12">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><AlertTriangle />This Is Not Legal Advice</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="font-semibold">
                    The application of the discovery rule is extremely complex and varies significantly by state and case type. Our <Link href="/statute-of-limitations" className="font-bold underline hover:text-destructive-foreground/80">Statute of Limitations Calculator</Link> does NOT account for this rule. For any legal matter, it is absolutely essential to consult a qualified attorney who can analyze the specific facts of your case.
                </p>
            </CardContent>
          </Card>
        </article>
      </main>
    </div>
  );
}
