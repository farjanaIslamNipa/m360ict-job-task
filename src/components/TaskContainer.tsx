/* eslint-disable @typescript-eslint/no-explicit-any */
import {Flex} from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TTask } from "../types";
import { toast } from "sonner";
import {
  deleteTask,
  sortCompleted,
  toggleComplete,
  updateTaskStatus,
} from "../redux/features/taskSlice";
import { useState } from "react";
import DeleteConfirmationModal from "./modals/DeleteConfirmationModal";
import EditTaskModal from "./modals/EditTaskModal";
import TaskFilters from "./TaskFilters";
import NoTaskFound from "./NoTaskFound";
import TaskItem from "./TaskItem";

const TaskContainer = () => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { tasks } = useAppSelector((state) => state.tasks);
  const [task, setTask] = useState<TTask | null>(null);
  const [taskId, setTaskId] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");

  const dispatch = useAppDispatch();

  //FILTERING ACCORDING PRIORITY
  const handlePriorityFilter = (value: string) => {
    setFilterPriority(value);
  };

  const filteredTaskList = tasks.filter((task) => {
    if (filterPriority === "High") {
      return task.priority === filterPriority;
    } else if (filterPriority === "Medium") {
      return task.priority === filterPriority;
    } else if (filterPriority === "Low") {
      return task.priority === filterPriority;
    } else if (filterPriority === "All") {
      return task;
    }
  });


  // HANDLE EDIT MODAL
  const showEditModal = (item: TTask) => {
    setTask(item);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  // HANDLE DELETE MODAL
  const showDeleteModal = (id: string) => {
    setTaskId(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  // DELETE TASK
  const handleDeleteTask = (id: string) => {
    const toastId = toast.loading("Deleting task...");
    dispatch(deleteTask(id));
    toast.success("Task deleted successfully", { id: toastId, duration: 2000 });
    closeDeleteModal();
  };

  // HANDLE COMPLETE
  const handleComplete = (id: string) => {
    dispatch(toggleComplete(id));
    dispatch(sortCompleted())
  };
  const completedTask = [...filteredTaskList].filter(task => task.isCompleted === true)

  // HANDLE STATUS
  const handleTaskStatus = (id: string, status: string) => {
    let taskStatus;
    if (status === "To Do") {
      taskStatus = "In Progress";
    } else if (status === "In Progress") {
      taskStatus = "Done";
    } else {
      taskStatus = "To Do";
    }
    const updatedTask = {
      id,
      status: taskStatus,
    };
    dispatch(updateTaskStatus(updatedTask));
  };


  return (
    <div className="task-list-container">
      {
        tasks?.length > 0 &&
          <Flex justify="space-between">
            <div>
              <p style={{fontWeight: '600'}}>Total Task: <span style={{fontSize: '17px', color: '#22075e'}}>{filteredTaskList?.length}</span></p>
              <p style={{fontWeight: '600'}}>Completed Task: <span style={{fontSize: '17px', color: '#22075e'}}>{completedTask?.length}</span></p>
            </div>
            <TaskFilters handlePriorityFilter={handlePriorityFilter} />
          </Flex>
      }
      {filteredTaskList?.length > 0 ? (
        <div>
          {
            filteredTaskList?.sort().reverse().map((task: TTask) => (
              <TaskItem 
              key={task?.id} 
              task={task} 
              handleTaskStatus={handleTaskStatus}
              handleComplete={handleComplete} 
              showDeleteModal={showDeleteModal}
              showEditModal={showEditModal}
              />
            ))
          }
          
        </div>
      ) : (
        <NoTaskFound />
      )}
      <DeleteConfirmationModal
        deleteModal={deleteModal}
        closeDeleteModal={closeDeleteModal}
        handleDeleteTask={handleDeleteTask}
        taskId={taskId}
      />
      <EditTaskModal
        editModal={editModal}
        closeEditModal={closeEditModal}
        taskData={task}
      />
    </div>
  );
};

export default TaskContainer;
