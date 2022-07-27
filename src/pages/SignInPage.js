import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import { useForm } from "react-hook-form";
import { Field } from "../components/field";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import IconEyeOpen from "../components/icon/IconEyeOpen";
import IconEyeClose from "../components/icon/IconEyeClose";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-app/firebase-config";
import { NavLink } from "react-router-dom";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter the valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(6, "password must be at least 6 characters")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
  const handleSingIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };
  const [toggleShowPassword, setToggleShowPassword] = useState(false);
  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  return (
    <AuthenticationPage>
      <form className="form" onSubmit={handleSubmit(handleSingIn)}>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            control={control}
            placeholder="Enter your email address"
          />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type={toggleShowPassword ? "text" : "password"}
            name="password"
            placeholder="Please enter your password"
            control={control}
          >
            {toggleShowPassword ? (
              <IconEyeOpen
                onClick={() => setToggleShowPassword(false)}
              ></IconEyeOpen>
            ) : (
              <IconEyeClose
                onClick={() => setToggleShowPassword(true)}
              ></IconEyeClose>
            )}
          </Input>
        </Field>
        <div className="question">
          You haven't an account?{" "}
          <NavLink to={"/sign-up"}>Register an account</NavLink>
        </div>
        <Button
          style={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
