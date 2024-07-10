import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string,
    password: string,
}

const Signin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    const { showToast } = useAppContext();
    const { register, formState: { errors }, handleSubmit } = useForm<SignInFormData>();
    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({ message: "Sign in Succesfull", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken");
            navigate(location.state?.from?.pathname || "/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Sign In</h2>
            <label className="text-gray-700 text-sm font-bold flex-1">
                E-Mail
                <input
                    type="email"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("email", { required: "This Field is Required" })} />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input
                    type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("password", {
                        required: "This Field is Required",
                        minLength: {
                            value: 6,
                            message: "password must be atleast 6 char"
                        },
                    })} />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>
            <span className="flex items-center justify-between">
                <span className="text-sm">
                    Not Registered? <Link className="underline" to="/register">Create an account here</Link>
                </span>
                <button type="submit"
                    className="bg-stone-800 text-white p-2 font-bold hover:bg-neutral-600 text-xl">
                    Login
                </button>
            </span>
        </form>
    );
};

export default Signin;