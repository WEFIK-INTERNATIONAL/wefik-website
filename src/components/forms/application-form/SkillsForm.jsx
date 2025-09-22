import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import {
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export default function SkillsForm({ form, skillInput, setSkillInput }) {
    const addSkill = () => {
        if (
            skillInput.trim() &&
            !form.getValues("skills").some((s) => s.name === skillInput.trim())
        ) {
            // 🔑 wrap skill as { name, level }
            form.setValue(
                "skills",
                [
                    ...form.getValues("skills"),
                    { name: skillInput.trim(), level: "Beginner" },
                ],
                { shouldValidate: true }
            );
            setSkillInput("");
        }
    };

    const removeSkill = (skillName) => {
        form.setValue(
            "skills",
            form.getValues("skills").filter((s) => s.name !== skillName),
            { shouldValidate: true }
        );
    };

    const skills = form.watch("skills") || [];
    const isMaxed = skills.length >= 6; // 🔑 enforce max

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-3">4. Skills</h2>

            <FormField
                control={form.control}
                name="skills"
                render={() => (
                    <FormItem>
                        <div className="border border-gray-700 p-4 rounded-lg space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    value={skillInput}
                                    onChange={(e) =>
                                        setSkillInput(e.target.value)
                                    }
                                    placeholder="Enter a skill"
                                    className="bg-gray-800 text-white"
                                    disabled={isMaxed} // 🔑 disable input when max reached
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="text-[#9AE300] border-[#9AE300] hover:bg-[#9AE300] hover:text-[#9AE300] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={addSkill}
                                    disabled={isMaxed}
                                >
                                    Add
                                    <PlusCircle size={16} />
                                </Button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, i) => (
                                    <Badge
                                        key={i}
                                        className="text-sm bg-[#9AE300] text-black cursor-pointer"
                                        onClick={() => removeSkill(skill.name)}
                                    >
                                        {skill.name} ×
                                    </Badge>
                                ))}
                            </div>

                            {/* 🔥 Error message */}
                            <FormMessage className="text-red-500 text-sm" />
                        </div>
                    </FormItem>
                )}
            />
        </div>
    );
}
