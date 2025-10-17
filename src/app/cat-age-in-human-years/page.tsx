
import CatAgeCalculator from "@/components/calculators/cat-age-calculator";
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import RelatedCalculators from "@/components/layout/related-calculators";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Cat Age Calculator – Convert Cat Years to Human Years Instantly',
    description: 'Find out your cat’s age in human years with our free Cat Age Calculator. Understand your cat’s life stage, health, and care needs using an accurate feline-to-human age conversion chart.',
    openGraph: {
        title: 'Cat Age Calculator – Convert Cat Years to Human Years Instantly',
        description: 'Find out your cat’s age in human years with our free Cat Age Calculator. Understand your cat’s life stage, health, and care needs using an accurate feline-to-human age conversion chart.',
        type: 'website',
        url: '/cat-age-in-human-years',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Cat Age Calculator – Convert Cat Years to Human Years Instantly',
        description: 'Find out your cat’s age in human years with our free Cat Age Calculator. Understand your cat’s life stage, health, and care needs using an accurate feline-to-human age conversion chart.',
    },
    alternates: {
        canonical: '/cat-age-in-human-years',
    },
};

const faqs = [
    { question: "How do you calculate a cat's age?", answer: "A common veterinary method is to consider the first year of a cat's life as 15 human years, the second year as 9 more years (totaling 24), and every subsequent year as 4 human years. Our calculator uses this widely accepted formula." },
    { question: "Is 17 old for a cat?", answer: "Yes, 17 is very old for a cat. It's equivalent to about 84 in human years. A cat of this age is considered geriatric and requires special care." },
    { question: "How long do cats normally live?", answer: "Indoor cats typically live for 13-17 years on average, though many live into their late teens or early twenties. Outdoor cats have a much shorter average lifespan of 2-5 years due to increased risks." },
    { question: "At what age do cats slow down?", answer: "Cats often start to slow down and become less active during their 'Mature' years, around 7 to 10 years old (44 to 56 in human years). This is a good time to adjust their diet and monitor for age-related changes." },
    { question: "Do male or female cats live longer?", answer: "Generally, female cats, especially those that have been spayed, tend to live slightly longer than male cats. However, factors like healthcare, lifestyle (indoor vs. outdoor), and genetics play a much larger role." },
    { question: "Is it rare for a cat to live to 20?", answer: "While not common, it's certainly not unheard of, especially for well-cared-for indoor cats. A 20-year-old cat is equivalent to a 96-year-old human, which is a testament to excellent care and good genes." },
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
};

const ageChart = [
    { catAge: "6 Months", humanAge: "10", lifeStage: "Kitten" },
    { catAge: "1 Year", humanAge: "15", lifeStage: "Junior" },
    { catAge: "2 Years", humanAge: "24", lifeStage: "Junior" },
    { catAge: "5 Years", humanAge: "36", lifeStage: "Prime" },
    { catAge: "7 Years", humanAge: "44", lifeStage: "Mature" },
    { catAge: "10 Years", humanAge: "56", lifeStage: "Mature" },
    { catAge: "14 Years", humanAge: "72", lifeStage: "Senior" },
    { catAge: "18 Years", humanAge: "88", lifeStage: "Geriatric" },
    { catAge: "20 Years", humanAge: "96", lifeStage: "Geriatric" },
];

const lifeStages = [
    { stage: "Kitten (0–1 year / 0-15 human years)", description: "A period of rapid growth and high energy. Play is essential for their development. They need kitten-specific food that's high in calories and protein, and they must complete their initial vaccination series." },
    { stage: "Junior (1–2 years / 15-24 human years)", description: "Your cat is developing their adult personality. This is an ideal time for spaying or neutering." },
    { stage: "Prime (3–6 years / 28-40 human years)", description: "Your cat is in the prime of their life—healthy, active, and with a settled personality. Focus on maintaining a balanced diet, regular play, and annual wellness checkups." },
    { stage: "Mature (7–10 years / 44-56 human years)", description: "Your cat may start to slow down. It's a good time to monitor their diet to prevent weight gain, and pay attention to dental health." },
    { stage: "Senior (11–14 years / 60-72 human years)", description: "Your cat is now a senior citizen. Health issues like arthritis, kidney disease, or thyroid problems become more common. Increase vet visits to twice a year." },
    { stage: "Geriatric (15+ years / 76+ human years)", description: "These are the golden years. Your geriatric cat needs extra comfort, warmth, and care. Ensure their environment is safe and easily accessible (e.g., ramps to favorite spots, low-entry litter boxes)." },
];

