import RetirementAgeCalculator from "@/components/calculators/retirement-age-calculator";

export default function RetirementAgePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Retirement Age Calculator</h1>
        <p className="text-muted-foreground">
          Determine your full retirement age for social security benefits.
        </p>
      </div>
      <RetirementAgeCalculator />
    </div>
  );
}
