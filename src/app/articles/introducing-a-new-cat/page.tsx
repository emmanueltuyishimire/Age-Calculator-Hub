
import { type Metadata } from 'next';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { DoorClosed, Utensils, Replace, PawPrint } from 'lucide-react';

const article = articles.find(a => a.slug === 'introducing-a-new-cat');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const steps = [
    { icon: DoorClosed, title: "Step 1: The Sanctuary Room", content: "Do not let the cats meet face-to-face immediately. Set up a 'sanctuary room' for the new cat with its own litter box, food, water, and bedding. Let the new cat acclimate here for a few days to a week. The resident cat will know another cat is present by smell, but without the threat of a direct confrontation." },
    { icon: Replace, title: "Step 2: Scent Swapping", content: "Cats communicate heavily through scent. After a couple of days, start swapping scents. Take a blanket or bed from each cat and place it in the other's territory. You can also rub a cloth on one cat's cheeks and place it for the other to investigate. This allows them to get used to each other's smell in a non-threatening way. Reward them with treats for calm investigation." },
    { icon: Utensils, title: "Step 3: Feeding on Opposite Sides of the Door", content: "Begin feeding both cats on opposite sides of the closed sanctuary room door. This helps them associate each other's scent with something positive (food). Start with the bowls several feet from the door and gradually move them closer over several days as they remain calm." },
    { icon: PawPrint, title: "Step 4: Supervised, Brief Visual Contact", content: "Once they are eating calmly right next to the door, it's time for the first visual meeting. Use two doorstops to prop the door open just enough for them to see each other but not get through. Or, use two baby gates stacked in the doorway. Keep these first interactions very short (a few minutes) and positive, ending with a treat or playtime. Expect some hissing and growling; this is normal. Separate them if there is any sign of aggression." },
    { icon: PawPrint, title: "Step 5: Gradual, Supervised Integration", content: "Once they can see each other without significant hostility, you can allow them to be in the same room together under strict supervision. Start with short periods and make them positive with interactive play (use two wand toys) or treats. Never let them 'fight it out.' Separate them at the first sign of trouble and go back a step. Gradually increase the time they spend together until they can coexist peacefully." },
];

const faqs = [
    {
        question: "How long does the introduction process take?",
        answer: "It varies wildly. For some easygoing cats, it might take a week. For others, it could take several months. The key is to never rush the process. Go at the cats' pace, not yours. Patience is your most important tool."
    },
    {
        question: "There's a lot of hissing and growling. Is that okay?",
        answer: "Hissing, growling, and posturing are normal ways for cats to communicate boundaries and uncertainty. As long as it doesn't escalate to full-blown fighting (screeching, swatting with claws, biting), it's part of the process. If a fight breaks out, separate them immediately (don't use your hands!) and go back to a previous step for a longer period."
    },
    {
        question: "What if they just won't get along?",
        answer: "In some rare cases, cats may never be best friends, but most can learn to coexist peacefully. If you're struggling, consult a veterinarian or a certified cat behaviorist. They can offer personalized advice and may recommend tools like calming pheromone diffusers (e.g., Feliway)."
    },
    {
        question: "Should I get a kitten to make it easier for my older cat?",
        answer: "Not necessarily. While some older cats may tolerate a kitten, many find a kitten's high energy level to be annoying and stressful. Often, the best match for an adult cat is another adult cat with a similar, calm temperament."
    }
];

export default function IntroducingNewCatArticle() {
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
            Cats are territorial creatures. Unlike dogs, they don't have an innate pack mentality and often view a new feline in their home as a threat, not a friend. A successful introduction is not about putting them in a room and hoping for the best; it's a slow, deliberate process of building positive associations. Rushing it is the number one mistake owners make and can lead to a lifetime of conflict. This step-by-step guide, based on methods recommended by cat behaviorists, will set you up for success.
          </p>

          <h2 className="text-3xl font-bold text-center my-8">The Step-by-Step Introduction Method</h2>
          
          <div className="space-y-6">
            {steps.map((step, index) => (
              <Card key={index}>
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <step.icon className="h-8 w-8 text-primary mt-1" />
                        <CardTitle className="text-2xl">{step.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{step.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader>
                <CardTitle>Patience is Paramount</CardTitle>
                <CardDescription>Go at the Cats' Pace</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    The golden rule of cat introductions is to go slower than you think you need to. It is always better to spend an extra week on one step than to rush and have to start the entire process over from the beginning. Your patience in the first few weeks will pay off with years of harmony.
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
