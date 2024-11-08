export const formatDate = (isoDate: string): string => {
  const messageDate = new Date(isoDate);
  const now = new Date();

  messageDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffTime = now.getTime() - messageDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return messageDate.toLocaleDateString("en-US", { weekday: "long" });
  } else if (messageDate.getFullYear() !== now.getFullYear()) {
    return messageDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } else {
    return messageDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  }
};
