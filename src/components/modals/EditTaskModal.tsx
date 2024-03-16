/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Form, Input, Modal, Space } from "antd";
import { TTask } from "../../types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import { updateTask } from "../../redux/features/taskSlice";

type TEditModalProps = {
  editModal: boolean;
  closeEditModal: any;
  taskData: TTask | null;
};

const EditTaskModal = ({
  editModal,
  closeEditModal,
  taskData,
}: TEditModalProps) => {
  const [task, setTask] = useState<TTask | null>(null);

  const dispatch = useAppDispatch();

  const handleItemUpdate = (name: string, value: string) => {
    const updateItem = {
      ...task,
      [name]: value,
    };
    setTask(updateItem as TTask);
  };

  const handleEditTask = () => {
    const toastId = toast.loading("Updating task....");
    dispatch(updateTask(task));
    closeEditModal();
    toast.success("Task updated successfully", { id: toastId, duration: 2000 });
  };

  const [form] = Form.useForm();
  useEffect(() => {
    setTask(taskData as TTask);
  }, [taskData]);

  useEffect(() => {
    form.setFieldsValue({
      title: task?.title,
    });
  }, [task?.title, form]);

  return (
    <Modal
      open={editModal}
      title="Update Task"
      onCancel={closeEditModal}
      footer={null}
    >
      <div>
        <Form layout="vertical" onFinish={handleEditTask} form={form}>
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
                  onChange={(e) => handleItemUpdate("title", e.target.value)}
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
                  onClick={() => handleItemUpdate("priority", "High")}
                  className="priority-btn priority-high"
                  style={{
                    backgroundColor:
                      task?.priority === "High" ? "#f5222d" : "white",
                    color: task?.priority === "High" ? "white" : "#f5222d",
                  }}
                >
                  High
                </div>
                <div
                  onClick={() => handleItemUpdate("priority", "Medium")}
                  className="priority-btn priority-medium"
                  style={{
                    backgroundColor:
                      task?.priority === "Medium" ? "#faad14" : "white",
                    color: task?.priority === "Medium" ? "white" : "#faad14",
                  }}
                >
                  Medium
                </div>
                <div
                  onClick={() => handleItemUpdate("priority", "Low")}
                  className="priority-btn priority-low"
                  style={{
                    backgroundColor:
                      task?.priority === "Low" ? "#389e0d" : "white",
                    color: task?.priority === "Low" ? "white" : "#389e0d",
                  }}
                >
                  Low
                </div>
              </Flex>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={closeEditModal}>Cancel</Button>
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
