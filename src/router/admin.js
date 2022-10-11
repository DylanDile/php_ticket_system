import HomeView from '../views/HomeView.vue'
import LoginView from "../views/LoginView";
import users from "../router/users";
import tickets from "../router/tickets";
import DashboardView from "../views/DashboardView";

let childRoutes = [
    {
        path: '/',
        component: DashboardView,
        meta: { requireAuth: true},
    }
];
childRoutes = childRoutes.concat(users);
childRoutes = childRoutes.concat(tickets);

let routes = [
    {
        path: '/',
        component: HomeView,
        meta: { requireAuth: true},
        children : childRoutes
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { guest: true},
    },

]

export default routes;