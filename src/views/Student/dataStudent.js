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

const MenuitemStudent = [
  {
    title: "ตรวจสอบการเรียน",
    icon: HomeIcon,
    href: "/student",
  },
  {
    title: "ตรวจสอบวิชาที่เรียน",
    icon: UpdateIcon,
    href: "/student/checkcouse",
  },
  {
    title: "ตรวจสอบแผนรายวิชา",
    icon: ReceiptLongIcon,
    href: "/student/checkplan",
  },
  {
    title: "หลักสูตรรายวิชาเรียน",
    icon: AssignmentTurnedInOutlined,
    href: "/student/couse",
  },
  // {
  //   title: "ทดสอบนะจ๊ะ...",
  //   icon: AssignmentTurnedInOutlined,
  //   href: "/student/test",
  // },
  // {
  //   title: "หลักสูตรรายวิชาเรียน",
  //   icon: AlbumOutlined,
  //   href: "/student/Test",
  // },
];

export default MenuitemStudent;
