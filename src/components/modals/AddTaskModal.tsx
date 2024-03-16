/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Form, Input, Modal, Space } from "antd";
import { useState } from "react";
import { addTask } from "../../redux/features/taskSlice";
import { useAppDispatch } from "../../redux/hooks";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { TPriority } from "../../types";

type TAddTaskModalProps = {
  addTaskModal: boolean;
  handleCancel: any;
};

const AddTaskModal = ({ addTaskModal, handleCancel }: TAddTaskModalProps) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("");

  const dispatch = useAppDispatch();

  const handlePriority = (priority: TPriority) => {
    setTaskPriority(priority);
  };

  const [form] = Form.useForm();
  const onFinish = () => {
    const toastId = toast.loading("Adding task....");
    const taskData = {
      id: uuidv4() as string,
      title: taskTitle,
      priority: taskPriority || "Low",
    };
    dispatch(addTask(taskData));
    setTaskTitle("");
    setTaskPriority("");
    handleCancel();
    toast.success("Task added successfully", { id: toastId, duration: 2000 });
    form.resetFields();
  };
  return (
    <>
      <Modal
        open={addTaskModal}
        title="Add Task"
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <div style={{ margin: "20px 0 30px" }}>
              <div>
                <Form.Item
                  name={"title"}
                  label="Task"
                  style={{
                    color: "red",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Enter task name"
                  />
                </Form.Item>
              </div>
              <div style={{ marginTop: "25px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  Priority
                </label>
                <Flex gap="small" style={{ marginTop: "5px" }}>
                  <div
                    onClick={() => handlePriority("High")}
                    className="priority-btn priority-high"
                    style={{
                      backgroundColor:
                        taskPriority === "High" ? "#f5222d" : "white",
                      color: taskPriority === "High" ? "white" : "#f5222d",
                    }}
                  >
                    High
                  </div>
                  <div
                    onClick={() => handlePriority("Medium")}
                    className="priority-btn priority-medium"
                    style={{
                      backgroundColor:
                        taskPriority === "Medium" ? "#faad14" : "white",
                      color: taskPriority === "Medium" ? "white" : "#faad14",
                    }}
                  >
                    Medium
                  </div>
                  <div
                    onClick={() => handlePriority("Low")}
                    className="priority-btn priority-low"
                    style={{
                      backgroundColor:
                        taskPriority === "Low" ? "#389e0d" : "white",
                      color: taskPriority === "Low" ? "white" : "#389e0d",
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
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default AddTaskModal;
