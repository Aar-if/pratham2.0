import masterIcon from "../../../../public/images/database.svg";
import centerIcon from "../../../../public/images/centers.svg";
import dashboardIcon from "../../../../public/images/dashboard.svg";
import userIcon from "../../../../public/images/group.svg";
import programIcon from "../../../../public/images/programIcon.svg";
import certificateIcon from "../../../../public/images/certificate_custom.svg";
import support from '../../../assets/images/Support.svg';

import coursePlannerIcon from "../../../../public/images/event_available.svg";
import { store } from "@/store/store";
import { Role } from "@/utils/app.constant";
const isActiveYear = store.getState().isActiveYearSelected;

const Menuitems = [
  {
    title: "SIDEBAR.CENTERS",
    icon: centerIcon,
    href: ["/centers"],
  },
  {
    title: "PROGRAM_MANAGEMENT.PROGRAMS",
    icon: programIcon,
    href: ["/programs"],
  },

  {
    title: "SIDEBAR.MANAGE_USERS",
    icon: userIcon,
    subOptions: [
      {
        title: "SIDEBAR.TEAM_LEADERS",
        href: ["/team-leader"],
      },
      {
        title: "SIDEBAR.FACILITATORS",
        href: ["/faciliator"],
      },
      {
        title: "SIDEBAR.LEARNERS",
        href: ["/learners"],
      },
     
    ],
  },
  {
    title: "SIDEBAR.CERTIFICATE_ISSUANCE",
    icon: certificateIcon,
    href: ["/certificate-issuance"],
  },
  {
    title: "MASTER.MASTER",
    icon: masterIcon,
    subOptions: [
      {
        title: "MASTER.STATE",
        href: ["/state"],
      },
      {
        title: "MASTER.DISTRICTS",
        href: ["/district"],
      },
      {
        title: "MASTER.BLOCKS",
        href: ["/block"],
      },
    ],
  },
  {
    title: "SIDEBAR.MANAGE_NOTIFICATION",
    icon: centerIcon,
    href: ["/notification-templates"],
  },
     {
    title: "SIDEBAR.SUPPORT_REQUEST",
    icon: support,
    href: ["/support-request"],
  },
  ...(isActiveYear
    ? [
        {
          title: "SIDEBAR.COURSE_PLANNER",
          icon: coursePlannerIcon,
          href: ["/course-planner", "/stateDetails", "/subjectDetails", "/importCsv", "/resourceList", "/play/content/[identifier]"],
        },
      ]
    : []),
  ...(isActiveYear
    ? [
        {
          title: "SIDEBAR.WORKSPACE",
          icon: dashboardIcon,
          href: ["/workspace", "/course-hierarchy/[identifier]"],
        },
      ]
    : []),
];

export const getFilteredMenuItems = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const adminInfo = localStorage.getItem("adminInfo");
    let userInfo;

    if (adminInfo && adminInfo !== "undefined") {
      userInfo = JSON.parse(adminInfo || "{}");
    } 

    if (userInfo?.role === Role.SCTA || userInfo?.role === Role.CCTA) {
      if(userInfo?.tenantData[0]?.tenantName != "Second Chance Program" ) {
        return Menuitems.filter(
          (item) =>
            item.title === "SIDEBAR.WORKSPACE"
        );
   
      }
      // For SCTA and CCTA, show only Course Planner and Workspace
      return Menuitems.filter(
        (item) =>
          item.title === "SIDEBAR.COURSE_PLANNER" ||
          item.title === "SIDEBAR.WORKSPACE" || item.title === "SIDEBAR.SUPPORT_REQUEST"
      );
    }

    if (
      userInfo?.role === Role.ADMIN 
    ) {
      // Exclude Course Planner and Workspace for Admin and Central Admin
      return Menuitems.filter(
        (item) =>
          item.title !== "SIDEBAR.COURSE_PLANNER" &&
          item.title !== "SIDEBAR.WORKSPACE" &&
          item.title !== "PROGRAM_MANAGEMENT.PROGRAMS" &&
          item.title !== "SIDEBAR.MANAGE_NOTIFICATION"


      );
    }
    if (
      userInfo?.role === Role.ADMIN ||
      userInfo?.role === Role.CENTRAL_ADMIN
    ) {
      // Exclude Course Planner and Workspace for Admin and Central Admin
      return Menuitems.filter(
        (item) =>
          item.title !== "SIDEBAR.COURSE_PLANNER" &&
          item.title !== "SIDEBAR.WORKSPACE" &&
          item.title !== "SIDEBAR.CENTERS" &&
          item.title !== "SIDEBAR.MANAGE_USERS"


      );
    }

    return Menuitems;
  }
};


export default Menuitems;
