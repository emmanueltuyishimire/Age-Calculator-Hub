
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';

const article = articles.find(a => a.slug === 'understanding-cat-life-stages');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const lifeStages = [
    { stage: "Kitten (0–6 months)", humanAge: "0-10 years", description: "A period of incredible growth and discovery. This is when they learn essential socialization skills and are most playful. Their nutritional needs are highest during this time." },
    { stage: "Junior (7 months–2 years)", humanAge: "12-24 years", description: "Your cat is an adolescent. They've reached full size but are still maturing mentally. They are active, curious, and may test boundaries. This is the prime time for spaying or neutering." },
    { stage: "Prime Adult (3–6 years)", humanAge: "28-40 years", description: "Your cat is in the prime of their life—healthy, active, and with a settled personality. The focus here is on maintenance: a balanced diet, regular play, and preventative wellness." },
    { stage: "Mature Adult (7–10 years)", humanAge: "44-56 years", description: "The first signs of aging may appear. Activity levels might decrease, making weight management important. It's a good time to start monitoring for subtle changes in behavior or health." },
    { stage: "Senior (11–14 years)", humanAge: "60-72 years", description: "Your cat is officially a senior citizen. Health issues like arthritis, kidney disease, or thyroid problems become more common. Bi-annual vet check-ups are highly recommended." },
    { stage: "Geriatric (15+ years)", humanAge: "76+ years", description: "These are the golden years. Care focuses on comfort, managing chronic conditions, and adapting the environment (e.g., providing ramps, accessible litter boxes) to support their needs." },
];

const faqs = [
    {
        question: "When is my cat considered a senior?",
        answer: "According to guidelines from the American Association of Feline Practitioners (AAFP), a cat is considered 'senior' starting at age 11, which is about 60 in human years. This is when more regular health screenings become important."
    },
    {
        question: "Why does my cat's behavior change as they get older?",
        answer: "Just like humans, cats experience physical and cognitive changes with age. A senior cat may sleep more, be less active due to arthritis, or become more vocal due to hearing or vision loss. It's important to differentiate normal aging from signs of illness, so always consult a vet."
    },
    {
        question: "Should I change my cat's food as they age?",
        answer: "Yes. Kittens need food high in calories and protein for growth. Adult cats need a maintenance diet. Senior cats often benefit from diets that are lower in calories to prevent weight gain, and may have specific ingredients to support joint, kidney, or dental health."
    },
    {
        question: "How can I keep my senior cat comfortable?",
        answer: "Provide soft, warm bedding in easily accessible spots. Use low-entry litter boxes. Consider ramps or steps to help them reach favorite perches. Ensure food and water are easy to get to. Regular, gentle grooming is also beneficial."
    }
];

export default function CatLifeStagesArticle() {
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
            Understanding your cat's age in human years is more than a fun fact; it's a crucial tool for providing the best possible care throughout their life. Unlike the simple "7-year rule" myth, cats age rapidly in their first two years and then settle into a more gradual pace. Knowing which of the six distinct life stages your cat is in helps you anticipate their needs for nutrition, health, and enrichment.
          </p>

          <div className="my-10 text-center">
            <Link href="/cat-age-in-human-years">
                <Button size="lg">Calculate Your Cat's Human Age</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Find out which life stage your cat is in right now.</p>
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-8">The 6 Life Stages of a Cat</h2>
          <p>Veterinary organizations like the AAFP divide a cat's life into six key stages. Each has unique characteristics and care requirements.</p>

          {lifeStages.map((stage) => (
             <Card key={stage.stage} className="my-8">
                <CardHeader>
                    <CardTitle className="text-2xl">{stage.stage}</CardTitle>
                    <p className="text-sm font-semibold text-primary">{stage.humanAge} (Human Years)</p>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{stage.description}</p>
                </CardContent>
             </Card>
          ))}

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>Proactive Care Through the Ages</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    By understanding these life stages, you can be a more proactive pet owner. You'll know when to switch from kitten to adult food, when to start watching for the subtle signs of senior-related health issues, and how to adapt your home to keep a geriatric cat comfortable. This knowledge empowers you to partner with your veterinarian to give your feline friend a long, healthy, and happy life.
                </p>
                <p className="text-muted-foreground mt-4">
                    For more on specific health concerns for older cats, read our guide on <Link href="/articles/common-health-problems-in-senior-cats" className="font-bold text-primary hover:underline">common health problems in senior cats</Link>.
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
