
import { type Metadata } from 'next';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { notFound } from 'next/navigation';
import { ShieldCheck, ShieldPlus } from 'lucide-react';

const article = articles.find(a => a.slug === 'cat-vaccination-guide');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const coreVaccines = [
    { name: "Rabies", details: "A fatal viral disease that affects the nervous system and is transmissible to humans. The rabies vaccine is legally required in most regions for all cats, including indoor-only ones." },
    { name: "Feline Viral Rhinotracheitis (Herpesvirus)", details: "A major cause of upper respiratory infections in cats, leading to sneezing, conjunctivitis, and nasal discharge." },
    { name: "Calicivirus", details: "Another highly contagious virus that causes upper respiratory infections and oral disease, including painful ulcers on the tongue." },
    { name: "Panleukopenia (Feline Distemper)", details: "A very severe and often fatal virus, especially in kittens, that attacks the gastrointestinal tract, nervous system, and bone marrow." },
];

const nonCoreVaccines = [
    { name: "Feline Leukemia Virus (FeLV)", details: "A deadly retrovirus that weakens the immune system, leading to cancers and other fatal diseases. It is spread through close contact (e.g., saliva, mutual grooming). The AAFP recommends this vaccine for all kittens, with booster decisions for adults based on lifestyle (i.e., if they go outdoors or have contact with other cats of unknown status)." },
    { name: "Chlamydia Felis", details: "A bacterial infection that primarily causes severe, chronic conjunctivitis (eye infections). Recommended for cats in multi-cat households or catteries where the infection is known to be present." },
    { name: "Bordetella", details: "A bacterial cause of upper respiratory infections, similar to kennel cough in dogs. Recommended only in high-risk environments like shelters or some catteries." },
];

const faqs = [
    {
        question: "Does my indoor-only cat really need to be vaccinated?",
        answer: "Yes. All cats should receive the core vaccines. Rabies is a legal requirement in most places and can be transmitted by a bat that gets into the house. Panleukopenia is a very hardy virus that can be tracked inside on shoes. Vaccinating is a simple and safe way to prevent devastating diseases."
    },
    {
        question: "Why do kittens need a series of shots?",
        answer: "Kittens get temporary immunity from their mother's milk, but this protection fades between 6 and 16 weeks of age. The kitten vaccination series involves giving shots every 3-4 weeks during this window to ensure the kitten's own immune system builds up protection as soon as the maternal immunity is gone."
    },
    {
        question: "What is the FVRCP vaccine?",
        answer: "FVRCP is the common combination vaccine that protects against the three major core viral diseases: Feline Viral Rhinotracheitis (FVR), Calicivirus (C), and Panleukopenia (P). It's the cornerstone of feline preventative care."
    },
    {
        question: "Are there any side effects to cat vaccines?",
        answer: "Side effects are generally mild and uncommon. The most frequent reactions include temporary lethargy, a low-grade fever, or slight swelling at the injection site. Serious reactions are very rare. In cats, there is a very small risk of developing a type of tumor called an injection-site sarcoma, which is why veterinarians are very specific about where they administer vaccines."
    }
];

export default function CatVaccinationGuideArticle() {
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
            Vaccinations are a cornerstone of modern veterinary medicine, providing a safe and effective way to protect your cat from a host of serious and contagious diseases. For a new kitten, a proper vaccination schedule is the most important step you can take to ensure a healthy start in life. For adult cats, boosters are key to maintaining that protection. This guide, based on recommendations from the American Association of Feline Practitioners (AAFP), will help you understand the "why" and "what" of feline vaccinations.
          </p>

          <Card className="my-8">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <ShieldCheck className="h-10 w-10 text-primary" />
                    <div>
                        <CardTitle className="text-3xl">Core Vaccines: Essential for All Cats</CardTitle>
                        <CardDescription>Recommended for every cat, everywhere, including indoor-only cats.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="mb-4">These vaccines protect against diseases that are severe, widespread, and easily transmissible. Even an indoor cat can be exposed.</p>
                <div className="space-y-4">
                    {coreVaccines.map(v => (
                        <div key={v.name}>
                            <h4 className="font-bold text-lg">{v.name}</h4>
                            <p className="text-muted-foreground">{v.details}</p>
                        </div>
                    ))}
                    <p className="font-semibold pt-2">The three viral diseases are typically combined into a single injection called the FVRCP or "feline distemper" shot.</p>
                </div>
            </CardContent>
          </Card>
          
          <Card className="my-8">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <ShieldPlus className="h-10 w-10 text-primary" />
                    <div>
                        <CardTitle className="text-3xl">Non-Core Vaccines: Based on Lifestyle</CardTitle>
                        <CardDescription>Your vet will recommend these based on your cat's individual risk.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="mb-4">These vaccines are for diseases your cat might be exposed to based on their environment and habits (e.g., if they go outside).</p>
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
            <CardHeader><CardTitle>Your Veterinarian is Your Partner</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    This guide provides general information. The best vaccination protocol for your cat depends on their age, health history, and specific lifestyle. Always work with your veterinarian to create a tailored health plan. They are your best resource for ensuring your feline companion lives a long, protected, and healthy life.
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
