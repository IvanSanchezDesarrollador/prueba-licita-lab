import { Button, Combobox, Input, InputBase, useCombobox } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import React, { useEffect, useState } from "react";
import { TypeOpportunityInterface } from "../../interface/opportunities/Interface";
import { typeOpportunitiesGetApi } from "../../service/typeOpportunities/TypeOpportunitiesApi";
import useSWR from "swr";

export const FiltroBase = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setSelectedType,
  selectedType,
  applyFilters,
  borrarFiltro,
  errorFiltro,
}: {
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedType: {
    id: string;
    name: string;
  } | null;
  setSelectedType: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
    } | null>
  >;
  applyFilters: () => void;
  borrarFiltro: () => void;
  errorFiltro: string;
}) => {
  const { data: dataTypeOpp, isLoading: loadingTypeOpp } = useSWR(
    `/typeopportunities/all`,
    typeOpportunitiesGetApi,
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
    }
  );

  const [typeOpportunity, setTypeOpportunity] = useState<
    TypeOpportunityInterface[]
  >([]);

  useEffect(() => {
    if (dataTypeOpp) {
      setTypeOpportunity(dataTypeOpp);
    }
  }, [dataTypeOpp, loadingTypeOpp]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const handleSelect = (val: string) => {
    combobox.closeDropdown();
    const selected = typeOpportunity?.find((item) => item._id === val);
    if (selected) {
      setSelectedType({ id: selected._id, name: selected.name });
    }
  };

  return (
    <div className="w-full bg-cyan-100 flex flex-col gap-3 px-2.5 py-5 rounded-lg">
      <h3 className="text-3xl font-medium">Filtros</h3>

      <DatePickerInput
        label="Fecha Inicial"
        value={startDate}
        onChange={setStartDate}
        placeholder="Agregar fecha"
      />
      <DatePickerInput
        label="Fecha Final"
        value={endDate}
        onChange={setEndDate}
        placeholder="Agregar fecha"
      />

      <Combobox
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
          <Combobox.Options>
            {typeOpportunity?.map((item) => (
              <Combobox.Option value={item._id} key={item.name}>
                {item.name}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      <Button onClick={applyFilters}>Aplicar Filtros</Button>

      <Button onClick={borrarFiltro} color="orange">
        Borrar Filtro
      </Button>
      {errorFiltro}
    </div>
  );
};
