
'use server';

/**
 * @fileOverview Estimates biological age based on lifestyle factors.
 *
 * - biologicalAgeCalculation - A function to calculate biological age and provide insights.
 * - BiologicalAgeInput - The input type for the biologicalAgeCalculation function.
 * - BiologicalAgeOutput - The return type for the biologicalAgeCalculation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BiologicalAgeInputSchema = z.object({
  chronologicalAge: z.number().describe('The person\'s current age in years.'),
  gender: z.string().describe('The person\'s gender (male, female, or other).'),
  exerciseFrequency: z.string().describe('A description of how often the person exercises (e.g., "3-4 times a week, cardio and weights").'),
  dietQuality: z.string().describe('A description of the person\'s diet (e.g., "Balanced diet with fruits and vegetables, occasional processed foods").'),
  sleepHours: z.number().describe('The average number of hours the person sleeps per night.'),
  stressLevels: z.string().describe('A description of the person\'s daily stress levels (e.g., "Moderate stress from work, manage with meditation").'),
});
export type BiologicalAgeInput = z.infer<typeof BiologicalAgeInputSchema>;

const BiologicalAgeOutputSchema = z.object({
  biologicalAge: z.number().optional().describe('Estimated biological age in years.'),
  insights: z.string().describe('Insights into how lifestyle factors may be affecting biological age and tips to improve it.'),
});
export type BiologicalAgeOutput = z.infer<typeof BiologicalAgeOutputSchema>;

export async function biologicalAgeCalculation(input: BiologicalAgeInput): Promise<BiologicalAgeOutput> {
  return biologicalAgeCalculationFlow(input);
}

const biologicalAgePrompt = ai.definePrompt({
  name: 'biologicalAgePrompt',
  input: {schema: BiologicalAgeInputSchema},
  output: {schema: BiologicalAgeOutputSchema},
  prompt: `You are an AI assistant specialized in estimating biological age based on user-provided lifestyle data. Your task is to:

1.  Analyze the provided information to estimate the user's biological age. The biological age could be higher or lower than their chronological age.
2.  Provide actionable insights and personalized tips on how the user can improve their health and potentially lower their biological age. Be encouraging and supportive.

Here is the user's data:

Chronological Age: {{{chronologicalAge}}}
Gender: {{{gender}}}
Exercise Frequency: {{{exerciseFrequency}}}
Diet Quality: {{{dietQuality}}}
Average Sleep Hours: {{{sleepHours}}}
Daily Stress Levels: {{{stressLevels}}}

Based on this, first provide the estimated biological age. Then, provide a paragraph of insights explaining how these factors contribute to the result. Finally, offer a few bullet points with specific, actionable tips for improvement.
`,
});

const biologicalAgeCalculationFlow = ai.defineFlow(
  {
    name: 'biologicalAgeCalculationFlow',
    inputSchema: BiologicalAgeInputSchema,
    outputSchema: BiologicalAgeOutputSchema,
  },
  async input => {
    const {output} = await biologicalAgePrompt(input);
    return output!;
  }
);
