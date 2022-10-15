import {
  DashboardOutlined,
  AddToPhotosOutlined,
  AspectRatioOutlined,
  AssignmentTurnedInOutlined,
  AlbumOutlined,
  SwitchCameraOutlined,
  SwitchLeftOutlined,
  DescriptionOutlined,
  AutoAwesomeMosaicOutlined,
} from "@material-ui/icons/";

import HomeIcon from "@mui/icons-material/Home";
import UpdateIcon from "@mui/icons-material/Update";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "@mui/material";

const MenuitemOfficer = [
  {
    title: "สาขาวิชา",
    icon: ReceiptLongIcon,
    href: "/officer",
  },
  {
    title: "ข้อมูลอาจารย์",
    icon: HomeIcon,
    href: "/officer/list",
  },
  {
    title: "ดาวน์โหลดฟอร์มExel",
    icon: AssignmentTurnedInOutlined,
    href: "/officer/downloadfile",
  },
  {
    title: "หลักสูตรการศึกษา",
    icon: AssignmentTurnedInOutlined,
    href: "/officer/addcouse",
  },
  {
    title: "รายวิชาศึกษาทั่วไป",
    icon: AssignmentTurnedInOutlined,
    href: "/officer/gensubject",
  },

  {
    title: "รายชื่อนิสิต",
    icon: UpdateIcon,
    href: "/officer/addstudent",
  },

  {
    title: "Update ผลการเรียน HTML",
    icon: AssignmentTurnedInOutlined,
    href: "/officer/updatehtml",
  },
  // {
  //   title: "หลักสูตรรายวิชาเรียน",
  //   icon: AlbumOutlined,
  //   href: "/student/Test",
  // },
];

export default MenuitemOfficer;
