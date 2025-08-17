import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Spinner } from '@/app/components/ui/spinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Loading from './loading';

const NewJobLayout = ({ children }: { children: ReactNode }) => {
    const title = "Track New Application"


    return (
        <Suspense
            fallback={
                <div className="flex size-full items-center justify-center">
                    <Loading />
                </div>
            }
        >
            <ErrorBoundary fallback={<div>Something went wrong!</div>}>
                <div className="flex flex-col justify-center items-center min-h-[90vh] gap-16 w-full pl-20">
                    {children}
                </div>
            </ErrorBoundary>
        </Suspense>
    );
};

export default NewJobLayout;