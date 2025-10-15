
'use client';

import Link from 'next/link';
import * as React from 'react';

export function ClientPage() {
    const [lastUpdated, setLastUpdated] = React.useState('');

    React.useEffect(() => {
        setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);

    return (
         <div className="container mx-auto px-4 py-8">
            <main role="main" className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
                    <p className="text-md md:text-lg text-muted-foreground">
                        Last updated: {lastUpdated}
                    </p>
                </div>

                <section className="space-y-6 text-muted-foreground">
                    <p className="lead">
                        Welcome to Calculators ("we," "our," or "us"). We are committed to protecting your privacy and providing transparency about how we handle information. This Privacy Policy details our practices concerning the information we collect and process when you use our website, https://innerpeacejournals.com (the "Website").
                    </p>
                
                    <h2 className="text-2xl font-bold text-foreground pt-4">1. Our Core Privacy Principle: Your Data is Your Own</h2>
                    <p>
                        <strong>We do not collect, store, or transmit any personal data that you enter into our calculators.</strong> All calculations (such as age, health metrics, or pregnancy details) are performed directly within your web browser on your device (client-side). The information you input never reaches our servers. Your privacy is paramount, and our tools are designed to function without requiring you to share sensitive personal information with us.
                    </p>

                    <h2 className="text-2xl font-bold text-foreground pt-4">2. Information We Do Collect (Log Files & Analytics)</h2>
                    <p>
                        Like most websites, we use log files and analytics services (specifically Google Analytics). This information is non-personally identifiable and is used to analyze trends, administer the site, track users' movement on the website, and gather demographic information. The information we collect automatically includes:
                    </p>
                     <ul className="list-disc list-inside space-y-2">
                        <li>Internet protocol (IP) addresses</li>
                        <li>Browser type and version</li>
                        <li>Internet Service Provider (ISP)</li>
                        <li>Date and time stamps</li>
                        <li>Referring/exit pages</li>
                        <li>Number of clicks</li>
                    </ul>
                     <p>This data helps us understand how our visitors use the site so we can improve the user experience.</p>

                    <h2 className="text-2xl font-bold text-foreground pt-4">3. Cookies and Third-Party Advertising (Google AdSense)</h2>
                    <p>
                        To keep our services free, we use third-party advertising from Google AdSense. Here’s how cookies are used in this context:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>What are Cookies:</strong> Cookies are small text files stored on your device that help websites remember your preferences and visits.</li>
                        <li><strong>Google AdSense & DART Cookie:</strong> Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on their visits to our site and other sites on the Internet. These cookies help in providing advertisements about goods and services of interest to you (personalized advertising).</li>
                        <li><strong>Opting Out of Personalized Advertising:</strong> You can opt out of personalized advertising by visiting the <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ad Settings</a> page. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aboutads.info/choices</a>.</li>
                    </ul>
                    <p>
                        We have no access to or control over the cookies that are used by third-party advertisers. We encourage you to consult the respective privacy policies of these third-party ad servers for more detailed information.
                    </p>

                    <h2 className="text-2xl font-bold text-foreground pt-4">4. Children's Information (COPPA Compliance)</h2>
                    <p>
                        Our website is not directed at children under the age of 13. We do not knowingly collect any Personal Identifiable Information from children under 13. We encourage parents and guardians to observe and guide their children's online activity. If you believe that your child has provided any form of personal information on our website, please contact us immediately, and we will make every effort to promptly remove such information from our records.
                    </p>

                    <h2 className="text-2xl font-bold text-foreground pt-4">5. Online Privacy Policy Only</h2>
                    <p>
                        This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information collected and processed here. This policy is not applicable to any information collected offline or via channels other than this website.
                    </p>

                    <h2 className="text-2xl font-bold text-foreground pt-4">6. Consent</h2>
                    <p>
                        By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                    </p>

                    <h2 className="text-2xl font-bold text-foreground pt-4">7. Contact Us</h2>
                    <p>
                        If you have any questions or require more information about our Privacy Policy, do not hesitate to <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
                    </p>
                </section>
            </main>
        </div>
    )
}
