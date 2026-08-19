import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Forum from "../pages/Forum/Forum";

const publicRoutes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/login",
        component: Login,
        // layout: null,
    },
    {
        path: "/register",
        component: Register,
        // layout: null,
    },
    {
        path: "/forum",
        component: Forum,
        layout: null,
    },


];

const privateRoutes = [];

export {publicRoutes, privateRoutes}