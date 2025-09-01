"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { useTranslation } from "@/translations/client";

import { useState } from "react";
import { TextInput } from "../common/input-custom";
import { Button } from "../common/button.component";
import { useAuth } from "@/hooks/auth.hook";
import { IUserRequest } from "@/types/common";
import { User } from "lucide-react";

interface IFormInputs {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { authenticate } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRequest>({});

  const { t } = useTranslation();

  const onSubmit = async (data: IFormInputs) => {
    setLoading(true);

    try {
      // ✅ Example: Mock authentication
      const mockEmail = "test@example.com";
      const mockPassword = "123456";

      if (data.email === mockEmail && data.password === mockPassword) {
        const token = "mock-jwt-token"; // Mock token
        authenticate({ token });

        toast.success("تم تسجيل الدخول بنجاح!");
        router.push("/");
      } else {
        toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      }
    } catch  {
      toast.error("حدث خطأ أثناء تسجيل الدخول.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`container mx-auto flex  w-full items-center justify-center gap-6 h-full`}
    >
      <div className="rounded-md border border-[#DCDFE4] flex-[0.5]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-[568px] flex-col rounded-xl bg-white px-14 pb-6 pt-10"
          autoComplete="off"
        >
          <span className="mb-2 text-center text-2xl font-black text-black">
            {t("admin_login")}
          </span>

          <span className="text-center text-sm  leading-5 text-gray-500">
            {t("enter_data_access")}
          </span>

          <div className="my-3" />
          <TextInput
            label={t("username")}
            inputProps={{
              placeholder: t("ahmed_mohammed"),
              ...register("email"),
              className: "bg-[#f3f3f5]",
            }}
            leftIcon={<User className="text-black" />}
            errorMessage={errors.email?.message}
            className="!bg-[#f3f3f5]"
          />

          <div className="my-[10px]" />
          <TextInput
            label={t("password")}
            inputProps={{
              type: "password",
              placeholder: t("password"),
              ...register("password"),
            }}
            errorMessage={errors.password?.message}
          />

          <div className="my-2" />

          <div className="flex w-full">
            <Button
              text={t("login")}
              isLoading={loading}
              type="submit"
              className="!bg-primary"
              // disabled={isPending}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
