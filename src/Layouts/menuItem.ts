import { MenuItemType } from "@paljs/ui/types";

const items: MenuItemType[] = [
    {
        title: "Home Page",
        icon: { name: "home" },
        link: { href: "/dashboard" },
    },
    {
        title: "Dashboard",
        group: true,
    },
    {
        title: "Foods",
        icon: { name: "thermometer-plus" },
        link: { href: "/dashboard/food" },
    },
    {
        title: "Alerts",
        icon: { name: "alert-circle" },
        link: { href: "/dashboard/alerts" },
    },
    {
        title: "Orders",
        icon: { name: "file" },
        link: { href: "/dashboard/orders" },
    },
    // {
    //     title: "Auth",
    //     group: true,
    // },
    // {
    //     title: "Auth",
    //     icon: { name: "lock-outline" },
    //     children: [
    //         {
    //             title: "Login",
    //             link: { href: "/auth/login" },
    //         },
    //         {
    //             title: "Register",
    //             link: { href: "/auth/register" },
    //         },
    //         {
    //             title: "Request Password",
    //             link: { href: "/auth/request-password" },
    //         },
    //         {
    //             title: "Reset Password",
    //             link: { href: "/auth/reset-password" },
    //         },
    //     ],
    // },
];

export default items;
