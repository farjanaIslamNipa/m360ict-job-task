import { Col, Row } from "antd";
import editIcon from "../assets/edit-icon.svg";
import deleteIcon from "../assets/delete-icon.svg";
import { useAppSelector } from "../redux/hooks";
import { TTask } from "../types";
import {capitalizeFirstLetter} from "../utils/capitalizeFirstLetter";

const TaskContainer = () => {
  const { tasks } = useAppSelector((state) => state.tasks);
  console.log(tasks, "task");

  return (
    <div
      style={{
        backgroundColor: "white",
        marginTop: "15px",
        borderRadius: "0 0 20px 20px",
        padding: "20px",
      }}
    >
      {tasks?.length &&
        tasks.map((task: TTask) => (
          <Row gutter={4} align={"middle"} className="task-row">
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
                <div style={{ cursor: "pointer" }}>
                  <img src={deleteIcon} alt="delete task" height={"25px"} />
                </div>
              </div>
            </Col>
          </Row>
        ))}
    </div>
  );
};

export default TaskContainer;
