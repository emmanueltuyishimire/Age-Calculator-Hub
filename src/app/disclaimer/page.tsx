
"use client";

import { useState, useEffect } from 'react';
import { type Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Disclaimer – Age Calculator Hub',
    description: 'Read the disclaimer for Age Calculator Hub. Our tools are for informational purposes only and should not be considered professional, medical, or financial advice.',
    alternates: {
        canonical: '/disclaimer',
    },
};

export default function DisclaimerPage() {
    const [lastUpdated, setLastUpdated] = useState('');
    
    useEffect(() => {
        setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);


  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Disclaimer</h1>
            <p className="text-md md:text-lg text-muted-foreground">
                Last updated: {lastUpdated}
            </p>
        </div>

        <section className="space-y-6 text-muted-foreground">
          <p>
            The information provided by the calculators on Age Calculator Hub (the "Website") is for general informational purposes only. All information on the Website is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Website.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground pt-4">For Educational and Informational Purposes Only</h2>
          <p>
            The content and tools provided on this Website are intended for educational and informational purposes. The results from our calculators are estimates and should not be used as a definitive source for any legal, medical, financial, or other professional decisions.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">No Professional Advice</h2>
          <p>
            The information provided by our calculators does not constitute professional advice. In particular, the information from our health, pregnancy, and financial calculators is not a substitute for advice from a qualified professional. You should not take any action based upon the information contained on this website without seeking advice from an independent professional.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Medical Disclaimer:</strong> The health and pregnancy-related calculators (e.g., Biological Age, Due Date, Ovulation, Gestational Age) are not medical devices and do not provide medical advice. Always consult with a qualified healthcare provider for any health concerns or before making any decisions related to your health or pregnancy.</li>
            <li><strong>Financial Disclaimer:</strong> The financial calculators (e.g., Retirement Age Calculator) are for informational purposes only and are not intended to provide financial advice. Consult with a qualified financial advisor before making any financial decisions.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground pt-4">Limitation of Liability</h2>
          <p>
            Under no circumstance shall Age Calculator Hub or its owners be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses, resulting from the use or the inability to use the tools and information provided on the Website. Your use of the Website and your reliance on any information on the site is solely at your own risk.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground pt-4">External Links Disclaimer</h2>
          <p>
           The Website may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Contact Us</h2>
          <p>
            If you have any questions about this disclaimer, you can <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
          </p>
        </section>
      </main>
    </div>
  );
}
