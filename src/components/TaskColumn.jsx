import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import TaskCard from "./TaskCard";
import { AddSvg } from "./svgs";

const TaskColumn = React.memo(
  ({ title, tasks, toggleModal, status, addStatus, onEdit, onDelete }) => {
    const handleClick = () => {
      addStatus({ status });
      toggleModal();
    };
    return (
      <Box
        sx={{
          width: "30%",
          padding: "16px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2, // Margin bottom to space out from the tasks list
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={handleClick}>
            <AddSvg />
          </IconButton>
        </Box>

        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            {...task}
            onEdit={onEdit}
            status={status}
            addStatus={addStatus}
            onDelete= {onDelete}
          />
        ))}
      </Box>
    );
  }
);

export default TaskColumn;

// src/components/TaskColumn.js
// import React from "react";
// import { Box, Typography, IconButton } from "@mui/material";
// import TaskCard from "./TaskCard";
// import { AddSvg } from "./svgs";

// const TaskColumn = React.memo(({ title, tasks, toggleModal, status, addStatus, onEdit }) => {
//   const handleClick = () => {
//     addStatus({ status });
//     toggleModal();
//   };

//   const handleEdit = (task) => {
//     onEdit(task);
//     toggleModal();
//   };

//   return (
//     <Box
//       sx={{
//         width: "30%",
//         padding: "16px",
//         backgroundColor: "#f9f9f9",
//         borderRadius: "8px",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           mb: 2, // Margin bottom to space out from the tasks list
//         }}
//       >
//         <Typography variant="h6">{title}</Typography>
//         <IconButton onClick={handleClick}>
//           <AddSvg />
//         </IconButton>
//       </Box>

//       {tasks.map((task, index) => (
//         <TaskCard key={index} {...task} onEdit={() => handleEdit(task)} />
//       ))}
//     </Box>
//   );
// });

// export default TaskColumn;
