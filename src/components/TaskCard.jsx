import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { DropIconSVG } from "./svgs";
import { message, notification } from "antd";

const TaskCard = ({
  title,
  description,
  date,
  priority,
  image,
  onEdit,
  status,
  addStatus,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleClose = () => {
    addStatus({ status });
    setMenuOpen(false);
    setAnchorEl(null);
  };

  const handleMenuItemClick = async(key) => {
    if (key == 1) {
      addStatus({ status });
      onEdit({ title, description, date, priority, image });
    } else if (key === 2) {
      try {
        // Update status first
        await addStatus({ status });
  
        // Wait for the status update to complete
        console.log('Deleting task:', title);
        onDelete(title);
        notification.success({
          message: "Task Deleted",
        });
      } catch (error) {
        console.error('Error updating status or deleting task:', error);
      }
    }
    handleClose();
  };

  const getImageUrl = () => {
    if (Array.isArray(image) && image.length > 0) {
      const file = image[0]; // Get the first file object
      return URL.createObjectURL(file); // Create a URL for the file
    } else if (typeof image === "string") {
      return image; // Return the image URL if it's already a string
    }
    return null;
  };

  return (
    <Card sx={{ marginBottom: "16px", position: "relative" }}>
      <CardContent sx={{ paddingTop: 5 }}>
        <Chip
          label={priority}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor:
              priority === "HIGH"
                ? "#d2e4be"
                : priority === "MEDIUM"
                ? "#c5cdfb"
                : "#f2d8d9",
            color:
              priority === "HIGH"
                ? "#88af5e"
                : priority === "MEDIUM"
                ? "#637bfe"
                : "#de9a9b",
          }}
        />

        <IconButton
          sx={{ position: "absolute", right: 8 }}
          onClick={handleClick}
        >
          <DropIconSVG />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleClose}
          sx={{ top: 40, right: 8 }}
        >
          <MenuItem onClick={() => handleMenuItemClick(1)}>Edit</MenuItem>
          <MenuItem
            sx={{ color: "#de9a9b" }}
            onClick={() => handleMenuItemClick(2)}
          >
            Delete
          </MenuItem>
        </Menu>
        <Typography variant="h6">{title}</Typography>
        {getImageUrl() ? (
          <img
            src={getImageUrl()}
            alt={title}
            style={{ width: "100%", borderRadius: "4px", margin: "16px 0" }}
          />
        ) : (
          <Typography variant="body2" color="textSecondary">
            No image to display
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {date}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Chip,
//   Menu,
//   MenuItem,
//   IconButton,
// } from "@mui/material";
// import { DropIconSVG } from "./svgs";
// import EditTaskModal from "./modals/EditModal"; // Import the EditTaskModal component

// const TaskCard = ({ title, description, date, priority, image, onEdit }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//     setMenuOpen(true);
//   };

//   const handleClose = () => {
//     setMenuOpen(false);
//     setAnchorEl(null);
//   };

//   const handleMenuItemClick = (key) => {
//     if (key === 1) {
//       setEditModalOpen(true); // Open the edit modal
//     }
//     if (key === 2) {
//       console.log("Delete action triggered");
//       // Handle delete action here
//     }
//     handleClose();
//   };

//   const handleEditSubmit = (updatedTask) => {
//     onEdit(updatedTask); // Pass the updated task to the parent component
//     setEditModalOpen(false); // Close the edit modal after submission
//   };

//   return (
//     <>
//       <Card sx={{ marginBottom: "16px", position: "relative" }}>
//         <CardContent sx={{ paddingTop: 5 }}>
//           <Chip
//             label={priority}
//             size="small"
//             sx={{
//               position: "absolute",
//               top: 8,
//               left: 8,
//               backgroundColor:
//                 priority === "HIGH"
//                   ? "#d2e4be"
//                   : priority === "MEDIUM"
//                   ? "#c5cdfb"
//                   : "#f2d8d9",
//               color:
//                 priority === "HIGH"
//                   ? "#88af5e"
//                   : priority === "MEDIUM"
//                   ? "#637bfe"
//                   : "#de9a9b",
//             }}
//           />

//           <IconButton
//             sx={{ position: "absolute", right: 8 }}
//             onClick={handleClick}
//           >
//             <DropIconSVG />
//           </IconButton>

//           <Menu
//             anchorEl={anchorEl}
//             open={menuOpen}
//             onClose={handleClose}
//             sx={{ top: 40, right: 8 }}
//           >
//             <MenuItem onClick={() => handleMenuItemClick(1)}>Edit</MenuItem>
//             <MenuItem
//               sx={{ color: "#de9a9b" }}
//               onClick={() => handleMenuItemClick(2)}
//             >
//               Delete
//             </MenuItem>
//           </Menu>

//           <Typography variant="h6">{title}</Typography>

//           {image && (
//             <img
//               src={image}
//               alt={title}
//               style={{ width: "100%", borderRadius: "4px", margin: "16px 0" }}
//             />
//           )}
//           <Typography variant="body2" color="textSecondary">
//             {description}
//           </Typography>
//           <Typography variant="caption" color="textSecondary">
//             {date}
//           </Typography>
//         </CardContent>
//       </Card>

//       {/* Edit Task Modal */}
//       {editModalOpen && (
//         <EditTaskModal
//           open={editModalOpen}
//           task={{ title, description, date, priority, image }}
//           onClose={() => setEditModalOpen(false)}
//           onSubmit={handleEditSubmit}
//         />
//       )}
//     </>
//   );
// };

// export default TaskCard;

// src/components/TaskCard.js
// import React, { useState } from "react";
// import { Card, CardContent, Typography, Chip, Menu, MenuItem, IconButton } from "@mui/material";
// import { DropIconSVG } from "./svgs";

// const TaskCard = ({ title, description, date, priority, image, onEdit }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//     setMenuOpen(true);
//   };

//   const handleClose = () => {
//     setMenuOpen(false);
//     setAnchorEl(null);
//   };

//   const handleMenuItemClick = (key) => {
//     if (key === 1) onEdit(); // Edit
//     handleClose();
//   };

//   return (
//     <Card sx={{ marginBottom: "16px", position: "relative" }}>
//       <CardContent sx={{ paddingTop: 5 }}>
//         <Chip
//           label={priority}
//           size="small"
//           sx={{
//             position: "absolute",
//             top: 8,
//             left: 8,
//             backgroundColor:
//               priority === "HIGH"
//                 ? "#d2e4be"
//                 : priority === "MEDIUM"
//                 ? "#c5cdfb"
//                 : "#f2d8d9",
//             color:
//               priority === "HIGH"
//                 ? "#88af5e"
//                 : priority === "MEDIUM"
//                 ? "#637bfe"
//                 : "#de9a9b",
//           }}
//         />

//         <IconButton
//           sx={{ position: "absolute", right: 8 }}
//           onClick={handleClick}
//         >
//           <DropIconSVG />
//         </IconButton>

//         <Menu
//           anchorEl={anchorEl}
//           open={menuOpen}
//           onClose={handleClose}
//           sx={{ top: 40, right: 8 }} // Adjust menu position if needed
//         >
//           <MenuItem onClick={() => handleMenuItemClick(1)}>Edit</MenuItem>
//           <MenuItem sx={{ color: "#de9a9b" }} onClick={() => handleMenuItemClick(2)}>Delete</MenuItem>
//         </Menu>

//         <Typography variant="h6">{title}</Typography>

//         {image && (
//           <img
//             src={image}
//             alt={title}
//             style={{ width: "100%", borderRadius: "4px", margin: "16px 0" }}
//           />
//         )}
//         <Typography variant="body2" color="textSecondary">
//           {description}
//         </Typography>
//         <Typography variant="caption" color="textSecondary">
//           {date}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default TaskCard;

