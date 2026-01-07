"use client";

import useTweetModal from "@/hooks/useTweetModal";
import Modal from "../Modal";
import Form from "../Form";

const TweetModal = () => {
  const tweetModal = useTweetModal();

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Form
        placeholder="What's happening?"
        onSuccess={() => tweetModal.onClose()}
      />
    </div>
  );

  return (
    <Modal
      isOpen={tweetModal.isOpen}
      onClose={tweetModal.onClose}
      title="Tweet"
      body={bodyContent}
    />
  );
};

export default TweetModal;
