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
import { DatePicker } from "@/app/components/ui/date-picker";
import { toast } from "sonner";
import CompensationTypeToggle from "@/app/components/ui/compensation-type-toggle/compensation-type-toggle";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DataSelect } from "@/app/components/ui/data-select";
import { codes } from "currency-codes";
import states from "states-us";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/api-client";
import { ApplicationStatus, CompensationType, EmploymentType, WorkArrangement } from "@/types/enums";
import { useEffect } from "react";
import path from "path";
import { paths } from "@/config/paths";

const newApplicationFormSchema = z.object({
    companyName: z.string().min(1, {
        error: "Company name must not be empty"
    }).max(50, {
        error: "Company name cannot be longer than 50 characters"
    }),
    jobTitle: z.string().min(1, { error: "Job Title must not be empty" }).max(50, {
        error: "Job title cannot be longer than 50 characters"
    }),
    location: z.object({
        city: z.string().min(1, { error: "City must not be empty" }),
        state: z.string().optional(),
        country: z.string().min(1, { error: "Select a country" })
    }).optional(),
    employmentType: z.enum(EmploymentType, { error: "Select an employment type" }),
    workArrangement: z.enum(WorkArrangement, { error: "Select a work arrangement" }),
    compensation: z.object({
        currency: z.string().min(1, { error: "Select a currency" }),
        compensationType: z.enum(CompensationType, {
            error: "Select a compensation type"
        }),
        amount: z.number({ error: "Compensation amount is required" }).min(0, { error: "Please enter a non-negative compensation amount" })
    }),
    appliedOn: z.date(),
    notes: z.string().max(200, { error: "Notes cannot be longer than 200 characters" }),
    referral: z.boolean(),
    applicationStatus: z.enum(ApplicationStatus, { error: "Select an application status" })
});

const CURRENCIES = codes();
const STATES = states.map(state => state.name);

type Props = {}

