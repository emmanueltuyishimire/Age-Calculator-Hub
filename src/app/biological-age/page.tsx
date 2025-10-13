import BiologicalAgeCalculator from "@/components/calculators/biological-age-calculator";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chronological & Biological Age Calculator – Pearson & Metabolic Age Online',
  description: 'Calculate your chronological, biological, pearson, and metabolic age online. Use our free, accurate Chronological & Biological Age Calculator to assess your body\'s real age instantly.',
};

export default function BiologicalAgePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Chronological & Biological Age Calculator</h1>
        <p className="text-muted-foreground">
          Enter your date of birth to calculate your chronological age and assess your biological and metabolic age.
        </p>
      </div>
      <BiologicalAgeCalculator />
    </div>
  );
}