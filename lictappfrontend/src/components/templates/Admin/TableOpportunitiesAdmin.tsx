import { useEffect, useState } from "react";
import useSWR from "swr";
import {
  deleteOpportunity,
  opportunitiesGetApi,
} from "../../../service/Oppotunities/OpportunitiesApi";
import { OpportunityInterface } from "../../../interface/opportunities/Interface";
import { TableBase } from "../../molecules/TableBase";
import { formatDateTime } from "../../../lib/helpers/DateHelper";
import { ActionIcon, Button, Input } from "@mantine/core";
import { BsSearch } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import { PanelAgregarOpportunities } from "./PanelAgregarOpportunities";
import { FaTrash } from "react-icons/fa";

export const TableOpportunitiesAdmin = () => {
  const [searchProduct, setSearchProduct] = useState<string>("");

  const {
    data: dataOpp,
    isLoading: loadingOpp,
    mutate: mutateOpp,
    error: errorOpp,
  } = useSWR(`/opportunity/all?search=${searchProduct}`, opportunitiesGetApi, {
    revalidateOnFocus: false,
    revalidateIfStale: true,
  });

  const [dataOpportunities, setDataOpportunities] =
    useState<OpportunityInterface[]>();

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (dataOpp) {
      setDataOpportunities(dataOpp);
    }
  }, [dataOpp, loadingOpp]);

  const columns = [
    { uid: "code", name: "Codigo" },
    { uid: "title", name: "Titulo" },
    { uid: "type", name: "Tipo" },
    { uid: "publish_date", name: "Fecha de publicacion" },
    { uid: "close_date", name: "Fecha de expiracion" },
    { uid: "actions", name: "Acciones" },
  ];

  const renderCell = (item: any, columnKey: string) => {
    switch (columnKey) {
      case "code":
        return <span>{item.code}</span>;

      case "title":
        return <span className="">{item.title}</span>;

      case "type":
        return <span className="text-sm">{item.type.name}</span>;

      case "publish_date":
        return <span>{formatDateTime(item.publish_date)}</span>;

      case "close_date":
        return <span>{formatDateTime(item.close_date)}</span>;

      case "actions":
        return (
          <div className="flex justify-center">
            <ActionIcon
              variant="light"
              size="xl"
              color="red"
              aria-label="Gradient action icon"
              onClick={() => {
                const userId: string = item._id;
                deleteOpportunity({ userId, ActulizarTable });
              }}
            >
              <FaTrash />
            </ActionIcon>
          </div>
        );

      default:
        return item[columnKey as keyof typeof item];
    }
  };

  const ActulizarTable = async () => {
    await mutateOpp();
  };

  return (
    <>
      <div className="flex flex-col gap-2 mb-5">
        <span className="text-3xl font-bold">Oportunidades</span>
        <span>Aca se muestran todas la oportunidades</span>
      </div>

      <div className="py-2 flex justify-between">
        <Input
          className="w-96"
          placeholder="Buscar por nombre"
          onChange={(event: any) => {
            setSearchProduct(event.currentTarget.value)
          }}
          leftSection={<BsSearch></BsSearch>}
        />
        <Button
          leftSection={<MdAdd size={14} />}
          variant="default"
          onClick={open}
        >
          Agregar
        </Button>
      </div>

      <TableBase
        data={dataOpportunities ?? []}
        columns={columns}
        isLoading={loadingOpp}
        renderCell={renderCell}
      />

      <PanelAgregarOpportunities
        opened={opened}
        close={close}
        ActulizarTable={ActulizarTable}
      ></PanelAgregarOpportunities>
    </>
  );
};
