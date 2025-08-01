"use client";

import { ReactNode, Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Spinner } from '@/app/components/ui/spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePathname } from 'next/navigation';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const AuthLayout = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const user = useUser();
    const pathname = usePathname();
    const isLoginPage = pathname === paths.auth.login.getHref();
    const title = isLoginPage
        ? 'Log in to your account'
        : 'Register your account';

    useEffect(() => {
        if (user.data) {
            router.replace(decodeURIComponent(paths.home.getHref()))
        }
    }, [user.data, router])

    return (
        <Suspense
            fallback={
                <div className="flex size-full items-center justify-center">
                    <Spinner size="xl" />
                </div>
            }
        >
            <ErrorBoundary fallback={<div>Something went wrong!</div>}>
                <div className="flex flex-col justify-center items-center min-h-screen gap-16">
                    <h1 className="text-center text-6xl font-extrabold tracking-tight text-balance">
                        Welcome to JobGrid
                    </h1>
                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>

                        <CardContent>
                            {children}
                        </CardContent>
                    </Card>
                </div>
            </ErrorBoundary>
        </Suspense>
    );
};

export default AuthLayout;