import { Text } from "@mantine/core";
import { UserTokenInterface } from "../interface";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const Profile = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      <Text>Nombre: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Rol: {user.role}</Text>
    </div>
  );
};
