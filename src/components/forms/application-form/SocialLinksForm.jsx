import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function SocialLinksForm({ form }) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-3">
                5. SocialLinks (Optional)
            </h2>

            <div className="grid md:grid-cols-3 gap-x-6 gap-y-4 border border-gray-700 p-4 rounded-lg">
                {["github", "linkedin", "portfolio"].map((field) => (
                    <FormField
                        key={field}
                        control={form.control}
                        name={`socialLinks.${field}`}
                        render={({ field: f }) => (
                            <FormItem>
                                <FormLabel className="capitalize">
                                    {field}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...f}
                                        placeholder={`Enter your ${field}`}
                                        className="bg-gray-800 text-white"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
