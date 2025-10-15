
import type { Metadata } from 'next';
import { faqCategories } from '@/lib/faqs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import AdBanner from '@/components/layout/ad-banner';

export const metadata: Metadata = {
    title: 'Frequently Asked Questions – Calculator Hub',
    description: 'Find answers to common questions about our online age calculators, including how they work, their accuracy, and how to use them for various purposes.',
    alternates: {
        canonical: '/faq',
    },
};

export default function FAQPage() {
  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Frequently Asked Questions</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Find answers to the most common questions about our suite of age-related calculators.
        </p>
      </div>
      
      <div className="my-8">
        <AdBanner />
      </div>

      <section className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
            {faqCategories.map((cat) => (
                <AccordionItem value={cat.category} key={cat.category}>
                    <AccordionTrigger className="text-xl text-left">{cat.category}</AccordionTrigger>
                    <AccordionContent>
                        <Accordion type="single" collapsible className="w-full pl-4">
                            {cat.faqs.map((faq, index) => (
                                <AccordionItem value={`${cat.category}-faq-${index}`} key={`${cat.category}-faq-${index}`}>
                                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-muted-foreground">{faq.answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </section>

    </main>
  );
}
