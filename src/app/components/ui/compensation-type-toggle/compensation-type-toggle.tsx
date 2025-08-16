import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { CompensationType } from '@/types/enums';
import clsx from 'clsx';
import { CalendarDays, Clock } from 'lucide-react';
import React from 'react'
import { twMerge } from 'tailwind-merge';

type Props = {
    value: any,
    onChange: any,
    className?: string
}

export default function CompensationTypeToggle({ value, onChange, className }: Props) {
    return (
        <ToggleGroup
            variant="outline"
            type="single"
            onValueChange={(value) => {
                console.log("Changing to: ", value);
                onChange(value);
            }}
            value={value}
            className={twMerge(clsx("", className))}
        >
            <ToggleGroupItem className="p-10" value={CompensationType.YEARLY} aria-label="Yearly compensation">
                <div className="flex flex-col items-center gap-2">
                    Yearly
                    <CalendarDays />
                </div>
            </ToggleGroupItem>
            <ToggleGroupItem className="p-10" value={CompensationType.HOURLY} aria-label="Hourly Compensation">
                <div className="flex flex-col items-center gap-2">
                    Hourly
                    <Clock />
                </div>
            </ToggleGroupItem>
        </ToggleGroup>
    )
}