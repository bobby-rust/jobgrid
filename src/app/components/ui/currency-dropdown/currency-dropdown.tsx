import React from 'react'
import codes from "currency-codes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type Props = {
    onValueChange: any,
    defaultValue: any,
    className?: string,
}

export const CurrencyDropdown = ({ onValueChange, defaultValue, className }: Props) => {
    console.log(codes.codes());
    return (
        <div>
            <Select onValueChange={onValueChange} defaultValue={defaultValue}>
                <SelectTrigger className={twMerge(clsx("w-full", className))}>
                    <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent side="bottom" avoidCollisions={false}>
                    {codes.codes().map((code) => {
                        return <SelectItem key={code} value={code}>{code}</SelectItem>
                    })}
                </SelectContent>
            </Select>
        </div>
    )
}