export default function CatAgePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Cat Age Calculator – Convert Cat Years to Human Years Instantly</h1>
            <p className="text-md md:text-lg text-muted-foreground">
                Wondering how old your cat is in human years? Our Cat Age Calculator helps you understand your feline friend’s life stage by converting cat years into human years instantly. Whether you have a playful kitten or a senior cat, this simple tool helps you plan their care, diet, and vet visits better.
            </p>
            </div>
            
            <CatAgeCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>How to Use the Cat Age Calculator</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Your Cat's Age:</strong> Input your cat's age in years. For kittens under a year, you can also add months for better precision.</li>
                            <li><strong>Click “Calculate”:</strong> Get an instant, accurate conversion to the equivalent human years.</li>
                            <li><strong>View Life Stage and Tips:</strong> The tool will display your cat's current life stage (e.g., Kitten, Senior) and provide a helpful, age-appropriate care tip.</li>
                        </ol>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader><CardTitle>Learn More About Your Cat's Health</CardTitle></CardHeader>
                    <CardContent>
                         <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/understanding-cat-life-stages" className="text-primary hover:underline">Understanding Your Cat's Life Stages: From Kitten to Geriatric</Link></li>
                            <li><Link href="/articles/common-health-problems-in-senior-cats" className="text-primary hover:underline">5 Common Health Problems in Senior Cats</Link></li>
                            <li><Link href="/articles/introducing-a-new-cat" className="text-primary hover:underline">How to Introduce a New Cat to Your Home</Link></li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>The Modern Science of Cat Aging</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">The old myth of "one cat year equals seven human years" is inaccurate because cats age much more rapidly in their early life. According to guidelines from the American Association of Feline Practitioners (AAFP), a cat's first year is equivalent to about 15 human years. Their second year adds another 9 years, making a 2-year-old cat about 24 in human years. After that, each subsequent cat year is roughly equal to four human years. Our calculator uses this scientifically-backed model.</p>
                        <p className="text-muted-foreground mt-2">Learn more in our <Link href="/articles/the-science-behind-pet-age-calculators" className="text-primary hover:underline">article on pet aging science</Link>.</p>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Cat Age to Human Years Chart</h2>
                    <p className="text-muted-foreground mb-4">
                        This chart gives a quick overview of how cat years translate to human years, highlighting the different life stages.
                    </p>
                    <div className="overflow-x-auto">
                    <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Cat Age</TableHead>
                            <TableHead>Human Age Equivalent</TableHead>
                            <TableHead>Life Stage</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ageChart.map((row) => (
                            <TableRow key={row.catAge}>
                                <TableCell className="font-medium">{row.catAge}</TableCell>
                                <TableCell>{row.humanAge}</TableCell>
                                <TableCell>{row.lifeStage}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </div>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Understanding Your Cat's Life Stage</h2>
                     <p className="text-muted-foreground mb-4">Knowing your cat's life stage helps you provide the best possible care. Each stage has unique health, nutrition, and enrichment needs.</p>
                    <Accordion type="single" collapsible className="w-full">
                        {lifeStages.map((item, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{item.stage}</AccordionTrigger>
                                <AccordionContent>{item.description}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <Card>
                    <CardHeader><CardTitle>Tips for a Long & Healthy Feline Life</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>Quality Nutrition:</strong> Provide high-quality food appropriate for their life stage (kitten, adult, senior) to support their energy and health needs.</li>
                            <li><strong>Keep Indoors:</strong> Keeping your cat indoors is the single most effective way to extend their lifespan by protecting them from cars, predators, and infectious diseases.</li>
                            <li><strong>Regular Vet Visits:</strong> Annual checkups for adult cats and bi-annual visits for seniors are crucial for preventative care and early disease detection.</li>
                            <li><strong>Mental & Physical Enrichment:</strong> Keep your cat engaged with puzzle toys, scratching posts, and regular playtime to maintain a healthy weight and sharp mind.</li>
                            <li><strong>Dental Health:</strong> Dental disease is common in cats. Regular dental checkups and at-home care (like brushing or dental treats) are important.</li>
                            <li><strong>Clean Litter Box:</strong> A clean litter box is essential for your cat's comfort and can help you monitor for any urinary health issues.</li>
                        </ul>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">FAQs About Cat Aging</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
        <RelatedCalculators currentCategory="Other Calculators" currentHref="/cat-age-in-human-years" />
      </div>
    </div>
  );
}
