// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import TextField from "@material-ui/core/TextField";
// import FormHelperText from "@material-ui/core/FormHelperText";
// // import NumberFormat from "react-number-format";
// import IconButton from "@material-ui/core/IconButton";
// import InputLabel from "@material-ui/core/InputLabel";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import FormControl from "@material-ui/core/FormControl";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
// import { Icon } from "antd";

// const CustomTextField = ({
//   extraClass,
//   error,
//   containerClass,
//   label,
//   type,
//   existing_value,
//   defaultValue,
//   ...rest
// }) => {
//   const [values, setValues] = useState({
//     amount: "",
//     password: "",
//     weight: "",
//     weightRange: "",
//     showPassword: false,
//   });

//   const handleClickShowPassword = () => {
//     setValues({ ...values, showPassword: !values.showPassword });
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };
//   return (
//     <div
//       className={`d-flx-c j-c-c ${containerClass || ""} ${
//         type === "password" ? "cmt-1" : ""
//       }`}
//     >
//       {type === "password" ? (
//         <FormControl variant="outlined" className="password-input">
//           <InputLabel htmlFor="outlined-adornment-password">
//             {label || "Password"}
//           </InputLabel>
//           <OutlinedInput
//             id="outlined-adornment-password"
//             type={values.showPassword ? "text" : "password"}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={handleClickShowPassword}
//                   onMouseDown={handleMouseDownPassword}
//                   edge="end"
//                 >
//                   {values.showPassword ? (
//                     <Icon type="eye" />
//                   ) : (
//                     <Icon type="eye-invisible" />
//                   )}
//                 </IconButton>
//               </InputAdornment>
//             }
//             labelWidth={70}
//             {...rest}
//           />
//         </FormControl>
//       ) : (
//         <TextField
//           label={label}
//           className={`custom-input ${extraClass}`}
//           error={error !== "" && error !== undefined ? true : false}
//           margin="normal"
//           variant="outlined"
//           InputProps={null}
//           {...rest}
//         />
//       )}

//       {error && (
//         <FormHelperText
//           style={{ color: "#ee312a", fontSize: "13px" }}
//           id="component-error-text"
//         >
//           {error}
//         </FormHelperText>
//       )}
//     </div>
//   );
// };

// CustomTextField.propTypes = {
//   extraClass: PropTypes.string,
//   type: PropTypes.string,
//   error: PropTypes.string,
// };

// export default CustomTextField;

import React, { useState, MouseEvent } from "react";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Icon } from "antd";
import { InputAdornmentProps } from "@mui/material/InputAdornment";

// Define types for props
interface CustomTextFieldProps {
  extraClass?: string;
  error?: string;
  containerClass?: string;
  label?: string;
  type?: string;
  existing_value?: string;
  defaultValue?: string;
  [key: string]: any; // This allows any other props to be passed through
}

interface ValuesState {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  extraClass,
  error,
  containerClass,
  label,
  type,
  existing_value,
  defaultValue,
  ...rest
}) => {
  const [values, setValues] = useState<ValuesState>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues((prevValues) => ({
      ...prevValues,
      showPassword: !prevValues.showPassword,
    }));
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className={`d-flx-c j-c-c ${containerClass || ""} ${
        type === "password" ? "cmt-1" : ""
      }`}
    >
      {type === "password" ? (
        null
      ) : (
        <TextField
          label={label}
          className={`custom-input ${extraClass}`}
          error={Boolean(error)}
          margin="normal"
          variant="outlined"
          InputProps={{ disableUnderline: true }} 
          {...rest}
        />
      )}

      {error && (
        <FormHelperText
          style={{ color: "#ee312a", fontSize: "13px" }}
          id="component-error-text"
        >
          {error}
        </FormHelperText>
      )}
    </div>
  );
};

export default CustomTextField;

