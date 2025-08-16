import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Spinner } from '@/app/components/ui/spinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const NewJobLayout = ({ children }: { children: ReactNode }) => {
    const title = "Track New Application"

    return (
        <Suspense
            fallback={
                <div className="flex size-full items-center justify-center">
                    <Spinner size="xl" />
                </div>
            }
        >
            <ErrorBoundary fallback={<div>Something went wrong!</div>}>
                <div className="flex flex-col justify-center items-center min-h-[90vh] gap-16 w-full py-10">
                    <Card className="w-[80%]">
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>Track your job applications with detailed information about the role and company.</CardDescription>
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

export default NewJobLayout;