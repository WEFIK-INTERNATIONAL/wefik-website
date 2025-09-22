import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
} from "@/components/ui/form";

export default function FormCheckbox({ form, name, label }) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                    <FormControl>
                        <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="w-5 h-5 accent-indigo-500"
                        />
                    </FormControl>
                    <FormLabel>{label}</FormLabel>
                </FormItem>
            )}
        />
    );
}
