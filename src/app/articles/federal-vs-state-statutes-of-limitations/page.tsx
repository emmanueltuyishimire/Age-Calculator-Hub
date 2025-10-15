
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { Landmark, Building } from 'lucide-react';

const article = articles.find(a => a.slug === 'federal-vs-state-statutes-of-limitations');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

export default function FederalVsStateStatutesArticlePage() {
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
            When it comes to legal deadlines, one of the most fundamental questions is: which clock is ticking? The United States operates under a system of dual sovereignty, meaning that both the federal government and individual state governments have their own laws, courts, and—crucially—their own statutes of limitations. Understanding whether a case falls under federal or state jurisdiction is the first step in determining the correct filing deadline.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 my-8">
             <Card className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Landmark className="h-8 w-8 text-primary" />
                        <CardTitle>Federal Statutes of Limitations</CardTitle>
                    </div>
                    <CardDescription>Governed by Congress</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p>Federal statutes of limitations apply to cases involving a violation of federal law. This includes most federal crimes and civil lawsuits where the claim is based on a federal statute.</p>
                    <p className="font-bold mt-4 mb-2">Key Characteristics:</p>
                    <ul className="list-disc list-inside space-y-2 m-0 p-0 text-muted-foreground">
                        <li><strong>Uniformity:</strong> The rules are generally consistent across the entire country.</li>
                        <li><strong>Specific to Federal Law:</strong> Applies to crimes like tax evasion, mail fraud, immigration offenses, and major fraud against the U.S.</li>
                        <li><strong>General Rule:</strong> For most non-capital federal crimes, there is a general <Link href="/articles/statute-of-limitations-federal-crimes" className="font-semibold text-primary hover:underline">five-year statute of limitations</Link>, but Congress has created many exceptions with longer periods.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card className="flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Building className="h-8 w-8 text-primary" />
                        <CardTitle>State Statutes of Limitations</CardTitle>
                    </div>
                    <CardDescription>Vary Widely by State</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p>State statutes of limitations apply to the vast majority of legal disputes, which are governed by state law. This includes most civil claims and state-level crimes.</p>
                     <p className="font-bold mt-4 mb-2">Key Characteristics:</p>
                    <ul className="list-disc list-inside space-y-2 m-0 p-0 text-muted-foreground">
                        <li><strong>Variety:</strong> Deadlines vary dramatically from one state to another.</li>
                        <li><strong>Covers Most Common Cases:</strong> Applies to personal injury, breach of contract, medical malpractice, property damage, and most state criminal offenses (like theft or assault).</li>
                        <li><strong>No Single Rule:</strong> A personal injury claim might have a two-year deadline in Texas but a six-year deadline in Maine.</li>
                    </ul>
                </CardContent>
            </Card>
          </div>

          <h2 className="text-3xl font-bold text-center my-8">When Jurisdictions Overlap</h2>
          <p>
            Sometimes, a single act can violate both federal and state law (e.g., bank robbery or certain drug offenses). In these "concurrent jurisdiction" cases, both the federal government and the state government can prosecute, and each is bound by its own statute of limitations. This means that even if a state's deadline has passed, a federal prosecution may still be possible, and vice versa.
          </p>
          <p>
            Our <Link href="/statute-of-limitations" className="text-primary hover:underline">Statute of Limitations Calculator</Link> provides estimates based on **state-level civil claims**, as these are the most common issues individuals face. For information on federal crimes, see our dedicated guide.
          </p>

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>The Bottom Line: Identify the Law First</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                   Before you can determine the correct statute of limitations, you must first identify what law was broken. Is it a federal matter or a state matter? Because this determination can be complex, and the consequences of getting it wrong are severe, consulting an attorney is the only reliable way to find the correct deadline for your specific case.
                </p>
            </CardContent>
          </Card>
        </article>
      </main>
    </div>
  );
}
