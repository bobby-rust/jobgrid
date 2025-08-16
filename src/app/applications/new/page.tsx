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
        country: z.string().min(1, { error: "Country must not be empty" })
    }).optional(),
    employmentType: z.enum(EmploymentType),
    workArrangement: z.enum(WorkArrangement),
    compensation: z.object({
        currency: z.string(),
        compensationType: z.enum(CompensationType, {
            error: "Select a compensation type"
        }),
        amount: z.number().min(0, { error: "Please enter a non-negative compensation amount" })
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
            companyName: "Pied Piper",
            jobTitle: "Software Engineer",
            employmentType: EmploymentType.FULL_TIME,
            workArrangement: WorkArrangement.ON_SITE,
            location: {
                city: "Silicon Valley",
                state: "California",
                country: "United States"
            },
            compensation: {
                currency: "USD",
                compensationType: CompensationType.YEARLY,
                amount: 0
            },
            appliedOn: new Date(),
            notes: "",
            referral: false,
            applicationStatus: ApplicationStatus.APPLIED
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

    const country = form.watch("location.country");

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8 w-full">
                <div className="flex gap-5">
                    <div className="w-1/2">
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
                                                placeholder="Company Name"
                                                className={`${form.formState.errors.companyName && "border-red-400"}`}
                                                {...field} />
                                        </FormControl>
                                        {form.formState.errors.companyName && (
                                            <p className="text-red-400">{form.formState.errors.companyName.message}</p>
                                        )}
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
                                                placeholder="Job Title"
                                                className={`${form.formState.errors.jobTitle && "border-red-400"}`}
                                                {...field} />
                                        </FormControl>
                                        {form.formState.errors.jobTitle && (
                                            <p className="text-red-400">{form.formState.errors.jobTitle.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Separator orientation="vertical" />

                    <div className="w-1/2">
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
                                            <DataSelect data={Object.values(EmploymentType) as string[]} placeholder="Employment Type" onValueChange={field.onChange} defaultValue={field.value} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                            <FormField
                                control={form.control}
                                name="workArrangement"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Work Arrangement</FormLabel>
                                        <FormControl>
                                            <DataSelect data={Object.values(WorkArrangement) as string[]} placeholder="Work Arrangement" onValueChange={field.onChange} defaultValue={field.value} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="flex gap-5">
                    <div className="w-1/2">
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
                                                placeholder="City"
                                                className={`${form.formState.errors.location?.city && "border-red-400"}`}
                                                {...field} />
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
                                                <DataSelect data={STATES} onValueChange={field.onChange} defaultValue={field.value} placeholder="State" />
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
                                        <CountryDropdown
                                            onValueChange={field.onChange}
                                            defaultValue="United States"
                                            className={`${form.formState.errors.location?.country && "border-red-400"}`} />
                                        {form.formState.errors.location?.country && (
                                            <p className="text-red-400">{form.formState.errors.location?.country.message}</p>
                                        )}
                                    </FormItem>
                                )}

                            />
                        </div>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="w-1/2">
                        <div className="pb-5">
                            <h3 className="text-lg font-medium">Compensation</h3>
                            <p className="text-sm text-muted-foreground">Salary or hourly rate information</p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="compensation.amount"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Amount</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Amount" className={`w-xs ${form.formState.errors.compensation?.amount && "border-red-400"}`} value={field.value ?? ""} onChange={(e) => field.onChange(Number(e.target.value))} />
                                            </FormControl>
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
                                                <DataSelect data={CURRENCIES} onValueChange={field.onChange} placeholder="Currency" defaultValue={field.value} />
                                            </FormControl>
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="compensation.compensationType"
                                    render={({ field }) => (
                                        <FormItem className="h-28 flex flex-col">
                                            <FormLabel>Type</FormLabel>
                                            <FormControl>
                                                <CompensationTypeToggle className={`${form.formState.errors.compensation?.type && "border-[1px] border-red-400"}`} {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )} />
                            </div>
                        </div>
                    </div>
                </div>
                <Separator />
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
                                    <DatePicker value={field.value} onChange={field.onChange} className={`${form.formState.errors.appliedOn && "border-red-400"}`} />
                                </FormControl>
                                {form.formState.errors.appliedOn && (
                                    <p className="text-red-400">{form.formState.errors.appliedOn.message}</p>
                                )}
                            </FormItem>
                        )} />



                    <FormField
                        control={form.control}
                        name="applicationStatus"
                        render={({ field }) => (
                            <FormItem className="h-16 flex flex-col">
                                <FormLabel>Application Status</FormLabel>
                                <FormControl>
                                    <DataSelect data={Object.values(ApplicationStatus)} placeholder="Application Status" onValueChange={field.onChange} defaultValue={field.value} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="referral"
                        render={({ field }) => (
                            <FormItem className="flex flex-col h-16">
                                <FormLabel>Referral</FormLabel>
                                <FormControl>
                                    <div className="flex gap-2 items-center">
                                        <Checkbox
                                            id="referral"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}
                                        />
                                        <Label htmlFor="referral">
                                            I got a referral for this position
                                        </Label>
                                    </div>
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
                <Button variant="default" type="submit">Submit</Button>
            </form >
        </Form >
    );
}