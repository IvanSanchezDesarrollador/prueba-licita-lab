import { Text } from "@mantine/core";
import { UserTokenInterface } from "../interface";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const Profile = () => {
  //const user = useSelector((state: RootState) => state.user);
  const user: UserTokenInterface = {
    email: "ivan.sanchez@hotmail.com",
    exp: 12312312,
    iat: 1231232,
    id: "q1234231eqw",
    name: "Ivan Sanchez",
    role: "User",
  };

  return (
    <div>
      <Text>Nombre: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Rol: {user.role}</Text>
    </div>
  );
};
