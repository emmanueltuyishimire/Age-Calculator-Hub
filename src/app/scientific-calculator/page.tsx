
import { type Metadata } from 'next';
import { ClientPage } from './client-page';

export const metadata: Metadata = {
    title: 'Scientific Calculator – Advanced Online Math Tool',
    description: 'Use our free online scientific calculator for advanced mathematics. Features trigonometric functions, logarithms, exponents, and more. Perfect for students and professionals.',
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
            "name": "How do I use the scientific calculator?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can click the buttons with your mouse or use your keyboard to enter numbers and operations. The calculator supports standard functions like sine, cosine, tangent, logarithms, and exponents."
            }
        },
        {
            "@type": "Question",
            "name": "What does the 'Deg/Rad' button do?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "This button switches the calculator's mode between Degrees (Deg) and Radians (Rad). This is crucial for trigonometric functions like sin, cos, and tan, as the results will differ based on the selected mode."
            }
        },
        {
            "@type": "Question",
            "name": "How do the memory functions (M+, M-, MR, MC) work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "M+ adds the current display value to memory. M- subtracts it. MR (Memory Recall) puts the memory value on the display. MC (Memory Clear) resets the memory to zero."
            }
        },
        {
            "@type": "Question",
            "name": "What is 'Ans'?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The 'Ans' button recalls the result of the last completed calculation, allowing you to use it in your next operation."
            }
        },
        {
            "@type": "Question",
            "name": "Can I use keyboard shortcuts?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, you can use your keyboard's number keys, operators (+, -, *, /), and the Enter key for equals. The 'Backspace' key works for the backspace function."
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
