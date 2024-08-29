import { Component } from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

export class NavButton extends Component {
  render() {
    const { path, text, children } = this.props;
    return (
      <NavLink to={path} className="navlink">
        <div className="icon">{children}</div>
        <div className="navText">{text}</div>
      </NavLink>
    );
  }
}
