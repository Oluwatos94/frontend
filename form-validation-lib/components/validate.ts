
type FormValues = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};


type FormErrors = {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};


const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};


    if (!values.username) {
        errors.username = "Username is required";
    } else if (values.username.length < 3) {
        errors.username = "Username must be at least 3 characters";
    }

    
    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email address is invalid";
    }


    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }

    
    if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords do not match";
    }

    // Sign-in validation (commented out)
    // if (values.username !== "chiscookeke11") {
    //     errors.username = "Incorrect username";
    // }
    // if (values.password !== "chinedu") {
    //     errors.password = "Incorrect password";
    // }

    return errors;
};

export default validate;