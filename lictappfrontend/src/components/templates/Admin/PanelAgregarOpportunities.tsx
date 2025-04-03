import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { DrawerBase } from "../../molecules/DrawerBase";
import {
  Button,
  Combobox,
  Input,
  InputBase,
  Select,
  Text,
  TextInput,
  useCombobox,
} from "@mantine/core";
import useSWR from "swr";
import { typeOpportunitiesGetApi } from "../../../service/typeOpportunities/TypeOpportunitiesApi";
import {
  AddOpportunityInterface,
  TypeOpportunityInterface,
} from "../../../interface/opportunities/Interface";
import { DatePickerInput } from "@mantine/dates";
import { SubmitHandler, useForm } from "react-hook-form";
import { NotificationBase } from "../../atoms/NotificationBase";
import { NotificaionInterface } from "../../../interface";
import { AddOpportunity } from "../../../service/Oppotunities/OpportunitiesApi";

export const PanelAgregarOpportunities = ({
  opened,
  close,
  ActulizarTable,
}: {
  opened: boolean;
  close: () => void;
  ActulizarTable: () => void;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddOpportunityInterface>();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const {
    data: dataTypeOpp,
    isLoading: loadingTypeOpp,
    mutate: mutateOppType,
    error: errorOppType,
  } = useSWR(`/typeopportunities/all`, typeOpportunitiesGetApi, {
    revalidateOnFocus: false,
    revalidateIfStale: true,
  });

  

  const [typeOpportunity, setTypeOpportunity] =
    useState<TypeOpportunityInterface[]>();

  const [objetoNotification, setObjetoNotification] =
    useState<NotificaionInterface>({
      color: "green",
      message: "sdcasdcasc",
    });

  const [isVisibleNotification, setIsVisibleNotification] =
    useState<boolean>(false);

  const [loader, setLoader] = useState<boolean>(false);

  const [selectedType, setSelectedType] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [valuefp, setValuefp] = useState<Date | null>(null);
  const [valuefe, setValuefe] = useState<Date | null>(null);

  useEffect(() => {
    if (dataTypeOpp) {
      setTypeOpportunity(dataTypeOpp);
    }
  }, [dataTypeOpp, loadingTypeOpp]);

  const options = typeOpportunity?.map((item) => (
    <Combobox.Option value={item._id} key={item.name}>
      {item.name}
    </Combobox.Option>
  ));

  const handleSelect = (val: string) => {
    setValue("type", val, { shouldValidate: true });
    combobox.closeDropdown();
    const selected = typeOpportunity?.find((item) => item._id === val);
    if (selected) {
      setSelectedType({ id: selected._id, name: selected.name });
    }
  };

  useEffect(() => {
    if (!opened) {
      clearForm();
    }
  }, [opened]);

  const onSubmit: SubmitHandler<AddOpportunityInterface> = (data) => {
    const dataOPP: AddOpportunityInterface = {
      ...data,
      publish_date: valuefp?.toISOString() ?? "",
      close_date: valuefe?.toISOString() ?? "",
    };

    AddOpportunity({
      dataOPP,
      setLoader,
      setIsVisibleNotification,
      objetoNotification,
      setObjetoNotification,
      ActulizarTable,
    });

    console.log(dataOPP);
  };

  const clearForm = () => {
    reset();
    setSelectedType(null);
    setValuefp(null);
    setValuefe(null);
  };
  return (
    <DrawerBase close={close} opened={opened}>
      <>
        <div className="px-2 py-1 flex flex-col gap-5">
          <div className="w-full relative">
            <NotificationBase
              objetoNotification={objetoNotification}
              isVisibleNotification={isVisibleNotification}
              setIsVisibleNotification={setIsVisibleNotification}
              position="absolute"
              zindex="z-10"
            ></NotificationBase>
          </div>

          <div className="flex flex-col gap-1 ">
            <TextInput
              {...register("title", { required: true })}
              placeholder="Agregar titulo"
              label="Titulo"
            />
            {errors.title && <Text c="dimmed">El titulo es requerido</Text>}
          </div>

          <div className="flex flex-col gap-1">
            <Combobox
              {...register("type", { required: true })}
              store={combobox}
              withinPortal={false}
              onOptionSubmit={handleSelect}
            >
              <Combobox.Target>
                <InputBase
                  label="Tipo"
                  component="button"
                  type="button"
                  pointer
                  rightSection={<Combobox.Chevron />}
                  onClick={() => combobox.toggleDropdown()}
                  rightSectionPointerEvents="none"
                >
                  {selectedType?.name || (
                    <Input.Placeholder>Agregar tipo</Input.Placeholder>
                  )}
                </InputBase>
              </Combobox.Target>

              <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>

            {errors.type && <Text c="dimmed">El tipo es requerido</Text>}
          </div>

          <div className="flex flex-col gap-1">
            <DatePickerInput
              {...register("publish_date", { required: true })}
              label="Fecha de publicacion"
              placeholder="Agregar fecha"
              value={valuefp}
              onChange={(value: any) => {
                setValuefp(value);
                setValue("publish_date", value, { shouldValidate: true });
              }}
            />

            {errors.publish_date && (
              <Text c="dimmed">La fecha de publicacion es requerido</Text>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <DatePickerInput
              {...register("close_date", { required: true })}
              label="Fecha de expiracion"
              placeholder="Agregar fecha"
              value={valuefe}
              onChange={(value: any) => {
                setValuefe(value);
                setValue("close_date", value, { shouldValidate: true });
              }}
            />

            {errors.close_date && (
              <Text c="dimmed">La fecha de expiracion es requerido</Text>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              className="mt-3 z-50"
              size="md"
              variant="gradient"
              loading={loader}
              loaderProps={{ type: "oval" }}
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
            >
              Agregar oportunidad
            </Button>
            <Button
              className="mt-3 z-50"
              size="md"
              variant="gradient"
              onClick={close}
              //loading={loginloader}
              loaderProps={{ type: "oval" }}
              gradient={{ from: "red", to: "red", deg: 90 }}
            >
              Cancelar
            </Button>

            <Button
              className="mt-3 z-50"
              size="md"
              variant="light"
              onClick={clearForm}
              //loading={loginloader}
              loaderProps={{ type: "oval" }}
            >
              Borrar datos
            </Button>
          </div>
        </div>
      </>
    </DrawerBase>
  );
};
