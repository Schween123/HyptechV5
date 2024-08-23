import React from "react";

const shapes = {
  square: "rounded-[0px]",
} as const;

const variants = {
  outline: {
    teal_900_01: "border-teal-900_01 border-b-[3px] border-solid shadow-xs",
  },
} as const;

const sizes = {
  xs: "h-[60px] px-5",
} as const;

// Type for variant keys
type Variants = keyof typeof variants;
// Type for color keys within a given variant
type VariantColors<V extends Variants> = keyof typeof variants[V];

type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "prefix" | "size"> &
  Partial<{
    label: string;
    prefix: React.ReactNode;
    suffix: React.ReactNode;
    shape: keyof typeof shapes;
    variant: Variants;
    size: keyof typeof sizes;
    color: VariantColors<Variants>;
  }>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      children,
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant = "outline",
      size = "xs",
      color = "teal_900_01",
      ...restProps
    },
    ref,
  ) => {
    // Construct the variant class based on the variant and color props
    const variantClass = variant ? variants[variant]?.[color as VariantColors<typeof variant>] : "";

    return (
      <label
        className={`${className} flex items-center justify-center cursor-text 
        ${shapes[shape as keyof typeof shapes] || ""} 
        ${variantClass || ""} 
        ${sizes[size as keyof typeof sizes] || ""}`}
      >
        {/* Render the label if provided */}
        {!!label && label}
        {/* Render the prefix if provided */}
        {!!prefix && prefix}
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          {...restProps}
        />
        {/* Render the suffix if provided */}
        {!!suffix && suffix}
      </label>
    );
  }
);

export { Input };
