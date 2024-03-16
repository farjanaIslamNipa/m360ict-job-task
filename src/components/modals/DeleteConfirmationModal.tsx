/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal, Space } from "antd";
import warningIcon from "../../assets/warning.svg";

type TDeleteModalProps = {
  deleteModal: boolean;
  closeDeleteModal: any;
  handleDeleteTask: any;
  taskId: string;
};

const DeleteConfirmationModal = ({
  deleteModal,
  closeDeleteModal,
  handleDeleteTask,
  taskId,
}: TDeleteModalProps) => {
  return (
    <Modal
      open={deleteModal}
      title="Delete Task"
      onCancel={closeDeleteModal}
      footer={null}
    >
      <div>
        <Form layout="vertical" onFinish={() => handleDeleteTask(taskId)}>
          <div style={{ padding: "10px 10px 30px", textAlign: "center" }}>
            <img
              src={warningIcon}
              alt="Delete Task"
              style={{ margin: "0 auto", height: "50px" }}
            />
            <p
              style={{
                fontSize: "16px",
                lineHeight: "20px",
                fontWeight: "600",
              }}
            >
              Are you sure, <br /> you want to delete this task ?
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={closeDeleteModal}>Cancel</Button>
              <Button
                htmlType="submit"
                type="primary"
                style={{ backgroundColor: "#f5222d" }}
              >
                Delete
              </Button>
            </Space>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
