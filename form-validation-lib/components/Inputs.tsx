import React from "react";

interface InputProps {
    type: string;
    name: string;
    placeholder?: string;
    errorMessage?: React.ReactNode; 
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default function Input({
    type,
    name,
    value,
    placeholder,
    onChange,
    onBlur,
    errorMessage,
}: InputProps) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className="outline-none border border-black bg-white px-4 py-2 text-base rounded-sm text-[#000]"
            />
            <p className="ml-auto text-red-700">{errorMessage}</p>
        </div>
    );
}