import {
  FormEvent,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { BiCheckCircle } from "react-icons/bi";
import axiosInstance from "../../utils/axiosInstance";

export type dataT = {
  todoName: string;
  dueDate: string;
  priority: string;
  _id: string
};

export type PopupState<dataT> = {
  isShown: boolean;
  type: string;
  data: dataT | null;
};

function AddTodoPopup({
  setShowAddTodoPopup,
  type,
  data,
  getAllTodos,
}: {
  setShowAddTodoPopup: Dispatch<SetStateAction<PopupState<dataT>>>;
  type: string;
  data: dataT | null;
  getAllTodos?: () => void;
}) {
  const [priority, setPriority] = useState(data?.priority || "medium");
  const [todoName, setTodoName] = useState(data?.todoName || "");
  const [dueDate, setDueDate] = useState(data?.dueDate || "");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (type === "edit" && data) {
        const response = await axiosInstance.put(`/app/edit_todo/${data._id}`, {
          todoName,
          dueDate,
          priority,
        });
        console.log(response.data);
      } else {
        const response = await axiosInstance.post("/app/create_todo", {
          todoName,
          dueDate,
          priority,
        });
        console.log(response.data);
      }
      setShowAddTodoPopup({
        isShown: false,
        type: "add",
        data: null,
      });
      if (getAllTodos) getAllTodos();
    } catch (error) {
      console.log(error);
    }
  };

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (data?.dueDate) {
      setDueDate(formatDate(data.dueDate));
    }
  }, [data?.dueDate]);

  return (
    <div className="bg-black/20 fixed inset-0 flex items-center justify-center">
      <form className="p-5 rounded-md bg-white" onSubmit={handleSubmit}>
        <h2 className="font-mono text-2xl font-bold">
          {type === "edit" ? "Edit Todo" : "Add New Todo"}
        </h2>
        <input
          type="text"
          placeholder="Task"
          name="todoName"
          value={todoName}
          className="w-full p-2 placeholder:text-gray-700 text-[#333] my-3 border-b-2 outline-none"
          onChange={(e) => setTodoName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Due Date"
          className="w-full p-2 placeholder:text-gray-700 text-[#333] my-3 border-b-2 outline-none"
          name="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="flex items-center gap-4 mt-5">
          <div
            className={`py-1 px-2 relative cursor-pointer rounded-lg text-lg border-2 border-red-800 bg-red-200 text-red-600 ${
              priority === "low" ? "border-red-800" : ""
            }`}
            onClick={() => setPriority("low")}
          >
            {priority === "low" && (
              <BiCheckCircle className="absolute -top-4 -right-4" />
            )}
            low
          </div>
          <div
            className={`py-1 px-2 relative cursor-pointer rounded-lg text-lg border-2 border-yellow-800 bg-yellow-200 text-yellow-600 ${
              priority === "medium" ? "border-yellow-800" : ""
            }`}
            onClick={() => setPriority("medium")}
          >
            {priority === "medium" && (
              <BiCheckCircle className="absolute -top-4 -right-4" />
            )}
            medium
          </div>
          <div
            className={`py-1 px-2 relative cursor-pointer rounded-lg text-lg border-2 border-green-800 bg-green-200 text-green-600 ${
              priority === "high" ? "border-green-800" : ""
            }`}
            onClick={() => setPriority("high")}
          >
            {priority === "high" && (
              <BiCheckCircle className="absolute -top-4 -right-4" />
            )}
            high
          </div>
        </div>
        <button className="bg-gray-900 py-2 w-full rounded-md text-white font-semibold mt-8">
          {type === "edit" ? "Edit Todo" : "Create Todo"}
        </button>
      </form>
    </div>
  );
}

export default AddTodoPopup;
