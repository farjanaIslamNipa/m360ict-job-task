/* eslint-disable @typescript-eslint/no-explicit-any */
import {Flex, Select} from "antd";

const priorityOptions = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "High",
    label: "High",
  },
  {
    value: "Medium",
    label: "Medium",
  },
  {
    value: "Low",
    label: "Low",
  },
]

type TFilterProps = {
  handlePriorityFilter: any;
}
const TaskFilters = ({handlePriorityFilter} : TFilterProps) => {
  return (
    <Flex justify="end" gap={10}>
      <Select
        style={{ width: "150px" }}
        placeholder="Select Priority"
        optionFilterProp="children"
        onChange={handlePriorityFilter}
        options={priorityOptions}
      />
    </Flex>
  );
};

export default TaskFilters;