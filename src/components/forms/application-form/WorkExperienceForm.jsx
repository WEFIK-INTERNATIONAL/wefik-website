import { Button } from "@/components/ui/button";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, PlusCircle } from "lucide-react";

export default function WorkExperienceForm({
    form,
    fields,
    addWork,
    removeWork,
}) {
    return (
        <section>
            <h2 className="text-xl font-semibold mb-3">
                6. Work Experience (Optional)
            </h2>
            <div className="space-y-4">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="border border-gray-700 p-4 rounded-lg relative"
                    >
                        <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                            {/* Company */}
                            <FormField
                                control={form.control}
                                name={`workExperience.${index}.company`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">
                                            Company
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="e.g., Acme Inc."
                                                className="bg-gray-800 border-gray-600 text-white rounded-md"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Role */}
                            <FormField
                                control={form.control}
                                name={`workExperience.${index}.role`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-300">
                                            Role
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="e.g., Software Engineer"
                                                className="bg-gray-800 border-gray-600 text-white rounded-md"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Start Date */}
                            <FormField
                                control={form.control}
                                name={`workExperience.${index}.startDate`}
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

                            {/* End Date */}
                            <FormField
                                control={form.control}
                                name={`workExperience.${index}.endDate`}
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

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name={`workExperience.${index}.description`}
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel className="text-gray-300">
                                            Description
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Describe your responsibilities and achievements..."
                                                className="bg-gray-800 border-gray-600 text-white rounded-md"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Remove Button (only show if more than 1 entry) */}
                        {fields.length > 1 && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute -top-1 -right-1 text-red-500 hover:text-red-400 hover:cursor-pointer"
                                onClick={() => removeWork(index)}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        )}
                    </div>
                ))}

                {/* Add Experience Button (max 5 allowed) */}
                <Button
                    type="button"
                    variant="outline"
                    className="text-[#9AE300] border-[#9AE300] hover:bg-[#9AE300] hover:text-[#9AE300] hover:cursor-pointer flex items-center gap-2"
                    onClick={() => {
                        if (fields.length < 2) {
                            addWork({
                                company: "",
                                role: "",
                                startDate: "",
                                endDate: "",
                                description: "",
                            });
                        }
                    }}
                    disabled={fields.length >= 2}
                >
                    <PlusCircle size={16} /> Add Experience
                </Button>

                {/* Error Message */}
                {form.formState.errors.workExperience && (
                    <p className="text-sm font-medium text-red-500">
                        {form.formState.errors.workExperience.message}
                    </p>
                )}
            </div>
        </section>
    );
}
