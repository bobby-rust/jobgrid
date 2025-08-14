import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import clsx from 'clsx';
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
            className={twMerge(clsx(className))}
        >
            <ToggleGroupItem value="yearly" aria-label="Yearly compensation">
                Yearly
            </ToggleGroupItem>
            <ToggleGroupItem value="hourly" aria-label="Hourly Compensation">
                Hourly
            </ToggleGroupItem>
        </ToggleGroup>
    )
}