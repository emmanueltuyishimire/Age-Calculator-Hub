
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const article = articles.find(a => a.slug === 'how-to-improve-biological-age');

if (!article) {
  return null;
}

export const metadata: Metadata = {
    title: article.title,
    description: article.description,
    alternates: {
        canonical: `/articles/${article.slug}`,
    },
};

const tips = [
    { title: "Eat a Nutrient-Dense Diet", description: "Focus on whole foods rich in antioxidants and polyphenols, like leafy greens, berries, and nuts. These foods combat inflammation and cellular damage, which are key drivers of aging. Reduce your intake of processed foods, sugar, and unhealthy fats." },
    { title: "Prioritize Consistent Exercise", description: "Combine cardiovascular exercise (like brisk walking or swimming) with strength training. Cardio improves heart health, while strength training builds muscle mass, which boosts your metabolism and supports a lower metabolic age." },
    { title: "Master Your Sleep", description: "Aim for 7-9 hours of quality sleep per night. During deep sleep, your body performs critical repair functions, clears out toxins from the brain, and regulates hormones. Poor sleep is a major accelerator of the aging process." },
    { title: "Manage Chronic Stress", description: "Incorporate stress-reduction techniques like meditation, deep breathing exercises, or spending time in nature. Chronic stress floods your body with cortisol, a hormone that increases inflammation and breaks down tissues." },
    { title: "Nurture Social Connections", description: "Strong social bonds and a sense of community are powerful buffers against stress and have been linked to a longer, healthier life. Make time for friends, family, and activities that bring you joy and a sense of belonging." }
];

export default function ImproveBiologicalAgeArticle() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <article className="prose dark:prose-invert lg:prose-xl max-w-none">
          <div className="text-center mb-8">
            <p className="text-base text-primary font-semibold">{article.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{article.title}</h1>
            <p className="text-md md:text-lg text-muted-foreground">
              {article.description}
            </p>
          </div>

          <p className="lead">
            While you can't turn back your chronological clock, the exciting news from the field of longevity science is that your biological age is remarkably flexible. The daily choices you make have a profound impact on your cellular health. By adopting a few key habits, you can effectively slow down, and in some cases even reverse, your body's internal aging process.
          </p>

          <p>
            This guide provides five evidence-based, actionable tips to help you lower your biological age, enhance your healthspan, and add more vibrant, healthy years to your life. For a deeper dive, check out our <Link href="/articles/what-is-biological-age-and-how-to-improve-it" className="text-primary hover:underline">Ultimate Guide to Biological Age</Link>.
          </p>
          
          <div className="my-10 text-center">
            <Link href="/biological-age">
                <Button size="lg">Estimate Your Biological Age</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Find out where you stand today.</p>
          </div>

          {tips.map((tip, index) => (
             <Card key={index} className="my-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-4">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">{index + 1}</span>
                        <span>{tip.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{tip.description}</p>
                </CardContent>
             </Card>
          ))}

            <Card className="my-8 bg-muted border-l-4 border-primary">
                <CardHeader>
                    <CardTitle>Putting It All Together</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Lowering your biological age isn't about a single magic bullet; it's about building a sustainable lifestyle that supports your health from the inside out. Start by picking one or two of these tips to focus on. Small, consistent changes can lead to significant improvements over time.
                    </p>
                    <p className="text-muted-foreground mt-4">
                        Ready to track your progress? Use our <Link href="/biological-age" className="text-primary hover:underline">Biological Age Calculator</Link> every few months to see how your lifestyle changes are paying off.
                    </p>
                </CardContent>
            </Card>

        </article>
      </main>
    </div>
  );
}
