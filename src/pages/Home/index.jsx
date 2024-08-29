import { Component } from "react";
import BaseLayout from "../BaseLayout";
import { Outlet } from "react-router-dom";
import Body from "./body";


export class HomePage extends Component {
  render() {
    return (
      <BaseLayout>
        <Outlet />
        <Body />
      </BaseLayout>
    );
  }
}

const mapStateToProps = (state) => state;

export default HomePage;
