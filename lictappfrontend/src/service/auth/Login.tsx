import {
  LoginInterface,
  NotificaionInterface,
  UserTokenInterface,
} from "../../interface";
import { TokenClear } from "../../lib/helpers/TokenClear";
import api from "../../lib/http/Axios";
import { AppDispatch } from "../../redux/store";
import { login } from "../../redux/authSlice";
import { RegisterInterface } from "../../interface/register/Interface";
import { setValue } from "../../redux/valueSlice";
import { GetdataToken } from "../../lib/helpers/GetdataToken";

export const LoginUser = async ({
  datalogin,
  navigate,
  setLoginLoader,
  setIsVisibleNotification,
  objetoNotification,
  setObjetoNotification,
  dispatch,
}: {
  datalogin: LoginInterface;
  navigate: (path: string) => void;
  setLoginLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVisibleNotification: React.Dispatch<React.SetStateAction<boolean>>;
  objetoNotification: NotificaionInterface;
  setObjetoNotification: React.Dispatch<
    React.SetStateAction<NotificaionInterface>
  >;
  dispatch: AppDispatch;
}) => {
  try {
    const response = await api.post("/auth/login", datalogin);
    console.log(response);
    const token: string = response.headers["authorization"];

    if (token) {
      dispatch(login(TokenClear(token)));
      setLoginLoader(false);

      navigate("/profile");
    } else {
      setLoginLoader(false);
      setIsVisibleNotification(true);
      setObjetoNotification({
        ...objetoNotification,
        message: "El token no se recibió en los headers.",
        color: "red",
      });
      navigate("/");
    }
  } catch (error: any) {
    console.log(error);
    setLoginLoader(false);
    setIsVisibleNotification(true);
    setObjetoNotification({
      ...objetoNotification,
      message: `${
        error.response ? error.response.data.message : "Error de red"
      }`,
      color: "red",
    });
  }
};

export const RegisterUser = async ({
  datalogin,
  setLoginLoader,
  setIsVisibleNotification,
  objetoNotification,
  setObjetoNotification,
  dispatch,
}: {
  datalogin: RegisterInterface;
  setLoginLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVisibleNotification: React.Dispatch<React.SetStateAction<boolean>>;
  objetoNotification: NotificaionInterface;
  setObjetoNotification: React.Dispatch<
    React.SetStateAction<NotificaionInterface>
  >;
  dispatch: AppDispatch;
}) => {
  await api
    .post("/users/register", datalogin)
    .then((res: any) => {
      console.log(res);

      setIsVisibleNotification(true);
      setObjetoNotification({
        ...objetoNotification,
        message: `Se registro correctamente`,
        color: "red",
      });

      setLoginLoader(false);

      setTimeout(() => {
        dispatch(setValue("1"));
        setIsVisibleNotification(false);
      }, 2000);
    })
    .catch((error) => {
      setLoginLoader(false);
      setIsVisibleNotification(true);
      setObjetoNotification({
        ...objetoNotification,
        message: `${
          error.response ? error.response.data.message : "Error de red"
        }`,
        color: "red",
      });
    });
};

export const logoutUser = async () => {
  await api
    .post("/users/logout")
    .then()
    .catch((error) => {
      console.log("Error", error);
    });
};
