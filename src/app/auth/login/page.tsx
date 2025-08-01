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
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useLogin } from "@/lib/auth";
import { paths } from "@/config/paths";

const loginFormSchema = z.object({
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

export default function Login({ }: Props) {
    const router = useRouter();
    const login = useLogin({
        onSuccess: () => {
            router.replace(paths.home.getHref())
        }
    })
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    function onSubmit(values: z.infer<typeof loginFormSchema>) {
        console.log(values);
        login.mutate(values);
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
                    <Button variant="default" type="submit">Login</Button>
                    <span className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href="/auth/register" className="text-foreground hover:underline">Sign up</Link>
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