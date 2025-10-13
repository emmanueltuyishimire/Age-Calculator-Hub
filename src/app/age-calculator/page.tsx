import AgeCalculator from '@/components/calculators/age-calculator';

export default function AgeCalculatorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Human Age Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your age with precision down to the day.
        </p>
      </div>
      <AgeCalculator />
    </div>
  );
}
