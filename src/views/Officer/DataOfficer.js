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
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import BadgeIcon from "@mui/icons-material/Badge";

const MenuitemOfficer = [
  {
    title: "สาขาวิชา",
    icon: ReceiptLongIcon,
    href: "/officer",
  },
  {
    title: "ข้อมูลอาจารย์",
    icon: SwitchAccountIcon,
    href: "/officer/list",
  },
  {
    title: "ดาวน์โหลดฟอร์มExel",
    icon: SystemUpdateAltIcon,
    href: "/officer/downloadfile",
  },
  {
    title: "หลักสูตรการศึกษา",
    icon: AssignmentIcon,
    href: "/officer/addcouse",
  },
  {
    title: "รายวิชาศึกษาทั่วไป",
    icon: AssignmentTurnedInOutlined,
    href: "/officer/gensubject",
  },

  {
    title: "รายชื่อนิสิต",
    icon: BadgeIcon,
    href: "/officer/addstudent",
  },

  {
    title: "Update ผลการเรียน HTML",
    icon: UpdateIcon,
    href: "/officer/updatehtml",
  },
  // {
  //   title: "หลักสูตรรายวิชาเรียน",
  //   icon: AlbumOutlined,
  //   href: "/student/Test",
  // },
];

export default MenuitemOfficer;
