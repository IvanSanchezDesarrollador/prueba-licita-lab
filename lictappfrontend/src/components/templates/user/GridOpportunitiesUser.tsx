import useSWR from "swr";
import { opportunitiesGetApi } from "../../../service/Oppotunities/OpportunitiesApi";
import { useEffect, useState } from "react";
import {
  OpportunityInterface,
} from "../../../interface/opportunities/Interface";
import {
  Button,
  Card,
  Group,
  Text,
} from "@mantine/core";
import { formatDateTime } from "../../../lib/helpers/DateHelper";
import { FaHeart } from "react-icons/fa";
import { followCreate } from "../../../service/follow/FollowApi";
import { FiltroBase } from "../../molecules/FiltroBase";



export const GridOpportunitiesUser = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedType, setSelectedType] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [queryParamsPost, setQueryParamsPost] = useState<string>("");

  const {
    data: dataOpp,
    isLoading: loadingOpp,
    mutate: mutateOpp,
    error: errorOpp,
  } = useSWR(
    () => {
      const queryParamsString = queryParamsPost;
      const query = queryParamsString ? `${queryParamsString}` : "";
      return `/opportunity${query}`;
    },
    opportunitiesGetApi,
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
    }
  );

  const [dataOppt, setDataOppt] = useState<OpportunityInterface[]>([]);


  useEffect(() => {
    if (dataOpp) {
      setDataOppt(dataOpp);
    }
  }, [dataOpp, loadingOpp]);




  const [errorFiltro, setErrorFiltro] = useState<string>("");

  const applyFilters = async () => {
    setErrorFiltro("");
    setQueryParamsPost("");

    let newQuery = "";

    if (startDate && !endDate) {
      setErrorFiltro("Debe ingresar la fecha final.");
      return;
    }

    if (!startDate && endDate) {
      setErrorFiltro("Debe ingresar la fecha inicial.");
      return;
    }

    if (startDate && endDate) {
      if (endDate > startDate) {
        newQuery += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
      } else {
        setErrorFiltro("La fecha final tiene que ser mayor que la inicial.");
        return;
      }
    }

    if (selectedType?.id) {
      newQuery += newQuery
        ? `&type=${selectedType.id}`
        : `?type=${selectedType.id}`;
    }

    setQueryParamsPost(newQuery);

    await mutateOpp();
  };

  console.log(queryParamsPost);
  if (errorOpp) {
    return <div>Hay un error al obtener las oportunidades</div>;
  }

  const borrarFiltro = () => {
    setQueryParamsPost("");
    setStartDate(null);
    setEndDate(null);
    setSelectedType(null);
  };

  return (
    <div className="w-full flex">
      {/* Sidebar con filtros */}
      <div className="w-1/4">
        <FiltroBase
          applyFilters={applyFilters}
          borrarFiltro={borrarFiltro}
          endDate={endDate}
          errorFiltro={errorFiltro}
          selectedType={selectedType}
          setEndDate={setEndDate}
          setSelectedType={setSelectedType}
          setStartDate={setStartDate}
          startDate={startDate}
        ></FiltroBase>
      </div>


      <div className="w-3/4 px-3">
        <h2 className="text-2xl font-medium">Nuevas Oportunidades para ti</h2>
        <Text size="lg">Aquí se muestran las nuevas oportunidades para ti</Text>

        <div className="grid grid-cols-3 gap-4 mt-5">
          {dataOppt.map((item) => (
            <Card
              key={item._id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{item.title}</Text>
              </Group>

              <Group>
                <div className="w-full flex justify-between">
                  <Text size="sm">Tipo: {item.type.name.toUpperCase()}</Text>
                  <Text size="sm" c="dimmed">
                    Cod: {item.code}
                  </Text>
                </div>
              </Group>

              <Group>
                <div className="w-full flex flex-col justify-between mt-3">
                  <Text size="sm">
                    Fecha publicación: {formatDateTime(item.publish_date)}
                  </Text>
                  <Text size="sm">
                    Fecha de expiración: {formatDateTime(item.close_date)}
                  </Text>
                </div>
              </Group>

              <Button
                leftSection={<FaHeart />}
                color="pink"
                fullWidth
                mt="md"
                radius="md"
                onClick={() => {
                  const opptortunityId = item._id;
                  followCreate({ opptortunityId, actulizarTable: mutateOpp });
                }}
              >
                Seguir
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
