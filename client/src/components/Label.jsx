import React, { cloneElement } from "react";
import { clsx } from "@/utils";

export function Label({ type, placeholder, children, textarea }) {
  return (
    <div className="relative">
      {children}
      <label
        htmlFor={type}
        className={clsx(
          "absolute left-0 -top-3.5 transition-all",
          "text-gray-600 text-sm",

          "peer-placeholder-shown:text-base",
          "peer-placeholder-shown:text-gray-400",
          textarea
            ? "peer-placeholder-shown:top-0"
            : "peer-placeholder-shown:top-2"
        )}
      >
        {placeholder}
      </label>
    </div>
  );
}
