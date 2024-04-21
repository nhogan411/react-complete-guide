import useConnection from '../../hooks/useConnection';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
	const { isLoading, error, sendRequest: sendTaskRequest } = useConnection();

  const enterTaskHandler = async (taskText) => {
		const createTask = (taskData) => {
			const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

			props.onAddTask(createdTask);
		}

		sendTaskRequest({
			url: 'https://react-guide-tasks-list-default-rtdb.firebaseio.com/tasks.json',
			method: 'POST',
			body: { text: taskText },
			headers: {
				'Content-Type': 'application/json',
			},
		}, createTask.bind(null, taskText));
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
