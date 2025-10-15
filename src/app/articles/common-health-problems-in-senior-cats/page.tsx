
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { Droplets, Scale, Activity, ShieldAlert } from 'lucide-react';

const article = articles.find(a => a.slug === 'common-health-problems-in-senior-cats');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const healthIssues = [
    { icon: Droplets, name: "Chronic Kidney Disease (CKD)", symptoms: "Increased thirst and urination, weight loss, poor appetite, lethargy, vomiting." },
    { icon: Activity, name: "Hyperthyroidism", symptoms: "Weight loss despite a ravenous appetite, hyperactivity, increased vocalization, vomiting, diarrhea." },
    { icon: Scale, name: "Diabetes Mellitus", symptoms: "Significant increase in thirst and urination, weight loss (especially over the back), either increased or decreased appetite." },
    { icon: Activity, name: "Arthritis (Degenerative Joint Disease)", symptoms: "Reluctance to jump, difficulty with stairs, stiffness after rest, grooming less, urinating outside the litter box (because it's hard to get into)." },
    { icon: ShieldAlert, name: "Dental Disease", symptoms: "Bad breath, drooling, difficulty eating, dropping food, pawing at the mouth, red or swollen gums." },
];

const faqs = [
    {
        question: "Why is my senior cat losing weight but eating a lot?",
        answer: "This is the classic sign of hyperthyroidism, a condition where the thyroid gland produces too much hormone, speeding up metabolism. It is highly treatable, so a vet visit is essential."
    },
    {
        question: "My cat is peeing outside the litter box. Is it a behavior problem?",
        answer: "While it can be behavioral, in a senior cat, it's often a sign of a medical issue. Arthritis can make it painful to get into the box, while CKD or diabetes causes increased urination that makes the box fill too quickly. Always rule out medical causes first."
    },
    {
        question: "How often should my senior cat see the vet?",
        answer: "Twice a year (every six months). Because cats age so quickly, a bi-annual exam is like a human seeing their doctor every few years. It's crucial for early detection of these common diseases."
    },
    {
        question: "Are these diseases preventable?",
        answer: "While many are age-related and not entirely preventable, you can reduce risk and delay onset. Maintaining a healthy weight significantly lowers the risk of diabetes and arthritis. Good dental hygiene can prevent severe dental disease. A high-quality, moisture-rich diet can support kidney health."
    }
];

export default function SeniorCatHealthArticle() {
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
            As cats enter their senior years (age 11 and older), they become more susceptible to a range of age-related health issues. Cats are masters at hiding illness, a survival instinct from their wild ancestors. This means that by the time you notice something is wrong, the disease may already be advanced. Being aware of the most common senior cat health problems and their subtle symptoms is the key to early detection and successful management, ensuring your feline friend enjoys a high quality of life in their golden years.
          </p>

          <h2 className="text-3xl font-bold text-center mb-8">Top 5 Health Concerns for Senior Cats</h2>

          <div className="space-y-6">
            {healthIssues.map((issue, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="flex flex-row items-start gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                    <issue.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-grow">
                    <CardTitle className="text-2xl">{index + 1}. {issue.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                    <h3 className="font-semibold text-lg mb-2">Key Symptoms to Watch For:</h3>
                    <p className="text-muted-foreground">{issue.symptoms}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>The Power of Observation</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    The single most important thing you can do for your senior cat is to be a vigilant observer. Any change—no matter how small—in their routine, appetite, thirst, or behavior is a potential clue. Don't dismiss these changes. Early veterinary intervention can turn a life-threatening condition into a manageable one.
                </p>
                <p className="text-muted-foreground mt-4">
                    Knowing your cat's life stage is the first step. Use our <Link href="/cat-age-in-human-years" className="font-bold text-primary hover:underline">Cat Age Calculator</Link> to understand where they are on their journey.
                </p>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold text-center mt-12 mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base"><div dangerouslySetInnerHTML={{ __html: faq.answer }} /></AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
        </article>
      </main>
    </div>
  );
}
