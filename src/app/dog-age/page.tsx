
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
    { question: "How do I calculate the age of my mixed-breed dog?", answer: "This calculator is perfect for mixed-breed dogs. The most important factor for determining a dog's age in human years is its size, not its breed. Simply choose the size category (Small, Medium, Large, or Giant) that best fits your mixed-breed dog to get an accurate estimate." },
    { question: "Is the 1 dog year = 7 human years rule accurate?", answer: "No. That’s an outdated myth. Modern veterinary research shows dog aging is more complex and depends heavily on size and breed." },
    { question: "How long do dogs live?", answer: "On average, small dogs live 12–16 years, while large dogs live 8–12 years. Mixed-breed dogs often have a longer lifespan than purebreds of a similar size." },
    { question: "Why do large dogs age faster?", answer: "Larger breeds grow more rapidly from puppies to adults, which is believed to contribute to faster aging and a shorter overall lifespan." },
    { question: "Can I slow down my dog’s aging?", answer: "While you can't stop time, you can significantly improve their healthspan and vitality with regular exercise, a balanced diet, and consistent vet care." },
    { question: "When is a dog considered old?", answer: "Generally, large breeds are considered 'senior' around age 7, while smaller breeds enter their senior years around age 9 or 10." }
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
    { age: "1", small: "15", medium: "15", large: "14", giant: "14" },
    { age: "2", small: "24", medium: "24", large: "22", giant: "20" },
    { age: "3", small: "28", medium: "28", large: "31", giant: "28" },
    { age: "5", small: "36", medium: "42", large: "45", giant: "49" },
    { age: "7", small: "44", medium: "50", large: "56", giant: "66" },
    { age: "10", small: "56", medium: "60", large: "66", giant: "80" },
    { age: "12", small: "64", medium: "69", large: "77", giant: "90" },
    { age: "15", small: "76", medium: "83", large: "93", giant: "110" },
];

const lifeStages = [
    { stage: "Puppy (0–1 year)", description: "This is a phase of rapid growth and learning. Focus on high-quality nutrition, completing vaccinations, and starting basic training and socialization." },
    { stage: "Young Adult (1–4 years)", description: "Your dog is energetic and in its physical prime. Regular exercise, consistent training reinforcement, and yearly vet check-ups are key during this stage." },
    { stage: "Mature (5–8 years)", description: "Energy levels may start to even out. It's important to monitor weight and watch for early signs of common issues like joint or dental problems." },
    { stage: "Senior (9–12 years)", description: "Mobility, eyesight, or hearing may decline. Prioritize comfort, switch to twice-yearly vet visits, and adapt exercise to be more gentle." },
    { stage: "Geriatric (13+ years)", description: "Older dogs need extra care. Ensure they have a warm, comfortable resting place, easy access to food and water, and a diet formulated for their needs." },
];

export default function DogAgePage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      <main role="main">
        <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Dog Age Calculator (Works for Mixed Breeds)</h1>
            <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Ever wondered how old your dog is in human years? Our calculator works for purebred and mixed-breed dogs alike, giving you an instant and accurate conversion based on the latest veterinary research. Simply enter your dog’s age and, most importantly, their size to see their equivalent human age and life stage.
            </p>
        </div>
      
        <DogAgeCalculator />

        <section className="mt-12 space-y-8 max-w-4xl mx-auto">
            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Use the Dog Age Calculator</h2>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li><strong>Enter Your Dog's Age:</strong> Input your dog's current age in years.</li>
                    <li><strong>Select Dog Size:</strong> This is the most important step for an accurate result, especially for a mixed-breed dog. Choose from Small, Medium, Large, or Giant.</li>
                    <li><strong>Click “Calculate”:</strong> Get an instant conversion to human years, along with your dog's life stage.</li>
                </ol>
            </div>

            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Dog Age to Human Years Chart (by Size)</h2>
                <p className="text-muted-foreground mb-4">
                    The old rule of "1 dog year equals 7 human years" is a myth. A dog's aging process depends heavily on their size. Smaller dogs tend to live longer and age more slowly, while larger breeds age more rapidly, especially in their later years.
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
                 <Accordion type="single" collapsible className="w-full">
                    {lifeStages.map((item, index) => (
                         <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>{item.stage}</AccordionTrigger>
                            <AccordionContent>{item.description}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Dog Care Tips by Age Group</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Feed high-quality protein suited to your dog's age and breed to support their energy and health needs.</li>
                    <li>Mental stimulation is key. Use puzzle toys, play scent games, and enjoy short, engaging walks to keep their mind sharp.</li>
                    <li>Maintain good dental care with regular brushing or dental chews to prevent long-term health issues.</li>
                    <li>Schedule annual vet visits for young and mature dogs, and increase to twice a year for seniors.</li>
                    <li>Provide appropriate exercise. Avoid overexertion for older dogs, focusing on gentle, consistent movement.</li>
                    <li>Create a safe environment for aging dogs by ensuring floors aren't slippery and stairs are manageable.</li>
                </ul>
            </div>

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
    </div>
  );
}
