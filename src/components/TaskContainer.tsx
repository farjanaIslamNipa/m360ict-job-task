/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Flex, Row } from "antd";
import editIcon from "../assets/edit-icon.svg";
import deleteIcon from "../assets/delete-icon.svg";
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
import checkmark from "../assets/checkmark.svg";
import TaskFilters from "./TaskFilters";
import NoTaskFound from "./NoTaskFound";

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
              <Row
                key={task?.id}
                gutter={4}
                align={"middle"}
                className="task-row"
                style={{
                  backgroundColor: task?.isCompleted ? "#f9f0ff" : "white",
                  opacity: task?.isCompleted ? "0.8" : "1",
                }}
              >
                {/* TASK TITLE COLUMN */}
                <Col className="gutter-row" span={1}>
                  <div onClick={() => handleComplete(task?.id)} className="task-complete-checkbox"
                    style={{ backgroundColor: task.isCompleted === true ? "#391085" : "#ffffff"}}>
                    <img src={checkmark} alt="Task Completed" height={"18px"} />
                  </div>
                </Col>
                <Col className="gutter-row" span={9} md={{ span: 10 }}>
                  <div style={{ paddingLeft: "10px" }}>
                    <p style={{ color: "#b1b1b1", fontWeight: "600" }}>Title</p>
                    <p className="task-title">{task?.title}</p>
                  </div>
                </Col>
                {/* TASK PRIORITY COLUMN */}
                <Col className="gutter-row" span={4}>
                  <div>
                    <p style={{ color: "#b1b1b1", fontWeight: "600" }}>Priority</p>
                    <p style={{
                      color: task?.priority === "High" ? "#f5222d" : task?.priority === "Medium" ? "#faad14" : "#389e0d", fontWeight: "700"
                      }}>
                      {task?.priority}
                    </p>
                  </div>
                </Col>
                {/* TASK STATUS COLUMN */}
                <Col className="gutter-row" span={6} md={{ span: 4 }} style={{ display: "flex", justifyContent: "center" }}>
                  <div onClick={() => handleTaskStatus(task?.id, task?.status as string)}
                    style={{
                      pointerEvents: task?.isCompleted ? "none" : "auto",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      className="task-status"
                      style={{ color: task?.status === "To Do" ? "#595959" : task?.status === "In Progress" ? "#faad14" : "#9254de"}}>
                      {task?.status}
                    </span>
                  </div>
                </Col>
                {/* ACTION BUTTONS COLUMN */}
                <Col className="gutter-row" span={4} md={{ span: 5 }} style={{ pointerEvents: task?.isCompleted ? "none" : "auto" }}>
                  <div className="action-column">
                    <div onClick={() => showEditModal(task)} style={{ cursor: "pointer" }}>
                      <img src={editIcon} alt="Edit task" className="edit-icon" />
                    </div>
                    <div onClick={() => showDeleteModal(task?.id)} style={{ cursor: "pointer" }}>
                      <img src={deleteIcon} alt="delete task" className="delete-icon" />
                    </div>
                  </div>
                </Col>
              </Row>
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
