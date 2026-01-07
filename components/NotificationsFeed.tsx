"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useNotifications } from "@/hooks/useNotifications";
import { AiFillNotification } from "react-icons/ai";

const NotificationsFeed = () => {
  const { data } = useCurrentUser();
  const currentUser = data?.data;

  const { data: notifications } = useNotifications(currentUser?.id);
  const notificationsData = notifications?.notifications || [];

  if (notificationsData.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {notificationsData.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b border-neutral-800"
        >
          <AiFillNotification
            // color="white"
            size={25}
            className="text-secondary"
          />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
