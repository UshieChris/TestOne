import React, { Fragment } from "react";
import CustomTextField from "./customText.tsx";
import "../components/formLayout.scss"

import {
  _emptyTest,
  textReplacer,
  
} from "./utils.tsx";
// import { NotifyError } from "./Notify";
import { CustomSelectM } from "./CustomSelectM.tsx";

import { TextArea } from "./customArea.tsx";
import { LinkSvg } from "./svgs";
import Dropzone from "react-dropzone";
import { message } from "antd";

export const _handleEnterClick = (e) => {
  const { keyCode, target } = e;
  if (keyCode === 13) {
    const form = target.form;
    const index = Array.prototype.indexOf.call(form, target);
    e.preventDefault();
    form.elements[index].blur();
    for (let i = 0; i < form.childNodes.length; i++) {
      if (form.childNodes[i].tagName.toLowerCase() === "button") {
        return form.childNodes[i].click();
      }
      if (form.childNodes[i].className.toLowerCase().includes("buttons-cont")) {
        return form.childNodes[i].childNodes[1].click();
      }
    }
  }
};

class FormLayout extends React.Component {
  defaultState = {
    data: {},
    errors: {},
    empties: {},
    styles: {},
  };
  state = {
    ...this.defaultState,
  };

  validate = (obj) => {
    // method to test for empty inputs and return true is any is empty
    const keysArr = Object.keys(obj || this.state.data);
    const valuesArr = Object.values(obj || this.state.data);
    const arrWithNoTruth = [];
    keysArr.forEach((key, i) => {
      arrWithNoTruth.push(_emptyTest(valuesArr[i].value, this, key));
    });
    return arrWithNoTruth.some((i) => i === true);
  };

  handleBlur = ({ currentTarget: { value, name } }) => {
    const styles = { ...this.state.styles };
    const style = value === "" ? "" : " form-input--is-filled";
    styles[name] = style;
    this.setState({ styles: styles || {} });
  };

  handleFocus = ({ currentTarget: input }) => {
    const styles = { ...this.state.styles };
    const style = " form-input--is-active";
    styles[input.name] = style;
    const errors = { ...this.state.errors };
    this.setState({ styles, errors });
  };

  renderButton = ({
    label,
    disabled,
    loading,
    handler,
    extraClass,
    id,
    icon,
  }) => (
    <button
      id={id}
      data-buttontarget="final-submit-button"
      onClick={loading ? null : handler}
      disabled={loading || disabled}
      className={`${extraClass} custom-button ${
        loading || disabled ? "dot false" : ""
      }`}
    >
      {loading ? (
        <>
          Loading
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </>
      ) : (
        <Fragment>
          {icon && (
            <span className="cmr-1" style={{ height: "18px", width: "18px" }}>
              {icon}
            </span>
          )}
          <span>{label}</span>
        </Fragment>
      )}
    </button>
  );

  renderTextArea = ({ name, required, ...props }) => {
    const { errors, empties, data } = this.state;
    const sanitizeInput = (input) => {
      return input.replace(/[\r\n]/g, "");
    };

    const handleChange = (e) => {
      let { value } = e.target;
      value = sanitizeInput(value);
      delete empties[name];
      this.setState((prev) => {
        return {
          ...prev,
          data: {
            ...prev.data,
            [name]: {
              ...prev[name],
              value: value,
            },
          },
        };
      });
    };
    return (
      <TextArea
        value={data[name]?.value}
        onChange={(e) => {
          const { value } = e.target;
          delete empties[name];
          this.setState((prev) => {
            return {
              ...prev,
              data: {
                ...prev.data,
                [name]: {
                  ...prev[name],
                  value: value,
                },
              },
            };
          });
        }}
        onKeyDown={_handleEnterClick}
        onBlur={this.handleBlur}
        error={empties[name] || errors[name]}
        {...props}
      />
    );
  };

  onFileUpload = ({ info, name, accept, use_accept }) => {
    if (info.length === 0)
      return message.error("Please upload the right file format!.");
    const isLt2M = [];
    info.forEach((item) => {
      isLt2M.push(item.size / (5 * 1024 * 1024) < 1);
    });

    if (isLt2M.some((item) => item === false)) {
      return message.error(
        `${
          use_accept === false
            ? accept === "images"
              ? `${info.length > 1 ? "Images" : "Image"}`
              : `${info.length > 1 ? "Documents" : "Document"}`
            : "File(s)"
        } must be smaller than 5MB!`
      );
    }
    info.length === 1 &&
      this.validate({
        fileName: { value: info[0].name },
      });
    const newErrors = { ...this.state.errors };
    delete newErrors[name];
    this.setState((prev) => {
      return {
        ...prev,
        data: {
          ...prev.data,
          [name]: { value: info },
          fileName: this.state.data.fileName
            ? {
                value:
                  this.state.data.fileName.value === "" && info.length === 1
                    ? info[0].name
                    : this.state.data.fileName.value,
              }
            : "",
        },
        errors: newErrors,
      };
    });
  };

