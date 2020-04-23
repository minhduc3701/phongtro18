import React from "react";

import Home from "./components/Home";
import RoomList from "./components/RoomList";
import RoomDetail from "./components/RoomDetail";
import ImageList from "./components/ImageList";
import Manager from "./components/Manager";
import EditRoom from "./components/Manager/EditRoom";
import Profile from "./components/Profile";
import asyncComponent from "./asyncComponent";

const routes = [
  {
    path: "/home",
    exact: true,
    main: asyncComponent(() => import("./components/Home")),
  },
  {
    path: "/room-list",
    exact: true,
    main: asyncComponent(() => import("./components/RoomList")),
  },
  {
    path: "/room/:id",
    exact: true,
    main: asyncComponent(() => import("./components/RoomDetail")),
  },
  {
    path: "/room-edit/:id",
    exact: true,
    // main: (match) => <EditRoom match={match} />,
    main: asyncComponent((match) => import("./components/Manager/EditRoom")),
  },
  {
    path: "/image-list",
    exact: true,
    main: asyncComponent(() => import("./components/ImageList")),
  },
  {
    path: "/management",
    exact: true,
    main: asyncComponent(() => import("./components/Manager")),
  },
  {
    path: "/profile",
    exact: true,
    main: asyncComponent(() => import("./components/Profile")),
  },
];

export default routes;
