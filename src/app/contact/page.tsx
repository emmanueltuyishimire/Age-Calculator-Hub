
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, Lightbulb } from 'lucide-react';
import AdBanner from '@/components/layout/ad-banner';
import { usePathname } from 'next/navigation';

export default function ContactPage() {
  const pathname = usePathname();
  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Get in Touch</h1>
          <p className="text-md md:text-lg text-muted-foreground">
            We're here to help and eager to hear from you.
          </p>
        </div>

        <div className="my-8">
          <AdBanner key={pathname} />
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">How Can We Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <MessageSquare className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-semibold text-lg">General Questions</h3>
                <p className="text-muted-foreground text-sm">Have a question about how our calculators work? We're happy to provide answers.</p>
              </div>
              <div className="flex flex-col items-center">
                <Lightbulb className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-semibold text-lg">Feedback & Suggestions</h3>
                <p className="text-muted-foreground text-sm">Your ideas help us improve. Let us know what you'd like to see next!</p>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-semibold text-lg">Other Inquiries</h3>
                <p className="text-muted-foreground text-sm">For partnerships or other inquiries, please don't hesitate to reach out.</p>
              </div>
            </div>

            <div className="pt-6 border-t">
              <p className="text-muted-foreground">
                For all inquiries, please send us an email. We do our best to respond to all messages as quickly as possible.
              </p>
              <a href="mailto:norababysleep@gmail.com" className="inline-block mt-2 text-primary text-lg font-semibold hover:underline">
                  norababysleep@gmail.com
              </a>
              <p className="text-xs text-muted-foreground mt-4">
                Thank you for your interest in Calculator Hub!
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
