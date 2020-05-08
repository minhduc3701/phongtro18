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
