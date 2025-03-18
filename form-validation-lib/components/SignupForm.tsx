"use client";

import useFormValidation from "@/hooks/useFormValidation";
import Input from "../modern-starknet-staking-ui/components/Inputs";
import validate from "./validate";


type FormValues = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function SignupForm() {
    const initialState: FormValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useFormValidation(initialState, validate);

    const onSubmit = (values: FormValues) => {
        console.log("Form submitted successfully!", values);
    };

    const validateConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
        handleBlur(e);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full min-w-[300px] max-w-[500px] bg-slate-500 h-full rounded-sm flex flex-col justify-center items-center py-5 px-4 gap-6"
        >
            <h1>Sign-up Form</h1>

            <div className="w-full h-full flex flex-col items-center gap-4 justify-center">
                <Input
                    type="text"
                    name="username"
                    value={values.username}
                    placeholder="Please enter your username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.username && <p>{errors.username}</p>}
                />

                <Input
                    type="email"
                    name="email"
                    value={values.email}
                    placeholder="Please enter your email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.email && <p>{errors.email}</p>}
                />

                <Input
                    type="password"
                    name="password"
                    value={values.password}
                    placeholder="Please enter your password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.password && <p>{errors.password}</p>}
                />

                <Input
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-500 px-4 py-2 text-base rounded-sm"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}