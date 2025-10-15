
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { Stethoscope, Car, Home, AlertTriangle } from 'lucide-react';

const article = articles.find(a => a.slug === 'personal-injury-statute-of-limitations');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const caseTypes = [
    { icon: Car, type: "Car Accidents", details: "This is one of the most common personal injury claims. The statute of limitations begins on the date of the accident." },
    { icon: Stethoscope, type: "Medical Malpractice", details: "These cases can be complex, as the injury may not be discovered for years. Many states apply the 'discovery rule,' starting the clock when the patient knew or should have known about the malpractice." },
    { icon: Home, type: "Premises Liability (Slip and Fall)", details: "If you are injured on someone else's property due to their negligence, the clock typically starts on the date of the fall or injury." },
    { icon: AlertTriangle, type: "Product Liability", details: "If you are injured by a defective product, the timeline usually starts on the date the injury occurred." }
];

export default function PersonalInjuryStatuteArticlePage() {
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
            If you've been injured due to someone else's negligence, you have the right to seek compensation for your medical bills, lost wages, and pain and suffering. However, that right is not unlimited. The **statute of limitations for personal injury** sets a strict deadline by which you must file a lawsuit. Missing this deadline can mean losing your right to compensation forever, no matter how strong your case is.
          </p>

          <Card className="my-8 bg-muted border-l-4 border-primary">
            <CardHeader>
                <CardTitle>Why Do These Deadlines Exist?</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    The primary purpose of a statute of limitations is to ensure fairness in the legal process. As time passes, evidence disappears, witness memories fade, and companies may no longer have records. These deadlines encourage victims to bring their claims forward in a timely manner while ensuring that defendants are not forced to defend against stale, decades-old allegations.
                </p>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold text-center my-8">How Long Do I Have to File? It Depends on Your State.</h2>
          <p>There is no national statute of limitations for personal injury. Each state sets its own deadline. This period typically ranges from **one to six years**, with most states falling in the two-to-three-year range. For example:</p>
          <ul className="list-disc list-inside space-y-2 my-4">
            <li>In **California**, you generally have **two years** to file a personal injury lawsuit.</li>
            <li>In **Texas**, the deadline is also **two years**.</li>
            <li>In **Florida**, the time limit was recently changed to **two years** (previously four).</li>
            <li>In **New York**, you have **three years**.</li>
          </ul>
           <p>Our <Link href="/statute-of-limitations" className="text-primary hover:underline">Statute of Limitations Calculator</Link> can give you a basic estimate for your state, but it is not a substitute for legal advice.</p>
          
          <h2 className="text-3xl font-bold text-center my-8">Common Types of Personal Injury Cases</h2>

          <div className="space-y-6">
            {caseTypes.map((caseType, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center gap-4">
                    <caseType.icon className="h-8 w-8 text-primary shrink-0" />
                    <CardTitle className="text-2xl">{caseType.type}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{caseType.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card variant="destructive" className="my-12">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><AlertTriangle />Crucial Exceptions Can Change the Deadline</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="font-semibold">
                    The simple formula of "Date of Incident + X years" is not always accurate. Important exceptions can change the deadline:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2 font-semibold">
                    <li>The <Link href="/articles/understanding-the-discovery-rule" className="underline hover:text-destructive-foreground/80">Discovery Rule</Link> can pause the clock until the injury is found.</li>
                    <li>If the injured party is a minor, the deadline is often 'tolled' (paused) until they turn 18.</li>
                    <li>Claims against a government entity usually have much shorter and stricter notice requirements.</li>
                </ul>
                 <p className="font-bold mt-4">
                    Because of these complexities, you must consult with a personal injury attorney as soon as possible after an accident.
                </p>
            </CardContent>
          </Card>
        </article>
      </main>
    </div>
  );
}
