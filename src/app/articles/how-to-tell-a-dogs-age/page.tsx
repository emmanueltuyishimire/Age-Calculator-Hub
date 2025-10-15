
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';

const article = articles.find(a => a.slug === 'how-to-tell-a-dogs-age');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const faqs = [
    {
        question: "How accurate is looking at a dog's teeth to tell its age?",
        answer: "It's a good estimate, especially for younger dogs. By 7-8 months, most dogs have their permanent teeth. The amount of wear and tartar buildup can then give clues, but this is heavily influenced by diet, chew habits, and dental care. It's less reliable for older dogs."
    },
    {
        question: "Can you tell a dog's age by its eyes?",
        answer: "To some extent. The development of lenticular sclerosis, a bluish, hazy appearance in the pupil, is a common sign of aging that usually starts around age 6-8. While it's a good indicator of middle-to-senior age, it doesn't provide a specific number."
    },
    {
        question: "Do gray hairs mean my dog is old?",
        answer: "Not necessarily. While most dogs start getting gray fur around the muzzle between ages 7-10, some dogs can start showing gray as early as age 1 or 2 due to genetics or stress. It's a clue, but not a definitive one."
    },
    {
        question: "Is there a definitive way to know a rescue dog's age?",
        answer: "There is no single definitive way. A veterinarian provides the best estimate by combining all the available clues: teeth, eyes, coat, muscle tone, and overall health assessment. Even then, it's an educated guess."
    }
];

export default function HowToTellADogsAgeArticle() {
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
            When you adopt a dog from a shelter or find a stray, one of the biggest mysteries is often their age. While our <Link href="/dog-age" className="text-primary hover:underline">Dog Age Calculator</Link> is a fantastic tool for converting a known age into human years, what do you do when you don't know the starting number? Veterinarians use a combination of physical and behavioral clues to make an educated guess. This guide will walk you through the same signs they look for, helping you become a better detective of your dog's history.
          </p>

          <div className="my-10 text-center">
            <Link href="/dog-age">
                <Button size="lg">Try the Dog Age Calculator</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Once you have an estimate, convert it to human years!</p>
          </div>

          <h2 className="text-3xl font-bold">1. The Telltale Teeth: A Dog's Dental Timeline</h2>
          <p>A dog's teeth provide some of the most reliable clues, especially in their early years.</p>
          <ul className="list-disc list-inside space-y-3 my-4">
              <li><strong>By 8 weeks:</strong> All baby teeth (deciduous teeth) are in.</li>
              <li><strong>By 7-8 months:</strong> All permanent teeth are in. They will be clean, white, and sharp. If a dog has all its adult teeth and they are pristine, it is likely around one year old.</li>
              <li><strong>1-2 years:</strong> The teeth are still white, but the back molars may start to show a little dullness and tartar buildup.</li>
              <li><strong>3-5 years:</strong> Most teeth show some wear. The incisors (the small front teeth) will be less pointed, and tartar buildup is more noticeable, especially on the molars. Some yellowing is common.</li>
              <li><strong>5-10 years:</strong> Significant wear is visible on most teeth. The yellowing is more pronounced, and tartar is often significant. Gum disease may be present.</li>
              <li><strong>10-15 years:</strong> Teeth are often heavily worn down, sometimes with chips or missing teeth. Heavy tartar buildup is common, and signs of dental disease are likely.</li>
          </ul>

          <Card className="my-8 bg-muted border-l-4 border-primary">
            <CardHeader>
                <CardTitle>Important Caveat on Dental Clues</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Dental health is heavily influenced by diet, chew habits, and prior dental care. A small dog with a history of eating soft food and no dental chews may have worse teeth at age 4 than a large dog at age 7 who regularly chews on bones. Use teeth as a primary clue, but not the only one.
                </p>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold">2. The Eyes: Windows to Their Age</h2>
          <p>A dog's eyes can also reveal signs of aging.</p>
          <ul className="list-disc list-inside space-y-3 my-4">
            <li><strong>Young Dogs:</strong> Bright, clear eyes with no signs of cloudiness or tearing.</li>
            <li><strong>Middle-Aged Dogs (6-8 years and older):</strong> Many dogs develop <strong>lenticular sclerosis</strong>, a normal age-related change that causes a bluish, hazy appearance in the pupils. This is not the same as cataracts (which are white and opaque) and doesn't significantly impair vision. However, its presence is a strong sign that a dog has reached middle or senior age.</li>
            <li><strong>Senior Dogs:</strong> May show more pronounced cloudiness. Cataracts, which can cause blindness, are also more common in senior dogs, as are other eye conditions like glaucoma.</li>
          </ul>

          <h2 className="text-3xl font-bold">3. Coat, Muscle Tone, and Body Shape</h2>
          <p>Just like humans, a dog's body changes with age.</p>
          <ul className="list-disc list-inside space-y-3 my-4">
            <li><strong>Fur/Coat:</strong> Puppies have soft, fine fur. Adult dogs have a coarser coat. Senior dogs often develop patches of gray or white fur, especially around the muzzle and eyes. While genetics can cause premature graying, it's a reliable indicator in older dogs. Their coat might also become thinner.</li>
            <li><strong>Muscle Tone:</strong> Young dogs are typically lean and muscular. As they age, especially into their senior years, they tend to lose muscle mass. You might notice less definition in their legs and back.</li>
            <li><strong>Body Shape:</strong> Older dogs may be bonier due to muscle loss or, conversely, carry extra weight due to a slowing metabolism and less activity.</li>
          </ul>

          <h2 className="text-3xl font-bold">4. Activity Level and Behavior</h2>
          <p>A dog's energy and behavior can also offer clues.</p>
          <ul className="list-disc list-inside space-y-3 my-4">
            <li><strong>Puppies & Young Adults:</strong> Full of energy, highly playful, and can "go all day."</li>
            <li><strong>Mature Adults (3-7 years):</strong> Still active and playful, but may have more of an "off switch" and be content to relax after exercise.</li>
            <li><strong>Seniors (8+ years):</strong> Tend to sleep more, have shorter bursts of energy, and may show signs of stiffness or difficulty getting up, going up stairs, or jumping into the car. They may also show signs of confusion or changes in their sleep-wake cycles (Cognitive Dysfunction Syndrome).</li>
          </ul>

          <Card className="my-8">
            <CardHeader>
                <CardTitle>Putting It All Together</CardTitle>
                <CardDescription>Synthesizing the Clues</CardDescription>
            </CardHeader>
            <CardContent>
                <p>No single factor can tell you a dog's exact age. The best approach is to be a detective and combine the evidence:</p>
                <ul className="space-y-3 mt-4">
                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span>A dog with clean, white permanent teeth and boundless energy is likely 1-2 years old.</span></li>
                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span>A dog with some tartar, slight tooth wear, and a bit of gray around the muzzle is probably in the 5-7 year range.</span></li>
                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 shrink-0" /><span>A dog with cloudy eyes, significant gray fur, worn teeth, and a tendency to sleep a lot is almost certainly a senior (8+ years old).</span></li>
                </ul>
                <p className="mt-4">Your veterinarian is your best partner in this process. They can synthesize these clues into the most accurate age estimate possible, helping you provide the best care for your canine companion through every stage of their life. For more detailed information on care, see our guide to <Link href="/articles/senior-dog-care-guide" className="text-primary hover:underline">caring for a senior dog</Link>.</p>
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
