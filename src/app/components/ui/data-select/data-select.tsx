import React, { JSX } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type Props = {
    data: string[],
    icons?: JSX.Element[],
    placeholder: string,
    onValueChange: any,
    defaultValue: any,
    className?: string,
}

export const DataSelect = ({ data, icons, placeholder, onValueChange, defaultValue, className }: Props) => {
    if (icons && icons.length !== data.length) {
        throw new Error("When passing icons to DataSelect, data length must equal icons length");
    }
    return (
        <div>
            <Select onValueChange={onValueChange} defaultValue={defaultValue}>
                <SelectTrigger className={twMerge(clsx("w-full", className))}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent side="bottom" avoidCollisions={false}>
                    {data.map((d, i) => {
                        return <SelectItem key={i} value={d}>{d}</SelectItem>
                    })}
                </SelectContent>
            </Select>
        </div>
    )
}