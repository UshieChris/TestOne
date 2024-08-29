import React, { Component, PureComponent } from "react";
import { Box } from "@mui/material";
import TaskColumn from "../../components/TaskColumn";
import TodoImage from "../../assets/TodoImage.png";
import ProgImage from "../../assets/ProgImage.png";
import CompleteImage from "../../assets/CompleteImage.png";
import AddTaskModal from "../../components/modals/addTaskModal";
import EditTaskModal from "../../components/modals/editTaskModal";
import "antd/dist/antd.css";

import "./style.scss";
const tasks = {
  todo: [
    {
      title: "Publish my first book",
      description:
        "Write a blog post outlining the top 10 productivity tips...",
      date: "Aug 26th 2024 2:00pm",
      priority: "HIGH",
      image: TodoImage,
    },
    {
      title: "Home Renovation",
      description:
        "Write a blog post outlining the top 10 productivity tips...",
      date: "Aug 26th 2024 2:00pm",
      priority: "MEDIUM",
    },
    {
      title: "Organize a charity event",
      description:
        "Write a blog post outlining the top 10 productivity tips...",
      date: "Aug 26th 2024 2:00pm",
      priority: "HIGH",
    },
  ],
  inProgress: [
    {
      title: "Watch a Frontend Tutorial",
      description: "",
      date: "Aug 26th 2024 2:00pm",
      priority: "LOW",
    },
    {
      title: "Prep my week meal",
      description: "",
      date: "Aug 26th 2024 2:00pm",
      priority: "MEDIUM",
      image: ProgImage,
    },
  ],
  completed: [
    {
      title: "Read a book",
      description: "",
      date: "Aug 26th 2024 2:00pm",
      priority: "MEDIUM",
      image: CompleteImage,
    },
    {
      title: "Improve cards readability",
      description:
        "As a team license owner, I want to use multiplied limits...",
      date: "Aug 26th 2024 2:00pm",
      priority: "LOW",
    },
    {
      title: "Attend Standup and give updates",
      description: "",
      date: "Aug 26th 2024 2:00pm",
      priority: "HIGH",
    },
  ],
};

class Body extends React.Component {
  state = {
    openTaskModal: false,
    tasks: {
      todo: [...tasks.todo],
      inProgress: [...tasks.inProgress],
      completed: [...tasks.completed],
    },
    status: "todo",
    openEditModal: false,
    selectedTask: {},
  };
  // addItem = ({ title, description, date, priority, image }) => {
  //   const newTask = { title, description, date, priority, image };
  //   this.setState((prevState) => ({
  //     tasks: {
  //       ...prevState.tasks,
  //       todo: [...prevState.tasks.todo, newTask],
  //     },
  //   }));
  // };

addItem = ({ title, description, date, priority, image }) => {
  const { status } = this.state;
  const newTask = { title, description, date, priority, image };

  this.setState((prevState) => ({
    tasks: {
      ...prevState.tasks,
      [status]: [...prevState.tasks[status], newTask],
    },
  }));
};

  addStatus = ({ status }) => {
    this.setState({ status });
  };
  // agghs

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState.openTaskModal !== this.state.openTaskModal;
  // }

 
  onEdit = (task) => {
    this.setState({
      selectedTask: task,
      openEditModal: true,
    });
  };

  editItem = (updatedTask) => {
    const { tasks, status } = this.state;
    const updatedTasks = tasks[status]?.map((task) =>
      task.title === this.state.selectedTask?.title ? updatedTask : task
    );
    console.log(updatedTask, 'update')

    this.setState({
      tasks: {
        ...tasks,
        [status]: updatedTasks,
      },
      selectedTask: null,
      openEditModal: false,
    });
  };

  deleteItem = (taskTitle) => {
    const { tasks, status } = this.state;
    const updatedTasks = tasks[status]?.filter((task) => task.title !== taskTitle);

    this.setState({
      tasks: {
        ...tasks,
        [status]: updatedTasks,
      },
      selectedTask: null,
    });
  };

  toggleTask = () =>
    this.setState((prevState) => ({ openTaskModal: !prevState.openTaskModal }));

  toggleEditModal = () =>
    this.setState((prevState) => ({ openEditModal: !prevState.openEditModal }));

  render() {
    const { openTaskModal, openEditModal, tasks, selectedTask } = this.state;
    console.log(selectedTask, "...me...");
    return (
      <div id="modalContainer" className="md-cont">
        {openTaskModal && (
          <AddTaskModal
            visible={openTaskModal}
            toggleModal={this.toggleTask}
            addItem={this.addItem}
          />
        )}
        {openEditModal && (
          <EditTaskModal
            visible={openEditModal}
            selectedTask={selectedTask}
            toggleModal={this.toggleEditModal}
            editItem={this.editItem}
            el = {this}
          />
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px",
          }}
        >
          <TaskColumn
            title="To Do"
            tasks={tasks.todo}
            status="todo"
            toggleModal={this.toggleTask}
            addStatus={this.addStatus}
            onEdit={this.onEdit}
            onDelete = {this.deleteItem}
          />
          <TaskColumn
            title="In Progress"
            tasks={tasks.inProgress}
            status="inProgress"
            toggleModal={this.toggleTask}
            addStatus={this.addStatus}
            onEdit={this.onEdit}
            onDelete = {this.deleteItem}
          />
          <TaskColumn
            title="Completed"
            tasks={tasks.completed}
            status="completed"
            toggleModal={this.toggleTask}
            addStatus={this.addStatus}
            onEdit={this.onEdit}
            onDelete = {this.deleteItem}
          />

        </Box>
      </div>
    );
  }
}

