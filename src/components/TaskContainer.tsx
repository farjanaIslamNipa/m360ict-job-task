import { Col, Row } from "antd";
import editIcon from "../assets/edit-icon.svg";
import deleteIcon from "../assets/delete-icon.svg";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TTask } from "../types";
import {capitalizeFirstLetter} from "../utils/capitalizeFirstLetter";
import {toast} from "sonner";
import {deleteTask} from "../redux/features/taskSlice";
import {useState} from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const TaskContainer = () => {
  const [deleteModal, setDeleteModal] = useState(false)
  const [taskId, setTaskId] = useState('')
  const { tasks } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const handleDeleteTask = (id: string) => {
    const toastId = toast.loading('Deleting task...')
    dispatch(deleteTask(id))
    toast.success('Task deleted successfully', {id: toastId, duration: 2000})
    handleCancel()
  }
  const showModal = (id: string) => {
    setTaskId(id)
    setDeleteModal(true);
  };

  const handleCancel = () => {
    setDeleteModal(false);
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
      {
        tasks.map((task: TTask) => (
          <Row key={task?.id} gutter={4} align={"middle"} className="task-row">
            <Col className="gutter-row" span={10}>
              <div style={{ paddingRight: "10px" }}>
                <p style={{ color: "#b1b1b1", fontWeight: "600" }}>Title</p>
                <p style={{ fontSize: "17px", fontWeight: "500" }}>
                  {capitalizeFirstLetter(task?.title)}
                </p>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={{ padding: "0" }}>
                <p style={{ color: "#b1b1b1", fontWeight: "600" }}>Priority</p>
                <p style={{ color: task?.priority === 'High' ? "#f5222d" : task?.priority === "Medium" ? "#faad14" : "#389e0d", fontWeight: "700" }}>
                  {task?.priority || "Low"}
                </p>
              </div>
            </Col>
            <Col className="gutter-row" span={5}>
              <div style={{ padding: "0" }}>
                <span
                  style={{
                    backgroundColor: "#e7e7e7",
                    color: "gray",
                    borderRadius: "8px",
                    padding: "3px 12px",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  To Do
                </span>
              </div>
            </Col>
            <Col className="gutter-row" span={3}>
              <div
                style={{
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: "10px",

                }}
              >
                <div style={{ cursor: "pointer" }}>
                  <img src={editIcon} alt="Edit task" height={"21px"} />
                </div>
                <div onClick={() => showModal(task?.id)} style={{ cursor: "pointer" }}>
                  <img src={deleteIcon} alt="delete task" height={"25px"} />
                </div>
              </div>
            </Col>
          </Row>
        ))
        }
        <DeleteConfirmationModal deleteModal={deleteModal} handleCancel={handleCancel} handleDeleteTask={handleDeleteTask} taskId={taskId}  />
    </div>
  );
};

export default TaskContainer;
