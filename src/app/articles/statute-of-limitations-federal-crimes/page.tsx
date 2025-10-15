
import { type Metadata } from 'next';
import { articles } from '@/lib/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Scale, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const article = articles.find(a => a.slug === 'statute-of-limitations-federal-crimes');

export function generateMetadata(): Metadata {
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

const immigrationOffenses = [
    "Using false or fraudulent citizenship papers (18 USC 1423).",
    "Impersonating another in citizenship or naturalization proceedings (18 USC 1424).",
    "Obtaining citizenship or naturalization illegally (18 USC 1425).",
    "Manufacture or reproduction of false, forged, or fraudulent papers (18 USC 1426).",
    "Sale of legal naturalization or citizenship papers (18 USC 1427).",
    "Failing to surrender a canceled naturalization certificate (18 USC 1428).",
    "Issuing a passport without authority (18 USC 1541).",
    "Making a false statement in a passport application (18 USC 1542).",
    "Falsifying, forging, or altering a passport (18 USC 1543).",
    "Using a passport belonging to another person (18 USC 1544)."
];

const financialOffenses = [
    "Bank fraud (18 USC 1344).",
    "Mail fraud (18 USC 1341).",
    "Wire fraud (18 USC 1343).",
    "RICO violations predicated on bank fraud (18 USC 1962).",
    "Receipt of commissions or gifts for procuring loans (18 USC 215).",
    "Theft, embezzlement, or misapplication by a bank officer (18 USC 656).",
    "Embezzling funds from a federal financial institution (18 USC 657).",
    "Falsifying bank records (18 USC 1005).",
    "Falsifying records of a federal financial institution (18 USC 1006).",
    "Falsifying statements to the FDIC (18 USC 1007).",
    "Making a false statement for a federal loan (18 USC 1014).",
    "Making a false statement related to insurance and a financial institution (18 USC 1033).",
    "Major fraud against the United States (18 USC 1031)."
];

export default function FederalStatuteOfLimitationsArticlePage() {
  if (!article) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <article className="prose dark:prose-invert lg:prose-xl max-w-none">
          <div className="text-center mb-12">
            <p className="text-base text-primary font-semibold">{article.category}</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{article.title}</h1>
            <p className="text-md md:text-lg text-muted-foreground">{article.description}</p>
          </div>
          
          <Alert className="mb-8">
            <Scale className="h-4 w-4" />
            <AlertTitle>The General Rule: 18 U.S.C. § 3282</AlertTitle>
            <AlertDescription>
              <p className="font-mono text-sm bg-muted p-3 rounded-md mt-2">"Except as otherwise expressly provided by law, no person shall be prosecuted, tried, or punished for any offense, not capital, unless the indictment is found or the information is instituted within five years next after such offense shall have been committed."</p>
            </AlertDescription>
          </Alert>

          <p className="lead">
            The statute of limitations for federal crimes sets a firm deadline for the government to file criminal charges. The general rule, established under 18 U.S.C. § 3282, is a five-year limit for most non-capital federal felonies. However, this is just the starting point. Congress has carved out numerous exceptions for specific offenses, creating a complex web of timelines that prosecutors must follow.
          </p>

          <h2 className="text-3xl font-bold">Purpose of the Statute of Limitations</h2>
          <p>
            The primary purpose of these time limits is to ensure a fair trial, a right guaranteed by the U.S. Constitution. As time passes, evidence can be lost, witness memories fade, and the ability to mount a proper defense diminishes. Forcing a defendant to defend against decades-old charges could violate their right to due process. The statute of limitations defense must be raised by the defendant before a trial begins; otherwise, it is generally considered waived.
          </p>
          
          <Card className="my-8">
            <CardHeader>
                <CardTitle>Crimes with No Statute of Limitations</CardTitle>
                <CardDescription>Certain offenses are considered so severe that they can be prosecuted at any time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <p>Under federal law, the following crimes are not subject to any time limit:</p>
                <ul className="list-disc list-inside text-muted-foreground">
                    <li><strong>Capital Crimes:</strong> Offenses where the death penalty may be imposed, such as capital murder (18 U.S.C. § 3281).</li>
                    <li><strong>Certain Terrorism Offenses:</strong> Federal crimes of terrorism that result in death or serious bodily injury (18 U.S.C. § 3286).</li>
                    <li><strong>Certain Sexual Offenses Against Children:</strong> Various federal laws concerning the sexual abuse of minors have no statute of limitations (18 U.S.C. § 3283).</li>
                </ul>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold">Specific Time Limits for Other Federal Offenses</h2>
          <p>Beyond the general five-year rule, Congress has set specific statutes of limitations for many white-collar and other complex crimes.</p>
          
          <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Tax Crimes (6 Years)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Offenses against the Internal Revenue Service, governed by 26 U.S.C. § 6531, generally have a six-year statute of limitations. This includes crimes like tax evasion (26 U.S.C. § 7201) and failure to file a tax return (26 U.S.C. § 7203).</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Major Fraud Against the U.S. (7 Years)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Under 18 U.S.C. § 1031, major fraud involving contracts, grants, or other federal assistance of at least $1,000,000 has a seven-year statute of limitations from the date the crime was committed.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Immigration Offenses (10 Years)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Federal law extends the statute of limitations from five to ten years for a range of immigration and naturalization-related crimes, including:</p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                        {immigrationOffenses.map((offense, index) => <li key={index}>{offense}</li>)}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Bank Fraud and Financial Crimes (10 Years)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>A ten-year statute of limitations applies to many serious financial crimes to give investigators adequate time to uncover complex schemes. These include:</p>
                     <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                        {financialOffenses.map((offense, index) => <li key={index}>{offense}</li>)}
                    </ul>
                </CardContent>
            </Card>
          </div>

          <h2 className="text-3xl font-bold mt-8">Conspiracy Crimes and Other Exceptions</h2>
          <p>
            The statute of limitations for conspiracy crimes (e.g., under 18 U.S.C. § 371) is unique. The clock does not start until the *last overt act* in furtherance of the conspiracy has been committed. This means a conspiracy can be prosecuted long after it was first formed.
          </p>
          <p>
            Additionally, federal law allows for extensions in certain circumstances, such as when original charges are dismissed and need to be refiled (18 U.S.C. § 3288) or when evidence is located in a foreign country (18 US.C. § 3292).
          </p>
          
          <Alert variant="destructive" className="my-12">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Legal Disclaimer</AlertTitle>
            <AlertDescription>
              This article provides general information for educational purposes and is not a substitute for professional legal advice. The application of statutes of limitations is highly fact-specific. Always consult a qualified attorney regarding any legal matter. For more information, see our main <Link href="/articles/what-is-statute-of-limitations" className="font-semibold underline">Statute of Limitations Guide</Link>.
            </AlertDescription>
          </Alert>

        </article>
      </main>
    </div>
  );
}
