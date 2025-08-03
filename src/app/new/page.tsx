"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import Link from "next/link";
import { useState } from "react";
import { paths } from "@/config/paths";
import { CountryDropdown } from "@/components/ui/country-dropdown";

const newApplicationFormSchema = z.object({
    company_name: z.string().min(1, {
        error: "Company name must not be empty"
    }).max(50, {
        error: "Company name be longer than 50 characters"
    }),
    location: z.object({
        city: z.string().min(1, { error: "City must not be empty" }),
        state: z.string().min(1, { error: "State must not be empty" }),
        country: z.string().min(1, { error: "Country must not be empty" })
    })
});


type Props = {}

export default function NewApplication({ }: Props) {
    const router = useRouter();

    const form = useForm<z.infer<typeof newApplicationFormSchema>>({
        resolver: zodResolver(newApplicationFormSchema),
        defaultValues: {
            company_name: "",
            location: {
                city: "",
                state: "",
                country: ""
            }
        }
    })

    function onSubmit(values: z.infer<typeof newApplicationFormSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                                <Input startIcon={null} endIcon={null} placeholder="Company Name" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* City Field */}
                <FormField
                    control={form.control}
                    name="location.city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="City" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* State Field */}
                <FormField
                    control={form.control}
                    name="location.state"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input placeholder="State" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location.country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <CountryDropdown
                                placeholder="Country"
                                {...field}
                            />
                        </FormItem>
                    )}

                />


                <Button variant="default" type="submit">Login</Button>
            </form>
        </Form >
    );
}