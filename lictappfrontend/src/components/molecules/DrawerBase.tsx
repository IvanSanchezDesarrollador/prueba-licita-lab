import { Drawer } from "@mantine/core";
import { ReactNode } from "react";

export const DrawerBase = ({
  opened,
  close,
  children,
}: {
  opened: boolean;
  close: () => void;
  children: ReactNode;
}) => {
  return (
    <Drawer
      opened={opened}
      position="right"
      size="lg"
      onClose={close}
      title={<span className="text-2xl">Agregar Oportunidad</span>}
  
    >
      {children}
    </Drawer>
  );
};
