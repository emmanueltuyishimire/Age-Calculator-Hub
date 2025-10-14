
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const article = articles.find(a => a.slug === 'navigating-pregnancy-milestones');

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

const trimesters = [
    { 
        title: "First Trimester (Weeks 1-13)", 
        content: "This is a period of rapid development. Though you may not look pregnant, your body is working hard. Key milestones include the baby's heart beginning to beat (around week 5-6) and the formation of all major organs by the end of the trimester. Morning sickness and fatigue are common. Use our <a href='/gestational-age' class='text-primary hover:underline'>Gestational Age Calculator</a> to track your progress from the very beginning." 
    },
    { 
        title: "Second Trimester (Weeks 14-27)", 
        content: "Often called the 'honeymoon' phase of pregnancy, many people feel their best during this time. You'll likely feel the baby's first movements (quickening) between weeks 16-25. The baby can now hear sounds, and detailed anatomy can be seen on an ultrasound. This is a good time to start planning for the baby's arrival." 
    },
    { 
        title: "Third Trimester (Weeks 28-40+)", 
        content: "This is the home stretch. The baby will gain the most weight during this time, and their lungs will continue to mature. You'll have more frequent check-ups to monitor the baby's position and your health. It's time to finalize birth plans and pack your hospital bag. Use our <a href='/due-date-calculator' class='text-primary hover:underline'>Due Date Calculator</a> to keep an eye on the big day!" 
    },
];

export default function PregnancyMilestonesArticle() {
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
            Pregnancy is an incredible journey marked by distinct stages, known as trimesters. Each trimester brings its own set of changes and developmental milestones for both you and your baby. This guide provides a simple overview of what to expect during each phase.
          </p>
          
          <div className="my-10 text-center">
            <Link href="/pregnancy-calculators">
                <Button size="lg">Explore Pregnancy Calculators</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Track every step of your journey.</p>
          </div>

          {trimesters.map((trim, index) => (
             <Card key={index} className="my-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-4">
                         <span>{trim.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: trim.content }}></p>
                </CardContent>
             </Card>
          ))}

            <Card className="my-8 bg-muted border-l-4 border-primary">
                <CardHeader><CardTitle>The Final Word</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Every pregnancy is unique, but understanding these general milestones can help you feel more prepared and connected to the process. Remember to consult with your healthcare provider for personalized advice and care throughout your pregnancy.
                    </p>
                    <p className="text-muted-foreground mt-4">
                        From figuring out your fertile window with our <Link href="/ovulation-calculator" className="text-primary hover:underline">Ovulation Calculator</Link> to counting down the final days, we have the tools to support you.
                    </p>
                </CardContent>
            </Card>
        </article>
      </main>
    </div>
  );
}
