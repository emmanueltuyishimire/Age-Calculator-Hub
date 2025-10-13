
import { type Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us – Age Calculator Hub',
    description: 'Get in touch with the Age Calculator Hub team. We welcome your questions, feedback, and suggestions. Contact us via email for any inquiries.',
    alternates: {
        canonical: '/contact',
    },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Contact Us</h1>
          <p className="text-md md:text-lg text-muted-foreground">
            We'd love to hear from you!
          </p>
        </div>

        <section className="space-y-6 text-muted-foreground text-center">
            <p>
                If you have any questions about our calculators, suggestions for new tools, or any other feedback, please feel free to reach out to us. We value your input and are always looking for ways to improve our services.
            </p>
            <p>
                For all inquiries, please email us at:
            </p>
            <p>
                <a href="mailto:norababysleep@gmail.com" className="text-primary text-lg font-semibold hover:underline">
                    norababysleep@gmail.com
                </a>
            </p>
            <p>
                We do our best to respond to all messages as quickly as possible. Thank you for your interest in Age Calculator Hub.
            </p>
        </section>
      </main>
    </div>
  );
}
