import { FloatingIndicator, Tabs, Text } from "@mantine/core";
import { LoginBase } from "../components/templates/LoginBase";
import { useState } from "react";
import classes from "./Demo.module.css";
import { RegisterBase } from "../components/templates/RegisterBase";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setValue } from "../redux/valueSlice";

export const Login = () => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const value = useSelector((state: RootState) => state.value.value);

  //const [value, setValue] = useState<string | null>("1");

  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <div className="bg-stone-50 h-screen p-4">
      <div className="w-full h-full">
        <div className="w-full h-full flex flex-col justify-center pt-6">
          <div className="w-full h-7/8  flex justify-center ">
            <Tabs
              variant="none"
              value={value}
              onChange={(value:any)=>{
                dispatch(setValue(value))
              }}
              className="b w-1/2"
            >
              <Tabs.List ref={setRootRef} className={classes.list}>
                <Tabs.Tab
                  value="1"
                  ref={setControlRef("1")}
                  className={classes.tab}
                >
                  Login
                </Tabs.Tab>
                <Tabs.Tab
                  value="2"
                  ref={setControlRef("2")}
                  className={classes.tab}
                >
                  Register
                </Tabs.Tab>

                <FloatingIndicator
                  target={value ? controlsRefs[value] : null}
                  parent={rootRef}
                  className={classes.indicator}
                />
              </Tabs.List>

              <Tabs.Panel value="1">
                <LoginBase></LoginBase>
              </Tabs.Panel>

              <Tabs.Panel value="2">
                <RegisterBase></RegisterBase>
              </Tabs.Panel>
            </Tabs>
          </div>

          <div className="w-full h-1/8 flex justify-between items-end px-5">
            <Text c="dimmed">
              ©2025 Licita Inc. Todos los derechos recervados
            </Text>
            <div className="flex gap-3">
              <Text fw={500}>Terminos y condiciones</Text> •
              <Text fw={500}>Politicas de privacidad</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
