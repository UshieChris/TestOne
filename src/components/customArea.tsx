// import React from "react";

// import FormHelperText from "@material-ui/core/FormHelperText";
// import TextField from "@material-ui/core/TextField";


// export const TextArea = ({
//   value,
//   error,
//   extraClass,
//   label,
//   onChange,
//   ...props
// }) => (
//   <div>
//     <TextField
//       id="outlined-multiline-flexible"
//       label={label}
//       multiline
//       maxRows="8"
//       value={value}
//       onChange={onChange}
//       className={`${extraClass} textarea`}
//       error={error !== "" && error !== undefined ? true : false}
//       variant="outlined"
//       {...props}
//     />
//     {error && (
//       <FormHelperText style={{ color: "#ee312a" }} id="component-error-text">
//         {error}
//       </FormHelperText>
//     )}
//   </div>
// );

import React from "react";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";

interface TextAreaProps {
  value: string;
  error?: string;
  extraClass?: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxRows?: number;  // Optional, since you set it to 8 by default
  [key: string]: any;  // Allow any additional props (optional)
}

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  error = "",
  extraClass = "",
  label,
  onChange,
  maxRows = 8, // Default value for maxRows
  ...props
}) => (
  <div>
    <TextField
      id="outlined-multiline-flexible"
      label={label}
      multiline
      maxRows={maxRows}
      value={value}
      onChange={onChange}
      className={`${extraClass} textarea`}
      error={Boolean(error)}
      variant="outlined"
      {...props}
    />
    {error && (
      <FormHelperText style={{ color: "#ee312a" }} id="component-error-text">
        {error}
      </FormHelperText>
    )}
  </div>
);


