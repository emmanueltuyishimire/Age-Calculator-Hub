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
    return result;
  } catch (error) {
    console.error(error);
    return {
      insights: "An error occurred while calculating your biological age. Please try again later.",
    };
  }
}
