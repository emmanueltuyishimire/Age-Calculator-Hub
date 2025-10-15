
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, AlertTriangle, Scale, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';

const article = articles.find(a => a.slug === 'what-is-statute-of-limitations');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const keyTakeaways = [
    "A statute of limitations sets a deadline by which legal proceedings must be initiated.",
    "Time limits vary significantly by jurisdiction (state) and the type of legal claim.",
    "Serious crimes like murder often have no statute of limitations.",
    "For consumer debt, once the statute passes, a creditor can no longer sue to collect the debt.",
    "Missing the deadline can permanently bar you from bringing a case, making it crucial to act in a timely manner.",
];

const faqs = [
    {
        question: "What crimes have no statute of limitations in the US?",
        answer: "Typically, the most heinous crimes like murder have no statute of limitations. Many states have also eliminated or extended the time limits for serious felony sex offenses, especially those involving minors."
    },
    {
        question: "What is an exception to the statute of limitations?",
        answer: "A common exception is the 'discovery rule.' This rule pauses, or 'tolls,' the statute of limitations clock until the injury or harm is actually discovered by the victim, or reasonably should have been discovered."
    },
    {
        question: "How long is the statute of limitations in America?",
        answer: "There isn't one single statute for the entire country. It varies greatly. Federal criminal law often has a five-year statute of limitations for non-capital offenses, but most civil and criminal matters are governed by specific state laws, which differ widely."
    },
    {
        question: "What is the IRS statute of limitations?",
        answer: "The IRS generally has three years to audit a tax return and assess additional taxes. However, this can extend to six years if you've significantly underreported your income, and there's no limit in cases of fraud."
    },
    {
        question: "Can you get around the statute of limitations?",
        answer: "It is very difficult to get around a statute of limitations once it has expired, as it provides a strong legal defense. However, certain actions can 'toll' or pause the clock, and legal arguments can sometimes be made to extend the deadline. You must speak with a lawyer about this."
    }
];

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

export default function StatuteOfLimitationsArticlePage() {
  if (!article) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main role="main" className="max-w-4xl mx-auto">
        <article className="prose dark:prose-invert lg:prose-xl max-w-none">
          <div className="text-center mb-12">
            <p className="text-base text-primary font-semibold">{article.category}</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{article.title}</h1>
            <p className="text-md md:text-lg text-muted-foreground">{article.description}</p>
          </div>
          
          <Card className="my-8 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>Key Takeaways</CardTitle></CardHeader>
            <CardContent>
                <ul className="space-y-3">
                {keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" />
                        <span className="text-muted-foreground">{takeaway}</span>
                    </li>
                ))}
                </ul>
            </CardContent>
          </Card>

          <p className="lead">
            A statute of limitations is a law that defines the maximum timeframe for initiating legal proceedings in both civil and criminal cases. These legal limits vary by offense and jurisdiction, ensuring timely action to preserve evidence and witness reliability. While some serious crimes have no limitations, others demand urgent attention to avoid forfeiting legal recourse.
          </p>

            <div className="my-10 text-center">
                <Link href="/statute-of-limitations">
                    <Button size="lg">Try the Statute of Limitations Estimator</Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-2">Get a basic estimate of legal filing deadlines.</p>
            </div>

          <h2 className="text-3xl font-bold">How Statutes of Limitations Work</h2>
          <p>
            In general, the time allowed under a statute of limitations varies depending on the nature of the offense, with most statutes of limitations being applicable to civil cases. For example, how long is the statute of limitations for medical malpractice? It can range from one to four years, depending on the state. It's crucial to check the specific statute of limitations by state.
          </p>
          <p>
            Once the deadline passes, a claim is considered "time-barred." This means a court can dismiss the case, regardless of its merits, if the defendant raises the statute of limitations as a defense.
          </p>
          
          <Card className="my-8">
            <CardHeader>
                <CardTitle>Statute of Limitations Examples: Criminal vs. Civil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold text-lg">Statute of Limitations for Criminal Law</h3>
                    <p className="text-muted-foreground">The rules for criminal law often depend on the severity of the crime. For example, the **statute of limitations for murder** is nonexistent in all jurisdictions—a prosecution can begin at any time. This is one of the key **crimes that have no statute of limitations**. Other serious felonies, like arson or kidnapping, may also have very long or nonexistent time limits. In contrast, the **statute of limitations for theft** (e.g., misdemeanor theft) is typically much shorter, often only a few years. In California, for instance, many misdemeanor statutes of limitations are one year, while some felonies are three or five years.</p>
                </div>
                <div>
                    <h3 className="font-semibold text-lg">Statute of Limitations for Consumer Debt</h3>
                    <p className="text-muted-foreground">For consumer debt, the statute of limitations restricts how long a creditor can sue you to collect. After it passes, they can no longer use the courts to garnish your wages or place a lien on your property. However, the debt itself is not erased. Importantly, making even a small payment on a time-barred debt can sometimes restart the clock on the statute of limitations.</p>
                </div>
            </CardContent>
          </Card>
          
           <h2 className="text-3xl font-bold">Pros and Cons</h2>
          <div className="grid md:grid-cols-2 gap-8 my-8">
             <Card className="flex flex-col">
                <CardHeader><CardTitle>Advantages</CardTitle></CardHeader>
                <CardContent className="flex-grow">
                    <p>Proponents argue that statutes of limitations ensure fairness. As time passes, evidence can be lost and memories fade, making a fair trial difficult. They encourage timely legal action and provide defendants with closure, preventing the threat of endless litigation.</p>
                </CardContent>
            </Card>
            <Card className="flex flex-col">
                <CardHeader><CardTitle>Disadvantages (The Cons)</CardTitle></CardHeader>
                <CardContent className="flex-grow">
                     <p>Critics argue that these laws can inadvertently protect wrongdoers, especially if a victim doesn't realize they've been harmed until after the deadline has passed. This can disproportionately affect those who lack immediate resources to seek legal counsel.</p>
                </CardContent>
            </Card>
          </div>

          <Card className="my-12 border-destructive">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive" />A Crucial Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-destructive-foreground font-semibold">
                    This information is for educational purposes only. Statutes of limitations are highly complex and vary greatly by state and the specifics of the case. Rules like the "discovery rule" can change the deadline. For any legal matter, you must consult with a qualified attorney in your jurisdiction.
                </p>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold text-center mt-12 mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base"><p>{faq.answer}</p></AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
        </article>
      </main>
    </div>
  );
}
