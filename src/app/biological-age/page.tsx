
import BiologicalAgeCalculator from "@/components/calculators/biological-age-calculator";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: 'Biological Age Calculator – What is Your True Age?',
    description: 'Our Biological Age Calculator uses key health markers to estimate your body’s true age. Discover how your lifestyle impacts your health and get personalized insights.',
};

export default function BiologicalAgePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Biological Age Calculator</h1>
        <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover your body's true biological age based on key health markers and lifestyle factors. This tool provides an estimate to help you understand your overall health.
        </p>
      </div>
      <BiologicalAgeCalculator />
    </div>
  );
}
