
import { type Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { HeartPulse, Bone, Brain, Droplets, Utensils } from 'lucide-react';

const article = articles.find(a => a.slug === 'senior-dog-care-guide');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const careTips = [
    { icon: Utensils, title: "Nutrition for a Senior Dog", content: "Senior dogs are less active and have slower metabolisms, so they need fewer calories to avoid obesity. Look for high-quality senior dog foods that are lower in fat and calories but rich in fiber for digestive health. Key ingredients like omega-3 fatty acids, glucosamine, and chondroitin are vital for combating inflammation and supporting joint health." },
    { icon: Bone, title: "Gentle Exercise and Mobility", content: "While your dog may not be up for long runs, consistent, low-impact exercise is crucial for maintaining muscle mass and joint mobility. Gentle daily walks, swimming, and light fetch are excellent options. Avoid high jumps and sudden stops. Provide orthopedic beds and consider ramps or stairs to help them access furniture or cars." },
    { icon: HeartPulse, title: "Proactive Veterinary Care", content: "Switch to bi-annual (every six months) vet check-ups. These visits are essential for early detection of age-related diseases like kidney disease, heart conditions, diabetes, and cancer. Regular blood work, urine tests, and dental cleanings become even more important in the senior years." },
    { icon: Brain, title: "Mental Enrichment and Comfort", content: "Keep your senior dog's mind sharp with puzzle toys, scent games, and short training sessions. Maintain a predictable routine to reduce anxiety. Ensure their environment is safe and comfortable—non-slip rugs, easily accessible food and water, and a quiet place to rest are key." },
    { icon: Droplets, title: "Monitoring and Observation", content: "You are the first line of defense. Pay close attention to changes in your dog's drinking, urination, appetite, weight, or behavior. Lumps, bumps, stiffness, or confusion should be reported to your vet promptly. Don't dismiss changes as 'just old age'—they could be treatable symptoms." },
];

const faqs = [
    {
        question: "At what age is my dog considered a senior?",
        answer: "It depends on their size. Giant breeds can be seniors by age 6, large breeds around 7-8, medium breeds at 8-9, and small breeds around 9-10. Use our <a href='/dog-age' class='text-primary hover:underline'>Dog Age Calculator</a> to find out their equivalent human age."
    },
    {
        question: "Why is my senior dog drinking so much water?",
        answer: "Increased thirst (polydipsia) can be a sign of several serious conditions common in senior dogs, including kidney disease, diabetes, or Cushing's disease. It's crucial to see your veterinarian for diagnostic tests."
    },
    {
        question: "Is it normal for my old dog to sleep all day?",
        answer: "Senior dogs do sleep more, but excessive lethargy can be a sign of pain (like arthritis), heart problems, or other illnesses. If you notice a sudden or dramatic change in their sleep patterns, it warrants a vet visit."
    },
    {
        question: "What are the best supplements for a senior dog?",
        answer: "Glucosamine and chondroitin for joint support and omega-3 fatty acids (fish oil) for anti-inflammatory benefits are the most commonly recommended supplements. However, you should always consult your vet before starting any new supplement to ensure it's right for your dog."
    }
];

export default function SeniorDogCareGuideArticle() {
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
            As your loyal companion enters their golden years, their needs begin to change. The boundless energy of puppyhood gives way to a desire for comfort, and their care requirements shift from growth to maintenance and prevention. Providing the best care for your senior dog is about being proactive, observant, and adaptable. This guide will cover the five pillars of senior dog care to help you ensure their later years are as happy, comfortable, and healthy as possible.
          </p>

          <h2 className="text-3xl font-bold text-center mb-8">The 5 Pillars of Senior Dog Care</h2>

          {careTips.map((tip, index) => (
             <Card key={index} className="my-8 overflow-hidden">
                <CardHeader className="flex flex-row items-start bg-muted/50 gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0">
                        <tip.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-grow">
                        <CardTitle className="text-2xl">{tip.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6 text-base">
                    <p className="text-muted-foreground">{tip.content}</p>
                </CardContent>
             </Card>
          ))}

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>Your Role as a Senior Dog Parent</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Caring for a senior dog is a privilege. It's a time to repay their years of loyalty with patience, compassion, and attentive care. By focusing on these five pillars, you can manage age-related issues, catch problems early, and maximize their quality of life. The goal is not just to add years to their life, but life to their years.
                </p>
                 <p className="text-muted-foreground mt-4">
                    Unsure how old your dog is? Our guide on <Link href="/articles/how-to-tell-a-dogs-age" className="font-bold text-primary hover:underline">how to tell a dog's age</Link> can help you get a better estimate.
                </p>
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
