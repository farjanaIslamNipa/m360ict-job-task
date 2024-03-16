import { Button, Flex } from "antd";
import { useState } from "react";
import AddTaskModal from "./modals/AddTaskModal";

const TaskHeader = () => {
  const [addTaskModal, setAddTaskModal] = useState(false);

  const showModal = () => {
    setAddTaskModal(true);
  };

  const handleCancel = () => {
    setAddTaskModal(false);
  };
  return (
    <Flex
      justify="space-between"
      align="baseline"
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "20px 20px 0 0",
      }}
    >
      <h1
        style={{
          fontSize: "30px",
          fontWeight: "700",
          color: "#22075e",
        }}
      >
        Task List
      </h1>
      <div>
        <Button
          onClick={showModal}
          type="primary"
          size="large"
          style={{ backgroundColor: "#22075e", fontWeight: "500" }}
        >
          Add Task
        </Button>
        <AddTaskModal addTaskModal={addTaskModal} handleCancel={handleCancel} />
      </div>
    </Flex>
  );
};

export default TaskHeader;
