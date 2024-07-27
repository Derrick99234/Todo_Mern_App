import React, { useState } from "react";
import { CgCheck } from "react-icons/cg";
import { AiOutlineDelete } from "react-icons/ai";

export interface TodoCardsProps {
  todoName: string;
  dueDate: string;
  priority?: string;
  status: string;
}

// const [priority, setPriority] = useState("medium");
// const [todoName, setTodoName] = useState("");

const TodoCards: React.FC<TodoCardsProps> = ({ todoName, status }) => {
  const [updatedStatus, setUpdatedStatus] = useState(status);
  const onEdit = () => {};
  const onDelete = () => {};
  const onUpdateStatus = () =>
    updatedStatus === "completed"
      ? setUpdatedStatus("onGoing")
      : setUpdatedStatus("completed");
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="border bg-white hover:shadow-xl p-4 transition-all rounded-lg ease-in-out max-w-[600px] w-[500px] min-w-[350px]">
        <div className="flex justify-between items-center" onClick={onEdit}>
          <div className="flex gap-4 items-center">
            <CgCheck
              className={`text-white font-medium text-2xl ${
                updatedStatus == "completed"
                  ? "bg-green-800 text-white"
                  : "text-white border-2 cursor-pointer border-gray-800"
              } rounded-full`}
              onClick={onUpdateStatus}
            />
            <div>
              <h6 className="text-2xl font-semibold font-mono">{todoName}</h6>
              {/* <span className="text-xs text-slate-500">{dueDate}</span> */}
            </div>
          </div>
          <AiOutlineDelete
            className="icon-btn font-semibold text-xl text-red-500"
            onClick={onDelete}
          />
        </div>
        {/* <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <MdCreate
              className="icon-btn hover:text-green-600"
              onClick={onEdit}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TodoCards;
