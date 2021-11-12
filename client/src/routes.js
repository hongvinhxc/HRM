import RoleManagement from "views/RoleManagement";
import UserProfile from "views/UserProfile";
import UserManagement from "views/UserManagement";
import CategoryManagement from "views/CategoryManagement";
const dashboardRoutes = [
  {
    path: "/role-management",
    name: "Quản lý phân quyền",
    icon: "nc-icon nc-android",
    component: RoleManagement,
    layout: "/admin",
  },
  {
    path: "/account-management",
    name: "Quản lý người dùng",
    icon: "nc-icon nc-bullet-list-67",
    component: UserManagement,
    layout: "/admin",
  },
  {
    path: "/employee-management",
    name: "Quản lý hồ sơ",
    icon: "nc-icon nc-bullet-list-67",
    component: UserManagement,
    layout: "/admin",
  },
  {
    path: "/category-management",
    name: "Quản lý danh mục",
    icon: "nc-icon nc-settings-tool-66",
    component: CategoryManagement,
    layout: "/admin",
  },
  {
    path: "/report",
    name: "Thống kê báo cáo",
    icon: "nc-icon nc-settings-tool-66",
    component: CategoryManagement,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
];

export default dashboardRoutes;
