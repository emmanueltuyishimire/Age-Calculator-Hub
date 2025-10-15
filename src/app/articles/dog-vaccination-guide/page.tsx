
import { type Metadata } from 'next';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { ShieldCheck, ShieldPlus } from 'lucide-react';

const article = articles.find(a => a.slug === 'dog-vaccination-guide');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const coreVaccines = [
    { name: "Rabies", details: "Rabies is a fatal viral disease that affects the nervous system and is transmissible to humans. The rabies vaccine is legally required in most places." },
    { name: "Distemper", details: "A severe, contagious viral disease that attacks the respiratory, gastrointestinal, and nervous systems." },
    { name: "Hepatitis (Adenovirus)", details: "A viral infection that affects the liver, kidneys, spleen, lungs, and eyes." },
    { name: "Parvovirus", details: "A highly contagious and often deadly virus, especially in puppies, that causes severe vomiting and diarrhea." },
    { name: "Parainfluenza", details: "A virus that contributes to kennel cough." },
];

const nonCoreVaccines = [
    { name: "Bordetella", details: "The primary cause of kennel cough. Recommended for dogs that are frequently boarded, go to doggy daycare, or interact with many other dogs." },
    { name: "Leptospirosis", details: "A bacterial disease spread through the urine of infected animals (like wildlife) that can contaminate water and soil. It can cause kidney and liver failure and is transmissible to humans." },
    { name: "Lyme Disease", details: "A tick-borne illness that can cause arthritis, fever, and kidney problems. Recommended for dogs living in or traveling to areas with a high prevalence of ticks." },
    { name: "Canine Influenza (Dog Flu)", details: "A respiratory infection similar to kennel cough. Recommended for dogs in social settings, especially if there's an outbreak in your area." },
];

const faqs = [
    {
        question: "Are there risks associated with vaccines?",
        answer: "Vaccines are very safe, and adverse reactions are rare. The most common side effects are mild and temporary, such as lethargy, a low-grade fever, or soreness at the injection site. Serious allergic reactions are extremely rare but possible. The benefits of protection against deadly diseases far outweigh the risks."
    },
    {
        question: "Why do puppies need a series of shots?",
        answer: "Puppies receive initial immunity from their mother's milk (maternal antibodies). However, this immunity wears off between 6 and 16 weeks of age. The puppy vaccination series involves giving shots every 3-4 weeks to ensure the puppy is protected as soon as their maternal immunity fades and their own immune system can respond."
    },
    {
        question: "Does my indoor dog still need vaccines?",
        answer: "Yes. All dogs should receive the core vaccines. Viruses like parvovirus are very resilient and can be tracked into the home on shoes or clothing. Rabies vaccination is also a legal requirement, regardless of whether your dog goes outside."
    },
    {
        question: "How much do dog vaccinations cost?",
        answer: "Costs vary widely based on your location and veterinary clinic. The initial puppy series will be the most expensive. Many clinics and shelters offer low-cost vaccination clinics to make this essential care more affordable."
    }
];

export default function DogVaccinationGuideArticle() {
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
            Vaccinations are one of the most important aspects of preventative healthcare for your dog. They are a safe and effective way to protect your beloved pet from a range of serious, and sometimes fatal, diseases. Understanding which vaccines your dog needs and when they need them can feel overwhelming, but this guide will break down the essentials into core and non-core (lifestyle) vaccines to help you make informed decisions with your veterinarian.
          </p>

          <Card className="my-8">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <ShieldCheck className="h-10 w-10 text-primary" />
                    <div>
                        <CardTitle className="text-3xl">Core Vaccines: The Non-Negotiables</CardTitle>
                        <CardDescription>Recommended for all dogs, regardless of lifestyle.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="mb-4">These vaccines protect against diseases that are widespread, highly contagious, and have a high mortality rate. The American Animal Hospital Association (AAHA) considers these essential for every puppy and adult dog.</p>
                <div className="space-y-4">
                    {coreVaccines.map(v => (
                        <div key={v.name}>
                            <h4 className="font-bold text-lg">{v.name}</h4>
                            <p className="text-muted-foreground">{v.details}</p>
                        </div>
                    ))}
                    <p className="font-semibold pt-2">These are often administered together in a combination shot known as the DAPP or DHPP vaccine.</p>
                </div>
            </CardContent>
          </Card>
          
          <Card className="my-8">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <ShieldPlus className="h-10 w-10 text-primary" />
                    <div>
                        <CardTitle className="text-3xl">Non-Core Vaccines: Lifestyle-Dependent</CardTitle>
                        <CardDescription>Recommended based on your dog's risk of exposure.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="mb-4">Your veterinarian will recommend these optional vaccines based on your dog's lifestyle, geographic location, and specific health risks.</p>
                 <div className="space-y-4">
                    {nonCoreVaccines.map(v => (
                        <div key={v.name}>
                            <h4 className="font-bold text-lg">{v.name}</h4>
                            <p className="text-muted-foreground">{v.details}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
          </Card>

          <Card className="my-12 bg-muted border-l-4 border-primary">
            <CardHeader><CardTitle>Work With Your Veterinarian</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    This guide provides a general overview, but it is not a substitute for professional medical advice. Your veterinarian is your most important partner in your dog's health. They will create a personalized vaccination schedule that is perfect for your dog's individual needs, ensuring they are protected for a long and healthy life.
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
