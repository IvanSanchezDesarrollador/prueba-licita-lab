import {
  Button,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import {NotificaionInterface } from "../../interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterUser } from "../../service/auth/Login";
import { useState } from "react";
import { NotificationBase } from "../atoms/NotificationBase";
import { RegisterInterface } from "../../interface/register/Interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

export const RegisterBase = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInterface>();

  const dispatch = useDispatch<AppDispatch>()
  const [isVisibleNotification, setIsVisibleNotification] =
    useState<boolean>(false);
  const [objetoNotification, setObjetoNotification] =
    useState<NotificaionInterface>({
      color: "green",
      message: "sdcasdcasc",
    });
  const [loginloader, setLoginLoader] = useState<boolean>(false);

  const onSubmit: SubmitHandler<RegisterInterface> = (datalogin) => {
    setIsVisibleNotification(false);
    setLoginLoader(true);
    RegisterUser({
      datalogin,
      setLoginLoader,
      setIsVisibleNotification,
      objetoNotification,
      setObjetoNotification,
      dispatch
    });
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <h1 className="text-2xl font-semibold text-center">BIENVENIDO</h1>
      <Text c="dimmed" size="" className="text-center">
        Introdusca su email y contraseña para continuar
      </Text>

      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <TextInput
            {...register("name", { required: true })}
            label="Nombre"
            radius="xs"
            size="md"
            placeholder="Input component"
          />
          {errors.name && <Text c="dimmed">El nombre es requerido</Text>}
        </div>

        <div className="flex flex-col gap-1">
          <TextInput
            {...register("email", { required: true })}
            label="Email"
            radius="xs"
            size="md"
            placeholder="Input component"
          />
          {errors.email && <Text c="dimmed">El email es requerido</Text>}
        </div>

        <div className="flex flex-col gap-1">
          <PasswordInput
            {...register("password", { required: true })}
            size="md"
            label="Contraseña"
            placeholder="Input placeholder"
          />
          {errors.password && (
            <Text c="dimmed">La contraseña es requerida</Text>
          )}
        </div>

        <Button
          className="mt-3 z-50"
          size="md"
          variant="gradient"
          loading={loginloader}
          loaderProps={{ type: "oval" }}
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
          onClick={() => {
            handleSubmit(onSubmit)();
          }}
        >
          Registar
        </Button>
      </div>

      <div className="w-full relative h-44">
        <NotificationBase
          objetoNotification={objetoNotification}
          isVisibleNotification={isVisibleNotification}
          setIsVisibleNotification={setIsVisibleNotification}
          position="absolute"
          zindex="z-10"
        ></NotificationBase>
      </div>
    </div>
  );
};
