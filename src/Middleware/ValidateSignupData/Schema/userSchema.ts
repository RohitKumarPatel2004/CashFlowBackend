import  * as yup from 'yup';

export const userSchema = yup.object({
    body: yup.object({
        username: yup.string().required("Name is required"),
        email: yup.string().email("Please enter a valid email").required("Email is required"),
        password: yup.string().min(4, "Password must be at least 4 characters").max(10, "Password cannot be more than 10 characters").required("Password is required")
    })
});
