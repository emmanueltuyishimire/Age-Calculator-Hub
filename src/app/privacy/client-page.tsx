
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
                <p>
                    Welcome to Age Calculator Hub ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose information when you visit our website (the "Website").
                </p>
                
                <h2 className="text-2xl font-bold text-foreground pt-4">Information We Collect</h2>
                <p>
                    We do not collect or store any personal data that you enter into our calculators. All calculations are performed on your device within your browser (client-side). The information you provide—such as your date of birth, lifestyle habits, or menstrual cycle dates—is not transmitted to or saved on our servers.
                </p>

                <h2 className="text-2xl font-bold text-foreground pt-4">Cookies and Web Beacons</h2>
                <p>
                    Like any other website, Age Calculator Hub uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                </p>
                <p>
                    For more general information on cookies, please read the "What Are Cookies" article on the Cookie Consent website.
                </p>

                <h2 className="text-2xl font-bold text-foreground pt-4">Third-Party Advertising and Google AdSense</h2>
                <p>
                    We use third-party advertising companies, including Google AdSense, to serve ads when you visit our Website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Google, as a third-party vendor, uses cookies to serve ads on our site.</li>
                    <li>Google's use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet.</li>
                    <li>Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.</li>
                </ul>
                <p>
                    We have no access to or control over these cookies that are used by third-party advertisers. You should consult the respective privacy policies of these third-party ad servers for more detailed information on their practices as well as for instructions about how to opt-out of certain practices.
                </p>

                <h2 className="text-2xl font-bold text-foreground pt-4">Children's Information</h2>
                <p>
                    Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                </p>
                <p>
                    Age Calculator Hub does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                </p>

                <h2 className="text-2xl font-bold text-foreground pt-4">Online Privacy Policy Only</h2>
                <p>
                    This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Age Calculator Hub. This policy is not applicable to any information collected offline or via channels other than this website.
                </p>

                <h2 className="text-2xl font-bold text-foreground pt-4">Consent</h2>
                <p>
                    By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                </p>

                <h2 className="text-2xl font-bold text-foreground pt-4">Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
                </p>
                </section>
            </main>
        </div>
    )
}
