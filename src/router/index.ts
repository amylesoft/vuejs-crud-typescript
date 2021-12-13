import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "User",
        component: () => import("../views/User.vue")
    },
    {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue")
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
