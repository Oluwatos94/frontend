import { useState, ChangeEvent, FormEvent, FocusEvent } from "react";


type FormValues = Record<string, any>;


type FormErrors = Record<string, string>;


type ValidateFunction = (values: FormValues) => FormErrors;

export default function useFormValidation(initialState: FormValues, validate: ValidateFunction) {
    const [values, setValues] = useState<FormValues>(initialState);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

   
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updatedValues = { ...values, [name]: value };
        setValues(updatedValues);

        
        const validationErrors = validate(updatedValues);
        setErrors(validationErrors);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = e.target;
        const validationErrors = validate(values);
        setErrors((prevValidationErrors) => ({
            ...prevValidationErrors,
            [name]: validationErrors[name] || "", 
        }));
    };

   
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const validationErrors = validate(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
        }
    };

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
    };
}