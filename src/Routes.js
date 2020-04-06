import React from "react";

import Home from "./components/Home";
import RoomList from "./components/RoomList";
import RoomDetail from "./components/RoomDetail";

const routes = [
  {
    path: "/home",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/room-list",
    exact: true,
    main: () => <RoomList />,
  },
  {
    path: "/room",
    exact: true,
    main: () => <RoomDetail />,
  },
];

export default routes;
