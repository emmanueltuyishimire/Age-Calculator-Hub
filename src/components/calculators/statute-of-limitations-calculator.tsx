
"use client";

import { useState, useCallback } from 'react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, addYears, addMonths, isValid, isFuture } from 'date-fns';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Scale, AlertCircle } from 'lucide-react';
import ShareButton from '../share-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Input } from '../ui/input';


// IMPORTANT: This is sample data for demonstration purposes only.
// It is NOT a comprehensive or legally accurate list and is subject to change.
const statuteData: Record<string, Record<string, { years: number, months?: number }>> = {
  'Alabama': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 6 }, 'Property Damage': { years: 2 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 2 }, 'Misdemeanor Theft': { years: 1 } },
  'Alaska': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 3 }, 'Breach of Oral Contract': { years: 3 }, 'Property Damage': { years: 2 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 1 } },
  'Arizona': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 3 }, 'Property Damage': { years: 2 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 1 } },
  'Arkansas': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 5 }, 'Breach of Oral Contract': { years: 3 }, 'Property Damage': { years: 3 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 1 } },
  'California': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 4 }, 'Breach of Oral Contract': { years: 2 }, 'Property Damage': { years: 3 }, 'Medical Malpractice': { years: 1 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 1 } },
  'Colorado': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 3 }, 'Breach of Oral Contract': { years: 3 }, 'Property Damage': { years: 2 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 1, months: 6 } },
  'Connecticut': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 3 }, 'Property Damage': { years: 2 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 1 } },
  'Delaware': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 3 }, 'Breach of Oral Contract': { years: 3 }, 'Property Damage': { years: 2 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 2 } },
  'Florida': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 5 }, 'Breach of Oral Contract': { years: 4 }, 'Property Damage': { years: 4 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 4 }, 'Misdemeanor Theft': { years: 1 } },
  'Georgia': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 4 }, 'Property Damage': { years: 4 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 4 }, 'Misdemeanor Theft': { years: 2 } },
  'Hawaii': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 6 }, 'Property Damage': { years: 2 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 6 }, 'Misdemeanor Theft': { years: 2 } },
  'Idaho': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 5 }, 'Breach of Oral Contract': { years: 4 }, 'Property Damage': { years: 3 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 1 } },
  'Illinois': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 10 }, 'Breach of Oral Contract': { years: 5 }, 'Property Damage': { years: 5 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 5 }, 'Misdemeanor Theft': { years: 1, months: 6 } },
  'Indiana': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 6 }, 'Property Damage': { years: 2 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 6 }, 'Misdemeanor Theft': { years: 2 } },
  'Iowa': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 10 }, 'Breach of Oral Contract': { years: 5 }, 'Property Damage': { years: 5 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 5 }, 'Misdemeanor Theft': { years: 3 } },
  'Kansas': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 5 }, 'Breach of Oral Contract': { years: 3 }, 'Property Damage': { years: 2 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 2 }, 'Misdemeanor Theft': { years: 1 } },
  'Kentucky': { 'Personal Injury': { years: 1 }, 'Breach of Written Contract': { years: 10 }, 'Breach of Oral Contract': { years: 5 }, 'Property Damage': { years: 2 }, 'Medical Malpractice': { years: 1 }, 'Fraud': { years: 5 }, 'Misdemeanor Theft': { years: 1 } },
  'Louisiana': { 'Personal Injury': { years: 1 }, 'Breach of Written Contract': { years: 10 }, 'Breach of Oral Contract': { years: 10 }, 'Property Damage': { years: 1 }, 'Medical Malpractice': { years: 1 }, 'Fraud': { years: 1 }, 'Misdemeanor Theft': { months: 6 } },
  'Maine': { 'Personal Injury': { years: 6 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 6 }, 'Property Damage': { years: 6 }, 'Medical Malpractice': { years: 3 }, 'Fraud': { years: 6 }, 'Misdemeanor Theft': { years: 3 } },
  'Maryland': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 3 }, 'Breach of Oral Contract': { years: 3 }, 'Property Damage': { years: 3 }, 'Medical Malpractice': { years: 3 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 1 } },
  'Massachusetts': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 6 }, 'Property Damage': { years: 3 }, 'Medical Malpractice': { years: 3 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 6 } },
  'Michigan': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 6 }, 'Property Damage': { years: 3 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 6 }, 'Misdemeanor Theft': { years: 1 } },
  'Minnesota': { 'Personal Injury': { years: 6 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 6 }, 'Property Damage': { years: 6 }, 'Medical Malpractice': { years: 4 }, 'Fraud': { years: 6 }, 'Misdemeanor Theft': { years: 3 } },
  'Mississippi': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 3 }, 'Breach of Oral Contract': { years: 3 }, 'Property Damage': { years: 3 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 2 } },
  'Missouri': { 'Personal Injury': { years: 5 }, 'Breach of Written Contract': { years: 10 }, 'Breach of Oral Contract': { years: 5 }, 'Property Damage': { years: 5 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 5 }, 'Misdemeanor Theft': { years: 1 } },
  'Montana': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 8 }, 'Breach of Oral Contract': { years: 5 }, 'Property Damage': { years: 2 }, 'Medical Malpractice': { years: 3 }, 'Fraud': { years: 2 }, 'Misdemeanor Theft': { years: 1 } },
  'Nebraska': { 'Personal Injury': { years: 4 }, 'Breach of Written Contract': { years: 5 }, 'Breach of Oral Contract': { years: 4 }, 'Property Damage': { years: 4 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 4 }, 'Misdemeanor Theft': { years: 1 } },
  'Nevada': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 4 }, 'Property Damage': { years: 3 }, 'Medical Malpractice': { years: 1 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 1 } },
  'New Hampshire': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 3 }, 'Breach of Oral Contract': { years: 3 }, 'Property Damage': { years: 3 }, 'Medical Malpractice': { years: 3 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 1 } },
  'New Jersey': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 6 }, 'Property Damage': { years: 6 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 6 }, 'Misdemeanor Theft': { years: 1 } },
  'New Mexico': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 4 }, 'Property Damage': { years: 4 }, 'Medical Malpractice': { years: 3 }, 'Fraud': { years: 4 }, 'Misdemeanor Theft': { years: 1 } },
  'New York': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 6 }, 'Property Damage': { years: 3 }, 'Medical Malpractice': { years: 2, months: 6 }, 'Fraud': { years: 6 }, 'Misdemeanor Theft': { years: 2 } },
  'North Carolina': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 3 }, 'Breach of Oral Contract': { years: 3 }, 'Property Damage': { years: 3 }, 'Medical Malpractice': { years: 3 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 2 } },
  'North Dakota': { 'Personal Injury': { years: 6 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 6 }, 'Property Damage': { years: 6 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 6 }, 'Misdemeanor Theft': { years: 2 } },
  'Ohio': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 8 }, 'Breach of Oral Contract': { years: 6 }, 'Property Damage': { years: 4 }, 'Medical Malpractice': { years: 1 }, 'Fraud': { years: 4 }, 'Misdemeanor Theft': { years: 2 } },
  'Oklahoma': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 5 }, 'Breach of Oral Contract': { years: 3 }, 'Property Damage': { years: 2 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 2 }, 'Misdemeanor Theft': { years: 3 } },
  'Oregon': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 6 }, 'Property Damage': { years: 6 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 2 }, 'Misdemeanor Theft': { years: 2 } },
  'Pennsylvania': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 4 }, 'Breach of Oral Contract': { years: 4 }, 'Property Damage': { years: 2 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 2 }, 'Misdemeanor Theft': { years: 2 } },
  'Rhode Island': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 10 }, 'Breach of Oral Contract': { years: 10 }, 'Property Damage': { years: 10 }, 'Medical Malpractice': { years: 3 }, 'Fraud': { years: 10 }, 'Misdemeanor Theft': { years: 3 } },
  'South Carolina': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 3 }, 'Breach of Oral Contract': { years: 3 }, 'Property Damage': { years: 3 }, 'Medical Malpractice': { years: 3 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 3 } },
  'South Dakota': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 6 }, 'Property Damage': { years: 6 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 6 }, 'Misdemeanor Theft': { years: 7 } },
  'Tennessee': { 'Personal Injury': { years: 1 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 6 }, 'Property Damage': { years: 3 }, 'Medical Malpractice': { years: 1 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 1 } },
  'Texas': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 4 }, 'Breach of Oral Contract': { years: 4 }, 'Property Damage': { years: 2 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 4 }, 'Misdemeanor Theft': { years: 2 } },
  'Utah': { 'Personal Injury': { years: 4 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 4 }, 'Property Damage': { years: 3 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 2 } },
  'Vermont': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 6 }, 'Property Damage': { years: 3 }, 'Medical Malpractice': { years: 3 }, 'Fraud': { years: 6 }, 'Misdemeanor Theft': { years: 3 } },
  'Virginia': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 5 }, 'Breach of Oral Contract': { years: 3 }, 'Property Damage': { years: 5 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 2 }, 'Misdemeanor Theft': { years: 1 } },
  'Washington': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 3 }, 'Property Damage': { years: 3 }, 'Medical Malpractice': { years: 3 }, 'Fraud': { years: 3 }, 'Misdemeanor Theft': { years: 2 } },
  'West Virginia': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 10 }, 'Breach of Oral Contract': { years: 5 }, 'Property Damage': { years: 2 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 2 }, 'Misdemeanor Theft': { years: 1 } },
  'Wisconsin': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 6 }, 'Breach of Oral Contract': { years: 6 }, 'Property Damage': { years: 6 }, 'Medical Malpractice': { years: 3 }, 'Fraud': { years: 6 }, 'Misdemeanor Theft': { years: 3 } },
  'Wyoming': { 'Personal Injury': { years: 4 }, 'Breach of Written Contract': { years: 10 }, 'Breach of Oral Contract': { years: 8 }, 'Property Damage': { years: 4 }, 'Medical Malpractice': { years: 2 }, 'Fraud': { years: 4 }, 'Misdemeanor Theft': { years: 1 } },
};

