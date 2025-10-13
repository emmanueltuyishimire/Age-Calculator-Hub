'use server';

/**
 * @fileOverview Estimates biological age based on biomarker data and provides lifestyle insights.
 *
 * - biologicalAgeCalculation - A function to calculate biological age and provide insights.
 * - BiologicalAgeInput - The input type for the biologicalAgeCalculation function.
 * - BiologicalAgeOutput - The return type for the biologicalAgeCalculation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BiologicalAgeInputSchema = z.object({
  bloodPressure: z.string().optional().describe('Blood pressure reading (e.g., 120/80).'),
  cholesterolLevels: z.string().optional().describe('Cholesterol levels (e.g., LDL: 120, HDL: 50).'),
  restingHeartRate: z.number().optional().describe('Resting heart rate in beats per minute.'),
  fastingBloodSugar: z.number().optional().describe('Fasting blood sugar level in mg/dL.'),
  waistCircumference: z.number().optional().describe('Waist circumference in inches or cm.'),
  hba1c: z.number().optional().describe('HbA1c level as a percentage.'),
  hsCRP: z.number().optional().describe('hs-CRP level in mg/L.'),
});
export type BiologicalAgeInput = z.infer<typeof BiologicalAgeInputSchema>;

const BiologicalAgeOutputSchema = z.object({
  biologicalAge: z.number().optional().describe('Estimated biological age in years.'),
  insights: z.string().describe('Insights into how lifestyle factors may be affecting biological age.'),
  missingBiomarkers: z.string().optional().describe('A message to the user informing them about the missing biomarkers to provide a more accurate result')
});
export type BiologicalAgeOutput = z.infer<typeof BiologicalAgeOutputSchema>;

export async function biologicalAgeCalculation(input: BiologicalAgeInput): Promise<BiologicalAgeOutput> {
  return biologicalAgeCalculationFlow(input);
}

const biologicalAgePrompt = ai.definePrompt({
  name: 'biologicalAgePrompt',
  input: {schema: BiologicalAgeInputSchema},
  output: {schema: BiologicalAgeOutputSchema},
  prompt: `You are an AI assistant specialized in calculating biological age based on user-provided biomarker data. Your task is to:

1.  Calculate the biological age using the provided biomarkers (blood pressure, cholesterol levels, resting heart rate, fasting blood sugar, waist circumference, HbA1c, and hs-CRP). If a biomarker is missing, make sure to indicate it in your output, and state that the result will be more accurate if it is provided.
2.  Provide insights into how the user's lifestyle factors (based on the provided biomarkers) may be affecting their biological age. Offer general recommendations for improvement.

Here is the biomarker data:

Blood Pressure: {{{bloodPressure}}}
Cholesterol Levels: {{{cholesterolLevels}}}
Resting Heart Rate: {{{restingHeartRate}}}
Fasting Blood Sugar: {{{fastingBloodSugar}}}
Waist Circumference: {{{waistCircumference}}}
HbA1c: {{{hba1c}}}
hs-CRP: {{{hsCRP}}}

If insufficient information is provided, inform the user that more data is needed for an accurate estimation and list the biomarkers that would be helpful.  Specify the units for each biomarker so the user knows how to provide the values.
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
