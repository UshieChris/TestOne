import "./style.css";

import { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <div className="page-title">2 August 2023</div>
        <div className="flex flex-row gap-2">
          <div className="w-auto">
            <div className="name">Hi, Chris</div>
            <div className="email-box">chrisushie301@gmail.com</div>
          </div>
          <div className="flex flex-col">
            <div className="name-icon">{"CC"}</div>
          </div>
        </div>
      </header>
    );
  }
}

// const mapStateToProps = (state) => state;

export default Header;
