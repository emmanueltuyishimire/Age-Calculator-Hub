
import DogAgeCalculator from "@/components/calculators/dog-age-calculator";
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
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
    title: 'Dog Age Calculator for Mixed & Purebred Dogs – Dog Years to Human Years',
    description: 'Use our free Dog Age Calculator for mixed breed and purebred dogs. Find your dog’s age in human years by size. Discover life stage and care tips with our accurate age conversion tool.',
    openGraph: {
        title: 'Dog Age Calculator for Mixed & Purebred Dogs – Dog Years to Human Years',
        description: 'Use our free Dog Age Calculator for mixed breed and purebred dogs. Find your dog’s age in human years by size. Discover life stage and care tips with our accurate age conversion tool.',
        type: 'website',
        url: '/dog-age',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dog Age Calculator for Mixed & Purebred Dogs – Dog Years to Human Years',
        description: 'Use our free Dog Age Calculator for mixed breed and purebred dogs. Find your dog’s age in human years by size. Discover life stage and care tips with our accurate age conversion tool.',
    },
    alternates: {
        canonical: '/dog-age',
    },
};

const faqs = [
    { question: "How do you calculate a dog's age?", answer: "Modern methods are more complex than the old 'multiply by 7' rule. A dog's first year is roughly equivalent to 15 human years. The second year adds about 9 years. After that, each year's equivalent in human years depends heavily on the dog's size, with larger dogs aging faster. Our calculator uses this science-based model." },
    { question: "Is 1 dog year really 7 human years?", answer: "No, that’s an outdated and inaccurate myth. Dogs age very rapidly in their first two years and then the rate slows. Furthermore, aging varies dramatically by size. A 7-year-old small dog might be 44 in human years, while a 7-year-old giant breed could be closer to 62." },
    { question: "Is a 1-year-old dog still a puppy?", answer: "A 1-year-old dog is generally considered a 'young adult,' equivalent to a 15-year-old human. While they may still have some puppy-like energy, they have reached physical maturity." },
    { question: "When is a dog considered a senior?", answer: "It depends on the size. Giant breeds are often considered senior around age 6-7, large breeds around 7-8, medium breeds at 8-9, and small breeds enter their senior years around age 9 or 10. Knowing this helps you adjust their care, diet, and exercise." },
    { question: "How old is a 10-year-old dog in human years?", answer: "A 10-year-old small dog is about 56 in human years. A medium dog is about 60, a large dog is about 75, and a giant breed is about 88. Use our calculator for a precise number." },
    { question: "How do I calculate the age of my mixed-breed dog?", answer: "This calculator is perfect for mixed-breed dogs. The most important factor for determining a dog's age in human years is its size, not its breed. Simply choose the size category (Small, Medium, Large, or Giant) that best fits your mixed-breed dog to get an accurate estimate." },
    { question: "Why do large dogs age faster than humans?", answer: "The leading theory is that the rapid growth of large breeds from puppy to adult puts significant strain on their bodies, leading to faster cellular aging and a higher incidence of age-related diseases like cancer and arthritis." },
    { question: "How long are dogs pregnant?", answer: "A dog's gestation period is much shorter than a human's, typically lasting about 63 days, or nine weeks." },
    { question: "What was the oldest dog ever?", answer: "The official record for the oldest dog ever is held by Bobi, a Rafeiro do Alentejo from Portugal, who lived to be 31 years and 165 days old. This is highly exceptional and not typical for most breeds." }
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
    { age: "1", small: "15", medium: "15", large: "14", giant: "12" },
    { age: "2", small: "24", medium: "24", large: "22", giant: "20" },
    { age: "3", small: "28", medium: "29", large: "30", giant: "28" },
    { age: "5", small: "36", medium: "39", large: "45", giant: "45" },
    { age: "7", small: "44", medium: "49", large: "56", giant: "62" },
    { age: "10", small: "56", medium: "60", large: "75", giant: "88" },
    { age: "12", small: "64", medium: "69", large: "86", giant: "105" },
    { age: "15", small: "76", medium: "83", large: "105", giant: "130" },
];

const lifeStages = [
    { stage: "Puppy (0–1 year / ~0-15 human years)", description: "This is a phase of rapid growth, learning, and socialization. Focus on high-quality puppy food, completing vaccinations, starting basic training, and positive exposure to new sights and sounds." },
    { stage: "Young Adult (1–4 years / ~15-40 human years)", description: "Your dog is energetic and in its prime. Regular exercise, consistent training, and yearly vet check-ups are key." },
    { stage: "Mature (5–8 years / ~40-60 human years)", description: "Energy levels may start to even out. Monitor weight to prevent obesity and watch for early signs of joint or dental problems." },
    { stage: "Senior (9–12 years / ~56-86 human years)", description: "Mobility may decline. Prioritize comfort, switch to twice-yearly vet visits, and adapt exercise to be more gentle." },
    { stage: "Geriatric (13+ years / 80+ human years)", description: "Older dogs need extra care. Ensure they have a warm, comfortable resting place and easy access to food and water." },
];

