
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dog, Cat } from 'lucide-react';
import { notFound } from 'next/navigation';

const article = articles.find(a => a.slug === 'your-pets-first-year');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

export default function YourPetsFirstYearArticle() {
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
            The first year with a new puppy or kitten is a magical, chaotic, and incredibly important time. It's a period of explosive growth, critical learning, and foundational bonding that will shape their health and behavior for the rest of their lives. Whether you're a first-time pet owner or a seasoned pro, understanding the unique needs of this whirlwind first year is key to raising a happy, well-adjusted companion.
          </p>
          
          <div className="my-10 text-center">
            <Link href="/pet-age-calculators">
                <Button size="lg" className="text-lg">Explore Our Pet Age Calculators</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Track their age from day one.</p>
          </div>

          <h2 className="text-3xl font-bold text-center mb-8">Choose Your Path: Puppy or Kitten?</h2>
          <p>While both puppies and kittens require love and care, their developmental paths and key needs have important differences. Explore our detailed guides to get the specific information you need for your new family member.</p>

          <div className="grid md:grid-cols-2 gap-8 my-8">
            <Card className="flex flex-col text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                    <Dog className="h-12 w-12 mx-auto text-primary" />
                    <CardTitle className="text-2xl mt-4">The Puppy's First Year</CardTitle>
                    <CardDescription>From Socialization to Adolescence</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-muted-foreground">Learn about the critical socialization window, navigating the challenging "teenage" phase, and setting the groundwork for a well-behaved adult dog.</p>
                </CardContent>
                <CardContent>
                    <Link href="/articles/puppy-development-milestones">
                        <Button className="w-full">Read the Puppy Guide</Button>
                    </Link>
                </CardContent>
            </Card>
            <Card className="flex flex-col text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                    <Cat className="h-12 w-12 mx-auto text-primary" />
                    <CardTitle className="text-2xl mt-4">The Kitten's First Year</CardTitle>
                    <CardDescription>From Play to Pounce</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-muted-foreground">Discover the essentials of kitten care, from nutrition and litter box training to the importance of interactive play and creating a safe, enriching environment.</p>
                </CardContent>
                <CardContent>
                    <Link href="/articles/kitten-care-101">
                        <Button className="w-full">Read the Kitten Guide</Button>
                    </Link>
                </CardContent>
            </Card>
          </div>

          <h2 className="text-3xl font-bold">Universal Truths of the First Year</h2>
          <p>Regardless of species, some truths are universal for raising a young animal:</p>
          <ul className="list-disc list-inside space-y-3 my-4">
            <li><strong>Veterinary Care is Non-Negotiable:</strong> A visit to the vet within the first week is crucial for a health check, deworming, and starting their <Link href="/articles/dog-vaccination-guide" className="text-primary hover:underline">vaccination</Link> schedule.</li>
            <li><strong>Socialization is Key:</strong> Positive exposure to new people, places, sounds, and other animals (once vaccinated) during their youth is the single best way to prevent fear and aggression later in life.</li>
            <li><strong>Patience is Your Superpower:</strong> There will be accidents, chewed shoes, and moments of frustration. Patience, consistency, and positive reinforcement are your most effective training tools.</li>
            <li><strong>Time Flies:</strong> It feels like a lot of work, but the puppy and kitten phase is fleeting. Take lots of pictures, cherish the cuddles, and enjoy the journey.</li>
          </ul>
        </article>
      </main>
    </div>
  );
}
