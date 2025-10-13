
import HealthAssessmentCalculator from "@/components/calculators/health-assessment-calculator";

export default function HealthAssessmentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Health Assessment Tools</h1>
            <p className="text-md md:text-lg text-muted-foreground">
                Tools to assess various health-related age factors.
            </p>
        </div>
        <HealthAssessmentCalculator />
    </div>
  );
}
