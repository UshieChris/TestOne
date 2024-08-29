import { Component } from "react";
import { NavButton } from "../NavButton";
import logo from "./../../assets/LOGO.png";
import { RetrieveSvg, AuditsSvg, AddIconBank, SettingsSvg, CalenderSvg, InboxSvg, NoteSvg,TodoListSvg } from "../svgs";

import "./style.css";

export class Sidebar extends Component {
  render() {
    return (
      <section className="sidebar">
        <div className="logo-layout">
          <img className="logo" src={logo} alt="Logo" />
        </div>
        <div className="sidebar-links">
          <NavButton path="/" text="CALLENDER">
            <CalenderSvg />
          </NavButton>
          <NavButton path="/inbox" text="INBOX">
            <InboxSvg />
          </NavButton>
          <NavButton path="/notes" text="NOTES">
            <NoteSvg />
          </NavButton>
          <NavButton path="/todo-list" text="TODO LIST">
            <TodoListSvg />
          </NavButton>
          <NavButton path="/settings" text="SETTINGS">
            <SettingsSvg />
          </NavButton>
          {/* <NavButton path="/" text="CardHolders">
                        <Icon2 />
                    </NavButton>
                    <NavButton path="/" text="CardHolders">
                        <Icon3 />
                    </NavButton> */}
        </div>
      </section>
    );
  }
}
