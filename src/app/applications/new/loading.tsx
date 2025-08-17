import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-[90vh] gap-16 w-full pl-20">
            <div className="space-y-8 w-full">
                <div className="flex gap-5">
                    <div className="min-w-[40%]">
                        <div className="pb-5">
                            <h3 className="text-lg font-medium">Job Information</h3>
                            <p className="text-sm text-muted-foreground">Basic details about the position</p>
                        </div>
                        <div className="flex gap-5 flex-col lg:flex-row">
                            <Skeleton className="h-28 w-xs" />
                            <Skeleton className="h-28 w-xs" />
                        </div>
                    </div>

                    <Separator orientation="vertical" />

                    <div className="min-w-[40%]">
                        <div className="pb-5">
                            <h3 className="text-lg font-medium">Employment Details</h3>
                            <p className="text-sm text-muted-foreground">Type of employment and work arrangement</p>
                        </div>
                        <div className="flex gap-5 flex-col lg:flex-row">
                            <Skeleton className="h-28 w-xs" />
                            <Skeleton className="h-28 w-xs" />

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
                                <Skeleton className="h-9 w-xs" />
                                <Skeleton className="h-9 w-xs" />
                            </div>
                            <div className="pt-5">
                                <Skeleton className="h-9 w-xs" />
                            </div>
                        </div>

                    </div>
                    <Separator orientation="vertical" />
                    <div className="min-w-1/2 max-w-1/2 flex flex-col gap-5">
                        <div>
                            <h3 className="text-lg font-medium">Application Details</h3>
                            <p className="text-sm text-muted-foreground">When you applied and additional information</p>
                        </div>
                        <div className="flex gap-5">
                            <Skeleton className="h-9 w-64" />
                            <Skeleton className="h-9 w-64" />
                            <Skeleton className="h-9 w-64" />
                        </div>


                        <Skeleton className="h-16 w-lg" />
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
                            <Skeleton className="h-9 w-64" />
                        </div>
                        <div className="flex gap-5">
                            <Skeleton className="h-9 w-64" />
                            <Skeleton className="h-28 w-64" />
                        </div>
                    </div>
                </div>
                <Button variant="default" type="submit">Submit</Button>
            </div >
        </div>
    );
}