const formSchema = z.object({
  state: z.string().min(1, 'Please select a state.'),
  claimType: z.string().min(1, 'Please select a claim type.'),
  incidentDateDay: z.string().min(1, 'Day is required.'),
  incidentDateMonth: z.string().min(1, 'Month is required.'),
  incidentDateYear: z.string().min(1, 'Year is required.'),
}).refine(data => {
    const { incidentDateYear, incidentDateMonth, incidentDateDay } = data;
    const date = new Date(parseInt(incidentDateYear), parseInt(incidentDateMonth) - 1, parseInt(incidentDateDay));
    return isValid(date) && date.getFullYear() === parseInt(incidentDateYear) && date.getMonth() === parseInt(incidentDateMonth) - 1 && date.getDate() === parseInt(incidentDateDay);
}, {
    message: "Incident date is not valid.",
    path: ["incidentDateYear"],
}).refine(data => {
    const { incidentDateYear, incidentDateMonth, incidentDateDay } = data;
    const date = new Date(parseInt(incidentDateYear), parseInt(incidentDateMonth) - 1, parseInt(incidentDateDay));
    return !isFuture(date);
}, {
    message: "Incident date cannot be in the future.",
    path: ["incidentDateYear"],
});


type FormData = z.infer<typeof formSchema>;

