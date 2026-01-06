"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useNotifications } from "@/hooks/useNotifications";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

const NotificationsFeed = () => {
  const queryClient = useQueryClient();
  const { data } = useCurrentUser();
  const currentUser = data?.data;

  const { data: notifications } = useNotifications(currentUser?.id);

  const notificationsData = notifications?.data || [];
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["notifications", currentUser?.id],
    });
  }, [queryClient, currentUser?.id]);

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
          {notification.message}
          <BsTwitter color="white" size={32} />
          <p className="text-white">{notificationsData.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
