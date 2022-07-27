import React from "react";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import { Field } from "../components/field";
import IconEyeClose from "../components/icon/IconEyeClose";
import { useState } from "react";
import IconEyeOpen from "../components/icon/IconEyeOpen";
import { Button } from "../components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-app/firebase-config";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import { NavLink } from "react-router-dom";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter the valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(6, "password must be at least 6 characters")
    .required("Please enter your password"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
  const handleSignUp = async (values) => {
    console.log(values);
    if (!isValid) return;
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    const colRef = collection(db, "users");
    await addDoc(colRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
    });
    toast.success("Register Successfully");
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
      <form className="form" onSubmit={handleSubmit(handleSignUp)}>
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Please enter your fullname"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Please enter your email address"
            control={control}
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
          You already have an account?{" "}
          <NavLink to={"/sign-in"}>Login here</NavLink>
        </div>
        <Button
          style={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
