
"use client";

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Clock, Plus, Minus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, intervalToDuration, add, sub } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';


// --- Time Between Dates Calculator ---
const durationSchema = z.object({
  startDate: z.date({ required_error: 'Start date is required.' }),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
  endDate: z.date({ required_error: 'End date is required.' }),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
}).refine(data => {
    const startDateTime = new Date(`${format(data.startDate, 'yyyy-MM-dd')}T${data.startTime}`);
    const endDateTime = new Date(`${format(data.endDate, 'yyyy-MM-dd')}T${data.endTime}`);
    return endDateTime >= startDateTime;
}, {
  message: "End date and time must be after start date and time.",
  path: ["endDate"],
});
type DurationFormData = z.infer<typeof durationSchema>;

function DurationCalculator() {
    const [result, setResult] = useState<Duration | null>(null);
    const form = useForm<DurationFormData>({
        resolver: zodResolver(durationSchema),
        defaultValues: {
            startDate: new Date(),
            startTime: format(new Date(), 'HH:mm'),
            endDate: add(new Date(), { days: 10 }),
            endTime: format(new Date(), 'HH:mm'),
        },
    });

    function onSubmit(values: DurationFormData) {
        const start = new Date(`${format(values.startDate, 'yyyy-MM-dd')}T${values.startTime}`);
        const end = new Date(`${format(values.endDate, 'yyyy-MM-dd')}T${values.endTime}`);
        const duration = intervalToDuration({ start, end });
        setResult(duration);
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Time Between Dates</CardTitle>
                <CardDescription>Calculate the duration between two points in time.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                           <Label>Start Date & Time</Label>
                           <div className="flex gap-2">
                             <FormField control={form.control} name="startDate" render={({ field }) => (<FormItem className="flex-1"><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4 opacity-50" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>)} />
                             <FormField control={form.control} name="startTime" render={({ field }) => (<FormItem><FormControl><Input type="time" {...field} /></FormControl><FormMessage /></FormItem>)} />
                           </div>
                        </div>
                         <div className="space-y-2">
                           <Label>End Date & Time</Label>
                           <div className="flex gap-2">
                              <FormField control={form.control} name="endDate" render={({ field }) => (<FormItem className="flex-1"><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4 opacity-50" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>)} />
                             <FormField control={form.control} name="endTime" render={({ field }) => (<FormItem><FormControl><Input type="time" {...field} /></FormControl><FormMessage /></FormItem>)} />
                           </div>
                        </div>
                        <Button type="submit" className="w-full">Calculate Duration</Button>
                    </form>
                </Form>
                 {result && (
                    <div className="mt-4 p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-bold">Duration</h3>
                        <p className="text-2xl text-primary font-bold">
                            {result.years || 0}y {result.months || 0}m {result.days || 0}d {result.hours || 0}h {result.minutes || 0}min {result.seconds || 0}s
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// --- Add/Subtract Time Calculator ---
const addSubSchema = z.object({
  startDate: z.date({ required_error: 'Start date is required.' }),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  operation: z.enum(['add', 'subtract']),
  years: z.coerce.number().optional(),
  months: z.coerce.number().optional(),
  days: z.coerce.number().optional(),
  hours: z.coerce.number().optional(),
  minutes: z.coerce.number().optional(),
  seconds: z.coerce.number().optional(),
});
type AddSubFormData = z.infer<typeof addSubSchema>;

function AddSubtractCalculator() {
    const [result, setResult] = useState<Date | null>(null);
    const form = useForm<AddSubFormData>({
        resolver: zodResolver(addSubSchema),
        defaultValues: {
            startDate: new Date(),
            startTime: format(new Date(), 'HH:mm'),
            operation: 'add',
        },
    });

    function onSubmit(values: AddSubFormData) {
        const startDateTime = new Date(`${format(values.startDate, 'yyyy-MM-dd')}T${values.startTime}`);
        const duration = {
            years: values.years || 0,
            months: values.months || 0,
            days: values.days || 0,
            hours: values.hours || 0,
            minutes: values.minutes || 0,
            seconds: values.seconds || 0,
        };

        const finalDate = values.operation === 'add' ? add(startDateTime, duration) : sub(startDateTime, duration);
        setResult(finalDate);
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add or Subtract Time</CardTitle>
                <CardDescription>Calculate a future or past date by adding or subtracting time.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                           <Label>Start Date & Time</Label>
                           <div className="flex gap-2">
                               <FormField control={form.control} name="startDate" render={({ field }) => (<FormItem className="flex-1"><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4 opacity-50" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover></FormItem>)} />
                               <FormField control={form.control} name="startTime" render={({ field }) => (<FormItem><FormControl><Input type="time" {...field} /></FormControl></FormItem>)} />
                           </div>
                        </div>
                        <div className="flex justify-center">
                            <FormField control={form.control} name="operation" render={({ field }) => (
                                <Tabs defaultValue={field.value} onValueChange={field.onChange} className="w-[200px]">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="add"><Plus className="h-4 w-4 mr-1"/>Add</TabsTrigger>
                                        <TabsTrigger value="subtract"><Minus className="h-4 w-4 mr-1"/>Subtract</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            )} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                           <FormField control={form.control} name="years" render={({ field }) => (<FormItem><FormLabel>Years</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                           <FormField control={form.control} name="months" render={({ field }) => (<FormItem><FormLabel>Months</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                           <FormField control={form.control} name="days" render={({ field }) => (<FormItem><FormLabel>Days</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                           <FormField control={form.control} name="hours" render={({ field }) => (<FormItem><FormLabel>Hours</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                           <FormField control={form.control} name="minutes" render={({ field }) => (<FormItem><FormLabel>Minutes</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                           <FormField control={form.control} name="seconds" render={({ field }) => (<FormItem><FormLabel>Seconds</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>)} />
                        </div>
                        <Button type="submit" className="w-full">Calculate New Date</Button>
                    </form>
                </Form>
                {result && (
                     <div className="mt-4 p-4 bg-muted rounded-lg text-center">
                        <h3 className="text-lg font-bold">Resulting Date and Time</h3>
                        <p className="text-2xl text-primary font-bold">
                           {format(result, 'PPP p')}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default function TimeCalculator() {
    return (
        <Tabs defaultValue="duration" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="duration">Time Between Dates</TabsTrigger>
                <TabsTrigger value="addSub">Add/Subtract Time</TabsTrigger>
            </TabsList>
            <TabsContent value="duration" className="mt-4">
                <DurationCalculator />
            </TabsContent>
            <TabsContent value="addSub" className="mt-4">
                <AddSubtractCalculator />
            </TabsContent>
        </Tabs>
    );
}
