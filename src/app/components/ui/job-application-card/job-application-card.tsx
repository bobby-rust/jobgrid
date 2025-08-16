"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, DollarSign, Calendar, FileText, Users, Edit, Save, X } from "lucide-react"
import { useState } from "react"
import { JobApplication } from "@/types/api"

interface JobApplicationCardProps {
    jobData: JobApplication
    onEdit?: () => void
    onSave?: (updatedData: JobApplication) => void
}

export default function JobApplicationCard({ jobData, onEdit, onSave }: JobApplicationCardProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editableData, setEditableData] = useState<JobApplication>(jobData)

    const formatEmploymentType = (type: string) => {
        return type
            .replace("_", " ")
            .toLowerCase()
            .replace(/\b\w/g, (l) => l.toUpperCase())
    }

    const formatWorkArrangement = (arrangement: string) => {
        return arrangement
            .replace("_", "-")
            .toLowerCase()
            .replace(/\b\w/g, (l) => l.toUpperCase())
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "applied":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            case "interview":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            case "offer":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            case "rejected":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
        }
    }

    const handleEdit = () => {
        setIsEditing(true)
        setEditableData(jobData)
        onEdit?.()
    }

    const handleSave = () => {
        setIsEditing(false)
        onSave?.(editableData)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditableData(jobData)
    }

    const updateField = (field: string, value: any) => {
        setEditableData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const updateNestedField = (parent: string, field: string, value: any) => {
        setEditableData((prev) => ({
            ...prev,
            [parent]: {
                ...(prev[parent as keyof JobApplication] as any),
                [field]: value,
            },
        }))
    }

    const currentData = isEditing ? editableData : jobData

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex-1 mr-4">
                        <div className="flex items-center gap-2 mb-1">
                            {isEditing ? (
                                <Input
                                    value={currentData.jobTitle}
                                    onChange={(e) => updateField("jobTitle", e.target.value)}
                                    className="text-2xl font-bold h-auto p-1 border-dashed"
                                    placeholder="Job Title"
                                />
                            ) : (
                                <CardTitle className="text-2xl font-bold">{currentData.jobTitle}</CardTitle>
                            )}

                            {isEditing ? (
                                <Select
                                    value={currentData.applicationStatus}
                                    onValueChange={(value) => updateField("applicationStatus", value)}
                                >
                                    <SelectTrigger className="w-32 h-6 text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="APPLIED">Applied</SelectItem>
                                        <SelectItem value="INTERVIEW">Interview</SelectItem>
                                        <SelectItem value="OFFER">Offer</SelectItem>
                                        <SelectItem value="REJECTED">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Badge className={getStatusColor(currentData.applicationStatus)}>
                                    {formatEmploymentType(currentData.applicationStatus)}
                                </Badge>
                            )}
                        </div>

                        {isEditing ? (
                            <Input
                                value={currentData.companyName}
                                onChange={(e) => updateField("companyName", e.target.value)}
                                className="text-xl text-muted-foreground h-auto p-1 border-dashed bg-transparent"
                                placeholder="Company Name"
                            />
                        ) : (
                            <p className="text-xl text-muted-foreground">{currentData.companyName}</p>
                        )}
                    </div>

                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCancel}
                                    className="flex items-center gap-1 bg-transparent"
                                >
                                    <X className="h-3 w-3" />
                                    Cancel
                                </Button>
                                <Button size="sm" onClick={handleSave} className="flex items-center gap-1">
                                    <Save className="h-3 w-3" />
                                    Save
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleEdit}
                                className="flex items-center gap-1 bg-transparent"
                            >
                                <Edit className="h-3 w-3" />
                                Edit
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {isEditing ? (
                            <div className="flex gap-1 text-sm">
                                <Input
                                    value={currentData.location.city}
                                    onChange={(e) => updateNestedField("location", "city", e.target.value)}
                                    className="h-6 text-xs border-dashed"
                                    placeholder="City"
                                />
                                <Input
                                    value={currentData.location.state}
                                    onChange={(e) => updateNestedField("location", "state", e.target.value)}
                                    className="h-6 text-xs border-dashed"
                                    placeholder="State"
                                />
                                <Input
                                    value={currentData.location.country}
                                    onChange={(e) => updateNestedField("location", "country", e.target.value)}
                                    className="h-6 text-xs border-dashed"
                                    placeholder="Country"
                                />
                            </div>
                        ) : (
                            <span className="text-sm">
                                {currentData.location.city}, {currentData.location.state}, {currentData.location.country}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        {isEditing ? (
                            <div className="flex gap-1 items-center text-sm">
                                <Select
                                    value={currentData.compensation.currency}
                                    onValueChange={(value) => updateNestedField("compensation", "currency", value)}
                                >
                                    <SelectTrigger className="w-16 h-6 text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USD">USD</SelectItem>
                                        <SelectItem value="EUR">EUR</SelectItem>
                                        <SelectItem value="GBP">GBP</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span>$</span>
                                <Input
                                    type="number"
                                    value={currentData.compensation.amount}
                                    onChange={(e) => updateNestedField("compensation", "amount", Number(e.target.value))}
                                    className="w-20 h-6 text-xs border-dashed"
                                />
                                <span>/</span>
                                <Select
                                    value={currentData.compensation.compensationType}
                                    onValueChange={(value) => updateNestedField("compensation", "compensationType", value)}
                                >
                                    <SelectTrigger className="w-20 h-6 text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="HOURLY">Hourly</SelectItem>
                                        <SelectItem value="YEARLY">Yearly</SelectItem>
                                        <SelectItem value="MONTHLY">Monthly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : (
                            <span className="text-sm">
                                {currentData.compensation.currency} ${currentData.compensation.amount}/
                                {currentData.compensation.compensationType.toLowerCase()}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {isEditing ? (
                        <>
                            <Select
                                value={currentData.employmentType}
                                onValueChange={(value) => updateField("employmentType", value)}
                            >
                                <SelectTrigger className="w-32 h-8">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="FULL_TIME">Full Time</SelectItem>
                                    <SelectItem value="PART_TIME">Part Time</SelectItem>
                                    <SelectItem value="CONTRACT">Contract</SelectItem>
                                    <SelectItem value="INTERNSHIP">Internship</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={currentData.workArrangement}
                                onValueChange={(value) => updateField("workArrangement", value)}
                            >
                                <SelectTrigger className="w-32 h-8">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ON_SITE">On-Site</SelectItem>
                                    <SelectItem value="REMOTE">Remote</SelectItem>
                                    <SelectItem value="HYBRID">Hybrid</SelectItem>
                                </SelectContent>
                            </Select>
                        </>
                    ) : (
                        <>
                            <Badge variant="secondary">{formatEmploymentType(currentData.employmentType)}</Badge>
                            <Badge variant="secondary">{formatWorkArrangement(currentData.workArrangement)}</Badge>
                        </>
                    )}

                    {currentData.referral && (
                        <Badge variant="outline" className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            Referral
                        </Badge>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                        <Input
                            type="date"
                            value={currentData.appliedOn}
                            onChange={(e) => updateField("appliedOn", e.target.value)}
                            className="w-40 h-6 text-xs border-dashed"
                        />
                    ) : (
                        <span className="text-sm text-muted-foreground">Applied on {formatDate(currentData.appliedOn)}</span>
                    )}
                </div>

                {(currentData.notes || isEditing) && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Notes</span>
                        </div>
                        {isEditing ? (
                            <Textarea
                                value={currentData.notes}
                                onChange={(e) => updateField("notes", e.target.value)}
                                className="text-sm border-dashed"
                                placeholder="Add notes about this application..."
                                rows={3}
                            />
                        ) : (
                            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{currentData.notes}</p>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
