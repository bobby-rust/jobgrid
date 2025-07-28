"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const registerFormSchema = z.object({
    email: z.email().min(2, {
        error: "Email must be at least 2 characters"
    }).max(50, {
        error: "Email cannot be longer than 50 characters"
    }),
    password: z.string().min(6, {
        error: "Password must be at least 6 characters"
    }).max(50, {
        error: "Password cannot be longer than 50 characters"
    })
});


type Props = {}

export default function Register({ }: Props) {

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    function onSubmit(values: z.infer<typeof registerFormSchema>) {
        console.log(values);
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col max-w-3xl justify-center items-center">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Register</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Email" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is the email address that will be associated with your account
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Password" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is the password you will use to login.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Submit</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}