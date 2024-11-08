import { useEffect, useState } from "react";

interface IProps {
  avatarUrl?: string;
  className?: string;
}

function Avatar({ avatarUrl, className }: IProps) {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    getAvatar(avatarUrl);
  }, [avatarUrl]);

  const getAvatar = async (avatarUrl?: string) => {
    if (avatarUrl) {
      const res = await fetch(avatarUrl);
      const blob = await res.blob();
      const imageUrl = URL.createObjectURL(blob);

      setAvatar(imageUrl);
    }
  };

  return avatar ? (
    <img className={`object-cover ${className}`} src={avatar} alt="Avatar" />
  ) : (
    <div className={className}></div>
  );
}

export default Avatar;
