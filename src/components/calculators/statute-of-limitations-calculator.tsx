
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
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
import { RefreshCcw, Scale, AlertCircle, CalendarIcon } from 'lucide-react';
import ShareButton from '../share-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';

// IMPORTANT: This is sample data for demonstration purposes only.
// It is NOT a comprehensive or legally accurate list and is subject to change.
const statuteData: Record<string, Record<string, { years: number, months?: number }>> = {
  'Alabama': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 2 } },
  'Alaska': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 3 }, 'Property Damage': { years: 2 } },
  'Arizona': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 2 } },
  'Arkansas': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 5 }, 'Property Damage': { years: 3 } },
  'California': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 4 }, 'Property Damage': { years: 3 } },
  'Colorado': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 3 }, 'Property Damage': { years: 2 } },
  'Connecticut': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 2 } },
  'Delaware': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 3 }, 'Property Damage': { years: 2 } },
  'Florida': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 5 }, 'Property Damage': { years: 4 } },
  'Georgia': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 4 } },
  'Hawaii': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 2 } },
  'Idaho': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 5 }, 'Property Damage': { years: 3 } },
  'Illinois': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 10 }, 'Property Damage': { years: 5 } },
  'Indiana': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 2 } },
  'Iowa': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 10 }, 'Property Damage': { years: 5 } },
  'Kansas': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 5 }, 'Property Damage': { years: 2 } },
  'Kentucky': { 'Personal Injury': { years: 1 }, 'Breach of Written Contract': { years: 10 }, 'Property Damage': { years: 2 } },
  'Louisiana': { 'Personal Injury': { years: 1 }, 'Breach of Written Contract': { years: 10 }, 'Property Damage': { years: 1 } },
  'Maine': { 'Personal Injury': { years: 6 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 6 } },
  'Maryland': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 3 }, 'Property Damage': { years: 3 } },
  'Massachusetts': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 3 } },
  'Michigan': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 3 } },
  'Minnesota': { 'Personal Injury': { years: 6 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 6 } },
  'Mississippi': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 3 }, 'Property Damage': { years: 3 } },
  'Missouri': { 'Personal Injury': { years: 5 }, 'Breach of Written Contract': { years: 10 }, 'Property Damage': { years: 5 } },
  'Montana': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 8 }, 'Property Damage': { years: 2 } },
  'Nebraska': { 'Personal Injury': { years: 4 }, 'Breach of Written Contract': { years: 5 }, 'Property Damage': { years: 4 } },
  'Nevada': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 3 } },
  'New Hampshire': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 3 }, 'Property Damage': { years: 3 } },
  'New Jersey': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 6 } },
  'New Mexico': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 4 } },
  'New York': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 3 } },
  'North Carolina': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 3 }, 'Property Damage': { years: 3 } },
  'North Dakota': { 'Personal Injury': { years: 6 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 6 } },
  'Ohio': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 8 }, 'Property Damage': { years: 4 } },
  'Oklahoma': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 5 }, 'Property Damage': { years: 2 } },
  'Oregon': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 6 } },
  'Pennsylvania': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 4 }, 'Property Damage': { years: 2 } },
  'Rhode Island': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 10 }, 'Property Damage': { years: 10 } },
  'South Carolina': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 3 }, 'Property Damage': { years: 3 } },
  'South Dakota': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 6 } },
  'Tennessee': { 'Personal Injury': { years: 1 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 3 } },
  'Texas': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 4 }, 'Property Damage': { years: 2 } },
  'Utah': { 'Personal Injury': { years: 4 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 3 } },
  'Vermont': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 3 } },
  'Virginia': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 5 }, 'Property Damage': { years: 5 } },
  'Washington': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 3 } },
  'West Virginia': { 'Personal Injury': { years: 2 }, 'Breach of Written Contract': { years: 10 }, 'Property Damage': { years: 2 } },
  'Wisconsin': { 'Personal Injury': { years: 3 }, 'Breach of Written Contract': { years: 6 }, 'Property Damage': { years: 6 } },
  'Wyoming': { 'Personal Injury': { years: 4 }, 'Breach of Written Contract': { years: 10 }, 'Property Damage': { years: 4 } },
};

const formSchema = z.object({
  state: z.string().min(1, 'Please select a state.'),
  claimType: z.string().min(1, 'Please select a claim type.'),
  incidentDate: z.date({ required_error: 'Please enter the date of the incident.' }),
}).refine(data => !isFuture(data.incidentDate), {
    message: "Incident date cannot be in the future.",
    path: ["incidentDate"],
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
      incidentDate: undefined,
    },
  });

  const availableClaimTypes = form.watch('state') ? Object.keys(statuteData[form.watch('state')]) : [];

  function onSubmit(values: FormData) {
    const { state, claimType, incidentDate } = values;

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
      incidentDate: undefined,
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
              <FormField control={form.control} name="incidentDate" render={({ field }) => (
                <FormItem className="md:col-span-2 flex flex-col"><FormLabel>Date of Incident</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button variant={"outline"} className={cn("pl-3 text-left font-normal",!field.value && "text-muted-foreground")}>
                                    {field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                        </PopoverContent>
                    </Popover>
                <FormMessage /></FormItem>
              )} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button type="submit" className="w-full"><Scale className="mr-2 h-4 w-4"/>Estimate Deadline</Button>
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
