// frontend/src/config/menuData.js

export const menu = [
  {
    name: "Dashboard",
    path: "/",
    module: "dashboard",
  },
  {
    name: "Inventorization",
    path: "/inventorization",
    module: "dashboard",
  },
  {
    name: "Transfer",
    path: "/transfer",
    module: "dashboard",
  },
  {
    name: "Receive",
    path: "/receive",
    module: "dashboard",
  },
  {
    name: "Sales",
    path: "/sales",
    module: "dashboard",
  },
  {
    name: "Report",
    path: "/report",
    module: "reports",
  },
  {
    name: "Users",
    path: "/users",
    module: "pocket_users",
    children: [
      {
        name: "Website Users",
        path: "/users/website-users",
        module: "website_users",
      },
      {
        name: "Website Roles",
        path: "/users/website-roles",
        module: "website_roles",
      },
      {
        name: "Pocket Users",
        path: "/users/pocket-users",
        module: "pocket_users",
      },
      {
        name: "Pocket Roles",
        path: "/users/pocket-roles",
        module: "pocket_roles",
      },
    ],
  },
  {
    name: "Settings",
    path: "/settings",
    module: "settings",
    children: [
      {
        name: "Warehouse",
        path: "/settings/warehouses",
        module: "warehouses",
      },
    ],
  },
];
