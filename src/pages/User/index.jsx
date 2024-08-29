import { Component } from "react";
import BaseLayout from "../BaseLayout";
import { Outlet } from "react-router-dom";
import User from "./userdetail";

export class UserPage extends Component {
  render() {
    return (
      <BaseLayout>
        <Outlet />
        <User />
      </BaseLayout>
    );
  }
}

export default UserPage;
