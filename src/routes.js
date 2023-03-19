/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Shifts from "views/shifts/Shifts";
import ShiftForm from "views/shifts/ShiftForm";
import AcademicYear from "views/academicYear/academicYear";
import AcademicYearForm from "views/academicYear/academicYearForm";
import ExamType from "views/examtype/ExamType";
import ExamTypeForm from "views/examtype/ExamTypeForm";
import Parent from "views/parent/Parent";
import ParentForm from "views/parent/ParentForm";
import UserForm from "views/user/userForm";
import User from "views/user/user";
import Classes from "views/classes/classes";
import ClassForm from "views/classes/classesForm";
import Students from "views/students/students";
import StudentForm from "views/students/studentForm";
import ExamResult from "views/examresult/examResult";
import ExamResultForm from "views/examresult/examResultForm";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/shifts",
    name: "Shifts",
    icon: "nc-icon nc-chart-pie-35",
    component: Shifts,
    layout: "/admin",
  },
  {
    path: "/academic-year",
    name: "Academic year",
    icon: "nc-icon nc-chart-pie-35",
    component: AcademicYear,
    layout: "/admin",
  },
  {
    path: "/exam-type",
    name: "exam type",
    icon: "nc-icon nc-chart-pie-35",
    component: ExamType,
    layout: "/admin",
  },
  {
    path: "/parent",
    name: "parents",
    icon: "nc-icon nc-chart-pie-35",
    component: Parent,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "users",
    icon: "nc-icon nc-chart-pie-35",
    component: User,
    layout: "/admin",
  },
  {
    path: "/class",
    name: "classes",
    icon: "nc-icon nc-chart-pie-35",
    component: Classes,
    layout: "/admin",
  },
  {
    path: "/student",
    name: "students",
    icon: "nc-icon nc-chart-pie-35",
    component: Students,
    layout: "/admin",
  },
  {
    path: "/exam-result",
    name: "exam result",
    icon: "nc-icon nc-chart-pie-35",
    component: ExamResult,
    layout: "/admin",
  },
  {
    path: "/shifts/new",
    icon: "nc-icon nc-bell-55",
    component: ShiftForm,
    layout: "/admin",
  },
  {
    path: "/shifts/update",
    icon: "nc-icon nc-bell-55",
    component: ShiftForm,
    layout: "/admin",
  },
  {
    path: "/academic-year/new",
    icon: "nc-icon nc-bell-55",
    component: AcademicYearForm,
    layout: "/admin",
  },
  {
    path: "/academic-year/update",
    icon: "nc-icon nc-bell-55",
    component: AcademicYearForm,
    layout: "/admin",
  },
  {
    path: "/exam-type/new",
    icon: "nc-icon nc-bell-55",
    component: ExamTypeForm,
    layout: "/admin",
  },
  {
    path: "/exam-type/update",
    icon: "nc-icon nc-bell-55",
    component: ExamTypeForm,
    layout: "/admin",
  },
  {
    path: "/parent/new",
    icon: "nc-icon nc-bell-55",
    component: ParentForm,
    layout: "/admin",
  },
  {
    path: "/parent/update",
    icon: "nc-icon nc-bell-55",
    component: ParentForm,
    layout: "/admin",
  },
  {
    path: "/user/new",
    icon: "nc-icon nc-bell-55",
    component: UserForm,
    layout: "/admin",
  },
  {
    path: "/user/update",
    icon: "nc-icon nc-bell-55",
    component: UserForm,
    layout: "/admin",
  },
  {
    path: "/class/new",
    icon: "nc-icon nc-bell-55",
    component: ClassForm,
    layout: "/admin",
  },
  {
    path: "/class/update",
    icon: "nc-icon nc-bell-55",
    component: ClassForm,
    layout: "/admin",
  },
  {
    path: "/student/new",
    icon: "nc-icon nc-bell-55",
    component: StudentForm,
    layout: "/admin",
  },
  {
    path: "/exam-result/new",
    icon: "nc-icon nc-bell-55",
    component: ExamResultForm,
    layout: "/admin",
  },
  {
    path: "/exam-result/update",
    icon: "nc-icon nc-bell-55",
    component: ExamResultForm,
    layout: "/admin",
  },
];

export default dashboardRoutes;
