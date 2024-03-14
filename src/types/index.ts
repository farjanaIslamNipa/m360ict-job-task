export type TPriority = 'High' | 'Medium' | 'Low';
export type TStatus = 'To Do' | 'In Progress' | 'Done';

export type TTask = {
  id: string;
  title: string;
  priority: TPriority;
  isCompleted: boolean;
  status?: TStatus;
}