export default function NewApplication({ }: Props) {
    const router = useRouter();
    const form = useForm<z.infer<typeof newApplicationFormSchema>>({
        resolver: zodResolver(newApplicationFormSchema),
        defaultValues: {
            companyName: "",
            jobTitle: "",
            employmentType: undefined,
            workArrangement: undefined,
            location: {
                city: "",
                state: "",
                country: ""
            },
            compensation: {
                currency: "",
                compensationType: undefined,
                amount: undefined
            },
            appliedOn: new Date(),
            notes: "",
            referral: false,
            applicationStatus: undefined
        }
    })

    async function onSubmit(values: z.infer<typeof newApplicationFormSchema>) {
        console.log(values);
        const response = await api.post("/job-applications", values);
        console.log(response);
    }

    function onError(errors: FieldErrors<z.infer<typeof newApplicationFormSchema>>) {
        console.error(errors);
        toast("Please fix the errors before submitting the form!");
    }

    function handleCancel(e: React.FormEvent) {
        e.preventDefault();
        router.push(paths.home.getHref());
    }

    const country = form.watch("location.country");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8 w-full">
                <div className="flex gap-5">
                    <div className="min-w-[40%]">
                        <div className="pb-5">
                            <h3 className="text-lg font-medium">Job Information</h3>
                            <p className="text-sm text-muted-foreground">Basic details about the position</p>
                        </div>
                        <div className="flex gap-5 flex-col lg:flex-row">
                            <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                startIcon={null}
                                                endIcon={null}
                                                placeholder="Enter company name"
                                                className={`${form.formState.errors.companyName && "border-red-400"}`}
                                                {...field} />
                                        </FormControl>
                                        <p className="p-error">{form.formState.errors.companyName?.message ?? ""}</p>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="jobTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                startIcon={null}
                                                endIcon={null}
                                                placeholder="Enter job title"
                                                className={`${form.formState.errors.jobTitle && "border-red-400"}`}
                                                {...field} />
                                        </FormControl>
                                        <p className="p-error">{form.formState.errors.jobTitle?.message ?? ""}</p>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Separator orientation="vertical" />

                    <div className="min-w-[40%]">
                        <div className="pb-5">
                            <h3 className="text-lg font-medium">Employment Details</h3>
                            <p className="text-sm text-muted-foreground">Type of employment and work arrangement</p>
                        </div>
                        <div className="flex gap-5 flex-col lg:flex-row">
                            <FormField
                                control={form.control}
                                name="employmentType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Employment Type</FormLabel>
                                        <FormControl>
                                            <DataSelect className={`${form.formState.errors.workArrangement && "border-red-400"}`} data={Object.values(EmploymentType) as string[]} placeholder="Select employment type" onValueChange={field.onChange} defaultValue={field.value} />
                                        </FormControl>
                                        <p className="p-error">{form.formState.errors.employmentType?.message ?? ""}</p>
                                    </FormItem>
                                )} />
                            <FormField
                                control={form.control}
                                name="workArrangement"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Work Arrangement</FormLabel>
                                        <FormControl>
                                            <DataSelect className={`${form.formState.errors.workArrangement && "border-red-400"}`} data={Object.values(WorkArrangement) as string[]} placeholder="Select work arrangement" onValueChange={field.onChange} defaultValue={field.value} />
                                        </FormControl>
                                        <p className="p-error">{form.formState.errors.workArrangement?.message ?? ""}</p>
                                    </FormItem>
                                )} />
                        </div>
                    </div>
                </div>
                <Separator />

                <div className="flex gap-5">
                    <div className="flex flex-col gap-5 min-w-[40%]">
                        <div className="w-full flex flex-col">
                            <div className="pb-5">
                                <h3 className="text-lg font-medium">Location</h3>
                                <p className="text-sm text-muted-foreground">Where is this position located? (Optional)</p>
                            </div>
                            <div className="flex gap-5 flex-col lg:flex-row">

                                {/* City Field */}
                                <FormField
                                    control={form.control}
                                    name="location.city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter city name"
                                                    className={`${form.formState.errors.location?.city && "border-red-400"}`}
                                                    {...field} />
                                            </FormControl>
                                            <p className="p-error">{form.formState.errors.location?.city?.message ?? ""}</p>
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
                                                    <DataSelect data={STATES} onValueChange={field.onChange} defaultValue={field.value} placeholder="State" />
                                                </FormControl>
                                                <p className="p-error">{form.formState.errors.location?.state?.message ?? ""}</p>
                                            </FormItem>
                                        )}
                                    />}


                            </div>
                            <div className="pt-5">
                                <FormField
                                    control={form.control}

                                    name="location.country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            <CountryDropdown
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className={`${form.formState.errors.location?.country && "border-red-400"}`} />
                                            <p className="p-error">{form.formState.errors.location?.country?.message ?? ""}</p>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        {/* <Separator orientation="vertical" /> */}

                    </div>
                    <Separator orientation="vertical" />
                    <div className="min-w-1/2 max-w-1/2 flex flex-col gap-5">
                        <div>
                            <h3 className="text-lg font-medium">Application Details</h3>
                            <p className="text-sm text-muted-foreground">When you applied and additional information</p>
                        </div>
                        <div className="flex gap-5">
                            <FormField
                                control={form.control}
                                name="appliedOn"
                                render={({ field }) => (
                                    <FormItem className="h-16 flex flex-col">
                                        <FormLabel>Applied On</FormLabel>
                                        <FormControl>
                                            <DatePicker value={field.value} onChange={field.onChange} />
                                        </FormControl>
                                        <p className="p-error">{form.formState.errors.appliedOn?.message ?? ""}</p>
                                    </FormItem>
                                )} />



                            <FormField
                                control={form.control}
                                name="applicationStatus"
                                render={({ field }) => (
                                    <FormItem className="h-16 flex flex-col">
                                        <FormLabel>Application Status</FormLabel>
                                        <FormControl>
                                            <DataSelect className={`${form.formState.errors.applicationStatus && "border-red-400"}`} data={Object.values(ApplicationStatus)} placeholder="Application Status" onValueChange={field.onChange} defaultValue={field.value} />
                                        </FormControl>
                                        <p className="p-error">{form.formState.errors.applicationStatus?.message ?? ""}</p>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="referral"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Referral</FormLabel>
                                        <FormControl>
                                            <Label
                                                htmlFor="referral"
                                                className="flex gap-2 items-center h-9 text-nowrap border-1 p-4 rounded-md cursor-pointer dark:bg-input/30 dark:hover:bg-input/50"
                                            >
                                                <Checkbox
                                                    id="referral"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    name={field.name}
                                                    ref={field.ref}
                                                    className="cursor-pointer"
                                                />
                                                <span>I got a referral for this position</span>
                                            </Label>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                        </div>

                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional Notes (optional)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Add any additional notes about this application..." {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                    </div>

                </div>
                <Separator />
                <div className="w-full">
                    <div className="pb-5">
                        <h3 className="text-lg font-medium">Compensation</h3>
                        <p className="text-sm text-muted-foreground">Salary or hourly rate information</p>
                    </div>
                    <div className="flex gap-5">
                        <div>
                            <FormField
                                control={form.control}
                                name="compensation.amount"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Enter compensation amount" className={`w-xs ${form.formState.errors.compensation?.amount && "border-red-400"}`} value={field.value ?? ""} onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <p className="p-error">{form.formState.errors.compensation?.amount?.message ?? ""}</p>
                                    </FormItem>
                                )} />
                        </div>
                        <div className="flex gap-5">
                            <FormField
                                control={form.control}
                                name="compensation.currency"
                                render={({ field }) => (
                                    <FormItem className="h-28 flex flex-col">
                                        <FormLabel>Currency</FormLabel>
                                        <FormControl>
                                            <DataSelect className={`${form.formState.errors.compensation?.currency && "border-red-400"}`} data={CURRENCIES} onValueChange={field.onChange} placeholder="Select a currency" defaultValue={field.value} />
                                        </FormControl>
                                        <p className="p-error">{form.formState.errors.compensation?.currency?.message ?? ""}</p>
                                    </FormItem>
                                )} />
                            <FormField
                                control={form.control}
                                name="compensation.compensationType"
                                render={({ field }) => (
                                    <FormItem className="h-28 flex flex-col">
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                            <CompensationTypeToggle isError={!!form.formState.errors.compensation?.compensationType} {...field} />
                                        </FormControl>
                                        <p className="p-error">{form.formState.errors.compensation?.compensationType?.message ?? ""}</p>
                                    </FormItem>
                                )} />
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="default" type="submit" size="xl">Save</Button>
                    <Button variant="secondary" onClick={handleCancel} size="xl">Cancel</Button>
                </div>
            </form >
        </Form >
    );
}