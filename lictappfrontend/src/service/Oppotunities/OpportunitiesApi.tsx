import { NotificaionInterface } from "../../interface";
import { AddOpportunityInterface } from "../../interface/opportunities/Interface";
import api from "../../lib/http/Axios";

export const opportunitiesGetApi = async (url: any) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
};

export const AddOpportunity = async ({
  dataOPP,
  setLoader,
  setIsVisibleNotification,
  objetoNotification,
  setObjetoNotification,
  ActulizarTable,
}: {
  dataOPP: AddOpportunityInterface;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVisibleNotification: React.Dispatch<React.SetStateAction<boolean>>;
  objetoNotification: NotificaionInterface;
  setObjetoNotification: React.Dispatch<
    React.SetStateAction<NotificaionInterface>
  >;
  ActulizarTable: () => void;
}) => {
  await api
    .post("/opportunity/create", dataOPP)
    .then((res: any) => {
      console.log(res);

      setIsVisibleNotification(true);
      setObjetoNotification({
        ...objetoNotification,
        message: `Se registro correctamente`,
        color: "green",
      });

      setLoader(false);

      ActulizarTable();

      setTimeout(() => {
        setIsVisibleNotification(false);
      }, 2000);
    })
    .catch((error) => {
      setLoader(false);
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

export const deleteOpportunity = async ({
  userId,
  ActulizarTable,
}: {
  userId: string;
  ActulizarTable: () => void;
}) => {
  try {
    await api.delete(`/opportunity/${userId}`);
    ActulizarTable(); // Actualiza la tabla después de eliminar
  } catch (error) {
    console.error("Error al eliminar la oportunidad:", error);
  }
};