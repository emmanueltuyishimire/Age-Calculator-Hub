
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { Stethoscope, Syringe, HeartPulse, HelpCircle } from 'lucide-react';

const article = articles.find(a => a.slug === 'your-pet-s-first-vet-visit');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const visitComponents = [
    { icon: HeartPulse, title: "The Nose-to-Tail Physical Exam", content: "Your vet will perform a thorough physical examination to establish a baseline of your pet's health. This includes checking their eyes, ears, teeth, and skin; listening to their heart and lungs; feeling their abdomen for any abnormalities; and assessing their overall body condition." },
    { icon: Syringe, title: "Vaccinations and Parasite Control", content: "This is a major part of the first visit. Your vet will discuss and administer the first set of core vaccines. They will also likely perform a fecal test to check for internal parasites (like roundworms) and start your pet on a monthly preventative for fleas, ticks, and heartworm." },
    { icon: HelpCircle, title: "Your Q&A Session", content: "This is your chance to ask everything! No question is too silly. Ask about food recommendations, house training tips, socialization strategies, and when to spay or neuter. Your vet is a wealth of information and your best partner in raising a healthy pet." },
];

const faqs = [
    {
        question: "When should I schedule the first vet visit?",
        answer: "Ideally, you should schedule the visit within the first week of bringing your new puppy or kitten home. This allows the vet to identify any potential health issues from the breeder or shelter early on and get your pet started on their crucial vaccination schedule."
    },
    {
        question: "What should I bring to the first appointment?",
        answer: "Bring any and all paperwork you received from the breeder, shelter, or rescue. This includes any records of previous vaccinations or deworming treatments. Also, bring a fresh fecal (stool) sample in a sealed plastic bag for parasite testing."
    },
    {
        question: "How can I make the visit less stressful for my pet?",
        answer: "For both puppies and kittens, use a secure carrier for transport. Bring some of their favorite high-value treats to create a positive association with the vet clinic. Speak to them in a calm, reassuring voice. You can also make 'happy visits' to the clinic where you just pop in for a treat and a hello to help reduce anxiety for future appointments."
    },
    {
        question: "How much will the first vet visit cost?",
        answer: "Costs can vary significantly based on your location. The first visit is often one of the most expensive because it includes the exam, multiple vaccines, and parasite preventatives. Don't hesitate to ask for an estimate when you book the appointment. Many clinics also offer 'puppy/kitten packages' that bundle the cost of the initial series of visits."
    }
];

export default function FirstVetVisitArticle() {
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
            Bringing home a new puppy or kitten is an exciting time filled with cuddles and play. Amidst all the fun, one of the most important first steps you can take is scheduling their first veterinary visit. This initial appointment is much more than just "getting shots." It's the foundation of your pet's lifelong health, establishing a crucial relationship with your veterinary team and setting your new companion on the path to a long, happy life.
          </p>

          <Card className="my-8 bg-muted border-l-4 border-primary">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Stethoscope className="h-10 w-10 text-primary" />
                    <div>
                        <CardTitle className="text-3xl">What to Expect at the First Visit</CardTitle>
                        <CardDescription>A look at the key components of this foundational appointment.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {visitComponents.map((component, index) => (
                <div key={index}>
                    <h3 className="flex items-center gap-2 font-bold text-xl"><component.icon className="h-6 w-6 text-primary" />{component.title}</h3>
                    <p className="text-muted-foreground ml-8">{component.content}</p>
                </div>
              ))}
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
