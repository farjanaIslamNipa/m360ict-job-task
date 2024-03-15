import { Col, Flex } from "antd";
import TaskHeader from "./components/TaskHeader";
import TaskContainer from "./components/TaskContainer";

function App() {
  return (
    <>
      <div
        style={{
          backgroundColor: "#f0f2f5",
          padding: "50px 0",
          minHeight: "100vh",
        }}
      >
        <Flex justify="center">
          <Col span={12}>
            <TaskHeader />
            <TaskContainer />
          </Col>
        </Flex>
      </div>
    </>
  );
}

export default App;
