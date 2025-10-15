
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { Rabbit, Turtle, ShieldCheck } from 'lucide-react';

const article = articles.find(a => a.slug === 'why-small-dogs-live-longer');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const theories = [
    { icon: Rabbit, title: "The 'Live Fast, Die Young' Theory", content: "The primary theory revolves around the incredible growth rate of large-breed puppies. A Great Dane can go from one pound at birth to over 150 pounds in just 18 months. This explosive growth is metabolically demanding and is believed to cause higher levels of free-radical production, leading to increased oxidative stress and cellular damage. Essentially, their bodies 'burn out' faster." },
    { icon: Turtle, title: "Delayed Onset of Age-Related Diseases", content: "Small dogs don't just live longer; they also tend to develop age-related diseases later in life. Large breeds are more prone to developing conditions like cancer and arthritis at a younger chronological age. The rapid cell proliferation during their growth phase may increase the risk of cancerous mutations." },
    { icon: ShieldCheck, title: "Hormonal Factors (IGF-1)", content: "Research has pointed to the insulin-like growth factor 1 (IGF-1) hormone as a key player. Levels of IGF-1 are much higher in large breeds, which is necessary for their growth. However, higher levels of IGF-1 in mammals have been linked to a shorter lifespan and an increased risk of cancer. In contrast, lower levels of IGF-1, found in smaller breeds, are associated with longevity." },
];

const faqs = [
    {
        question: "Is this trend true for all mammals?",
        answer: "No, that's what makes it a paradox. In general, across different mammal species, larger animals live longer (e.g., an elephant lives longer than a mouse). The inverse relationship between size and lifespan is a phenomenon observed *within* the canine species."
    },
    {
        question: "How much longer do small dogs live?",
        answer: "On average, small dogs (under 20 lbs) live 10-14 years, while giant breeds (over 100 lbs) have an average lifespan of just 5-8 years. Medium and large breeds fall in between. Of course, these are just averages, and individual genetics and care play a huge role."
    },
    {
        question: "Does this mean my large-breed dog is unhealthy?",
        answer: "Not at all. It simply means they have a different, accelerated aging timeline. It underscores the importance of proactive care for large and giant breeds, including regular vet check-ups, joint support, and careful weight management from a young age to minimize stress on their bodies."
    },
    {
        question: "How can I see the age difference for my dog?",
        answer: "Our <a href='/dog-age' class='text-primary hover:underline'>Dog Age Calculator</a> is the perfect tool for this. Try calculating the 'human age' for a 7-year-old small dog versus a 7-year-old giant dog. You'll see a significant difference that reflects this biological reality."
    }
];

export default function SmallDogsLiveLongerArticle() {
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
            In the animal kingdom, there's a general rule: the bigger the animal, the longer it lives. An elephant outlives a mouse, and a whale outlives a dolphin. But within the fascinating world of domestic dogs, this rule is flipped on its head. A tiny Chihuahua can live to be 18, while a majestic Great Dane is considered ancient at 8. This biological puzzle, known as the size-lifespan paradox, has intrigued scientists and dog lovers for years. So, why do small dogs live longer than their larger counterparts?
          </p>

          <h2 className="text-3xl font-bold text-center my-8">The Leading Theories</h2>
          <p>While research is ongoing, scientists have several compelling theories that help explain this phenomenon.</p>
          
          <div className="space-y-6">
            {theories.map((theory, index) => (
              <Card key={index}>
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <theory.icon className="h-8 w-8 text-primary mt-1" />
                        <CardTitle className="text-2xl">{theory.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{theory.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader>
                <CardTitle>What This Means for Dog Owners</CardTitle>
                <CardDescription>From Knowledge to Action</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Understanding this paradox is more than just academic; it has real-world implications for how we care for our dogs.
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                    <li><strong>Owners of large breeds</strong> must be extra vigilant about proactive healthcare. They should start senior wellness checks earlier and be on the lookout for signs of arthritis and other age-related issues sooner than owners of small dogs.</li>
                    <li><strong>Owners of small breeds</strong> should not become complacent. Their dogs' long lifespans mean they have more years to develop chronic conditions like dental disease, which requires consistent, lifelong care.</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                   No matter the size, providing excellent nutrition, maintaining a healthy weight, and ensuring regular veterinary care are the keys to helping your dog live the longest, healthiest life possible. Read our <Link href="/articles/senior-dog-care-guide" className="font-bold text-primary hover:underline">Senior Dog Care Guide</Link> for actionable tips.
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
