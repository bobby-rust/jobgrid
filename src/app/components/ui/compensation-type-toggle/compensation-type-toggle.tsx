import { CompensationType } from "@/types/enums"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import clsx from "clsx"
import { CalendarDays, Clock } from "lucide-react"
import { twMerge } from "tailwind-merge"

interface Props {
    value: CompensationType
    onChange: (val: CompensationType) => void
    className?: string
    isError?: boolean
}

export default function CompensationTypeToggle({ value, onChange, className, isError }: Props) {
    return (
        <RadioGroup
            onValueChange={(value: CompensationType) => onChange(value)}
            value={value}
            className={twMerge(clsx("", className))}
        >
            <div className="flex">
                {/* Yearly */}
                <Label
                    htmlFor="yearly"
                    className={twMerge(
                        "p-5 border-l-2 border-y-2 relative rounded-l-lg cursor-pointer",
                        value === CompensationType.YEARLY && "border-r-2 bg-accent",
                        value !== CompensationType.YEARLY && value !== CompensationType.HOURLY && "border-r-2",
                        isError && "border-[1px] border-r-[1px] border-red-400"
                    )}
                >
                    <div className="flex flex-col items-center gap-2 px-2">
                        <span className="text-xs">Yearly</span>
                        <CalendarDays size={20} />
                    </div>
                    <RadioGroupItem
                        id="yearly"
                        className="absolute top-1 left-1"
                        value={CompensationType.YEARLY}
                    />
                </Label>

                {/* Hourly */}
                <Label
                    htmlFor="hourly"
                    className={twMerge(
                        "p-5 border-r-2 border-y-2 relative rounded-r-lg cursor-pointer",
                        value === CompensationType.HOURLY && "border-2 bg-accent",
                        isError && "border-[1px] border-l-0 border-red-400"
                    )}
                >
                    <div className="flex flex-col items-center gap-2 px-2">
                        <span className="text-xs">Hourly</span>
                        <Clock size={20} />
                    </div>
                    <RadioGroupItem
                        id="hourly"
                        className="absolute top-1 left-1"
                        value={CompensationType.HOURLY}
                    />
                </Label>
            </div>
        </RadioGroup>
    )
}
