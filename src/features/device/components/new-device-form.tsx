"use client";

import { FORM_FIELD, FORM_ID } from "@/features/device/lib/constants";

import type { SelectFieldItem } from "@/features/device/lib/definitions";

import useFields from "@/features/device/hooks/use-fields";

import { Input } from "@/components/ui/input";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type NewDeviceFormProps = {
  types?: SelectFieldItem[];
  statuses?: SelectFieldItem[];
  groups?: SelectFieldItem[];
};

export default function NewDeviceForm({ types, statuses, groups }: NewDeviceFormProps) {
  const { field, handleFieldChange } = useFields({
    name: "",
    typeId: "",
    statusId: "",
    groupId: "",
    serialNumber: "",
    ipAddress: "",
  });

  return (
    <form id={FORM_ID} onSubmit={(e) => e.preventDefault()}>
      <FieldGroup>
        <NameField value={field.name} onFieldChange={(value) => handleFieldChange("name", value)} />
        <TypeField items={types} value={field.typeId} onFieldChange={(value) => handleFieldChange("typeId", value)} />
        <StatusField
          items={statuses}
          value={field.statusId}
          onFieldChange={(value) => handleFieldChange("statusId", value)}
        />
        <GroupField
          items={groups}
          value={field.groupId}
          onFieldChange={(value) => handleFieldChange("groupId", value)}
        />
        <SerialNumberField
          value={field.serialNumber}
          onFieldChange={(value) => handleFieldChange("serialNumber", value)}
        />
        <IpAddressField value={field.ipAddress} onFieldChange={(value) => handleFieldChange("ipAddress", value)} />
      </FieldGroup>
    </form>
  );
}

type FieldProps = {
  value: string;
  error?: string;
  items?: SelectFieldItem[];
  onFieldChange: (value: string) => void;
};

function NameField({ value, error, onFieldChange }: FieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={FORM_FIELD.NAME.id}>
        Name <span className="text-destructive">*</span>
      </FieldLabel>
      <Input
        id={FORM_FIELD.NAME.id}
        type="text"
        name={FORM_FIELD.NAME.id}
        placeholder={FORM_FIELD.NAME.placeholder}
        autoComplete="off"
        value={value}
        onChange={(e) => onFieldChange(e.target.value)}
        required
      />
      <FieldError>{error}</FieldError>
    </Field>
  );
}

function TypeField({ items, value, error, onFieldChange }: FieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={FORM_FIELD.TYPE.id}>
        Type <span className="text-destructive">*</span>
      </FieldLabel>
      <Select
        id={FORM_FIELD.TYPE.id}
        name={FORM_FIELD.TYPE.id}
        items={items}
        value={value}
        onValueChange={(value) => onFieldChange(value ?? "")}
        disabled={!items?.length}
      >
        <SelectTrigger>
          <SelectValue placeholder={FORM_FIELD.TYPE.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items?.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldError>{error}</FieldError>
    </Field>
  );
}

function StatusField({ items, value, error, onFieldChange }: FieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={FORM_FIELD.STATUS.id}>
        Status <span className="text-destructive">*</span>
      </FieldLabel>
      <Select
        id={FORM_FIELD.STATUS.id}
        name={FORM_FIELD.STATUS.id}
        items={items}
        value={value}
        onValueChange={(value) => onFieldChange(value ?? "")}
        disabled={!items?.length}
      >
        <SelectTrigger>
          <SelectValue placeholder={FORM_FIELD.STATUS.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items?.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldError>{error}</FieldError>
    </Field>
  );
}

function GroupField({ items, value, error, onFieldChange }: FieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={FORM_FIELD.GROUP.id}>
        Group <span className="text-destructive">*</span>
      </FieldLabel>
      <Select
        id={FORM_FIELD.GROUP.id}
        name={FORM_FIELD.GROUP.id}
        items={items}
        value={value}
        onValueChange={(value) => onFieldChange(value ?? "")}
        disabled={!items?.length}
      >
        <SelectTrigger>
          <SelectValue placeholder={FORM_FIELD.GROUP.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items?.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldError>{error}</FieldError>
    </Field>
  );
}

function SerialNumberField({ value, error, onFieldChange }: FieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={FORM_FIELD.SERIAL_NUMBER.id}>
        Serial Number <span className="text-destructive">*</span>
      </FieldLabel>
      <Input
        id={FORM_FIELD.SERIAL_NUMBER.id}
        type="text"
        name={FORM_FIELD.SERIAL_NUMBER.id}
        placeholder={FORM_FIELD.SERIAL_NUMBER.placeholder}
        autoComplete="off"
        value={value}
        onChange={(e) => onFieldChange(e.target.value)}
        required
      />
      <FieldError>{error}</FieldError>
    </Field>
  );
}

function IpAddressField({ value, error, onFieldChange }: FieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={FORM_FIELD.IP_ADDRESS.id}>IP Address</FieldLabel>
      <Input
        id={FORM_FIELD.IP_ADDRESS.id}
        type="text"
        name={FORM_FIELD.IP_ADDRESS.id}
        placeholder={FORM_FIELD.IP_ADDRESS.placeholder}
        autoComplete="off"
        value={value}
        onChange={(e) => onFieldChange(e.target.value)}
      />
      <FieldError>{error}</FieldError>
    </Field>
  );
}
