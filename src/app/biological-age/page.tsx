import BiologicalAgeCalculator from "@/components/calculators/biological-age-calculator";

export default function BiologicalAgePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Biological Age Calculator</h1>
        <p className="text-muted-foreground">
          Estimate your biological age using health biomarkers, powered by AI.
        </p>
      </div>
      <BiologicalAgeCalculator />
    </div>
  );
}
