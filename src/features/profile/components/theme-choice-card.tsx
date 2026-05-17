"use client";

import { useTheme } from "@wrksz/themes/client";

import { themeItems } from "@/features/profile/lib/constants";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field";

export default function ThemeChoiceCard() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (value: NonNullable<typeof theme>) => setTheme(value);

  return (
    <RadioGroup value={theme} onValueChange={handleThemeChange} className="sm:grid-cols-3">
      {themeItems.map((themeItem) => {
        return (
          <FieldLabel key={themeItem.id} htmlFor={themeItem.id}>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>{themeItem.label}</FieldTitle>
                <FieldDescription>{themeItem.description}</FieldDescription>
              </FieldContent>
              <RadioGroupItem id={themeItem.id} value={themeItem.label.toLowerCase()} />
            </Field>
          </FieldLabel>
        );
      })}
    </RadioGroup>
  );
}
