
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
  chronologicalAge: z.number().describe("The person's current age in years."),
  gender: z.enum(['male', 'female', 'other']).describe("The person's gender."),
  activityLevel: z.enum(['none', 'low', 'moderate', 'high']).describe('Level of physical activity.'),
  isSmoking: z.enum(['no', 'yes']).describe('Whether the person smokes.'),
  alcoholConsumption: z.enum(['none', 'moderate', 'high']).describe('Level of alcohol consumption.'),
  dietQuality: z.enum(['poor', 'average', 'excellent']).describe('The quality of the person\'s diet.'),
  sleepHours: z.number().describe('The average number of hours the person sleeps per night.'),
  stressLevel: z.enum(['low', 'medium', 'high']).describe('The person\'s self-reported stress level.'),
});
export type BiologicalAgeInput = z.infer<typeof BiologicalAgeInputSchema>;

const BiologicalAgeOutputSchema = z.object({
  biologicalAge: z.number().describe('Estimated biological age in years. This should be a single number.'),
  insights: z.string().describe('A paragraph of insights explaining how lifestyle factors contribute to the estimated biological age, followed by a few bullet points with specific, actionable tips for improvement. The tone should be encouraging and supportive.'),
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

1.  Analyze the provided information to estimate the user's biological age. The biological age could be higher or lower than their chronological age. Use the following simple scoring system as a baseline, but apply your holistic understanding to produce a reasonable final age.
    - Start with chronological age.
    - Physical Activity: None (+3 years), Low (+1), Moderate (0), High (-2).
    - Smoking: Yes (+5 years).
    - Alcohol: None (0), Moderate (+1), High (+3).
    - Diet: Poor (+3), Average (+1), Excellent (-2).
    - Sleep: <6 hours (+1), 6-8 hours (0), >8 hours (-1).
    - Stress: Low (-1), Medium (0), High (+2).
2.  Provide actionable insights and personalized tips. Be encouraging and supportive.

User's data:
- Chronological Age: {{{chronologicalAge}}}
- Gender: {{{gender}}}
- Physical Activity: {{{activityLevel}}}
- Smoking: {{{isSmoking}}}
- Alcohol Consumption: {{{alcoholConsumption}}}
- Diet Quality: {{{dietQuality}}}
- Average Sleep Hours: {{{sleepHours}}}
- Stress Level: {{{stressLevel}}}

Based on this, first provide the single estimated biological age number. Then, provide a paragraph of insights explaining how these factors contribute to the result. Finally, offer a few bullet points with specific, actionable tips for improvement.
`,
});

const biologicalAgeCalculationFlow = ai.defineFlow(
  {
    name: 'biologicalAgeCalculationFlow',
    inputSchema: BiologicalAgeInputSchema,
    outputSchema: BiologicalAgeOutputSchema,
  },
  async input => {
    // The AI model will perform the calculation based on the detailed prompt.
    const {output} = await biologicalAgePrompt(input);
    return output!;
  }
);
