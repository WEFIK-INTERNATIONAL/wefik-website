"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { CircleArrowLeft } from "lucide-react";

import { useGetJobProfile } from "@/queries/jobs";
import { useCreateJobProfile } from "@/queries/jobs";

export default function JobProfileForm() {
    const createJobProfile = useCreateJobProfile();
    const {
        data: jobProfiles,
        isLoading,
        error,
        isError,
    } = useGetJobProfile();

    const [selectedDept, setSelectedDept] = useState(null);
    const [department, setDepartment] = useState("");
    const [departmentCode, setDepartmentCode] = useState("");
    const [roles, setRoles] = useState([{ name: "", code: "" }]);

    // When department selected from dropdown
    const handleDeptSelect = (code) => {
        const dept = jobProfiles.find((d) => d.code === code);
        if (dept) {
            setSelectedDept(dept);
            setDepartment(dept.department);
            setDepartmentCode(dept.code);
        }
    };

    const handleRoleChange = (index, field, value) => {
        const updatedRoles = [...roles];
        updatedRoles[index][field] = value;
        setRoles(updatedRoles);
    };

    const addRole = () => setRoles([...roles, { name: "", code: "" }]);
    const removeRole = (index) => setRoles(roles.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            department,
            code: departmentCode,
            roles,
        };

        createJobProfile.mutate(payload);
    };

    return (
        <div>
            <Button
                asChild
                variant="outline"
                className="w-20 flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
            >
                <Link href="/admin/dashboard/job-profile">
                    <CircleArrowLeft className="h-4 w-4" /> Back
                </Link>
            </Button>
            <Card className="w-full max-w-4xl max-h-[78vh] mx-auto mt-6 dark:text-white overflow-y-scroll">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Create Job Profile
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Select Department */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Select Department
                            </label>
                            <Select
                                onValueChange={handleDeptSelect}
                                value={selectedDept?.code || ""}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose a department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {jobProfiles?.length > 0 ? (
                                        jobProfiles?.map((dept) => (
                                            <SelectItem
                                                key={dept.code}
                                                value={dept.code}
                                            >
                                                {dept.department} ({dept.code})
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <div className="p-2 text-sm text-gray-500">
                                            No departments found. Please create
                                            one first.
                                        </div>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        {selectedDept && (
                            <div className="mt-6">
                                <h2 className="text-base font-medium mb-2">
                                    Existing Roles
                                </h2>
                                {selectedDept.roles?.length > 0 ? (
                                    <ul className="list-disc list-inside space-y-1">
                                        {selectedDept.roles.map((role) => (
                                            <li key={role.code}>
                                                <span className="text-base font-medium">
                                                    {role.name}
                                                </span>{" "}
                                                <span className="text-gray-500">
                                                    ({role.code})
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        No roles found in this department.
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Department & Code Row */}
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium mb-1">
                                    Department
                                </label>
                                <Input
                                    type="text"
                                    value={department}
                                    onChange={(e) =>
                                        setDepartment(e.target.value)
                                    }
                                    placeholder="e.g. Engineering"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium mb-1">
                                    Department Code
                                </label>
                                <Input
                                    type="text"
                                    value={departmentCode}
                                    onChange={(e) =>
                                        setDepartmentCode(e.target.value)
                                    }
                                    placeholder="e.g. ENG"
                                    required
                                />
                            </div>
                        </div>

                        {/* Roles */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Roles
                            </label>
                            <div className="space-y-3">
                                {roles.map((role, index) => (
                                    <div
                                        key={index}
                                        className="flex items-end gap-2 border p-3 rounded-md"
                                    >
                                        {/* Role Name */}
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium mb-1">
                                                Role Name
                                            </label>
                                            <Input
                                                type="text"
                                                value={role.name}
                                                onChange={(e) =>
                                                    handleRoleChange(
                                                        index,
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="e.g. Web Developer"
                                                required
                                            />
                                        </div>

                                        {/* Role Code */}
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium mb-1">
                                                Role Code
                                            </label>
                                            <Input
                                                type="text"
                                                value={role.code}
                                                onChange={(e) =>
                                                    handleRoleChange(
                                                        index,
                                                        "code",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="e.g. ENG-WEB"
                                                required
                                            />
                                        </div>

                                        {/* Remove button inline with inputs */}
                                        {roles.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    removeRole(index)
                                                }
                                                className="self-end hover:cursor-pointer"
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Add Role button */}
                            <Button
                                type="button"
                                onClick={addRole}
                                variant="outline"
                                className="mt-3 hover:cursor-pointer"
                            >
                                + Add Role
                            </Button>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full hover:cursor-pointer"
                            disabled={createJobProfile.isPending}
                        >
                            {createJobProfile.isPending
                                ? "Saving Data..."
                                : "Save Job Profile"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
