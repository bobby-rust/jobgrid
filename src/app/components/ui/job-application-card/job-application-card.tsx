import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { JobApplication } from '@/types/api'
import React from 'react'

type Props = {
    job: JobApplication
}

export default function JobApplicationCard({ job }: Props) {
    return (
        <Card className="min-w-lg">
            <CardHeader>
                <CardTitle>{job.jobTitle}, {job.companyName}</CardTitle>
                <CardDescription>Applied on {job.appliedOn}</CardDescription>
                <CardAction><Button variant="link">Edit</Button></CardAction>
            </CardHeader>
            <CardContent>
                <div>
                    <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">{job.jobTitle}</h2>
                    <div className="flex flex-col">
                        <p>{job.applicationStatus}</p>
                        <div className="flex gap-2">
                            <p>{job.compensation.amount}</p>
                            <p>{job.compensation.currency}</p>
                            <p>{job.compensation.compensationType}</p>
                        </div>
                        <div className="flex gap-2">
                            <p>{job.location.city}, {job.location.state}, {job.location.country}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}