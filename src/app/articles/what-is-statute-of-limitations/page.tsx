
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
        question: "What is the purpose of a Statute of Limitations?",
        answer: "The purpose is to protect defendants from unfair legal action. After a significant amount of time, evidence can be lost, and witness memories can fade, making a fair trial difficult. They ensure legal claims are pursued while the evidence is still fresh."
    },
    {
        question: "How long is the U.S. statute of limitations?",
        answer: "There isn't one single statute of limitations. It varies by federal vs. state law and by the type of case. Federal law often has a five-year limit for non-capital crimes, but most civil cases (like personal injury or contract disputes) are governed by state laws, which differ greatly."
    },
    {
        question: "How long before a debt becomes uncollectible?",
        answer: "This depends on the state and the type of debt. It typically ranges from three to six years, but can be longer. After this period, a creditor can no longer sue you, but the debt itself doesn't disappear. Making a payment can restart the clock."
    },
    {
        question: "Which crimes have the longest statute of limitations?",
        answer: "The most serious crimes, such as murder, almost always have no statute of limitations, meaning a person can be prosecuted at any time. Many states have also extended or eliminated the statute of limitations for serious felony sex crimes."
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
            The time allowed under a statute of limitations varies depending on the nature of the offense. For medical malpractice, it can range from one to four years, depending on the state. For consumer debt, it's often between three and six years. The clock generally starts ticking from the date the incident occurred or, in some cases, from the date the harm was "discovered."
          </p>
          <p>
            Once the deadline passes, a claim is considered "time-barred." This means a court can dismiss the case, regardless of its merits, if the defendant raises the statute of limitations as a defense.
          </p>
          
          <Card className="my-8">
            <CardHeader>
                <CardTitle>Case Examples: Criminal vs. Civil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold text-lg">Criminal Offenses</h3>
                    <p className="text-muted-foreground">Statutes of limitations cover many criminal offenses, but the most serious crimes like murder typically have no time limit. Many states have also extended or eliminated the time limits for felony-level sex offenses, especially those involving minors, recognizing that it can take victims a long time to come forward.</p>
                </div>
                <div>
                    <h3 className="font-semibold text-lg">Consumer Debt</h3>
                    <p className="text-muted-foreground">For consumer debt, the statute of limitations restricts how long a creditor can sue you to collect. After it passes, they can no longer use the courts to garnish your wages or place a lien on your property. However, the debt itself is not erased. Importantly, making even a small payment on a time-barred debt can sometimes restart the clock on the statute of limitations.</p>
                </div>
            </CardContent>
          </Card>
          
           <h2 className="text-3xl font-bold">The Pros and Cons</h2>
          <div className="grid md:grid-cols-2 gap-8 my-8">
             <Card className="flex flex-col">
                <CardHeader><CardTitle>Advantages</CardTitle></CardHeader>
                <CardContent className="flex-grow">
                    <p>Proponents argue that statutes of limitations ensure fairness. As time passes, evidence can be lost and memories fade, making a fair trial difficult. They encourage timely legal action and provide defendants with closure, preventing the threat of endless litigation.</p>
                </CardContent>
            </Card>
            <Card className="flex flex-col">
                <CardHeader><CardTitle>Disadvantages</CardTitle></CardHeader>
                <CardContent className="flex-grow">
                     <p>Critics argue that these laws can inadvertently protect wrongdoers, especially if a victim doesn't realize they've been harmed until after the deadline has passed. They can also disadvantage individuals who lack the resources or knowledge to file a claim quickly.</p>
                </CardContent>
            </Card>
          </div>

          <Card className="my-12 border-destructive">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive" />A Crucial Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-destructive-foreground font-semibold">
                    This information is for educational purposes only. Statutes of limitations are highly complex and vary greatly. Rules like the "discovery rule" can change the deadline. For any legal matter, you must consult with a qualified attorney in your jurisdiction.
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

    