import React from "react";
import api from "../../lib/http/Axios";

export const followCreate = async ({
  opptortunityId,
  actulizarTable,
}: {
  opptortunityId: string;
  actulizarTable: () => void;
}) => {
  try {
    await api.post(`/follow/create`, { opportunityId: opptortunityId });
    actulizarTable();
  } catch (error) {
    console.error("Error al eliminar la oportunidad:", error);
  }
};

export const unFollowCreate = async ({
  opptortunityId,
  actulizarTable,
}: {
  opptortunityId: string;
  actulizarTable: () => void;
}) => {
  try {
    await api.delete(`/follow/${opptortunityId}`);
    actulizarTable();
  } catch (error) {
    console.error("Error al eliminar la oportunidad:", error);
  }
};
