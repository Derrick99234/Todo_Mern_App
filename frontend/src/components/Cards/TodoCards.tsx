import React, { useState } from "react";
import { CgCheck } from "react-icons/cg";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import axiosInstance from "../../utils/axiosInstance";

export interface TodoCardsProps {
  todoName: string;
  dueDate: string;
  priority: string;
  status: string;
  _id: string;
  onDelete: () => void;
  onEdit: () => void;
}

// const [priority, setPriority] = useState("medium");
// const [todoName, setTodoName] = useState("");

const TodoCards: React.FC<TodoCardsProps> = ({
  todoName,
  status,
  onDelete,
  onEdit,
  _id,
}) => {
  const [updatedStatus, setUpdatedStatus] = useState(status);

  const onUpdateStatus = async () => {
    const newStatus = updatedStatus === "completed" ? "onGoing" : "completed";

    setUpdatedStatus(newStatus);

    try {
      const response = await axiosInstance.put(`/app/edit_todo/${_id}`, {
        status: newStatus,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border bg-white hover:shadow-xl  cursor-pointer p-4 mb-3 transition-all rounded-lg ease-in-out max-w-[600px] w-[500px] min-w-[350px]">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <CgCheck
            className={`text-white font-medium text-2xl p-1 ${
              updatedStatus == "completed"
                ? "bg-green-600 text-white"
                : "text-white border-2 cursor-pointer border-gray-800"
            } rounded-full`}
            onClick={onUpdateStatus}
          />
          <div>
            <h6
              className={`text-2xl font-semibold font-mono ${
                updatedStatus == "completed" && "line-through"
              }`}
            >
              {todoName}
            </h6>
            {/* <span className="text-xs text-slate-500">{dueDate}</span> */}
          </div>
        </div>

        <div className="flex gap-2">
          <CiEdit
            className="icon-btn font-semibold text-xl text-primary"
            onClick={onEdit}
          />
          <AiOutlineDelete
            className="icon-btn font-semibold text-xl text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
