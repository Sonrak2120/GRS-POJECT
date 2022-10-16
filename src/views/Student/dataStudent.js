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
import FactCheckIcon from "@mui/icons-material/FactCheck";
import GradingIcon from "@mui/icons-material/Grading";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

const MenuitemStudent = [
  {
    title: "ตรวจสอบการเรียน",
    icon: GradingIcon,
    href: "/student",
  },
  {
    title: "ตรวจสอบวิชาที่เรียน",
    icon: FactCheckIcon,
    href: "/student/checkcouse",
  },
  {
    title: "ตรวจสอบแผนรายวิชา",
    icon: FormatListNumberedIcon,
    href: "/student/checkplan",
  },
  {
    title: "หลักสูตรรายวิชาเรียน",
    icon: ReceiptLongIcon,
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
