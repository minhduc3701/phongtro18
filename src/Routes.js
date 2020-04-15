import React from "react";

import Home from "./components/Home";
import RoomList from "./components/RoomList";
import RoomDetail from "./components/RoomDetail";
import ImageList from "./components/ImageList";
import Manager from "./components/Manager";
import Profile from "./components/Profile";

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
  {
    path: "/image-list",
    exact: true,
    main: () => <ImageList />,
  },
  {
    path: "/management",
    exact: true,
    main: () => <Manager />,
  },
  {
    path: "/profile",
    exact: true,
    main: () => <Profile />,
  },
];

export default routes;
