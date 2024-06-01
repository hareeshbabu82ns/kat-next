import { Control } from "react-hook-form"
import { Checkbox } from "../ui/checkbox"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"

interface FormCheckboxProps {
  name: string
  label: string
  description?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  disabled?: boolean
}

const FormCheckbox = ({
  name,
  control,
  label,
  description,
  disabled,
}: FormCheckboxProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormCheckbox
