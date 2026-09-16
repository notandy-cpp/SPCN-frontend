import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Forum from "../pages/Forum/Forum";
import MentalHealthCheck from "../pages/MentalHealthCheck/MentalHealthCheck";

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
    {
        path: "/mentalhealthsurvey",
        component: MentalHealthCheck,
        layout: null,
    },


];

const privateRoutes = [];

export {publicRoutes, privateRoutes}