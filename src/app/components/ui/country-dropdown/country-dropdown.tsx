import React from 'react'
import { countries } from "countries-list";
import type { ICountry } from 'countries-list';
import { CircleFlag } from "react-circle-flags";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type Props = {
    onValueChange: any,
    defaultValue: any,
    className?: string,
}

export const CountryDropdown = ({ onValueChange, defaultValue, className }: Props) => {
    return (
        <div>
            <Select onValueChange={onValueChange} defaultValue={defaultValue}>
                <SelectTrigger className={twMerge(clsx("w-full", className))}>
                    <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent side="bottom" avoidCollisions={false}>
                    {Object.entries(countries).map(([code, country]: [string, ICountry]) => {
                        return <SelectItem key={code} value={country.name}>
                            <div className="flex items-center gap-2">
                                <CircleFlag countryCode={code.toLowerCase()} style={{ width: 20, height: 20 }} />
                                {country.name}
                            </div>
                        </SelectItem>
                    })}
                </SelectContent>
            </Select>
        </div>
    )
}