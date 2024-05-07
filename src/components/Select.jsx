import React, { forwardRef, useId } from "react";

function Select({ label, options = [], className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label className="" htmlFor={id}>
          {label}
        </label>
      )}
      <Select
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
      >
        {options?.map((option) => {
          <option key={id} value={option}>
            {option}
          </option>;
        })}
      </Select>
    </div>
  );
}

export default forwardRef(Select);
