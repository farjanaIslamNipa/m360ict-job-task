/* eslint-disable @typescript-eslint/no-explicit-any */
import {Col, Row} from "antd";
import {TTask} from "../../types";
import editIcon from "../../assets/edit-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";
import checkmark from "../../assets/checkmark.svg";

type TTaskItemProps = {
  task: TTask,
  handleTaskStatus: any,
  handleComplete: any,
  showDeleteModal: any,
  showEditModal: any
}


const TaskItem = ({task, handleTaskStatus, handleComplete, showDeleteModal, showEditModal}: TTaskItemProps) => {
  return (
    <Row
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
            {
              task?.isCompleted ? 'Completed' : task?.status
            }
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
  );
};

export default TaskItem;