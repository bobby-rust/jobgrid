import React from 'react'
import codes from "currency-codes";
import { CircleFlag } from "react-circle-flags";
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
                    {/* {Object.entries(countries).map(([code, country]: [string, ICountry]) => {
                        return <SelectItem key={code} value={country.name}>
                            <div className="flex items-center gap-2">
                                <CircleFlag countryCode={code.toLowerCase()} style={{ width: 20, height: 20 }} />
                                {country.name}
                            </div>
                        </SelectItem>
                    })} */}
                </SelectContent>
            </Select>
        </div>
    )
}