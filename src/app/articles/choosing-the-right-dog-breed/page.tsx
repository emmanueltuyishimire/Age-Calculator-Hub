
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { Activity, Brain, Home, HeartHandshake } from 'lucide-react';

const article = articles.find(a => a.slug === 'choosing-the-right-dog-breed');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const factors = [
    { icon: Activity, title: "Energy Level & Exercise Needs", content: "This is one of the most critical factors. A mismatch in energy levels is a common reason dogs are surrendered. Are you an avid runner looking for a jogging partner (like a Vizsla or Border Collie), or do you prefer gentle daily walks (like a Basset Hound or Bulldog)? Be honest about your lifestyle. A bored, under-exercised dog is often a destructive dog." },
    { icon: Brain, title: "Temperament and Trainability", content: "Consider the breed's general temperament. Are they known for being patient with children (like a Golden Retriever), independent and aloof (like a Shiba Inu), or a 'Velcro' dog that craves constant companionship (like a Cavalier King Charles Spaniel)? Also, consider trainability. Some breeds are eager to please (Poodles, Labradors), while others are more stubborn and require a more experienced owner (like a Siberian Husky)." },
    { icon: Home, title: "Size and Living Space", content: "Your living situation plays a huge role. A Great Dane in a tiny apartment is a challenge, while a Chihuahua might be perfectly happy. But don't judge by size alone; some large breeds, like Greyhounds, are surprisingly calm indoors ('45-mph couch potatoes'), while some small terriers can have high energy needs that require more space to run." },
    { icon: HeartHandshake, title: "Grooming and Health Predispositions", content: "Are you prepared to brush a dog daily (like a Poodle or Old English Sheepdog) or make regular trips to the groomer? Or do you prefer a 'wash-and-wear' coat (like a Beagle or Boxer)? Also, research common health problems for the breeds you're considering. For example, German Shepherds are prone to hip dysplasia, and brachycephalic (flat-faced) breeds like Pugs can have breathing difficulties." },
];

const faqs = [
    {
        question: "What about mixed-breed dogs?",
        answer: "Mixed-breed dogs are fantastic! You often get a unique combination of traits. If you know the mix, you can research the parent breeds to get an idea of potential energy levels and temperament. Adopting from a shelter or rescue is also great because the staff and foster parents can often give you a very accurate picture of the individual dog's personality, regardless of breed."
    },
    {
        question: "Are 'hypoallergenic' dogs real?",
        answer: "No dog is 100% hypoallergenic. The term usually refers to low-shedding breeds like Poodles or Schnauzers. People are typically allergic to dander (dead skin cells) and saliva, not the fur itself. Low-shedding breeds may be better for some allergy sufferers, but it's not a guarantee. It's best to spend time with the specific breed before committing."
    },
    {
        question: "I have kids. What's the best family dog?",
        answer: "Many breeds are known for being great with children, including Labradors, Golden Retrievers, Beagles, and many mixed-breed dogs. However, individual temperament is more important than breed. A dog's history and proper socialization are key. Always supervise interactions between dogs and young children."
    },
    {
        question: "Should I get a puppy or an adult dog?",
        answer: "Both have pros and cons. Puppies are a blank slate but require an immense amount of work with training and socialization. Adult dogs from a rescue often have some basic training, and their personality is already formed, so you know what you're getting. An adult dog can be a wonderful choice, especially for first-time owners."
    }
];

export default function ChoosingDogBreedArticle() {
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
            Choosing to bring a dog into your life is a momentous decision, a commitment that can span 10 to 15 years or more. While it's easy to fall in love with a cute face, the key to a successful, lifelong partnership is choosing a breed whose characteristics match your lifestyle, personality, and home environment. Thinking beyond looks and considering factors like energy, temperament, and grooming can prevent future heartache and ensure a happy home for both you and your new furry family member.
          </p>

          <h2 className="text-3xl font-bold text-center my-8">4 Key Factors to Consider</h2>
          
          <div className="space-y-6">
            {factors.map((factor, index) => (
              <Card key={index}>
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <factor.icon className="h-8 w-8 text-primary mt-1" />
                        <CardTitle className="text-2xl">{factor.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{factor.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>Research is Your Best Friend</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Before making a final decision, do your homework. Read breed-specific books, talk to owners of the breed you're considering, and connect with reputable breeders or rescue organizations. Remember that breed characteristics are generalizations; every dog is an individual. The best choice is an informed choice.
                </p>
                <p className="text-muted-foreground mt-2">
                    Once you bring your new friend home, learn about their needs at every stage of life, from <Link href="/articles/puppy-development-milestones" className="font-bold text-primary hover:underline">puppyhood</Link> to their <Link href="/articles/senior-dog-care-guide" className="font-bold text-primary hover:underline">senior years</Link>.
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
