type color = "red" | "green" | "orange";

type position = "absolute" | "fixed" | "sticky";

export interface NotificaionInterface {
  message: string;
  color: color;
}

export interface NotificationComponet {
  objetoNotification: NotificaionInterface;
  isVisibleNotification: boolean;
  setIsVisibleNotification: React.Dispatch<React.SetStateAction<boolean>>;
  position?: position;
  zindex: string
}
