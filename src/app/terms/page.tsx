
"use client";

import { type Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Terms of Service – Age Calculator Hub',
    description: 'Read the Terms of Service for Age Calculator Hub. By using our website, you agree to these terms and conditions. Learn about acceptable use, disclaimers, and liability.',
    alternates: {
        canonical: '/terms',
    },
};

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
            <p className="text-md md:text-lg text-muted-foreground">
                Last updated: {lastUpdated}
            </p>
        </div>

        <section className="space-y-6 text-muted-foreground">
          <p>
            Welcome to Age Calculator Hub. These Terms of Service ("Terms") govern your use of our website and the tools we provide (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground pt-4">1. Use of Service</h2>
          <p>
            Age Calculator Hub provides a collection of online calculators for general informational and educational purposes only. You agree to use the Service in compliance with all applicable laws and regulations and not for any unlawful purpose.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">2. Intellectual Property</h2>
          <p>
            All content on this Website, including text, graphics, logos, and the calculators themselves, is the property of Age Calculator Hub or its content suppliers and is protected by international copyright laws. You may not reproduce, duplicate, copy, sell, or exploit any portion of the Service without express written permission from us.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">3. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "as is" and "as available" basis. Age Calculator Hub makes no warranties, express or implied, regarding the accuracy, reliability, or completeness of the information provided. For more details, please see our <Link href="/disclaimer" className="text-primary hover:underline">Disclaimer</Link>.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">4. Limitation of Liability</h2>
          <p>
            In no event shall Age Calculator Hub, nor its owners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">5. Third-Party Links</h2>
          <p>
            Our Service may contain links to third-party web sites or services that are not owned or controlled by Age Calculator Hub. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">6. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the website owner resides, without regard to its conflict of law provisions.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground pt-4">7. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will notify you of any changes by posting the new Terms on this page. You are advised to review these Terms periodically for any changes.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
          </p>
        </section>
      </main>
    </div>
  );
}
