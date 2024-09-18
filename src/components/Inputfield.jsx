import React, { useId, forwardRef } from "react";

const InputField = forwardRef(function InputField(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`input input-bordered w-full max-w-xs ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default InputField;
