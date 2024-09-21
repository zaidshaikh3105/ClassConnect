import React, { useId, forwardRef } from "react";

const InputField = forwardRef(function InputField(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label className="label text-white" htmlFor={id}>
          <span className="label-text text-white">{label}</span>
        </label>
      )}
      <input
        type={type}
        className={`input input-bordered w-full ${className} text-white`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default InputField;
