import { Notification } from "@mantine/core";
import { NotificationComponet } from "../../interface";
import clsx from "clsx";

export const NotificationBase = ({
  objetoNotification,
  isVisibleNotification,
  setIsVisibleNotification,
  position,
  zindex,
}: NotificationComponet) => {
  return (
    <div
      style={!position ? { position: "fixed" } : { position: `${position}` }}
      className={clsx(
        `${zindex} top-0 right-0 left-0  transition-transform duration-300 ease-in-out transform`,
        isVisibleNotification
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 "
      )}
    >
      <Notification
        onClose={() => {
          setIsVisibleNotification(false);
        }}
        color={objetoNotification.color}
        title={objetoNotification.message}
      ></Notification>
    </div>
  );
};
