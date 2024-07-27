import { FormEvent, useState, Dispatch, SetStateAction } from "react";
import { BiCheckCircle } from "react-icons/bi";
import axiosInstance from "../../utils/axiosInstance";

function AddTodoPopup({
  setShowAddTodoPopup,
}: {
  setShowAddTodoPopup: Dispatch<SetStateAction<boolean>>;
}) {
  const [priority, setPriority] = useState("medium");
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/app/create_todo", {
        todoName,
        dueDate,
        priority,
      });
      if (!response.data.error) {
        setShowAddTodoPopup(false);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-black/20 fixed inset-0 flex items-center justify-center">
      <form className="p-5 rounded-md bg-white" onSubmit={handleSubmit}>
        <h2 className="font-mono text-2xl font-bold">ADD NEW</h2>
        <input
          type="text"
          placeholder="Task"
          name="todoName"
          className="w-full p-2 placeholder:text-gray-700 text-[#333] my-3 border-b-2 outline-none"
          onChange={(e) => setTodoName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Task"
          className="w-full p-2 placeholder:text-gray-700 text-[#333] my-3 border-b-2 outline-none"
          name="dueData"
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="flex items-center gap-4 mt-5">
          <div
            className="py-1 px-2 relative cursor-pointer rounded-lg text-lg border-2 border-red-800 bg-red-200 text-red-600"
            onClick={() => setPriority("low")}
          >
            {priority === "low" && (
              <BiCheckCircle className="absolute -top-4 -right-4" />
            )}
            low
          </div>
          <div
            className="py-1 px-2 relative cursor-pointer rounded-lg text-lg border-2 border-yellow-800 bg-yellow-200 text-yellow-600"
            onClick={() => setPriority("medium")}
          >
            {priority === "medium" && (
              <BiCheckCircle className="absolute -top-4 -right-4" />
            )}
            medium
          </div>
          <div
            className="py-1 px-2 relative cursor-pointer rounded-lg text-lg border-2 border-green-800 bg-green-200 text-green-600"
            onClick={() => setPriority("high")}
          >
            {priority === "high" && (
              <BiCheckCircle className="absolute -top-4 -right-4" />
            )}
            high
          </div>
        </div>
        <button className="bg-gray-900 py-2 w-full rounded-md text-white font-semibold mt-8">
          Create todo
        </button>
      </form>
    </div>
  );
}
export default AddTodoPopup;
