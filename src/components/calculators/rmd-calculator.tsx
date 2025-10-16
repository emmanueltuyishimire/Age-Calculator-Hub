
"use client";

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RefreshCcw, DollarSign } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, CartesianGrid } from "recharts";
import { Switch } from '../ui/switch';
import { uniformLifetimeTable, jointLifeTable } from '@/lib/rmd-data';

const currentYear = new Date().getFullYear();

const formSchema = z.object({
  birthYear: z.coerce.number().min(1900, "Invalid year.").max(currentYear - 70),
  rmdYear: z.coerce.number().min(currentYear).max(currentYear + 50),
  accountBalance: z.coerce.number().min(1, "Balance must be positive."),
  isSpouseBeneficiary: z.boolean().default(false),
  spouseBirthYear: z.coerce.number().optional(),
  returnRate: z.coerce.number().min(0).max(20).optional(),
}).refine(data => {
  if (data.isSpouseBeneficiary && !data.spouseBirthYear) {
    return false;
  }
  return true;
}, {
  message: "Spouse birth year is required.",
  path: ["spouseBirthYear"],
});

type FormData = z.infer<typeof formSchema>;

interface ScheduleRow {
    year: number;
    age: number;
    distributionPeriod: number;
    rmd: number;
    endOfYearBalance: number;
}

interface Result {
  initialRmd: number;
  distributionPeriod: number;
  schedule: ScheduleRow[];
}

const currencySymbol = '$';

export default function RmdCalculator() {
  const [result, setResult] = useState<Result | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthYear: 1950,
      rmdYear: 2025,
      accountBalance: 200000,
      isSpouseBeneficiary: false,
      spouseBirthYear: undefined,
      returnRate: 5,
    },
  });

  const getDistributionPeriod = (ownerAge: number, isSpouse: boolean, spouseAge?: number): number => {
    if (isSpouse && spouseAge && ownerAge - spouseAge > 10) {
      // Use Joint Life Table
      const ageKey = `${Math.min(120, ownerAge)},${Math.min(120, spouseAge)}`;
      return jointLifeTable[ageKey as keyof typeof jointLifeTable] || 1.8;
    }
    // Use Uniform Lifetime Table
    return uniformLifetimeTable[ownerAge] || 1.8;
  };

  function onSubmit(values: FormData) {
    const { birthYear, rmdYear, accountBalance, isSpouseBeneficiary, spouseBirthYear, returnRate } = values;

    const ownerAge = rmdYear - birthYear;
    const spouseAge = spouseBirthYear ? rmdYear - spouseBirthYear : undefined;

    const distributionPeriod = getDistributionPeriod(ownerAge, isSpouseBeneficiary, spouseAge);
    const initialRmd = accountBalance / distributionPeriod;
    
    const schedule: ScheduleRow[] = [];
    let currentBalance = accountBalance;
    const r = (returnRate || 0) / 100;

    for (let i = 0; i < 46; i++) {
        const year = rmdYear + i;
        const age = ownerAge + i;
        if (age > 120) break;
        
        const currentSpouseAge = spouseAge ? spouseAge + i : undefined;
        const dp = getDistributionPeriod(age, isSpouseBeneficiary, currentSpouseAge);
        const rmd = currentBalance / dp;
        
        currentBalance -= rmd;
        currentBalance *= (1 + r);
        
        schedule.push({
            year,
            age,
            distributionPeriod: dp,
            rmd,
            endOfYearBalance: currentBalance,
        });
    }

    setResult({ initialRmd, distributionPeriod, schedule });
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="birthYear" render={({ field }) => (<FormItem><FormLabel>Your Year of Birth</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage/></FormItem>)} />
                    <FormField control={form.control} name="rmdYear" render={({ field }) => (<FormItem><FormLabel>Year of RMD</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage/></FormItem>)} />
                  </div>
                  <FormField control={form.control} name="accountBalance" render={({ field }) => (<FormItem><FormLabel>Account Balance (as of Dec 31, {form.watch('rmdYear') - 1})</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage/></FormItem>)} />
                  <FormField control={form.control} name="isSpouseBeneficiary" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"><div className="space-y-0.5"><FormLabel>Is spouse the primary beneficiary &gt;10 years younger?</FormLabel></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>)} />
                  {form.watch('isSpouseBeneficiary') && <FormField control={form.control} name="spouseBirthYear" render={({ field }) => (<FormItem><FormLabel>Spouse's Year of Birth</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage/></FormItem>)} />}
                  <FormField control={form.control} name="returnRate" render={({ field }) => (<FormItem><FormLabel>Estimated Rate of Return (%)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage/></FormItem>)} />
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <Button type="submit" className="w-full"><DollarSign className="mr-2 h-4 w-4"/>Calculate</Button>
                      <Button onClick={() => {form.reset(); setResult(null)}} type="button" variant="outline" className="w-full sm:w-auto"><RefreshCcw className="mr-2 h-4 w-4"/> Reset</Button>
                  </div>
              </form>
              </Form>
            </div>
            
            <div className="flex flex-col space-y-4">
                {result ? (
                <div className="space-y-4 animate-fade-in">
                    <div className="p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-semibold text-muted-foreground">Your RMD for {form.watch('rmdYear')}</h3>
                        <p className="text-4xl font-bold text-primary">{currencySymbol}{result.initialRmd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className="text-xs text-muted-foreground">Based on a distribution period of {result.distributionPeriod} years.</p>
                    </div>
                </div>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted rounded-lg p-8">
                        <div className="text-center"><DollarSign className="mx-auto h-12 w-12 text-muted-foreground" /><p className="mt-4 text-muted-foreground">Your RMD results will appear here.</p></div>
                    </div>
                )}
            </div>
        </div>
        {result && (
             <div className="mt-8">
                <h3 className="text-lg font-bold text-center mb-4">Projected Account Balance and RMDs</h3>
                <div className="h-[350px]">
                    <ChartContainer config={{}} className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={result.schedule}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="age" tickFormatter={(val) => `Age ${val}`} />
                                <YAxis yAxisId="left" tickFormatter={(val) => `${currencySymbol}${val/1000}k`} />
                                <YAxis yAxisId="right" orientation="right" tickFormatter={(val) => `${currencySymbol}${val/1000}k`} />
                                <Tooltip content={<ChartTooltipContent formatter={(value, name) => `${currencySymbol}${Number(value).toFixed(0)}`} />} />
                                <Legend />
                                <Bar yAxisId="left" dataKey="endOfYearBalance" fill="hsl(var(--chart-1))" name="Balance" radius={[4, 4, 0, 0]} />
                                <Bar yAxisId="right" dataKey="rmd" fill="hsl(var(--chart-2))" name="RMD" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
                <div className="h-[400px] overflow-y-auto border rounded-md mt-4">
                <Table>
                    <TableHeader className="sticky top-0 bg-secondary">
                        <TableRow>
                            <TableHead>Year</TableHead>
                            <TableHead>Your Age</TableHead>
                            <TableHead>Distribution Period</TableHead>
                            <TableHead>RMD</TableHead>
                            <TableHead>End of Year Balance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {result.schedule.map((row) => (
                            <TableRow key={row.year}>
                                <TableCell>{row.year}</TableCell>
                                <TableCell>{row.age}</TableCell>
                                <TableCell>{row.distributionPeriod}</TableCell>
                                <TableCell>{currencySymbol}{row.rmd.toFixed(2)}</TableCell>
                                <TableCell>{currencySymbol}{row.endOfYearBalance.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
