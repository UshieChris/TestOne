import { Component } from "react";

import "./style.css";

// import { BackIconSvg } from "../../reuse/svgs";

class User extends Component {
  constructor(props) {
    super(props);
  }
  initialState = {
    pageNum: 0,
    pageSize: 10,
    totalPages: 0,
    userDetails: {},
  };
  state = { ...this.initialState };

  handleBackClick = () => {
    this.props.navigate("/");
  };

  render() {
    return (
      <section className="user-details">
        <div className="user-section mx-0">Inbox</div>
      </section>
    );
  }
}

export default User;
