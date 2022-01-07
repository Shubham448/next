import { NotificationManager } from "react-notifications";

export default function ToggleNotification(type, message) {
  const renderNotification = () => {
    switch (type) {
      ////////////////// Success Notifications /////////////////////////////

      case "Success Login":
        return NotificationManager.success(
          "You have been successfully Logged In",
          "Login Successfull",
          2000
        );

      /////////////////// Error Notifications //////////////////////////////////////

      case "Error":
        return NotificationManager.error(
          message ? message : "Particular action cannot be performed right now",
          "Error",
          2000
        );

      default:
        return {};
    }
  };
  return renderNotification();
};
