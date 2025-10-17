
import RatioCalculator from '@/components/calculators/ratio-calculator';
import { type Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RelatedCalculators from '@/components/layout/related-calculators';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const metadata: Metadata = {
    title: 'Ratio Calculator – Solve & Scale Ratios',
    description: 'A free online Ratio Calculator to solve proportions (A:B = C:D) and easily scale ratios up or down. Includes examples and a guide to aspect ratios.',
    alternates: {
        canonical: '/ratio-calculator',
    },
};

const aspectRatios = [
    { name: '480p', ratio: '3:2', width: '720', height: '480' },
    { name: '576p', ratio: '5:4', width: '720', height: '576' },
    { name: '720p', ratio: '16:9', width: '1280', height: '720' },
    { name: '1080p', ratio: '16:9', width: '1920', height: '1080' },
    { name: '2160p (4K UHD)', ratio: '16:9', width: '3840', height: '2160' },
    { name: '4320p (8K UHD)', ratio: '16:9', width: '7680', height: '4320' },
    { name: 'SVGA', ratio: '4:3', width: '800', height: '600' },
    { name: 'WSVGA', ratio: '~17:10', width: '1024', height: '600' },
    { name: 'XGA', ratio: '4:3', width: '1024', height: '768' },
    { name: 'WXGA', ratio: '16:9', width: '1280', height: '720' },
    { name: 'SXGA', ratio: '5:4', width: '1280', height: '1024' },
    { name: 'HD+', ratio: '16:9', width: '1600', height: '900' },
    { name: 'UXGA', ratio: '4:3', width: '1600', height: '1200' },
    { name: 'WSXGA+', ratio: '16:10', width: '1680', height: '1050' },
    { name: 'FHD', ratio: '16:9', width: '1920', height: '1080' },
    { name: 'WUXGA', ratio: '16:10', width: '1920', height: '1200' },
    { name: 'QWXGA', ratio: '16:9', width: '2048', height: '1152' },
    { name: 'WQHD', ratio: '16:9', width: '2560', height: '1440' },
    { name: 'WQXGA', ratio: '16:10', width: '2560', height: '1600' }
];

const faqs = [
    {
        question: "How do you calculate a ratio?",
        answer: "To find the ratio of A to B, you simply write it as A:B. To solve for a missing value in a proportion like A:B = C:D, you use cross-multiplication. For example, to find D, the formula is D = (B * C) / A. Our calculator automates this."
    },
    {
        question: "How do you scale a ratio?",
        answer: "To scale a ratio, you multiply or divide both parts of the ratio by the same number. For example, to scale the ratio 2:3 up by a factor of 5, you multiply both parts by 5 to get 10:15."
    },
    {
        question: "Is 1:2 the same as 2:1?",
        answer: "No, they are not the same. The order matters in a ratio. 1:2 means the first value is half the size of the second. 2:1 means the first value is twice the size of the second."
    },
    {
        question: "What is an aspect ratio?",
        answer: "An aspect ratio describes the proportional relationship between the width and height of a screen or image. A common aspect ratio for TVs and monitors is 16:9, meaning the width is 16 units for every 9 units of height."
    }
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

export default function RatioCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main role="main" className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Ratio Calculator</h1>
          <p className="text-md md:text-lg text-muted-foreground">
            A free online tool to solve ratio proportions and scale ratios.
          </p>
        </div>

        <RatioCalculator />

        <section className="mt-12 space-y-8 animate-fade-in prose dark:prose-invert lg:prose-xl max-w-none">
            
            <Card>
                <CardHeader>
                    <CardTitle>How to Use the Ratio Calculators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div>
                        <h4 className="font-semibold text-foreground">Ratio Proportion Calculator</h4>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground mt-2">
                            <li>Enter any three of the four values (A, B, C, or D) in the proportion A:B = C:D.</li>
                            <li>Leave the field you want to solve for blank.</li>
                            <li>Click "Calculate" to find the missing value.</li>
                        </ol>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground">Ratio Scaling Calculator</h4>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground mt-2">
                            <li>Enter the two parts of your starting ratio.</li>
                            <li>Enter the factor by which you want to scale the ratio.</li>
                            <li>Select whether you want to "Shrink" or "Enlarge" the ratio.</li>
                            <li>Click "?" to see the new, scaled ratio.</li>
                        </ol>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>What is a Ratio?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>A ratio is a quantitative relationship between two numbers that describes how many times one value can contain another. Applications of ratios are fairly ubiquitous, and the concept of ratios is quite intuitive.</p>
                    <p>As shown above, ratios are often expressed as two numbers separated by a colon. They can also be written as "1 to 2" or as a fraction ½. The ratio represents the number that needs to be multiplied by the denominator in order to yield the numerator. In this case, ½. This is clearer if the first number is larger than the second, i.e. with the ratio 2:1, 2 can contain 1, 2 times. It is also possible to have ratios that have more than two terms.</p>
                    <p>Ratios are common in many daily applications including: aspect ratios for screens, describing maps and models as a scaled-down version of their actual size, in baking and cooking, when discussing the odds of something occurring, or to describe rates, such as in finance.</p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Typical Aspect Ratios of Screens and Videos</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">The aspect ratio is the ratio of a geometric shape's sizes in different dimensions. In the case of a rectangle, the aspect ratio is that of its width to its height. Below is a list of typical computer screen/video resolutions and aspect ratios.</p>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Aspect Ratio</TableHead>
                                    <TableHead>Width (px)</TableHead>
                                    <TableHead>Height (px)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {aspectRatios.map(row => (
                                    <TableRow key={row.name}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.ratio}</TableCell>
                                        <TableCell>{row.width}</TableCell>
                                        <TableCell>{row.height}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            
            <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>
                                <p>{faq.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
        <RelatedCalculators currentCategory="Math Calculators" currentHref="/ratio-calculator" />
      </main>
    </div>
  );
}
