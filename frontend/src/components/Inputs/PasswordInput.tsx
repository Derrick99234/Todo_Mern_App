import React, { useState } from "react";

type PasswordInputProps = {
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
};

const PasswordInput = ({
  value,
  onChange,
  placeholder,
}: PasswordInputProps) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const toggleVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        type={passwordVisibility ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />
      <span
        className="text-primary cursor-pointer text-2xl"
        onClick={toggleVisibility}
      >
        o
      </span>
    </div>
  );
};

export default PasswordInput;
