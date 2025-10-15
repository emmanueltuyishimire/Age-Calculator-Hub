
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { Utensils, Home, ToyBrick, Stethoscope } from 'lucide-react';

const article = articles.find(a => a.slug === 'kitten-care-101');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const careTips = [
    { icon: Utensils, title: "Nutrition: Fueling Growth", content: "Kittens have tiny stomachs but huge energy needs. They require a diet high in protein and calories. Choose a high-quality food specifically formulated for kittens. Provide fresh water at all times. Kittens typically need to eat small, frequent meals, 3-4 times a day." },
    { icon: Home, title: "Creating a Safe Environment", content: "Kitten-proof your home! Secure loose wires, put away toxic plants and chemicals, and ensure there are no small objects they could swallow. Provide a safe, quiet space with a comfortable bed where they can retreat and feel secure." },
    { icon: ToyBrick, title: "Socialization and Play", content: "The period from 2 to 7 weeks is critical for socialization. Gently expose your kitten to different people, sounds, and experiences. Play is not just fun; it's how they learn. Use interactive toys like wands and laser pointers to teach them appropriate play behavior and avoid using your hands as toys." },
    { icon: Stethoscope, title: "Veterinary Care and Health", content: "Your kitten's first vet visit should happen soon after you bring them home. This visit is crucial for a general health check, starting their vaccination series (against diseases like panleukopenia and rabies), deworming, and discussing a plan for spaying or neutering, which is typically done around 5-6 months of age." },
];

const faqs = [
    {
        question: "How often should I feed my kitten?",
        answer: "Kittens under six months old should be fed 3-4 small meals per day. After six months, you can transition to two meals a day. Always follow the feeding guidelines on your kitten food package and adjust based on their activity level and body condition."
    },
    {
        question: "When should I introduce the litter box?",
        answer: "Immediately. Show your kitten where the litter box is as soon as you bring them home. Most kittens learn to use it very quickly. Use an unscented, clumping litter in a box with low sides that's easy for them to get into."
    },
    {
        question: "My kitten is biting and scratching me during play. What should I do?",
        answer: "This is a common issue. Never use your hands or feet as toys. If your kitten starts to bite or scratch you during play, immediately redirect their attention to an appropriate toy, like a wand toy or stuffed mouse. If they persist, end the play session for a few minutes."
    },
    {
        question: "When should I spay or neuter my kitten?",
        answer: "Most veterinarians recommend spaying or neutering between 5 and 6 months of age. This prevents unwanted litters and can reduce the risk of certain cancers and behavioral problems."
    }
];

export default function KittenCareArticle() {
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
            Bringing home a new kitten is an incredibly exciting experience. These tiny balls of fluff bring immense joy, but they also come with big responsibilities. The care you provide in their first few months sets the stage for a lifetime of health and happiness. This guide covers the essential pillars of kitten care to help you get started on the right paw.
          </p>

          <h2 className="text-3xl font-bold text-center mb-8">The Pillars of Kitten Care</h2>

          <div className="space-y-6">
            {careTips.map((tip, index) => (
             <Card key={index} className="my-8 overflow-hidden">
                <CardHeader className="flex flex-row items-start bg-muted/50 gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0">
                        <tip.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-grow">
                        <CardTitle className="text-2xl">{tip.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6 text-base">
                    <p className="text-muted-foreground">{tip.content}</p>
                </CardContent>
             </Card>
            ))}
          </div>

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>The Journey Ahead</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    The first year is a journey of rapid growth. By the time your kitten celebrates their first birthday, they'll be equivalent to a 15-year-old human!
                </p>
                <p className="text-muted-foreground mt-4">
                    After their first year, you can track their journey through adulthood with our <Link href="/cat-age-in-human-years" className="font-bold text-primary hover:underline">Cat Age Calculator</Link> and learn more about the different <Link href="/articles/understanding-cat-life-stages" className="font-bold text-primary hover:underline">feline life stages</Link>.
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
