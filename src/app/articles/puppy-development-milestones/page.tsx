
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';

const article = articles.find(a => a.slug === 'puppy-development-milestones');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const milestones = [
    { period: "Birth to 2 Weeks: Neonatal Period", details: "Puppies are born deaf, blind, and toothless, completely dependent on their mother. They spend most of their time sleeping and eating. Their world is guided by touch and smell." },
    { period: "2 to 4 Weeks: Transitional Period", details: "An explosion of senses! Eyes and ears open (around 10-16 days). They start to stand, take wobbly steps, and may begin to wag their tails and bark. The first baby teeth start to emerge." },
    { period: "4 to 12 Weeks: Socialization Period", details: "This is the most critical window for development. From 4-8 weeks, they learn crucial social skills from their mother and littermates. From 8-12 weeks, their education continues with you. Positive exposure to new sights, sounds, people, and other vaccinated dogs is vital to prevent fear and aggression later in life. House training and basic commands can begin." },
    { period: "3 to 6 Months: Ranking Period", details: "Your puppy is now more independent and may test boundaries as they figure out their place in the household pack. Teething is in full swing as adult teeth replace baby teeth. This is a key time for consistent training and reinforcing rules." },
    { period: "6 to 18 Months: Adolescence", details: "Welcome to the 'teenager' phase. Your pup may seem to forget their training, become more energetic, and push boundaries again. They reach sexual maturity during this time. Patience, continued training, and plenty of exercise are essential to navigate this challenging but temporary stage." },
];

const faqs = [
    {
        question: "When is the best time to bring a puppy home?",
        answer: "The ideal time is between 8 and 10 weeks of age. This allows them to spend enough time with their mother and littermates to learn important social skills like bite inhibition, but they are still young enough to bond strongly with their new human family."
    },
    {
        question: "What is the most important period for a puppy's development?",
        answer: "The socialization period (4 to 12 weeks) is widely considered the most critical. The experiences a puppy has during this time will shape their future personality and temperament more than any other period."
    },
    {
        question: "When should I start training my puppy?",
        answer: "You can start with gentle handling and simple commands like 'sit' as soon as you bring them home at 8 weeks. Keep sessions short, fun, and positive. Formal puppy classes are great to start around 10-12 weeks, after they've had their initial vaccinations."
    },
    {
        question: "My puppy is chewing on everything! What should I do?",
        answer: "This is normal, especially during the teething phase (3-6 months). Provide plenty of appropriate chew toys. If you catch them chewing on something they shouldn't, redirect them to one of their toys and praise them. 'Puppy-proof' your home to keep them and your belongings safe."
    }
];

export default function PuppyDevelopmentArticle() {
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
            A puppy's first year is a whirlwind of growth, learning, and discovery. From a helpless newborn to a boisterous adolescent, the changes are astounding. Understanding the key developmental milestones helps you provide the right support, training, and socialization at the right time, setting the foundation for a well-adjusted, happy adult dog. This guide breaks down the first year into its crucial stages.
          </p>
          
          <h2 className="text-3xl font-bold text-center mb-8">The Key Stages of Puppy Development</h2>

          <div className="space-y-4">
            {milestones.map((milestone, index) => (
             <Card key={index} className="my-6">
                <CardHeader>
                    <CardTitle className="text-2xl">{milestone.period}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{milestone.details}</p>
                </CardContent>
             </Card>
            ))}
          </div>

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>From Puppy to Adult</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    After 18 months, your dog is considered a young adult. The foundational work you do in this first year is the single most important investment you can make in your dog's future behavior and well-being.
                </p>
                <p className="text-muted-foreground mt-4">
                    Once your puppy is an adult, you can track their age with our <Link href="/dog-age" className="font-bold text-primary hover:underline">Dog Age Calculator</Link> to understand their needs as they mature.
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
