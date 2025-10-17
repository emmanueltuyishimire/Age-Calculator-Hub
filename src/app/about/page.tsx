
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us – Calculators',
  description: 'Our mission is to provide accessible tools that help you make sense of the numbers in your life, whether you\'re calculating finances, health metrics, or mathematical equations.',
   alternates: {
      canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">About Calculators</h1>
          <p className="text-md md:text-lg text-muted-foreground">
            Your trusted resource for accurate and easy-to-use calculation tools.
          </p>
        </div>

        <section className="space-y-6 text-muted-foreground">
          <p>
            Welcome to Calculators, your premier online destination for a wide array of free, accurate, and intuitive calculators. Our mission is to provide accessible tools that help you make sense of the numbers in your life, whether you're calculating finances, health metrics, or mathematical equations.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground pt-4">Our Mission</h2>
          <p>
            In a world driven by data, we believe that making informed decisions should be simple and accessible to everyone. Our mission is to empower you with high-quality, reliable calculators that are not only functional but also easy to understand. We strive to cover every aspect of calculation—from the complex to the everyday—ensuring you have a trustworthy tool for every need.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground pt-4">What We Offer</h2>
          <p>
            Calculators provides a comprehensive suite of tools, including:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong><Link href="/financial-calculators" className="text-primary hover:underline font-semibold">Financial Calculators:</Link></strong> Plan for loans, investments, retirement, and manage your budget with confidence.</li>
            <li><strong><Link href="/health-fitness-calculators" className="text-primary hover:underline font-semibold">Health & Fitness Calculators:</Link></strong> Track metrics like BMI, BMR, and body fat, or use our pregnancy tools to follow your journey to parenthood.</li>
            <li><strong><Link href="/math-calculators" className="text-primary hover:underline font-semibold">Math Calculators:</Link></strong> From basic arithmetic to complex statistics, find the tools you need for academic or professional use.</li>
            <li><strong><Link href="/other-calculators" className="text-primary hover:underline font-semibold">Everyday Calculators:</Link></strong> Solve daily problems with tools for conversions, time, and more.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-foreground pt-4">Our Commitment to Accuracy and Privacy</h2>
          <p>
            We are committed to providing calculators that are based on standard, up-to-date formulas and official data. All our tools are rigorously tested to ensure they deliver precise results. Your privacy is paramount; our calculators are client-side, meaning the data you enter is processed in your browser and is never stored on our servers.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground pt-4">Contact Us</h2>
          <p>
            We are always looking to improve and expand our offerings. If you have any questions, feedback, or suggestions, please do not hesitate to <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
          </p>
          
          <p>
            Thank you for choosing Calculators. We hope our tools provide you with the insights and information you're looking for.
          </p>
        </section>
      </main>
    </div>
  );
}
