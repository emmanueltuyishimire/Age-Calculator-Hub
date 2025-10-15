
import { type Metadata } from 'next';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { notFound } from 'next/navigation';

const article = articles.find(a => a.slug === 'human-foods-toxic-to-pets');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const toxicFoods = [
    { name: "Chocolate", details: "Contains theobromine and caffeine, which are highly toxic to dogs and cats. Dark chocolate and baking chocolate are the most dangerous. Can cause vomiting, diarrhea, rapid heart rate, seizures, and death." },
    { name: "Onions, Garlic, Chives, and Leeks", details: "Part of the Allium family, these can cause damage to red blood cells, leading to anemia. Toxicity can occur from a large single dose or repeated smaller amounts." },
    { name: "Grapes and Raisins", details: "Highly toxic to dogs and can cause acute, sudden kidney failure. The exact toxic substance is unknown, and even a small amount can be fatal." },
    { name: "Xylitol", details: "An artificial sweetener found in many sugar-free products like gum, candy, peanut butter, and baked goods. It causes a rapid, severe drop in blood sugar and can lead to liver failure in dogs." },
    { name: "Alcohol", details: "Can cause vomiting, diarrhea, coordination problems, central nervous system depression, difficulty breathing, and death. Pets are much smaller and more sensitive to its effects." },
    { name: "Macadamia Nuts", details: "Can cause weakness, vomiting, tremors, and hyperthermia in dogs. Symptoms usually appear within 12 hours of ingestion." },
    { name: "Cooked Bones", details: "Can splinter and cause choking or serious damage to the digestive tract, including blockages or perforations. Raw bones can also carry risks and should only be given with supervision." },
    { name: "Yeast Dough", details: "Raw bread dough can rise in the stomach, causing painful gas and potentially twisting the stomach (a condition called bloat), which is a life-threatening emergency. The fermenting yeast also produces alcohol." },
    { name: "Caffeine", details: "Found in coffee, tea, soda, and energy drinks. It can cause similar effects to chocolate toxicity, including heart palpitations, tremors, and seizures." },
    { name: "Lilies (for Cats)", details: "Many types of lilies (including Easter, Tiger, and Daylilies) are extremely toxic to cats. Ingesting even a small amount of the plant, or even the pollen or water from the vase, can cause severe kidney failure." },
];

export default function ToxicFoodsArticle() {
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
            Sharing our lives with pets often means sharing our homes and, sometimes, our food. While it's tempting to give your furry friend a taste of what you're eating, many common human foods are toxic to dogs and cats. Knowing which foods are dangerous is essential for every pet owner to prevent a medical emergency. This guide covers some of the most common and dangerous culprits.
          </p>

          <Alert variant="destructive" className="my-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>In Case of Emergency</AlertTitle>
            <AlertDescription>
              If you suspect your pet has ingested any of these foods, contact your veterinarian or the ASPCA Animal Poison Control Center (888-426-4435) immediately. Do not wait for symptoms to appear.
            </AlertDescription>
          </Alert>

          <h2 className="text-3xl font-bold text-center mb-8">Common Foods to Keep Away From Pets</h2>

          <div className="space-y-6">
            {toxicFoods.map((food, index) => (
              <Card key={index}>
                <CardHeader>
                    <CardTitle className="text-2xl">{food.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{food.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>Better Safe Than Sorry</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    The safest approach is to only feed your pet food and treats specifically formulated for them. While some human foods like plain cooked chicken, carrots, or green beans can be okay in moderation, it's best to avoid feeding from the table to prevent accidental ingestion of something harmful. Always keep trash cans secured and be mindful of what you leave on countertops.
                </p>
            </CardContent>
          </Card>
        </article>
      </main>
    </div>
  );
}
