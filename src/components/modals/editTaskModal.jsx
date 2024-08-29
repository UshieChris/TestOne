// // src/components/modals/EditTaskModal.js
// import React, { PureComponent } from "react";
// import { Modal } from "antd";
// import FormLayout from "../Formlayout";
// import "../modals/addTask.scss";

// class EditTaskModal extends FormLayout {
//   defaultState = {
//     data: {
//       Name: { value: "" },
//       Description: { value: "" },
//       taskPrioty: { value: 1 },
//       file: { value: "", fileName: "" },
//       Deadline: { value: "" },
//       Time: { value: "" },
//     },
//     empties: {},
//     errors: {},
//   };

//   state = { ...this.defaultState };

//   componentDidUpdate(prevProps) {
//     if (prevProps.selectedTask !== this.props.selectedTask) {
//       const { selectedTask } = this.props;
//       this.setState({
//         data: {
//           Name: { value: selectedTask.title || "" },
//           Description: { value: selectedTask.description || "" },
//           taskPrioty: { value: selectedTask.priority || 1 },
//           file: { value: selectedTask.image || "", fileName: "" },
//           Deadline: { value: selectedTask.date || "" },
//           Time: { value: "" },
//         },
//       });
//     }
//   }

//   clearState = () => {
//     this.setState({ ...this.defaultState });
//   };

//   buttonClicked = (e) => {
//     e.preventDefault();
//     const {
//       data: { Name, Description, taskPrioty, Deadline, Time },
//       data,
//       errors,
//     } = this.state;

//     const validationResult = this.validate({
//       Name: { value: Name.value },
//       Description: { value: Description.value },
//       taskPrioty: { value: taskPrioty.value },
//       Deadline: { value: Deadline.value },
//       Time: { value: Time.value },
//     });

//     const file = data.file.value;
//     if (file === "") {
//       return this.setState((prev) => ({
//         ...prev,
//         errors: {
//           ...prev.errors,
//           file: "Upload your signature image",
//         },
//       }));
//     }
//     if (errors.file) return;
//     if (validationResult) return;
//     this.props.editItem({
//       title: Name.value,
//       image: data.file?.value,
//       description: Description.value,
//       date: Deadline.value,
//       priority: taskPrioty.value,
//     });

//     this.closeModal();
//   };

//   closeModal = () => {
//     this.clearState();
//     this.props.toggleModal();
//   };

//   render() {
//     const { visible, isLoading } = this.props;
//     const { errors } = this.state;
//     const arraysOfItem = [
//       {
//         id: 1,
//         name: "HIGH",
//       },
//       { id: 2, name: "MEDIUM" },
//       { id: 3, name: "LOW" },
//     ];

//     return (
//       <Modal
//         visible={visible}
//         title="Edit Task"
//         onCancel={this.closeModal}
//         footer={null}
//         getContainer={() => document.getElementById("modalContainer")}
//         centered
//       >
//         <form>
//           <div className="d-flx-c al-i-c j-c-c inputs-container">
//             {this.renderInput({
//               name: "Name",
//               label: `Task Name`,
//               containerClass: "cw-100",
//             })}
//             {this.renderTextArea({
//               name: "Description",
//               label: `Description`,
//               containerClass: "cw-100",
//             })}
//             {this.renderSelect({
//               placeholder: "Priority",
//               name: "taskPrioty",
//               items: arraysOfItem,
//             })}
//             {this.renderDragDropInput({
//               name: "file",
//               accept: "images",
//             })}
//             <small className="formats cmb-2">
//               {/* (Supported formats are jpg, png. Image dimensions of 710 x 258
//               pixels. Image must be in white background. Maximum size is 200kb) */}
//             </small>
//             {errors.file && (
//               <small className="formats cmb-2 red">{errors.file}</small>
//             )}
//           </div>
//           <div className="ts-tm">
//             {this.renderInput({
//               name: "Deadline",
//               label: `Deadline`,
//               containerClass: "cw-100",
//             })}
//             {this.renderInput({
//               name: "Time",
//               label: `Time`,
//               containerClass: "cw-100",
//             })}
//           </div>

//           {this.renderButton({
//             label: "Update",
//             extraClass: "cap cmt-2",
//             loading: isLoading,
//             id: "update",
//             handler: this.buttonClicked,
//           })}
//         </form>
//       </Modal>
//     );
//   }
// }

// export default EditTaskModal;



// src/components/modals/EditTaskModal.js
import React, { PureComponent } from "react";
import { Modal } from "antd";
import FormLayout from "../Formlayout";
import "../modals/addTask.scss";

class EditTaskModal extends FormLayout {
  defaultState = {
    data: {
      Name: { value: this.props?.selectedTask.title },
      Description: { value: this.props?.selectedTask.description },
      Deadline: { value: this.props?.selectedTask.date },
      taskPrioty: { value: this.props?.selectedTask.priority },
      file: { value: this.props?.selectedTask.image },
    },
    empties: {},
    errors: {},
  };

  state = { ...this.defaultState };

  // componentDidUpdate(prevProps) {
  //   if (prevProps.selectedTask !== this.props.selectedTask) {
  //     const { selectedTask } = this.props;
  //     this.setState({
  //       data: {
  //         Name: { value: selectedTask.title || "" },
  //         Description: { value: selectedTask.description || "" },
  //         taskPrioty: { value: selectedTask.priority || 1 },
  //         file: { value: selectedTask.image || "", fileName: "" },
  //         Deadline: { value: selectedTask.date || "" },
  //         Time: { value: "" },
  //       },
  //     });
  //   }
  // }

  buttonClicked = (e) => {
    e.preventDefault();
    const {
      data: { Name, Description, taskPrioty, Deadline, Time },
      data,
      errors,
    } = this.state;

    // const validationResult = this.validate({
    //   Name: { value: Name.value },
    //   Description: { value: Description.value },
    //   taskPrioty: { value: taskPrioty.value },
    //   Deadline: { value: Deadline.value },
    //   Time: { value: Time.value },
    // });

    // if (!validationResult) {
    //   this.props.editItem({
    //     title: Name.value,
    //     image: data.file?.value,
    //     description: Description.value,
    //     date: Deadline.value,
    //     priority: taskPrioty.value,
    //   });

    //   this.closeModal();
    // }

    const updatedTask = {
      title: data.Name.value,
      description: data.Description.value,
      date: data.Deadline.value,
      priority: data.taskPrioty.value,
      image: data.file.value
    };
    this.props.editItem(updatedTask);
    this.closeModal()
    this.props.el.toggleEditModal();
  };



  
  clearState = () => {
    this.setState({ ...this.defaultState });
  };

  closeModal = () => {
    this.clearState();
    this.props.toggleModal();
  };


  render() {
    const { visible } = this.props;
    const arraysOfItem = [
      { id: 1, name: "HIGH" },
      { id: 2, name: "MEDIUM" },
      { id: 3, name: "LOW" },
    ];

    return (
      <Modal
      visible={visible}
      title="Edit Task"
      onCancel={this.closeModal} // Make sure to use closeModal function here
      footer={null}
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
            })}
            <small className="formats cmb-2">
              {/* Supported formats: jpg, png. Max size: 200kb */}
            </small>
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
            handler: this.buttonClicked,
          })}
        </form>
      </Modal>
    );
  }
}

export default EditTaskModal;

