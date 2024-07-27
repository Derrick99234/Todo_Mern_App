import { useEffect, useState } from "react";
import EmptyCard from "../components/EmptyCard/EmptyTodo";
import emptyList from "../assets/emptyList.png";
import NavBar from "../components/NavBar/NavBar";
import axiosInstance from "../utils/axiosInstance";
import { UserData } from "../components/NavBar/NavBar";
import { BiPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import AddTodoPopup from "../components/AddTodoPopup/AddTodoPopup";
import { useNavigate } from "react-router-dom";
import TodoCards from "../components/Cards/TodoCards";
import { TodoCardsProps } from "../components/Cards/TodoCards";

function Dashboard() {
  const [allTodos, setAllTodos] = useState<TodoCardsProps[]>([]);
  const [showAddTodoPopup, setShowAddTodoPopup] = useState(false);
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosInstance.get("/user/get_user");
        console.log(response);
        if (response.data.user) {
          setUser(response.data.user);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };

    getUser();
  }, [navigate]);

  const getAllTodos = async () => {
    try {
      const response = await axiosInstance.get("/app/get_todo");
      if (response.data && response.data.todo) {
        setAllTodos(response.data.todo);
      }
    } catch (e) {
      console.log(
        "An Unexpected error while trying to get all todos, Please try again"
      );
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div>
      {
        <>
          <main className="bg-gray-900 h-screen">
            <NavBar userData={user} />
            {allTodos && allTodos.length > 0 ? (
              allTodos.map((todo, index) => (
                <TodoCards
                  dueDate={todo.dueDate}
                  status={todo.status}
                  todoName={todo.todoName}
                  priority={todo.priority}
                  key={index}
                />
              ))
            ) : (
              <EmptyCard
                imgSrc={emptyList}
                message={`Click the 'Add' button to start creating your tasks, reminders, and ideas. Let’s get organized and make managing your day a breeze!.`}
              />
            )}
            {showAddTodoPopup && (
              <AddTodoPopup setShowAddTodoPopup={setShowAddTodoPopup} />
            )}
            <button
              className="bg-primary text-white p-2 text-3xl rounded-full fixed bottom-10 right-20"
              onClick={() => setShowAddTodoPopup((prev) => !prev)}
            >
              {showAddTodoPopup ? <CgClose /> : <BiPlus />}
            </button>
          </main>
        </>
      }
    </div>
  );
}

export default Dashboard;
