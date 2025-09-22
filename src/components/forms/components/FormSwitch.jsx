import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

export default function FormSwitch({ form, name, label, className }) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex items-center">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Switch
                            checked={field.value || false}
                            onCheckedChange={(checked) =>
                                field.onChange(checked)
                            }
                            className={`hover:cursor-pointer ${className}`}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
