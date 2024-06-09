// Ref: TimePicker: https://time.openstatus.dev
import { addDays, addYears, format, subYears } from "date-fns"
import { Control } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Icons } from "../shared/icons"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { InputProps } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { TimePicker } from "../ui/time-picker"

interface FormInputDateProps extends InputProps {
  name: string
  label: string
  maxLength?: number
  description?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  className?: string
  withTime?: boolean
  disabled?: boolean
}

const FormInputDate = ({
  name,
  control,
  label,
  description,
  className,
  withTime,
  disabled,
}: FormInputDateProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={cn("", className)}>
            <FormLabel>{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                    disabled={field.disabled || disabled}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>{label}</span>
                    )}
                    <Icons.calendar className="ml-auto size-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Select
                  onValueChange={(value) =>
                    field.onChange(addDays(new Date(), parseInt(value)))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={label} />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="0">Today</SelectItem>
                    <SelectItem value="1">Tomorrow</SelectItem>
                    <SelectItem value="3">In 3 days</SelectItem>
                    <SelectItem value="7">In a week</SelectItem>
                  </SelectContent>
                </Select>
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > addYears(new Date(), 10) ||
                    date < subYears(new Date(), 1)
                  }
                  initialFocus
                />
                {withTime && (
                  <div className="border-t border-border p-3">
                    <TimePicker date={field.value} setDate={field.onChange} />
                  </div>
                )}
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default FormInputDate
