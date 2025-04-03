import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ActionIcon, Button } from "@mantine/core";
import { FaTrash } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { logout } from "../../redux/authSlice";
import { logoutUser } from "../../service/auth/Login";
import { clearUser } from "../../redux/userSlice";

export const DashboardLayout = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navidate = useNavigate();

  const linkAdmin = [
    {
      id: 1,
      name: "Perfil",
      link: "/profile",
    },
    {
      id: 2,
      name: "Oportunidades",
      link: "/opportunities-admin",
    },
  ];

  const linkUser = [
    {
      id: 1,
      name: "Perfil",
      link: "/profile",
    },
    {
      id: 2,
      name: "Oportunidades",
      link: "/opportunities-new",
    },
    {
      id: 3,
      name: "Mis Oportunidades",
      link: "/opportunities-user",
    },
  ];

  return (
    <div className="h-screen w-full flex">
      <div className="w-1/6 h-full flex flex-col border-r-2 border-gray-200">
        <div className="w-full h-1/9 border-b-2 border-gray-200 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-medium">LicitAPP</span>
          </div>
        </div>
        <div className="w-full h-8/9">
          <div className="w-full flex flex-col gap-3 px-3 py-4">
            {user?.role == "User" ? (
              <>
                {linkUser.map((link) => (
                  <Link key={link.id} to={link.link}>
                    <div className="bg-cyan-500 py-3 px-1 rounded-md text-amber-50 font-medium">
                      {link.name}
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <>
                {linkAdmin.map((link) => (
                  <Link key={link.id} to={link.link}>
                    <div className="bg-cyan-500 py-3 px-1 rounded-md text-amber-50 font-medium">
                      {link.name}
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="w-5/6 h-full">
        <div className="w-full h-1/9  border-b-2 border-gray-200 flex justify-end items-center px-20">
          <Button
            variant="light"
            size="xl"
            color="orange"
            aria-label="Gradient action icon"
            rightSection={<FaSignOutAlt size={14} />}
            onClick={() => {
              logoutUser();
              dispatch(logout());
              dispatch(clearUser());
              navidate("/");
            }}
          >
            Salir
          </Button>
        </div>
        <div className="w-full h-8/9 px-8 py-4 overflow-y-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};
