import { Button, Flex, Input, Modal, Space } from "antd";
import { FormEvent, MouseEventHandler, useState } from "react";
import {addTask} from "../redux/features/taskSlice";
import {useAppDispatch} from "../redux/hooks";
import { v4 as uuidv4 } from 'uuid';

type TAddTaskModalProps = {
  addTaskModal: boolean;
  handleCancel: MouseEventHandler;
};

const AddTaskModal = ({ addTaskModal, handleCancel }: TAddTaskModalProps) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("");

  const dispatch = useAppDispatch()

  const handlePriority = (priority: string) => {
    setTaskPriority(priority);
  };

  const submitTask = (e: FormEvent) => {
    e.preventDefault()
    const taskData = {
      id: uuidv4() as string,
      title: taskTitle,
      priority:taskPriority
    }
    dispatch(addTask(taskData))
    handleCancel()
  }
;
  return (
    <>
      <Modal
        open={addTaskModal}
        title="Add Task"
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <form onSubmit={submitTask}>
            <div style={{ margin: "20px 0 30px" }}>
              <div>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#8c8c8c",
                  }}
                >
                  Task
                </label>
                <Input onChange={(e) => setTaskTitle(e.target.value)} placeholder="Enter task name" />
              </div>
              <div style={{ marginTop: "20px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#8c8c8c",
                  }}
                >
                  Priority
                </label>
                <Flex gap="small" style={{ marginTop: "5px" }}>
                  <div
                    onClick={() => handlePriority("High")}
                    className="priority-btn priority-high"
                    style={{
                      backgroundColor: taskPriority === "High" ? "#f5222d" : "white",
                      color: taskPriority === "High" ? "white" : "#f5222d"
                    }}
                  >
                    High
                  </div>
                  <div
                    onClick={() => handlePriority("Medium")}
                    className="priority-btn priority-medium"
                    style={{
                      backgroundColor: taskPriority === "Medium" ? "#faad14" : "white",
                      color: taskPriority === "Medium" ? "white" : "#faad14"
                    }}
                  >
                    Medium
                  </div>
                  <div
                    onClick={() => handlePriority("Low")}
                    className="priority-btn priority-low"
                    style={{
                      backgroundColor: taskPriority === "Low" ? "#389e0d" : "white",
                      color: taskPriority === "Low" ? "white" : "#389e0d"
                    }}
                  >
                    Low
                  </div>
                </Flex>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <Space>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ backgroundColor: "#391085" }}
                >
                  Submit
                </Button>
              </Space>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddTaskModal;
