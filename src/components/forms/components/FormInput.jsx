import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function FormInput({
    form,
    name,
    label,
    placeholder,
    className,
    readOnly = false,
    ...rest
}) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            {...rest}
                            placeholder={placeholder}
                            readOnly={readOnly}
                            className={cn(
                                "w-full",
                                readOnly &&
                                    "bg-muted cursor-not-allowed opacity-70",
                                className
                            )}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
