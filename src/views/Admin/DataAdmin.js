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
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import BadgeIcon from "@mui/icons-material/Badge";

const MenuitemSAdmin = [
  {
    title: "สาขาวิชา",
    icon: ReceiptLongIcon,
    href: "/admin",
  },
  {
    title: "ข้อมูลเจ้าหน้าที่",
    icon: SwitchAccountIcon,
    href: "/admin/list",
  },
  {
    title: "ข้อมูลอาจารย์ที่ปรึกษา",
    icon: SwitchAccountIcon,
    href: "/admin/listteacher",
  },
  // {
  //   title: "ดาวน์โหลดฟอร์มExcel",
  //   icon: SystemUpdateAltIcon,
  //   href: "/admin/downloadfile",
  // },
  {
    title: "หลักสูตรการศึกษา",
    icon: AssignmentIcon,
    href: "/admin/addcouse",
  },
  {
    title: "รายวิชาศึกษาทั่วไป",
    icon: AssignmentTurnedInOutlined,
    href: "/admin/gensubject",
  },

  // {
  //   title: "Update หลักสูตร",
  //   icon: AssignmentTurnedInOutlined,
  //   href: "/admin/updatecouse",
  // },

  {
    title: "รายชื่อนิสิต",
    icon: BadgeIcon,
    href: "/admin/addstudent",
  },

  {
    title: "Upload ผลการเรียน",
    icon: UpdateIcon,
    href: "/admin/updatehtml",
  },
];

export default MenuitemSAdmin;
