import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function ResumeUpload({ form }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-3">2. Upload Resume</h2>
            <FormField
                control={form.control}
                name="resume"
                render={({ field }) => (
                    <FormItem className="border border-gray-700 p-3 rounded-md">
                        <FormLabel className="text-white">
                            Resume (PDF)
                        </FormLabel>
                        <FormControl>
                            <div>
                                <input
                                    id="resumeUpload"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.files?.[0] ?? null
                                        )
                                    }
                                    className="hidden"
                                />
                                <label
                                    htmlFor="resumeUpload"
                                    className="flex items-center justify-center w-full p-2 border border-dashed border-gray-600 rounded-md
                                   text-gray-300 bg-gray-800 hover:bg-gray-700 cursor-pointer transition"
                                >
                                    <span className="text-sm">
                                        📄 Click to upload PDF (max 5MB)
                                    </span>
                                </label>
                                {field.value && (
                                    <p className="text-gray-400 mt-2 text-sm">
                                        Selected:{" "}
                                        <span className="font-medium">
                                            {field.value.name}
                                        </span>
                                    </p>
                                )}
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
