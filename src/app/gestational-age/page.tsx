import GestationalAgeCalculator from "@/components/calculators/gestational-age-calculator";

export default function GestationalAgePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestational Age Calculator</h1>
        <p className="text-muted-foreground">
          Calculate gestational age and estimated due date.
        </p>
      </div>
      <GestationalAgeCalculator />
    </div>
  );
}
