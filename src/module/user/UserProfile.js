import { Button } from "components/button";
import { Field } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";

const UserProfile = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: "onChange" });
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const [params] = useSearchParams();
  const userId = params.get("id");
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  async function deleteAvatar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  const updateUserHandler = async (values) => {
    if (!isValid) return;
    console.log(values);
    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        avatar: image,
        fullname: values.fullname,
        username: slugify(values.username || values.fullname, {
          lower: true,
          replacement: " ",
          trim: true,
        }),
        birthday: values.birthday,
        phone: values.phone,
        email: values.email,
        password: values.password,
      });
      toast.success("Update user info is successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Cant update user!");
    }
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "users", userId);
      const docData = await getDoc(colRef);
      reset(docData.data());
    }
    fetchData();
  }, [reset, userId]);
  if (!userId) return null;
  return (
    <div>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(updateUserHandler)}>
        <div className="w-[200px] h-[200px] mx-auto rounded-full text-center mb-10">
          <ImageUpload
            className="!rounded-full h-full"
            progress={progress}
            image={image}
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Date of Birth</Label>
            <Input
              control={control}
              name="birthday"
              placeholder="dd/mm/yyyy"
            ></Input>
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              control={control}
              name="password"
              type="password"
              placeholder="Enter your password"
            ></Input>
          </Field>
        </div>
        <Button
          disabled={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
          kind="primary"
          className="mx-auto w-[200px]"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
