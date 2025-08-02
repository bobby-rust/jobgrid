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
import { Separator } from "@/components/ui/separator";
import { useRegister } from "@/lib/auth";
import { paths } from "@/config/paths";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

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
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const register = useRegister({
        onSuccess: () => router.replace(decodeURIComponent(paths.auth.login.getHref()))
    });

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    function onSubmit(values: z.infer<typeof registerFormSchema>) {
        console.log(values);
        register.mutate(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>

                                <Input startIcon={Mail} endIcon={null} placeholder="Email" type="email" {...field} />
                            </FormControl>
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
                                <Input startIcon={Lock} endIcon={showPassword ? Eye : EyeOff} endIconOnClick={() => setShowPassword(!showPassword)} placeholder="Password" type={`${showPassword ? "text" : "password"}`} {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex flex-col text-center gap-3">
                    <Button variant="default" type="submit">Register</Button>
                    <span className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-foreground hover:underline">Sign in</Link>
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <Separator className="flex-1" />
                    <span className="text-muted-foreground uppercase">or</span>
                    <Separator className="flex-1" />
                </div>
                {/* Google Button */}
                <Button variant="outline" className="w-full">
                    Continue with Google
                </Button>
            </form>
        </Form>
    );
}