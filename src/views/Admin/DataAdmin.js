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

const MenuitemSAdmin = [
  {
    title: "สาขาวิชา",
    icon: ReceiptLongIcon,
    href: "/admin",
  },
  {
    title: "ข้อมูลอาจารย์/เจ้าหน้าที่",
    icon: HomeIcon,
    href: "/admin/list",
  },
  {
    title: "ดาวน์โหลดฟอร์มExel",
    icon: AssignmentTurnedInOutlined,
    href: "/admin/downloadfile",
  },
  {
    title: "หลักสูตรการศึกษา",
    icon: AssignmentTurnedInOutlined,
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
    icon: UpdateIcon,
    href: "/admin/addstudent",
  },

  {
    title: "Update ผลการเรียน HTML",
    icon: AssignmentTurnedInOutlined,
    href: "/admin/updatehtml",
  },
];

export default MenuitemSAdmin;