interface Result {
  deadline: Date;
  timePeriod: string;
}

export default function StatuteOfLimitationsCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: undefined,
      claimType: undefined,
      incidentDateDay: '',
      incidentDateMonth: '',
      incidentDateYear: '',
    },
  });
  
  const getIncidentDate = useCallback(() => {
    const { incidentDateYear, incidentDateMonth, incidentDateDay } = form.getValues();
    if (!incidentDateYear || !incidentDateMonth || !incidentDateDay) return null;
    return new Date(parseInt(incidentDateYear), parseInt(incidentDateMonth) - 1, parseInt(incidentDateDay));
  }, [form]);


  const availableClaimTypes = form.watch('state') ? Object.keys(statuteData[form.watch('state')]).sort() : [];

  function onSubmit(values: FormData) {
    const { state, claimType } = values;
    const incidentDate = getIncidentDate();

    if(!incidentDate) return;

    const statute = statuteData[state]?.[claimType];
    if (!statute) {
      // This should not happen with proper form validation
      return;
    }

    const deadline = addYears(addMonths(incidentDate, statute.months || 0), statute.years);
    const timePeriod = `${statute.years} year${statute.years > 1 ? 's' : ''}${statute.months ? ` and ${statute.months} month${statute.months > 1 ? 's' : ''}` : ''}`;
    
    setResult({ deadline, timePeriod });
  }

  function handleReset() {
    form.reset({
      state: undefined,
      claimType: undefined,
      incidentDateDay: '',
      incidentDateMonth: '',
      incidentDateYear: '',
    });
    setResult(null);
  }

  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Statute of Limitations Estimator</CardTitle>
        <CardDescription className="text-center">Select your state, claim type, and incident date.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="state" render={({ field }) => (
                <FormItem><FormLabel>State</FormLabel>
                  <Select onValueChange={(value) => { field.onChange(value); form.setValue('claimType', ''); }} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a state" /></SelectTrigger></FormControl>
                    <SelectContent>{Object.keys(statuteData).sort().map(state => (<SelectItem key={state} value={state}>{state}</SelectItem>))}</SelectContent>
                  </Select>
                <FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="claimType" render={({ field }) => (
                <FormItem><FormLabel>Claim Type (Sample)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!form.watch('state')}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a claim type" /></SelectTrigger></FormControl>
                    <SelectContent>{availableClaimTypes.map(claim => (<SelectItem key={claim} value={claim}>{claim}</SelectItem>))}</SelectContent>
                  </Select>
                <FormMessage /></FormItem>
              )} />
              <FormItem className="md:col-span-2 flex flex-col">
                <FormLabel>Date of Incident</FormLabel>
                  <div className="flex gap-2">
                    <FormField control={form.control} name="incidentDateDay" render={({ field }) => (<FormControl><Input placeholder="DD" {...field} aria-label="Incident Day"/></FormControl>)} />
                    <FormField control={form.control} name="incidentDateMonth" render={({ field }) => (<FormControl><Input placeholder="MM" {...field} aria-label="Incident Month"/></FormControl>)} />
                    <FormField control={form.control} name="incidentDateYear" render={({ field }) => (<FormControl><Input placeholder="YYYY" {...field} aria-label="Incident Year"/></FormControl>)} />
                </div>
                <FormMessage>{form.formState.errors.incidentDateYear?.message}</FormMessage>
              </FormItem>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full" aria-label="Estimate Deadline"><Scale className="mr-2 h-4 w-4"/>Estimate Deadline</Button>
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto" aria-label="Reset"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
              <ShareButton title="Statute of Limitations Calculator" text="Get a rough estimate for legal filing deadlines with this informational tool." url="/statute-of-limitations" />
            </div>
          </form>
        </Form>
        
        {result && (
          <div className="p-4 bg-muted rounded-lg text-center mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-foreground">Estimated Deadline</h3>
            <div className="p-4 border rounded-lg bg-background">
                <h4 className="font-semibold text-muted-foreground">The estimated deadline to file a claim is:</h4>
                <p className="text-3xl font-bold text-primary">{format(result.deadline, 'MMMM d, yyyy')}</p>
                <p className="text-sm text-muted-foreground">Based on an estimated time period of {result.timePeriod}.</p>
            </div>
            <Alert variant="destructive" className="text-left">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Disclaimer</AlertTitle>
                <AlertDescription>
                    This is a simplified estimate for educational purposes ONLY. It does not constitute legal advice. You must consult a qualified attorney.
                </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
