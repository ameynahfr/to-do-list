import React from 'react';
import Circle from './circle.svg';
import Checked from './check-circle.svg';
import Empty from './trash-2.svg';

export default function Tasks() {

    //just for input
    const [task, setTask] = React.useState('');

    //maintains array for tasks that appear on screen
    const [taskList, setTaskList] = React.useState([]);

    //maintains array for checked or unchecked tasks
    const [isImageClickedList, setIsImageClickedList] = React.useState([]);

    React.useEffect(() => {
        const savedIsImageClickedList = JSON.parse(localStorage.getItem('isImageClickedList'));
        if (savedIsImageClickedList) {
            setIsImageClickedList(savedIsImageClickedList);
        } else {
            setIsImageClickedList(new Array(taskList.length).fill(false));
        }
    }, [taskList]);

    React.useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTaskList(savedTasks);
        }
    }, []);

    React.useEffect(() => {
        saveTasksToLocalStorage(taskList);
    }, [taskList]);

    React.useEffect(() => {
        localStorage.setItem('isImageClickedList', JSON.stringify(isImageClickedList));
    }, [isImageClickedList]);

    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function handleAddTask() {
        if (task.trim() !== '') {
            const newTaskList = [...taskList, task];
            const newIsImageClickedList = [...isImageClickedList, false]; // Update isImageClickedList too
            setTaskList(newTaskList);
            setIsImageClickedList(newIsImageClickedList); // Set updated isImageClickedList
            saveTasksToLocalStorage(newTaskList);
            setTask('');
        }
    }


//sets user input to its value and sets that value inside task
    function handleInputTask(event) {
        setTask(event.target.value);
    }

//when user press enters it sets the task inside task array

    function handleEnterKey(event) {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    }

    

    function handleImageClick(index) {
        setIsImageClickedList(prev => {
            const updatedList = [...prev];
            updatedList[index] = !updatedList[index];
            return updatedList;
        });
    }

    function handleDeleteTask(index) {
        const newTaskList = taskList.filter((_, i) => i !== index);
        setTaskList(newTaskList);
        setIsImageClickedList(prev => prev.filter((_, i) => i !== index));
        saveTasksToLocalStorage(newTaskList);
    }

  

    return (
        <div>
            <div className='Task-Items'>
                {taskList.map((item, index) => (
                    <div key={index} className='card'>
                        <img
                            className='tick'
                            src={isImageClickedList[index] ? Checked : Circle}
                            alt='tick'
                            onClick={() => handleImageClick(index)}
                        />
                        <span>{item}</span>
                        <img
                        className='deleteTask'
                        src={Empty}
                        alt='delete'
                        onClick={() => handleDeleteTask(index)}
                        />
                    </div>
                ))}
            </div>
            <div className='Enter-Task'>
                <input
                    id='box'
                    type='text'
                    placeholder='Add a task'
                    value={task}
                    onChange={handleInputTask}
                    onKeyDown={handleEnterKey}
                />
            </div>
        </div>
    );
}
