import React, { ReactNode } from "react";
import { Table, Loader, Text } from "@mantine/core";

type Column = {
  uid: string;
  name: string;
  width?: number;
};

type Data = { [key: string]: any };

type TableProps = {
  data: Data[];
  columns: Column[];
  renderCell?: (item: Data, columnKey: string) => React.ReactNode;
  isLoading: boolean;
};

export const TableBase = ({
  data,
  columns,
  renderCell,
  isLoading,
}: TableProps) => {
  const defaultRenderCell = (item: Data, columnKey: string) =>
    item[columnKey as keyof Data];

  return (
    <div className="border border-gray-300 rounded-md p-2 shadow-sm">
      <Table.ScrollContainer minWidth={500} style={{ height: "38rem" }}>
        <Table striped withRowBorders withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              {columns.map((column) => (
                <Table.Th key={column.uid} style={{ width: column.width }}>
                  {column.name}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {isLoading ? (
              <Table.Tr>
                <Table.Td colSpan={columns.length} className="text-center">
                  <Loader size="sm" color="orange" />{" "}
                  <Text size="sm">Cargando datos...</Text>
                </Table.Td>
              </Table.Tr>
            ) : data.length > 0 ? (
              data.map((item) => (
                <Table.Tr key={item.id}>
                  {columns.map((column) => (
                    <Table.Td key={column.uid}>
                      {renderCell
                        ? renderCell(item, column.uid)
                        : defaultRenderCell(item, column.uid)}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={columns.length} className="text-center">
                  <Text size="sm">No hay datos que mostrar</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
};
