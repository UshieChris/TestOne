
// import "../components/customSelectStyles.scss";
// import { TextField, MenuItem, FormHelperText } from "@mui/material";
// import { textReplacer } from "./utils";



// export const CustomSelectM = ({
//   className,
//   value,
//   loading,
//   error,
//   items,
//   placeholder,
//   ...props
// }) => {
//   return (
//     <div className="d-flx-c">
//       <TextField
//         className={`custom-select ${className}`}
//         label={placeholder}
//         select
//         margin="normal"
//         variant="outlined"
//         id="outlined-select-currency"
//         value={value}
//         {...props}
//       >
//         {!items.length && (
//           <MenuItem className="cap" key={1} value="">
//             No Data Display
//           </MenuItem>
//         )}
//         {items.map(({ id, name }) => (
//           <MenuItem className="cap" key={id} value={name}>
//             {textReplacer(name, "_", " ")}
//           </MenuItem>
//         ))}
//       </TextField>
//       {error && (
//         <FormHelperText
//           style={{ color: "#ee312a", margin: "-4px 0 0", fontSize: "13px" }}
//           id="component-error-text"
//         >
//           {error}
//         </FormHelperText>
//       )}
//     </div>
//   );
// };


import React from "react";
import { TextField, MenuItem, FormHelperText } from "@mui/material";
import "../components/customSelectStyles.scss"; // Make sure this is the correct path
import { textReplacer } from "./utils";

// Define the type for the items in the select menu
interface SelectItem {
  id: string | number; // ID can be string or number
  name: string; // Name should be a string
}

// Define the props type for CustomSelectM
interface CustomSelectMProps {
  className?: string;
  value: string | number;
  loading?: boolean;
  error?: string;
  items: SelectItem[];
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any; // Allow additional props to be passed (optional)
}

export const CustomSelectM: React.FC<CustomSelectMProps> = ({
  className = "",
  value,
  loading = false,
  error = "",
  items,
  placeholder,
  onChange,
  ...props
}) => {
  return (
    <div className="d-flx-c">
      <TextField
        className={`custom-select ${className}`}
        label={placeholder}
        select
        margin="normal"
        variant="outlined"
        id="outlined-select-currency"
        value={value}
        onChange={onChange}
        {...props}
      >
        {!items.length && (
          <MenuItem className="cap" key={1} value="">
            No Data Display
          </MenuItem>
        )}
        {items.map(({ id, name }) => (
          <MenuItem className="cap" key={id} value={name}>
            {textReplacer(name, "_", " ")}
          </MenuItem>
        ))}
      </TextField>
      {error && (
        <FormHelperText
          style={{ color: "#ee312a", margin: "-4px 0 0", fontSize: "13px" }}
          id="component-error-text"
        >
          {error}
        </FormHelperText>
      )}
    </div>
  );
};
