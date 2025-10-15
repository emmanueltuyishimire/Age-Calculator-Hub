
"use server";

import {
  biologicalAgeCalculation,
  type BiologicalAgeInput,
  type BiologicalAgeOutput,
} from '@/ai/flows/biological-age-calculation';

export async function getBiologicalAge(
  input: BiologicalAgeInput
): Promise<BiologicalAgeOutput> {
  try {
    const result = await biologicalAgeCalculation(input);
    
    // Ensure that if biologicalAge is missing, we fall back to chronologicalAge
    if (!result || typeof result.biologicalAge !== 'number') {
      console.warn("Biological age calculation returned invalid data. Falling back to chronological age.");
      return {
        biologicalAge: input.chronologicalAge,
        insights: result?.insights || "We couldn't calculate a specific biological age, but here are some general tips based on your lifestyle factors."
      };
    }

    return result;
  } catch (error) {
    console.error("Error in getBiologicalAge:", error);
    // Return a structured error response with the chronological age as a fallback
    return {
      biologicalAge: input.chronologicalAge,
      insights: "An error occurred while calculating your biological age. This can happen during periods of high demand. Please try again later. In the meantime, focus on a balanced diet and regular exercise.",
    };
  }
}
