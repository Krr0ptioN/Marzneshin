import {
    FormField,
    FormItem,
    FormLabel,

    Checkbox,
    FormControl,
} from "@marzneshin/components";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const TemplateOnAcceptanceField = () => {
    const { t } = useTranslation()
    const form = useFormContext();
    return (
        <FormField
            control={form.control}
            name="template_on_acceptance"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-2">
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                            {t("page.settings.template-on-acceptance")}
                        </FormLabel>
                    </div>
                </FormItem>
            )}
        />
    )
}
