
import { type Metadata } from 'next';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { Ear, ShieldAlert, Bug, Bone, AlertTriangle } from 'lucide-react';

const article = articles.find(a => a.slug === 'common-dog-health-problems');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const healthIssues = [
    { icon: ShieldAlert, name: "Dental Disease", symptoms: "Bad breath, yellow/brown tartar on teeth, red or swollen gums, difficulty chewing, dropping food. This is the #1 most common health problem in dogs." },
    { icon: Ear, name: "Ear Infections", symptoms: "Head shaking, scratching at the ear, dark discharge, odor, redness or swelling of the ear canal." },
    { icon: AlertTriangle, name: "Skin Allergies (Allergic Dermatitis)", symptoms: "Constant itching, scratching, or licking (especially at paws, belly, and ears), red or inflamed skin, 'hot spots', hair loss." },
    { icon: Bone, name: "Arthritis", symptoms: "Stiffness (especially after rest), reluctance to jump or use stairs, limping, lagging behind on walks, visible pain or yelping when touched." },
    { icon: Bug, name: "Vomiting and Diarrhea", symptoms: "Besides the obvious, look for lethargy, lack of appetite, or signs of abdominal pain. While often temporary, it can indicate a more serious issue." },
];

const faqs = [
    {
        question: "My dog's breath is terrible. Is that just 'dog breath'?",
        answer: "No, 'doggy breath' is not normal. Foul odor is the most common sign of dental disease. It indicates bacteria buildup and requires a veterinary check-up and likely a professional dental cleaning."
    },
    {
        question: "How can I prevent ear infections?",
        answer: "For dogs with floppy ears, it's crucial to keep the ears clean and dry, especially after swimming or bathing. Regular cleaning with a vet-approved solution can help prevent wax and moisture buildup where yeast and bacteria thrive."
    },
    {
        question: "What's the difference between a food allergy and an environmental allergy?",
        answer: "Both can cause similar skin issues. Environmental allergies (to things like pollen, dust mites, or grass) are more common. Food allergies are a reaction to a specific ingredient, usually a protein. Your vet can help you diagnose the cause, often through an elimination diet for food allergies or testing for environmental ones."
    },
    {
        question: "Is arthritis inevitable for my old dog?",
        answer: "While it's very common in senior dogs, you can do a lot to manage it. Keeping your dog at a lean, healthy weight is the single most important step. Joint supplements (like glucosamine), pain medication from your vet, and low-impact exercise can significantly improve their quality of life."
    }
];

export default function DogHealthProblemsArticle() {
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
            As a dog owner, your pet's health is your top priority. While we hope for a lifetime of perfect health, it's wise to be aware of the common issues that can affect our canine companions. Recognizing the early signs of these problems allows for prompt veterinary care, leading to better outcomes and a higher quality of life for your dog. This guide covers some of the most frequently diagnosed health problems in dogs.
          </p>

          <h2 className="text-3xl font-bold text-center mb-8">5 Common Canine Health Issues</h2>

          <div className="space-y-6">
            {healthIssues.map((issue, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="flex flex-row items-start gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                    <issue.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-grow">
                    <CardTitle className="text-2xl">{issue.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                    <h3 className="font-semibold text-lg mb-2">Key Symptoms:</h3>
                    <p className="text-muted-foreground">{issue.symptoms}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>When to Call the Vet</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    The golden rule of dog ownership is: when in doubt, call the vet. You know your dog better than anyone. If you notice any persistent change in their behavior, appetite, or energy level, it's always best to get a professional opinion. Early diagnosis and treatment almost always lead to a better, less expensive outcome.
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
