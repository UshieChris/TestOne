import React, { PureComponent } from "react";
// import PropTypes from "prop-types";
import { Modal } from "antd";
// import { connect } from "react-redux";
import FormLayout from "../Formlayout";
// import Services from "../../redux-flow/services/services";
// import { Actions } from "../../redux-flow/actions/_index";
// import { NotifyError, NotifySuccess } from "../../reuse/Notify";
import "../modals/addTask.scss";
// import { Radio } from "antd";
// import BlackAtm from "../../assets/black-atm.png";

class AddTaskModal extends FormLayout {
  defaultState = {
    data: {
      Name: { value: "" },
      Description: { value: "" },
      taskPrioty: { value: 1 },
      file: { value: "", fileName: "" },
      Deadline: { value: "" },
      Time: { value: "" },
    },

    empties: {},
    errors: {},
  };

  state = { ...this.defaultState };

  clearState = () => {
    this.setState({ ...this.defaultState });
  };

  buttonClicked = (e) => {
    e.preventDefault();
    const {
      data: { Name, Description, taskPrioty, Deadline, Time },
      data,
      errors,
    } = this.state;
    console.log(data, 'try me')

    const validationResult = this.validate({
      Name: { value: Name.value },
      Description: { value: Description.value},
      taskPrioty: { value: taskPrioty.value },
      Deadline: { value: Deadline.value },
      Time: { value: Time.value },
    });
    const file = data.file.value;
    if (file === "") {
      return this.setState((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          file: "Upload your signature image",
        },
      }));
    }
    if (errors.file) return;
    if (validationResult) return;

    // this.props.toggleModal();
    this.props.addItem({
      title: Name.value,
      image: data.file?.value,
      description: Description.value,
      date: Deadline.value,
      priority: taskPrioty.value,
    });

    this.closeModal();
  };

  closeModal = () => {
    this.clearState();
    this.props.toggleModal();
  };

  render() {
    const { visible, isLoading, signatureInfo } = this.props;
    const { errors } = this.state;
    const arraysOfItem = [
      {
        id: 1,
        name: "HIGH",
      },
      { id: 2, name: "MEDIUM" },
      { id: 3, name: "LOW" },
    ];

    return (
      <Modal
        visible={visible}
        title="Add Task"
        onCancel={this.closeModal}
        footer={null}
        // closeIcon="Close"
        getContainer={() => document.getElementById("modalContainer")}
        centered
 
      >
        <form>
          <div className="d-flx-c al-i-c j-c-c inputs-container">
            {this.renderInput({
              name: "Name",
              label: `Task Name`,
              containerClass: "cw-100",
            })}
            {this.renderTextArea({
              name: "Description",
              label: `Description`,
              containerClass: "cw-100",
            })}
            {this.renderSelect({
              placeholder: "Priority",
              name: "taskPrioty",
              items: arraysOfItem,
            })}
            {this.renderDragDropInput({
              name: "file",
              accept: "images",
            })}{" "}
            <small className="formats cmb-2">
              {/* (Supported formats are jpg, png. Image dimensions of 710 x 258
              pixels. Image must be in white background. Maximum size is 200kb) */}
            </small>
            {errors.file && (
              <small className="formats cmb-2 red">{errors.file}</small>
            )}
          </div>
          <div className="ts-tm">
            {this.renderInput({
              name: "Deadline",
              label: `Deadline`,
              containerClass: "cw-100",
            })}
            {this.renderInput({
              name: "Time",
              label: `Time`,
              containerClass: "cw-100",
            })}
          </div>

          {this.renderButton({
            label: "Update",
            extraClass: "cap cmt-2",
            loading: isLoading,
            id: "create",
            handler: this.buttonClicked,
          })}
        </form>
      </Modal>
    );
  }
}

export default AddTaskModal;





