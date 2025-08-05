import type { Router } from "vue-router";

export function authGuard(router: Router) {
    router.beforeEach((to, _from, next) => {
        const accessToken = localStorage.getItem("token");

        if (to.meta.skipAuthCheck) {
            // if (to.name === "login" && accessToken) {
            //     next({ name: "clinic" });
            //     return;
            // }
            next();
            return;
        }

        if (!accessToken) {
            next({ name: "login" });
            return;
        }

        next();
    });
}
