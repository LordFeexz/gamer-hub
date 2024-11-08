"use client";

import {
  type ChangeEventHandler,
  forwardRef,
  type InputHTMLAttributes,
  memo,
} from "react";
import { Label } from "../ui/label";
import AnimateInput from "../ui/AnimatedInput";
import DisplayError from "./DisplayError";
import { cn } from "@/lib/utils";

export interface EmailFormProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  name: string;
  onChangeHandler?: ChangeEventHandler<HTMLInputElement>;
  labelClass?: string;
  className?: string;
  required?: boolean;
  errors?: string[];
}

const EmailForm = forwardRef<HTMLInputElement, EmailFormProps>(
  (
    {
      id,
      labelClass,
      label,
      onChangeHandler,
      name,
      className,
      required = false,
      errors,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor={id}
          className={cn(
            "block",
            labelClass,
            required && "after:content-['*'] after:ml-0.5 after:text-red-500",
            "text-neutral-900 dark:text-neutral-300"
          )}
        >
          {label}
        </Label>
        {!!errors?.length && <DisplayError messages={errors} />}
        <AnimateInput
          {...rest}
          ref={ref}
          type="email"
          name={name}
          id={id}
          required={required}
          onChange={onChangeHandler}
          className={className}
          placeholder="name@example.com"
          pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        />
      </div>
    );
  }
);

export default memo(EmailForm);
