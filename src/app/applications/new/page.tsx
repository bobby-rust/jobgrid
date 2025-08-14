"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/app/components/ui/input";
import { useRouter } from "next/navigation";
import { CountryDropdown } from "@/app/components/ui/country-dropdown";
import { StateDropdown } from "@/app/components/ui/state-dropdown";
import { DatePicker } from "@/app/components/ui/date-picker";
import { toast } from "sonner";
import CompensationTypeToggle from "@/app/components/ui/compensation-type-toggle/compensation-type-toggle";
import { CurrencyDropdown } from "@/app/components/ui/currency-dropdown";
import { Textarea } from "@/components/ui/textarea";

const newApplicationFormSchema = z.object({
    company_details: z.object({
        company_name: z.string().min(1, {
            error: "Company name must not be empty"
        }).max(50, {
            error: "Company name cannot be longer than 50 characters"
        }),
        job_title: z.string().min(1, { error: "Job Title must not be empty" }).max(50, {
            error: "Job title cannot be longer than 50 characters"
        })
    }),

    location: z.object({
        city: z.string().min(1, { error: "City must not be empty" }),
        state: z.string().optional(),
        country: z.string().min(1, { error: "Country must not be empty" })
    }),
    compensation: z.object({
        currency: z.string(),
        type: z.enum(["yearly", "hourly"], {
            error: "Select a compensation type"
        }),
        amount: z.number().min(0, { error: "Please enter a non-negative compensation amount" })
    }),
    appliedOn: z.date(),
    notes: z.string().max(200, { error: "Notes cannot be longer than 200 characters" })
});


type Props = {}

export default function NewApplication({ }: Props) {
    const router = useRouter();
    const form = useForm<z.infer<typeof newApplicationFormSchema>>({
        resolver: zodResolver(newApplicationFormSchema),
        defaultValues: {
            company_details: {
                company_name: "Pied Piper",
                job_title: "Software Engineer"
            },
            location: {
                city: "Silicon Valley",
                state: "California",
                country: "United States"
            },
            compensation: {
                currency: "USD",
                type: "yearly",
                amount: 0
            },
            appliedOn: new Date(),
            notes: ""
        }
    })

    function onSubmit(values: z.infer<typeof newApplicationFormSchema>) {
        console.log(values);
    }

    function onError(errors: FieldErrors<z.infer<typeof newApplicationFormSchema>>) {
        console.error(errors);
        toast("Please fix the errors before submitting the form!");
    }

    const country = form.watch("location.country");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8 w-full">

                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ">Company Details</h2>
                <div className="flex gap-5">
                    <FormField
                        control={form.control}
                        name="company_details.company_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input startIcon={null} endIcon={null} placeholder="Company Name" className={`${form.formState.errors.company_details?.company_name && "border-red-400"}`} {...field} />
                                </FormControl>
                                {form.formState.errors.company_details?.company_name && (
                                    <p className="text-red-400">{form.formState.errors.company_details?.company_name.message}</p>
                                )}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="company_details.job_title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                    <Input startIcon={null} endIcon={null} placeholder="Job Title" className={`${form.formState.errors.company_details?.job_title && "border-red-400"}`} {...field} />
                                </FormControl>
                                {form.formState.errors.company_details?.job_title && (
                                    <p className="text-red-400">{form.formState.errors.company_details?.job_title.message}</p>
                                )}
                            </FormItem>
                        )}
                    />
                    <div>
                        {/* <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Location</h3> */}
                        <div className="flex gap-5">

                            {/* City Field */}
                            <FormField
                                control={form.control}
                                name="location.city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="City" className={`${form.formState.errors.location?.city && "border-red-400"}`} {...field} />
                                        </FormControl>
                                        {form.formState.errors.location?.city && (
                                            <p className="text-red-400">{form.formState.errors.location.city.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />

                            {country === "United States" &&
                                /* State Field */
                                <FormField
                                    control={form.control}
                                    name="location.state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <StateDropdown onValueChange={field.onChange} defaultValue={field.value} className={`${form.formState.errors.location?.state && "border-red-400"}`} />
                                            </FormControl>
                                            {form.formState.errors.location?.state && (
                                                <p className="text-red-400">{form.formState.errors.location?.state.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />}
                            <FormField
                                control={form.control}
                                name="location.country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <CountryDropdown onValueChange={field.onChange} defaultValue="United States" className={`${form.formState.errors.location?.country && "border-red-400"}`} />
                                        {form.formState.errors.location?.country && (
                                            <p className="text-red-400">{form.formState.errors.location?.country.message}</p>
                                        )}
                                    </FormItem>
                                )}

                            />
                        </div>
                    </div>
                </div>

                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ">Job Details</h2>
                <div className="flex gap-5">
                    <FormField
                        control={form.control}
                        name="appliedOn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Applied On</FormLabel>
                                <FormControl>
                                    <DatePicker value={field.value} onChange={field.onChange} className={form.formState.errors.appliedOn && "border-red-400"} />
                                </FormControl>
                                {form.formState.errors.appliedOn && (
                                    <p className="text-red-400">{form.formState.errors.appliedOn.message}</p>
                                )}
                            </FormItem>
                        )} />


                    <FormField
                        control={form.control}
                        name="compensation.type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Compensation Type</FormLabel>
                                <FormControl>
                                    <CompensationTypeToggle className={`${form.formState.errors.compensation?.type && "border-[1px] border-red-400"}`} {...field} />
                                </FormControl>
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="compensation.amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Compensation Amount</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Amount" className={`${form.formState.errors.compensation?.amount && "border-red-400"}`} value={field.value ?? ""} onChange={(e) => field.onChange(Number(e.target.value))} />
                                </FormControl>
                            </FormItem>
                        )} />
                    <FormField
                        control={form.control}
                        name="compensation.currency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Currency</FormLabel>
                                <FormControl>
                                    <CurrencyDropdown onValueChange={field.onChange} defaultValue={field.value} {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                </div>
                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Write some notes about the job. Or not. I'm not judging." {...field} />
                            </FormControl>
                        </FormItem>
                    )} />
                <Button variant="default" type="submit" onClick={() => onSubmit(form.getValues())}>Submit</Button>
            </form>
        </Form >
    );
}