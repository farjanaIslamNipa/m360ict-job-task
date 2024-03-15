/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button, Flex, Form, Input, Modal, Space} from "antd";
import {TPriority, TTask} from "../types";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {useAppDispatch} from "../redux/hooks";
import {updateTask} from "../redux/features/taskSlice";

type TEditModalProps = {
  editModal: boolean;
  handleEditCancel: any;
  task: TTask | null;
};

const EditTaskModal = ({editModal, handleEditCancel, task} : TEditModalProps) => {
  const [editedTask, setEditedTask] = useState<TTask | null>(null);


  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState<TPriority | null>(null);
  const dispatch = useAppDispatch()

  const handlePriority = (priority: TPriority) => {
    setTaskPriority(priority);
  };

  const handleEditTask = () => {
    const id = task?.id;
    const taskData = {
      ...editedTask,
      id,
      title: taskTitle,
      priority: taskPriority
    }
    const toastId = toast.loading('Updating task....')
    dispatch(updateTask(taskData))
    handleEditCancel()
    toast.success('Task updated successfully', {id: toastId, duration: 2000})
  }

  useEffect(() => {
    setEditedTask(task as TTask)
  }, [task])
  useEffect(() => {
    setTaskPriority(task?.priority as TPriority)
  }, [task?.priority])
  return (
    <Modal
      open={editModal}
      title="Update Task"
      onCancel={handleEditCancel}
      footer={null}
    >
      <div>
      <Form layout="vertical" onFinish={handleEditTask}>
            <div style={{ margin: "20px 0 30px" }}>
              <div>
                <Form.Item
                  name={"title"} 
                  label="Task" 
                  style={{
                    color: 'red',
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!"
                    }
                  ]}
                  >
                 <Input onChange={(e) => setTaskTitle(e.target.value)}  defaultValue={task?.title} placeholder="Enter task name" />
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
                <Button onClick={handleEditCancel}>Cancel</Button>
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
  );
};

export default EditTaskModal;