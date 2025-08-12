import type { Router } from "vue-router";
import { jwtDecode } from "jwt-decode";
interface MyTokenPayload {
    email: string;
    iat: number;
    exp: number;
    permissions: string[];
    sub: string;
    roles: string[];
}
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
        if (accessToken) {
            const decoded = jwtDecode<MyTokenPayload>(accessToken);
            if (decoded.roles.includes("employee")) {
                if (to.name !== "attendance-scan") {
                    next({ name: "attendance-scan" });
                    return;
                }
                next();
                return;
            }


        }
        if (!accessToken) {
            next({ name: "login" });
            return;
        }

        next();
    });
}
