import React, { useState } from "react";
import { Text, Img } from "../../components";

interface Props {
  className?: string;
  roomnumber?: string;
  capacity?:  string;
}

export default function AdminRoomInfo({ roomnumber = "Room 1", capacity = "1/2", ...props }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRoomNumber, setEditedRoomNumber] = useState(roomnumber);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedRoomNumber(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-start w-full gap-7 p-[25px] sm:p-5 bg-customdarkgray3 rounded-[15px] w-[279px]`}
    >
      <div className="mt-[13px] flex items-center gap-[18px]">
        {isEditing ? (
          <input
            type="text"
            value={editedRoomNumber}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="bg-white text-black rounded p-1"
            autoFocus
          />
        ) : (
          <Text size="2xl" as="p" className="!text-white font-open-sans">
            {editedRoomNumber}
          </Text>
        )}
        <Img
          src="public/images/editbtn.png"
          alt="edit"
          className="h-[25px] w-[25px] self-end cursor-pointer relative -top-2"
          onClick={handleEditClick}
        />
      </div>
      <div className="flex items-center">
        <Text size="xl" as="p" className="!text-white font-open-sans">
          Capacity: {capacity}
        </Text>
      </div>
    </div>
  );
}
