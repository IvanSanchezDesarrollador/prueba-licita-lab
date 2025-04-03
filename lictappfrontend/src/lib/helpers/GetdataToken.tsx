import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserTokenInterface } from "../../interface";

export const GetdataToken = (): UserTokenInterface | null => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    return null;
  }

  try {
    const dataDecodeToken = jwtDecode<UserTokenInterface>(token); 
    return dataDecodeToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
