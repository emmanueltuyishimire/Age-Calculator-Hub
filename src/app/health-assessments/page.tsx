import HealthAssessmentCalculator from "@/components/calculators/health-assessment-calculator";

export default function HealthAssessmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Health Assessments</h1>
        <p className="text-muted-foreground">
          Tools to assess health-related age factors.
        </p>
      </div>
      <HealthAssessmentCalculator />
    </div>
  );
}
