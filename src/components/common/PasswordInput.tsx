"use client";

import {
  forwardRef,
  memo,
  useState,
  type ChangeEventHandler,
  type InputHTMLAttributes,
} from "react";
import { Label } from "../ui/label";
import PasswordToggleBtn from "./PasswordToogleBtn";
import AnimateInput from "../ui/AnimatedInput";
import { cn } from "@/lib/utils";
import DisplayError from "./DisplayError";

export interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  label: string;
  id: string;
  onChangeHandler?: ChangeEventHandler<HTMLInputElement>;
  name: string;
  value?: string;
  title?: string;
  pattern: string;
  className?: string;
  placeHolder?: string;
  labelClass?: string;
  errors?: string[];
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      required = false,
      id,
      label,
      onChangeHandler,
      name,
      value,
      pattern,
      title,
      className,
      placeHolder = "password",
      labelClass = "",
      errors,
      ...rest
    },
    ref
  ) => {
    const [visible, setVisible] = useState<boolean>(false);

    const visibleChange = () => setVisible(!visible);

    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label
          htmlFor={id}
          className={cn(
            required && "after:content-['*'] after:ml-0.5 after:text-red-500",
            labelClass,
            "block text-neutral-900 dark:text-neutral-300"
          )}
        >
          {label}
        </Label>
        <div className="relative">
          {!!errors?.length && <DisplayError messages={errors} />}
          <AnimateInput
            {...rest}
            ref={ref}
            pattern={pattern}
            title={title}
            id={id}
            type={visible ? "text" : "password"}
            name={name}
            value={value}
            onChange={onChangeHandler}
            required={required}
            placeholder={placeHolder}
            className={className}
            autoComplete="new-password"
          />
          <PasswordToggleBtn onClick={visibleChange} open={visible} />
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default memo(PasswordInput);
