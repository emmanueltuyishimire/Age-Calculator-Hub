
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
        title: "The First Trimester (Weeks 1-13): The Foundation", 
        content: "This is a period of invisible but incredible transformation. Though you may not look pregnant, your body is working tirelessly. Key milestones include the baby's heart beginning to beat (around week 5-6), the neural tube (which becomes the brain and spinal cord) forming, and all major organs and body systems being established by the end of the trimester. For many, this phase is marked by fatigue, morning sickness, and heightened emotions. Tracking your progress from day one with our <a href='/gestational-age' class='text-primary hover:underline font-semibold'>Gestational Age Calculator</a> can be reassuring during this critical time." 
    },
    { 
        title: "The Second Trimester (Weeks 14-27): The 'Golden' Phase", 
        content: "Often called the 'honeymoon' phase, many people feel a surge of energy and a decrease in morning sickness. This is when pregnancy starts to feel more real. You'll likely feel the baby's first fluttering movements (quickening) between weeks 16-25. The baby can now hear sounds from the outside world, and their unique fingerprints and footprints are formed. A detailed anatomy ultrasound is typically performed around week 20 to check on development." 
    },
    { 
        title: "The Third Trimester (Weeks 28-40+): The Final Countdown", 
        content: "This is the home stretch. The baby will gain the most weight during this time, and their brain, lungs, and other organs will continue to mature. You'll have more frequent prenatal check-ups to monitor the baby's position and your health. It's time to finalize birth plans, pack your hospital bag, and prepare for labor. Keeping a close eye on the calendar with our <a href='/due-date-calculator' class='text-primary hover:underline font-semibold'>Due Date Calculator</a> helps build anticipation for the big day!" 
    },
];

const faqs = [
    {
        question: "What's the difference between gestational age and fetal age?",
        answer: "Gestational age is calculated from the first day of your last menstrual period (LMP) and is the standard used by doctors. Fetal age is the actual age of the baby from conception, which is about two weeks less than the gestational age. Our calculators use gestational age."
    },
    {
        question: "Is it normal for my due date to change?",
        answer: "Yes, it's quite common. The initial due date from your LMP is an estimate. An early ultrasound (usually in the first trimester) provides the most accurate dating, and your doctor may adjust your due date based on those measurements."
    },
    {
        question: "When should I start feeling the baby move?",
        answer: "First-time moms typically feel 'quickening' between 18 and 25 weeks. If it's your second or subsequent pregnancy, you might feel it earlier, around 16 weeks. It often feels like little flutters or bubbles at first."
    },
    {
        question: "How important is taking a prenatal vitamin?",
        answer: "Extremely important. Prenatal vitamins contain crucial nutrients like folic acid, iron, and calcium that are essential for preventing birth defects and supporting the healthy development of your baby's brain, bones, and blood supply. It's recommended to start taking them even before you conceive."
    },
];

export default function PregnancyMilestonesArticle() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <article className="prose dark:prose-invert lg:prose-xl max-w-none">
          <div className="text-center mb-12">
            <p className="text-base text-primary font-semibold">{article.category}</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{article.title}</h1>
            <p className="text-md md:text-lg text-muted-foreground">
              {article.description}
            </p>
          </div>

          <p className="lead">
            Pregnancy is an incredible 40-week journey marked by distinct stages of growth and development. Understanding these phases, known as trimesters, can help you feel more connected, prepared, and empowered. This guide provides a clear overview of the key milestones to expect for both you and your baby during each trimester.
          </p>
          
          <div className="my-10 text-center">
            <Link href="/pregnancy-calculators">
                <Button size="lg" className="text-lg">Explore All Pregnancy Calculators</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">From conception to due date, track every step.</p>
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-8">The Three Trimesters of Pregnancy</h2>

          {trimesters.map((trim, index) => (
             <Card key={index} className="my-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-4 text-2xl">
                         <span>{trim.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: trim.content }}></p>
                </CardContent>
             </Card>
          ))}

            <Card className="my-12 bg-muted border-l-4 border-primary">
                <CardHeader>
                    <CardTitle>Beyond the Trimesters: Planning Your Journey</CardTitle>
                    <CardDescription>Using tools to stay informed and prepared.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Navigating pregnancy is easier when you have the right information at your fingertips. Our suite of calculators is designed to support you from the very beginning of your journey.
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            <strong>Trying to Conceive?</strong> Pinpoint your most fertile days with our <Link href="/ovulation-calculator" className="text-primary font-semibold hover:underline">Ovulation Calculator</Link>.
                        </li>
                        <li>
                            <strong>Just Found Out?</strong> Get your initial timeline with our <Link href="/pregnancy-calculator" className="text-primary font-semibold hover:underline">Pregnancy Calculator</Link>.
                        </li>
                        <li>
                            <strong>Need to Know the Finish Line?</strong> Estimate your baby's arrival with the <Link href="/due-date-calculator" className="text-primary font-semibold hover:underline">Due Date Calculator</Link>.
                        </li>
                    </ul>
                     <p className="text-muted-foreground mt-4">
                        Remember, every pregnancy is unique. This guide offers a general timeline, but always consult with your healthcare provider for personalized advice and care. They are your best resource for a healthy and happy pregnancy.
                    </p>
                </CardContent>
            </Card>

            <h2 className="text-3xl font-bold text-center mt-12 mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base">
                           <p>{faq.answer}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </article>
      </main>
    </div>
  );
}
