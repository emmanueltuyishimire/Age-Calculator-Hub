
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';

const article = articles.find(a => a.slug === 'understanding-body-fat');

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
        question: "Is body fat percentage better than BMI?",
        answer: "Yes, for an individual, body fat percentage is a much better indicator of health than BMI because it distinguishes between fat mass and lean mass. BMI can be misleading for athletes or older adults."
    },
    {
        question: "How accurate is the Navy method used in the calculator?",
        answer: "The U.S. Navy method is a convenient and surprisingly good estimation method that uses circumference measurements. While it's not as accurate as a clinical DEXA scan, it's an excellent tool for tracking your progress and changes in body composition over time."
    },
    {
        question: "What's the best way to lower body fat percentage?",
        answer: "The best approach is a combination of two things: 1) a moderate calorie deficit to encourage fat loss, and 2) strength training to build or maintain muscle mass. Simply cutting calories without exercise can lead to muscle loss, which is counterproductive."
    },
    {
        question: "Can you lose fat and gain muscle at the same time?",
        answer: "This is known as 'body recomposition.' It's most achievable for beginners to strength training or individuals returning after a break. It's more difficult for experienced lifters, who typically focus on separate 'bulking' (muscle gain) and 'cutting' (fat loss) phases."
    }
];

const bodyFatCategories = [
    { category: "Essential Fat", women: "10-13%", men: "2-5%" },
    { category: "Athletes", women: "14-20%", men: "6-13%" },
    { category: "Fitness", women: "21-24%", men: "14-17%" },
    { category: "Acceptable", women: "25-31%", men: "18-24%" },
    { category: "Obesity", women: "32%+", men: "25%+" },
];

export default function BodyFatArticle() {
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
            When it comes to measuring health and fitness progress, the number on the scale only tells part of the story. A far more insightful metric is your body fat percentage—the proportion of your total weight that is made up of fat. Understanding and tracking this number is key to assessing your health and ensuring your hard work in the gym and kitchen is paying off correctly.
          </p>

          <div className="my-10 text-center">
            <Link href="/body-fat-calculator">
                <Button size="lg">Estimate Your Body Fat %</Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Use the simple tape measure method.</p>
          </div>

          <h2 className="text-3xl font-bold">Why Body Fat Percentage is a Superior Metric to Weight</h2>
            <p>
                Imagine two people who are the same height and weight. One might be a bodybuilder with a lot of muscle, while the other might be sedentary with very little muscle. According to a simple scale or even a <Link href="/bmi-calculator" className="text-primary hover:underline">BMI chart</Link>, they might appear equally "healthy." However, their body fat percentages would tell a very different story.
            </p>
            <p>
                Body fat percentage allows you to distinguish between lean body mass (muscle, bone, water) and fat mass. This is crucial because:
            </p>
            <ul className="list-disc list-inside space-y-2 my-4">
              <li>It's a more accurate predictor of health risks associated with obesity.</li>
              <li>It helps ensure you're losing fat, not valuable muscle, during a weight loss phase.</li>
              <li>It provides a better way to track progress for fitness goals than weight alone.</li>
            </ul>

            <h2 className="text-3xl font-bold">Healthy Body Fat Percentage Ranges</h2>
            <p className="text-muted-foreground mb-4">
                These ranges, provided by the American Council on Exercise (ACE), give a general idea of where you stand. Note that healthy ranges differ between men and women, as women naturally require a higher percentage of body fat for hormonal and reproductive health.
            </p>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead>Women</TableHead>
                            <TableHead>Men</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bodyFatCategories.map((row) => (
                            <TableRow key={row.category}>
                                <TableCell className="font-medium">{row.category}</TableCell>
                                <TableCell>{row.women}</TableCell>
                                <TableCell>{row.men}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>How to Lower Your Body Fat Percentage</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                   Reducing body fat effectively involves a two-pronged approach:
                </p>
                <ol className="list-decimal list-inside mt-2 space-y-2 text-muted-foreground">
                    <li><strong>Calorie Deficit:</strong> Consume slightly fewer calories than your body burns. You can determine your maintenance calories using our <Link href="/macro-calculator" className="text-primary hover:underline">Macro Calculator</Link> and then aim for a modest deficit (e.g., 300-500 calories per day).</li>
                    <li><strong>Strength Training:</strong> Lift weights or do bodyweight exercises 2-4 times per week. This tells your body to preserve (or even build) muscle while it's losing weight, ensuring that the weight you lose is primarily fat.</li>
                </ol>
            </CardContent>
          </Card>
          
          <h2 className="text-3xl font-bold text-center mt-12 mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base"><div dangerouslySetInnerHTML={{ __html: faq.answer }} /></AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
        </article>
      </main>
    </div>
  );
}
