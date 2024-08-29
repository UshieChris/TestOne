// import { connect } from "react-redux";
import { Sidebar } from "../components/Sidebar";
import Header from "../components/header";
// import { Actions } from "../redux-flow/actions";
// import { useAuth } from "../auth/AuthProvider";
// import { Spin } from "antd";

function BaseLayout(props) {
  // const logoutFunc = (e) => {
  //   e.preventDefault();
  //   props.dispatch(Actions.logoutUser());
  // };

  const {
    children,
    // ui_global_reducer: { global_loading },
  } = props;
  // const { authenticated } = useAuth();
  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="base-layout">
        <Sidebar />
        <div className="page-body">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
}

export default BaseLayout;
