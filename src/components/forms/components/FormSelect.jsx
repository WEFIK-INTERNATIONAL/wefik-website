import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

/**
 * Generic FormSelect for React Hook Form
 * - Handles strings and numbers automatically
 * - options: [{ label: "Option", value: "a" | 1 }]
 * - type: "string" (default) | "number"
 * - disabled: true | false
 */
export default function FormSelect({
    form,
    name,
    label,
    options,
    className,
    type = "string",
    disabled = false,
}) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                // Convert value to string for Select
                const valueAsString =
                    field.value !== undefined ? String(field.value) : undefined;

                const handleChange = (val) => {
                    if (type === "number") {
                        field.onChange(Number(val));
                    } else {
                        field.onChange(val);
                    }
                };

                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Select
                                value={valueAsString}
                                onValueChange={handleChange}
                                disabled={disabled}
                            >
                                <SelectTrigger
                                    className={`${className} ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
                                >
                                    <SelectValue
                                        placeholder={`Select ${label}`}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.map((opt) => (
                                        <SelectItem
                                            key={opt.value}
                                            value={String(opt.value)}
                                            disabled={opt.disabled} // ✅ option-level disable
                                        >
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}
