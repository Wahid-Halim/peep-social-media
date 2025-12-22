"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import { useUser } from "@/hooks/useUser";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";

const EditModal = () => {
  const { data } = useCurrentUser();
  const currentUser = data?.data;

  const { mutateUser } = useUser(currentUser?.id);

  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setProfileImage(currentUser?.profileImage || "");
    setCoverImage(currentUser?.coverImage || "");
    setName(currentUser?.name || "");
    setUsername(currentUser?.username || "");
    setBio(currentUser?.bio || "");
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      mutateUser.mutate({
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });
      toast.success("Updated");
      editModal.onClose();
    } catch (error) {
      toast.error("Something went wrong ");
    } finally {
      setIsLoading(false);
    }
  }, [username, name, bio, profileImage, coverImage, mutateUser, editModal]);
  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your Profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
    />
  );
};

export default EditModal;
