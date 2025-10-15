
'use client';

import Link from 'next/link';
import * as React from 'react';

export function ClientPage() {
    const [lastUpdated, setLastUpdated] = React.useState('');
    
    React.useEffect(() => {
        setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
    }, [])

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
                <p className="lead">
                    Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the https://innerpeacejournals.com website (the "Service") operated by Calculators ("us", "we", or "our").
                </p>
                <p>
                    Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service. By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                </p>
                
                <h2 className="text-2xl font-bold text-foreground pt-4">1. Use of Service</h2>
                <p>
                    Calculators provides a collection of online calculators and informational articles for general informational and educational purposes only. You agree to use the Service in compliance with all applicable laws and regulations and not for any purpose that is unlawful or prohibited by these Terms.
                </p>
                <p>
                    You are granted a limited, non-exclusive, non-transferable license to access and use the Service for your personal, non-commercial use.
                </p>

                <h2 className="text-2xl font-bold text-foreground pt-4">2. Intellectual Property</h2>
                <p>
                    The Service and its original content, features, and functionality (including but not limited to all information, text, graphics, logos, and the calculators themselves) are and will remain the exclusive property of Calculators and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Calculators.
                </p>

                <h2 className="text-2xl font-bold text-foreground pt-4">3. Disclaimer of Warranties and Limitation of Liability</h2>
                <p>
                    The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Your use of the Service is at your sole risk. We explicitly disclaim all warranties of any kind, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                </p>
                <p>
                    The information provided by our calculators is not a substitute for professional advice. For more detailed information on our disclaimers, please read our full <Link href="/disclaimer" className="text-primary hover:underline">Disclaimer page</Link>.
                </p>

                <h2 className="text-2xl font-bold text-foreground pt-4">4. Third-Party Links and Advertising</h2>
                <p>
                    Our Service may contain links to third-party web sites or services that are not owned or controlled by Calculators. We use third-party advertising, such as Google AdSense, to support our Service. These third parties may use cookies to serve ads based on a user's prior visits to our website or other websites.
                </p>
                <p>
                     Calculators has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that Calculators shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such web sites or services.
                </p>

                <h2 className="text-2xl font-bold text-foreground pt-4">5. Governing Law</h2>
                <p>
                    These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the website owner resides, without regard to its conflict of law provisions.
                </p>
                
                <h2 className="text-2xl font-bold text-foreground pt-4">6. Changes to Terms</h2>
                <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                 <p>
                    By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                </p>

                <h2 className="text-2xl font-bold text-foreground pt-4">7. Contact Us</h2>
                <p>
                    If you have any questions about these Terms, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
                </p>
                </section>
            </main>
        </div>
    )
}
