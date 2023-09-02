import { notification } from "ant-design-vue/es/components";

export const errorNotification = (message: string) => {
  notification.open({
    message: "Ошибка",
    duration: 10,
    description: message,
    class: "error-notification",
  });
};
