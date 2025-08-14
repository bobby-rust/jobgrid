import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import states from "states-us";
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type Props = {

    onValueChange: any,
    defaultValue?: any
    className?: string
}

export const StateDropdown = ({ onValueChange, defaultValue, className }: Props) => {
    return (
        <div>
            <Select onValueChange={onValueChange} defaultValue={defaultValue ?? undefined} >
                <SelectTrigger className={twMerge(clsx("w-full", className))}>
                    <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent side="bottom" avoidCollisions={false}>
                    {states.map(({ abbreviation, name }) => {
                        return <SelectItem key={abbreviation} value={name}>
                            <div className="flex items-center gap-2">
                                {name}
                            </div>
                        </SelectItem>
                    })}
                </SelectContent>
            </Select>
        </div>
    )
}