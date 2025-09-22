import { Button } from "@/components/ui/button";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X, PlusCircle } from "lucide-react";

export default function EducationForm({
    form,
    fields,
    addEducation,
    removeEducation,
}) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-3">3. Education</h2>
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="border border-gray-700 p-4 rounded-lg relative"
                    >
                        <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                            <FormField
                                control={form.control}
                                name={`educationInfo.${index}.degree`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">
                                            Degree
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="e.g., Bachelor of Science"
                                                className="bg-gray-800 border-gray-600 text-white rounded-md"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`educationInfo.${index}.institution`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">
                                            Institution
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="e.g., University of Technology"
                                                className="bg-gray-800 border-gray-600 text-white rounded-md"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`educationInfo.${index}.fieldOfStudy`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">
                                            Field of Study
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="e.g., Computer Science"
                                                className="bg-gray-800 border-gray-600 text-white rounded-md"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`educationInfo.${index}.grade`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">
                                            Grade / GPA
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="e.g., 3.8/4.0"
                                                className="bg-gray-800 border-gray-600 text-white rounded-md"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`educationInfo.${index}.startDate`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">
                                            Start Date
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                {...field}
                                                className="bg-gray-800 border-gray-600 text-white rounded-md"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`educationInfo.${index}.endDate`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">
                                            End Date
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                {...field}
                                                className="bg-gray-800 border-gray-600 text-white rounded-md"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {fields.length > 1 && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute -top-1 -right-1 text-red-500 hover:text-red-400 hover:cursor-pointer"
                                onClick={() => removeEducation(index)}
                            >
                                {" "}
                                <X className="h-5 w-5" />{" "}
                            </Button>
                        )}
                    </div>
                ))}
                <Button
                    type="button"
                    variant="outline"
                    className="text-[#9AE300] border-[#9AE300] hover:bg-[#9AE300] hover:text-[#9AE300] hover:cursor-pointer flex items-center gap-2"
                    onClick={() => {
                        if (fields.length < 3) {
                            addEducation({
                                degree: "",
                                institution: "",
                                fieldOfStudy: "",
                                grade: "",
                                startDate: "",
                                endDate: "",
                            });
                        }
                    }}
                    disabled={fields.length >= 3}
                >
                    {" "}
                    <PlusCircle size={16} /> Add Education{" "}
                </Button>
                {form.formState.errors.educationInfo && (
                    <p className="text-sm font-medium text-red-500">
                        {form.formState.errors.educationInfo.message}
                    </p>
                )}
            </div>
        </div>
    );
}