export default function DogAgePage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      <div className="max-w-4xl mx-auto">
        <main role="main">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Dog Age Calculator (Works for Mixed Breeds)</h1>
                <p className="text-md md:text-lg text-muted-foreground">
                    Ever wondered how old your dog is in human years? Our calculator works for purebred and mixed-breed dogs alike, giving you an instant and accurate conversion based on the latest veterinary research. Simply enter your dog’s age and, most importantly, their size to see their equivalent human age and life stage.
                </p>
            </div>
        
            <DogAgeCalculator />

            <section className="mt-12 space-y-8 animate-fade-in">
                <Card>
                    <CardHeader><CardTitle>Learn More About Your Dog's Health</CardTitle></CardHeader>
                    <CardContent>
                         <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><Link href="/articles/the-science-behind-pet-age-calculators" className="text-primary hover:underline">The Science Behind Dog and Cat Age Calculators</Link></li>
                            <li><Link href="/articles/why-small-dogs-live-longer" className="text-primary hover:underline">Why Do Small Dogs Live Longer Than Large Dogs?</Link></li>
                            <li><Link href="/articles/senior-dog-care-guide" className="text-primary hover:underline">The Ultimate Guide to Caring for a Senior Dog</Link></li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>How to Use the Dog Age Calculator</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li><strong>Enter Your Dog's Age:</strong> Input your dog's current age in years and, for puppies, add months for better precision.</li>
                            <li><strong>Select Dog Size:</strong> This is the most important step for an accurate result. Since aging speed is tied to size, choose the category that best fits your dog, whether they are a purebred or a mixed-breed.</li>
                            <li><strong>Click “Calculate”:</strong> Get an instant conversion to human years, along with your dog's current life stage and a relevant care tip.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Why Size is the Key Factor in Dog Aging</CardTitle></CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground mb-4">
                        The old rule of "1 dog year equals 7 human years" is a myth. A dog's aging process depends heavily on their size. Smaller dogs tend to mature faster in their first year but live longer overall, while giant breeds mature slower but have much shorter lifespans. This is why our calculator asks for size—it's the single best predictor of a dog's "human age." Learn more in our <Link href="/articles/the-science-behind-pet-age-calculators" className="text-primary hover:underline">article on pet aging</Link>.
                    </p>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Dog Age to Human Years Chart (by Size)</h2>
                    <p className="text-muted-foreground mb-4">
                        This chart gives a general idea of how different size categories of dogs age over time. Notice how the gap widens as the dogs get older.
                    </p>
                    <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Dog’s Age</TableHead>
                                <TableHead>Small Dog (≤20 lbs)</TableHead>
                                <TableHead>Medium Dog (21–50 lbs)</TableHead>
                                <TableHead>Large Dog (51–100 lbs)</TableHead>
                                <TableHead>Giant Dog (100+ lbs)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ageChart.map((row) => (
                                <TableRow key={row.age}>
                                    <TableCell className="font-medium">{row.age}</TableCell>
                                    <TableCell>{row.small}</TableCell>
                                    <TableCell>{row.medium}</TableCell>
                                    <TableCell>{row.large}</TableCell>
                                    <TableCell>{row.giant}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Understanding Your Dog’s Life Stage</h2>
                    <p className="text-muted-foreground mb-4">Knowing your dog's life stage helps you provide age-appropriate care, from nutrition and exercise to veterinary checkups.</p>
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
                    <CardHeader><CardTitle>Proactive Dog Care Tips by Age Group</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>Nutrition:</strong> Feed high-quality food suited to your dog's age and size to support their energy needs and maintain a healthy weight.</li>
                            <li><strong>Mental Stimulation:</strong> Keep their mind sharp at any age with puzzle toys, scent games, and short, engaging training sessions.</li>
                            <li><strong>Dental Health:</strong> Maintain good dental care with regular brushing or vet-approved dental chews to prevent painful and costly health issues down the line.</li>
                            <li><strong>Vet Visits:</strong> Schedule annual vet visits for young and mature dogs, and increase to twice a year for seniors to catch age-related problems early.</li>
                            <li><strong>Appropriate Exercise:</strong> Avoid overexertion, especially for puppies and senior dogs. Focus on gentle, consistent movement for older dogs to maintain mobility.</li>
                        </ul>
                    </CardContent>
                </Card>

                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions About Dog Aging</h2>
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
        <RelatedCalculators currentCategory="Other" currentHref="/dog-age" />
      </div>
    </div>
  );
}

    