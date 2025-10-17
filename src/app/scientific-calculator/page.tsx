
import { type Metadata } from 'next';
import { ClientPage } from './client-page';

export const metadata: Metadata = {
    title: 'Free Scientific Calculator Online – Advanced Math Tool',
    description: 'A free, powerful online scientific calculator with advanced functions for trigonometry, logarithms, and fractions. A great alternative to physical calculators for students and professionals. No app download required.',
    alternates: {
        canonical: '/scientific-calculator',
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is the best free online scientific calculator?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The best free online scientific calculator is one that is easy to use, has a full range of functions (trigonometry, logs, exponents), and works on any device. Our calculator is designed to meet all these needs without requiring any app downloads."
            }
        },
        {
            "@type": "Question",
            "name": "How do you use a scientific calculator with fractions?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "To work with fractions, you simply use the division (÷) key. For example, to calculate 1/2 + 1/4, you would enter '1÷2 + 1÷4' and press equals to get the result 0.75."
            }
        },
        {
            "@type": "Question",
            "name": "What is the 'Deg/Rad' button for?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "This button switches the calculator's mode between Degrees (Deg) and Radians (Rad). This is crucial for trigonometric functions like sin, cos, and tan, as the results will differ based on the selected mode."
            }
        },
        {
            "@type": "Question",
            "name": "Is this a good alternative to a Casio or TI calculator?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, for most high school and college-level math, this online scientific calculator is a great, free alternative to physical calculators like those from Casio or Texas Instruments (TI)."
            }
        }
    ]
};

export default function ScientificCalculatorPage() {
  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ClientPage />
    </>
  );
}