  renderDragDropInput = ({ name, accept, use_accept }) => {
    const { data } = this.state;
  
    let acceptedTypes =
      accept === "images"
        ? ".png, .jpg, .jpeg, .svg"
        : accept === "sheets"
        ? ".xls, .xlsx"
        : accept === "reports"
        ? ".xls, .xlsx, .pdf, .txt"
        : ".pdf";
    
    if (use_accept === false) {
      acceptedTypes = [".png", ".jpg", ".jpeg", ".svg", ".pdf"];
    }
  
    const files = Array.isArray(data[name]?.value) ? data[name].value : [];
  
    const onDrop = (acceptedFiles) => {
      const file = acceptedFiles[0]; 
      if (file) {
        const imageUrl = URL.createObjectURL(file); 
  
        this.setState((prevState) => ({
          data: {
            ...prevState.data,
            [name]: {
              value: [file], 
              fileName: file.name, 
              imageUrl: imageUrl 
            },
          },
        }));
      }
    };
  
    return (
      <Dropzone
        accept={acceptedTypes}
        onDrop={(acceptedFiles) => onDrop(acceptedFiles)}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="drag-drop-input">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="placeholder">
                {data[name]?.imageUrl ? ( // Check if the image URL is available
                  <img src={data[name].imageUrl} alt="Uploaded" style={{ maxWidth: "100%", maxHeight: "100px" }} />
                ) : files.length === 1 && files[0].name ? (
                  <span>{files[0].name}</span>
                ) : Array.isArray(data[name]?.fileName) ? (
                  <div className="d-flx-c">
                    {data[name].fileName.map((fileName, index) => (
                      <span key={index}>{fileName}</span>
                    ))}
                  </div>
                ) : files.length > 1 ? (
                  <div className="d-flx-c">
                    {files.map(({ name }, index) => (
                      <span key={index}>{name}</span>
                    ))}
                  </div>
                ) : (
                  <div className="img-tg">
                    <LinkSvg /><br />
                    <div>
                      <span className="blue">Click to upload </span> or drag PNG or JPG
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    );
  };
  
  
  
  
  renderInput = ({
    name,
    label,
    required,
    extraClass = "",
    type = "text",
    validator,
    trim,
    ...props
  }) => {
    const { errors, empties, data } = this.state;
    let errorText = textReplacer(empties[name], "_", " ");

    const sanitizeInput = (input) => {
      return input.replace(/[\r\n]/g, "");
    };

    const handleChange = (e) => {
      let { value } = e.target;
      value = sanitizeInput(value);

      this.setState((prev) => {
        return {
          ...prev,
          data: {
            ...prev.data,
            [name]: {
              ...prev.data[name],
              value: trim ? value.trim() : value,
            },
          },
          attemptedMapping: name === "email" ? false : null,
        };
      });

      _emptyTest(value, this, name);
      return validator ? validator(value, this, name) : null;
    };

    return (
      <CustomTextField
        className={`${extraClass} custom-input mb-3 ${
          errors[name] !== "" && errors[name] !== undefined ? "error" : ""
        } ${
          empties[name] !== "" && empties[name] !== undefined ? "error" : ""
        }`}
        type={
          name === "email" || name === "password"
            ? name
            : name === "phone"
            ? "number"
            : type
        }
        name={name}
        required={required}
        value={data[name]?.value}
        label={label}
        onChange={handleChange}
        id={`${name}`}
        onKeyDown={_handleEnterClick}
        // onBlur={this.handleBlur}
        error={errorText || errors[name]}
        {...props}
      />
    );
  };


  renderInputForEdit = ({
    name,
    label,
    required,
    extraClass = "",
    type = "text",
    validator,
    trim,
    val,
    ...props
  }) => {
    const { errors, empties, data } = this.state;
    let errorText = textReplacer(empties[name], "_", " ");
    // if (errorText) errorText = capitalizerFirstChar(errorText);
    const sanitizeInput = (input) => {
      return input.replace(/[\r\n]/g, "");
    };

    const handleChange = (e) => {
      let { value } = e.target;
      value = sanitizeInput(value);

      this.setState((prev) => {
        return {
          ...prev,
          data: {
            ...prev.data,
            [name]: {
              ...prev[name],
              value: trim ? value.trim() : value,
            },
          },
          attemptedMapping: name === "email" ? false : null,
        };
      });

      _emptyTest(value, this, name);
      return validator ? validator(value, this, name) : null;
    };
    return (
      <CustomTextField
        className={`${extraClass} custom-input mb-3 ${
          errors[name] !== "" && errors[name] !== undefined ? "error" : ""
        } ${
          empties[name] !== "" && empties[name] !== undefined ? "error" : ""
        }`}
        type={
          name === "email" || name === "password"
            ? name
            : name === "phone"
            ? "number"
            : type
        }
        name={name}
        required={required}
        value={data[name].value || (!errorText ? val : data[name].value)}
        label={label}
        onChange={handleChange}
        id={`${name}`}
        onKeyDown={_handleEnterClick}
        // onBlur={this.handleBlur}
        error={errorText || errors[name]}
        {...props}
      />
    );
  };

  renderSelect = ({ items, placeholder, name, ...props }) => {

    const { empties, data } = this.state;
    let errorText = textReplacer(empties[name], "_", " ");
 
    // if (errorText) errorText = capitalizerFirstChar(errorText);
    return (
      <CustomSelectM
        className={`${
          empties[name] !== "" && empties[name] !== undefined ? "error" : ""
        }`}
        placeholder={placeholder}
        value={data[name]?.value}
        onChange={(e) => {
          const { value } = e.target;
          delete empties[name];
          this.setState((prev) => {
            return {
              ...prev,
              data: {
                ...prev.data,
                [name]: {
                  ...prev[name],
                  value: value,
                },
              },
              empties,
            };
          });
        }}
       
        items={items}
        error={errorText}
        {...props}
      />
    );
  };

}
export default FormLayout;

