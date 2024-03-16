import { Col, Flex, Row } from "antd";
import editIcon from "../assets/edit-icon.svg";
import deleteIcon from "../assets/delete-icon.svg";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TTask } from "../types";
import { toast } from "sonner";
import {
  deleteTask,
  toggleComplete,
  updateTaskStatus,
} from "../redux/features/taskSlice";
import { useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditTaskModal from "./EditTaskModal";
import checkmark from "../assets/checkmark.svg";

const TaskContainer = () => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [task, setTask] = useState<TTask | null>(null);
  const { tasks } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const showEditModal = (item: TTask) => {
    setTask(item);
    setEditModal(true);
  };

  const handleEditCancel = () => {
    setEditModal(false);
  };

  const showDeleteModal = (id: string) => {
    setTaskId(id);
    setDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModal(false);
  };
  const handleDeleteTask = (id: string) => {
    const toastId = toast.loading("Deleting task...");
    dispatch(deleteTask(id));
    toast.success("Task deleted successfully", { id: toastId, duration: 2000 });
    handleDeleteCancel();
  };

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

  const handleComplete = (id: string) => {
    dispatch(toggleComplete(id));
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        marginTop: "15px",
        borderRadius: "0 0 20px 20px",
        padding: "20px",
      }}
    >
      {tasks.map((task: TTask) => (
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
          <Col className="gutter-row" span={1}>
            <div
              onClick={() => handleComplete(task?.id)}
              style={{
                backgroundColor:
                  task.isCompleted === true ? "#391085" : "#ffffff",
                border: "1px solid #bdbdbd",
                borderRadius: "4px",
                height: "19px",
                width: "19px",
                cursor: "pointer",
              }}
            >
              <img src={checkmark} alt="Task Completed" height={"18px"} />
            </div>
          </Col>
          <Col className="gutter-row" span={10}>
            <div style={{ paddingRight: "10px", paddingLeft: "10px" }}>
              <p style={{ color: "#b1b1b1", fontWeight: "600" }}>Title</p>
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "500",
                  textTransform: "capitalize",
                }}
              >
                {task?.title}
              </p>
            </div>
          </Col>
          <Col className="gutter-row" span={4}>
            <div style={{ padding: "0" }}>
              <p style={{ color: "#b1b1b1", fontWeight: "600" }}>Priority</p>
              <p
                style={{
                  color:
                    task?.priority === "High"
                      ? "#f5222d"
                      : task?.priority === "Medium"
                      ? "#faad14"
                      : "#389e0d",
                  fontWeight: "700",
                }}
              >
                {task?.priority}
              </p>
            </div>
          </Col>
          <Col
            className="gutter-row"
            span={4}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              onClick={() => handleTaskStatus(task?.id, task?.status as string)}
              style={{
                pointerEvents: task?.isCompleted ? "none" : "auto",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  color:
                    task?.status === "To Do"
                      ? "#595959"
                      : task?.status === "In Progress"
                      ? "#faad14"
                      : "#9254de",
                  backgroundColor: "#ededed",
                  borderRadius: "10px",
                  padding: "3px 12px",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                {task?.status}
              </span>
            </div>
          </Col>
          <Col
            className="gutter-row"
            span={5}
            style={{ pointerEvents: task?.isCompleted ? "none" : "auto" }}
          >
            <div
              style={{
                padding: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                gap: "10px",
              }}
            >
              <div
                onClick={() => showEditModal(task)}
                style={{ cursor: "pointer" }}
              >
                <img src={editIcon} alt="Edit task" height={"21px"} />
              </div>
              <div
                onClick={() => showDeleteModal(task?.id)}
                style={{ cursor: "pointer" }}
              >
                <img src={deleteIcon} alt="delete task" height={"25px"} />
              </div>
            </div>
          </Col>
        </Row>
      ))}
      <DeleteConfirmationModal
        deleteModal={deleteModal}
        handleDeleteCancel={handleDeleteCancel}
        handleDeleteTask={handleDeleteTask}
        taskId={taskId}
      />
      <EditTaskModal
        editModal={editModal}
        handleEditCancel={handleEditCancel}
        taskData={task}
      />
    </div>
  );
};

export default TaskContainer;
