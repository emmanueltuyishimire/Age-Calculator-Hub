
import { type Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About Us – Age Calculator Hub',
    description: 'Learn about Age Calculator Hub, our mission, and the team behind our free, accurate online age calculation tools. Discover why we are dedicated to providing the best age-related calculators.',
    alternates: {
        canonical: '/about',
    },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main role="main" className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">About Age Calculator Hub</h1>
          <p className="text-md md:text-lg text-muted-foreground">
            Your trusted resource for accurate and easy-to-use age calculation tools.
          </p>
        </div>

        <section className="space-y-6 text-muted-foreground">
          <p>
            Welcome to Age Calculator Hub, your premier online destination for a wide array of free, accurate, and intuitive age-related calculators. Our mission is to provide accessible tools that help you make sense of time, whether you're calculating human chronological age, discovering your pet's age in human years, or planning for major life events like pregnancy and retirement.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground pt-4">Our Mission</h2>
          <p>
            In a world driven by data, we believe that understanding time and age should be simple and accessible to everyone. Our mission is to empower you with high-quality, reliable calculators that are not only functional but also easy to understand. We strive to cover every aspect of age calculation—from the fun and curious to the serious and practical—ensuring you have a trustworthy tool for every need.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground pt-4">What We Offer</h2>
          <p>
            Age Calculator Hub provides a comprehensive suite of tools, including:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Core Age Calculators:</strong> Instantly find your exact age in years, months, days, and even real-time seconds.</li>
            <li><strong>Health & Wellness Calculators:</strong> Explore your biological age based on lifestyle factors or monitor pregnancy milestones with our gestational and due date calculators.</li>
            <li><strong>Pet Age Calculators:</strong> Convert your dog or cat's age into human years to better understand their life stage and needs.</li>
            <li><strong>Financial & Retirement Calculators:</strong> Plan for your future with tools that help you determine your Social Security retirement age.</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-foreground pt-4">Our Commitment to Accuracy and Privacy</h2>
          <p>
            We are committed to providing calculators that are based on the latest research and official formulas. All our tools are rigorously tested to ensure they deliver precise results. Your privacy is paramount; our calculators are client-side, meaning the data you enter is processed in your browser and is never stored on our servers.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground pt-4">Contact Us</h2>
          <p>
            We are always looking to improve and expand our offerings. If you have any questions, feedback, or suggestions, please do not hesitate to <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
          </p>
          
          <p>
            Thank you for choosing Age Calculator Hub. We hope our tools provide you with the insights and information you're looking for.
          </p>
        </section>
      </main>
    </div>
  );
}
