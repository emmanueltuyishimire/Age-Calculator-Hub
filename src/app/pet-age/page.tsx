import PetAgeCalculator from "@/components/calculators/pet-age-calculator";

export default function PetAgePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pet Age Calculator</h1>
        <p className="text-muted-foreground">
          Find out how old your furry friend is in human years.
        </p>
      </div>
      <PetAgeCalculator />
    </div>
  );
}
