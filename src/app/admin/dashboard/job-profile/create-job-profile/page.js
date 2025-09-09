"use client";

import React, { useState } from "react";

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

export default function JobProfileForm() {
    const [departments, setDepartments] = useState([]); // fetched from DB
    const [selectedDept, setSelectedDept] = useState(null);
    const [department, setDepartment] = useState("");
    const [departmentCode, setDepartmentCode] = useState("");
    const [roles, setRoles] = useState([{ name: "", code: "" }]);

    // When department selected from dropdown
    const handleDeptSelect = (code) => {
        const dept = departments.find((d) => d.code === code);
        if (dept) {
            setSelectedDept(dept);
            setDepartment(dept.department);
            setDepartmentCode(dept.code);
            setRoles(
                dept.roles?.length ? dept.roles : [{ name: "", code: "" }]
            );
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

        try {
            console.log(payload);
        } catch (err) {
            console.error(err);
            alert("Error while saving job profile");
        }
    };

    return (
        <Card className="w-full max-w-4xl mx-auto mt-6 dark:text-white">
            <CardHeader>
                <CardTitle>Create Job Profile</CardTitle>
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
                                {departments.length > 0 ? (
                                    departments.map((dept) => (
                                        <SelectItem
                                            key={dept.code}
                                            value={dept.code}
                                        >
                                            {dept.department} ({dept.code})
                                        </SelectItem>
                                    ))
                                ) : (
                                    <div className="p-2 text-sm text-gray-500">
                                        No departments found. Please create one
                                        first.
                                    </div>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Department & Code Row */}
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium mb-1">
                                Department
                            </label>
                            <Input
                                type="text"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
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
                                            onClick={() => removeRole(index)}
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
                    >
                        Save Job Profile
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
