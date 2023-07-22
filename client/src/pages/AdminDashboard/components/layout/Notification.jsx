import React from 'react'
import { MdOutlineCancel } from "react-icons/md";

import Button from "./Button";
import { chatData } from "./data/dummy";
import { useAdminContext } from "../../context/AdminContextProvider";

const Notification = () => {
  const { currentColor } = useAdminContext();

    return (
      <div className="drop_down_panel notification_panel">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <p className="">Notifications</p>
            <button type="button" className="">
              {" "}
              5 New
            </button>
          </div>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>
        <div className="notification_items">
          {chatData?.map((item, index) => (
            <div
              key={index}
              className="notification_item"
            >
              <img
                className="avatar"
                src={item.image}
                alt={item.message}
              />
              <div>
                <p className="">
                  {item.message}
                </p>
                <p className="">
                  {" "}
                  {item.desc}{" "}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-5">
            <Button
              color="white"
              bgColor={currentColor}
              text="See all notifications"
              borderRadius="10px"
              width="full"
            />
          </div>
        </div>
      </div>
    );
}

export default Notification