export default Body;

// // Body.jsx

// Body.jsx


// const tasks = {
//   todo: [
//     {
//       title: "Publish my first book",
//       description:
//         "Write a blog post outlining the top 10 productivity tips...",
//       date: "Aug 26th 2024 2:00pm",
//       priority: "HIGH",
//       image: TodoImage,
//     },
//     {
//       title: "Home Renovation",
//       description:
//         "Write a blog post outlining the top 10 productivity tips...",
//       date: "Aug 26th 2024 2:00pm",
//       priority: "MEDIUM",
//     },
//     {
//       title: "Organize a charity event",
//       description:
//         "Write a blog post outlining the top 10 productivity tips...",
//       date: "Aug 26th 2024 2:00pm",
//       priority: "HIGH",
//     },
//   ],
//   inProgress: [
//     {
//       title: "Watch a Frontend Tutorial",
//       description: "",
//       date: "Aug 26th 2024 2:00pm",
//       priority: "LOW",
//     },
//     {
//       title: "Prep my week meal",
//       description: "",
//       date: "Aug 26th 2024 2:00pm",
//       priority: "MEDIUM",
//       image: ProgImage,
//     },
//   ],
//   completed: [
//     {
//       title: "Read a book",
//       description: "",
//       date: "Aug 26th 2024 2:00pm",
//       priority: "MEDIUM",
//       image: CompleteImage,
//     },
//     {
//       title: "Improve cards readability",
//       description:
//         "As a team license owner, I want to use multiplied limits...",
//       date: "Aug 26th 2024 2:00pm",
//       priority: "LOW",
//     },
//     {
//       title: "Attend Standup and give updates",
//       description: "",
//       date: "Aug 26th 2024 2:00pm",
//       priority: "HIGH",
//     },
//   ],
// };

// class Body extends React.Component {
//   state = {
//     openTaskModal: false,
//     tasks: {
//       todo: [...tasks.todo],
//       inProgress: [...tasks.inProgress],
//       completed: [...tasks.completed] 
//     },
//     status: "todo",
//     openEditModal: false,
//     selectedTask: {},
//   };

//   // addItem = (item) => {
//   //   const { status } = this.state;
//   //   this.setState((prevState) => ({
//   //     tasks: {
//   //       ...prevState.tasks,
//   //       [status]: [...prevState.tasks[status], item],
//   //     },
//   //   }));
//   // };

//   addItem = ({ title, description, date, priority, image }) => {
//     const { status } = this.state;
//     const newTask = { title, description, date, priority, image };
//     console.log('mafo', status)
  
//     this.setState((prevState) => ({
//       tasks: {
//         ...prevState.tasks,
//         [status]: [...prevState.tasks[status], newTask],
//       },
//     }));
//   };
    

//   addStatus = (status) => {
//     this.setState({ status });
//   };

//   onEdit = (task) => {
//     this.setState({
//       selectedTask: task,
//       openEditModal: true,
//     });
//   };

//   editItem = (updatedTask) => {
//     const { tasks, status } = this.state;
//     const updatedTasks = tasks[status].map((task) =>
//       task.title === this.state.selectedTask.title ? updatedTask : task
//     );

//     this.setState({
//       tasks: {
//         ...tasks,
//         [status]: updatedTasks,
//       },
//       selectedTask: null,
//       openEditModal: false,
//     });
//   };

//   toggleTask = () =>
//     this.setState((prevState) => ({ openTaskModal: !prevState.openTaskModal }));

//   toggleEditModal = () =>
//     this.setState((prevState) => ({ openEditModal: !prevState.openEditModal }));

//   render() {
//     const { openTaskModal, openEditModal, tasks, selectedTask } = this.state;

//     return (
//       <div id="modalContainer" className="md-cont">
//         {openTaskModal && (
//           <AddTaskModal
//             visible={openTaskModal}
//             toggleModal={this.toggleTask}
//             addItem={this.addItem}
//           />
//         )}
//         {openEditModal && (
//           <EditTaskModal
//             visible={openEditModal}
//             selectedTask={selectedTask}
//             toggleModal={this.toggleEditModal}
//             editItem={this.editItem}
//           />
//         )}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             padding: "16px",
//           }}
//         >
//           <TaskColumn
//             title="To Do"
//             tasks={tasks.todo}
//             status="todo"
//             toggleModal={this.toggleTask}
//             addStatus={this.addStatus}
//             onEdit={this.onEdit}
//           />
//           <TaskColumn
//             title="In Progress"
//             tasks={tasks.inProgress}
//             status="inProgress"
//             toggleModal={this.toggleTask}
//             addStatus={this.addStatus}
//             onEdit={this.onEdit}
//           />
//           <TaskColumn
//             title="Completed"
//             tasks={tasks.completed}
//             status="completed"
//             toggleModal={this.toggleTask}
//             addStatus={this.addStatus}
//             onEdit={this.onEdit}
//           />

//         </Box>
//       </div>
//     );
//   }
// }

// export default Body;
