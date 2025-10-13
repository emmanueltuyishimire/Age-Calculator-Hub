
import CatAgeCalculator from "@/components/calculators/cat-age-calculator";
import { type Metadata } from 'next';
import Link from 'next/link';
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
    { question: "How accurate is the cat age to human years formula?", answer: "It’s an approximation based on feline development research. Cats mature rapidly in the first two years, then slower after that." },
    { question: "Do indoor cats live longer?", answer: "Yes, indoor cats typically live 13–17 years, while outdoor cats average 7–10 years." },
    { question: "What’s the oldest recorded cat age?", answer: "Creme Puff from Texas lived to be 38 years old!" },
    { question: "How can I tell if my cat is aging well?", answer: "Look for signs like consistent weight, bright eyes, good appetite, and regular activity." },
    { question: "How often should older cats see a vet?", answer: "Mature or senior cats should visit the vet twice a year for health monitoring." }
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
    { catAge: "1", humanAge: "15", lifeStage: "Kitten" },
    { catAge: "2", humanAge: "24", lifeStage: "Junior" },
    { catAge: "3-6", humanAge: "28–40", lifeStage: "Prime" },
    { catAge: "7-10", humanAge: "44–56", lifeStage: "Mature" },
    { catAge: "11-14", humanAge: "60–72", lifeStage: "Senior" },
    { catAge: "15+", humanAge: "76+", lifeStage: "Geriatric" },
];

const lifeStages = [
    { stage: "Kitten (0–1 year)", description: "Playful, growing rapidly. Needs kitten-specific food and vaccinations." },
    { stage: "Junior (1–2 years)", description: "Developing adult behavior. High energy, ideal time for spaying/neutering." },
    { stage: "Prime (3–6 years)", description: "Healthy and active. Maintain balanced diet and annual checkups." },
    { stage: "Mature (7–10 years)", description: "May slow down; monitor diet and weight. Regular vet visits recommended." },
    { stage: "Senior (11–14 years)", description: "Monitor for arthritis, dental, or kidney issues. Soft food may help." },
    { stage: "Geriatric (15+ years)", description: "Extra comfort and care needed. More frequent vet visits and cozy environment." },
];

export default function CatAgePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main role="main">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Cat Age Calculator – Convert Cat Years to Human Years Instantly</h1>
          <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Wondering how old your cat is in human years? Our Cat Age Calculator helps you understand your feline friend’s life stage by converting cat years into human years instantly. Whether you have a playful kitten or a senior cat, this simple tool helps you plan their care, diet, and vet visits better.
          </p>
        </div>
        
        <CatAgeCalculator />

        <section className="mt-12 space-y-8 max-w-4xl mx-auto">
            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Use the Cat Age Calculator</h2>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li><strong>Enter Your Cat's Age:</strong> Input your cat's age in years. For kittens under a year, you can also add months.</li>
                    <li><strong>Click “Calculate”:</strong> Get an instant conversion to human years.</li>
                    <li><strong>View Life Stage and Tips:</strong> See your cat's current life stage and a helpful tip for their care.</li>
                </ol>
            </div>

            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Cat Age to Human Years Chart</h2>
                <p className="text-muted-foreground mb-4">
                    Cats age faster in their first two years, then approximately four human years per cat year after that. This chart gives a quick overview.
                </p>
                <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Cat Age (Years)</TableHead>
                          <TableHead>Human Age Equivalent</TableHead>
                          <TableHead>Life Stage</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {ageChart.map((row) => (
                          <TableRow key={row.lifeStage}>
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
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Understanding Cat Life Stages</h2>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Tips for Keeping Your Cat Healthy</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide fresh water daily and quality food appropriate for their life stage.</li>
                  <li>Keep your cat indoors or supervise outdoor time to protect them from dangers.</li>
                  <li>Brush your cat’s coat regularly to prevent matting and reduce hairballs.</li>
                  <li>Ensure annual vet checkups and keep vaccinations up to date.</li>
                  <li>Encourage playtime and exercise to maintain a healthy weight.</li>
                  <li>Keep the litter box clean and in a quiet, accessible location.</li>
              </ul>
            </div>

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

            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Related Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link href="/dog-age" className="text-primary hover:underline">Dog Age Calculator</Link>
                    <Link href="/age-calculator" className="text-primary hover:underline">Age Calculator</Link>
                    <Link href="/biological-age" className="text-primary hover:underline">Biological Age Calculator</Link>
                    <Link href="/retirement" className="text-primary hover:underline">Retirement Age Calculator</Link>
                    <Link href="/pregnancy-calculators" className="text-primary hover:underline">Pregnancy Calculators</Link>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
