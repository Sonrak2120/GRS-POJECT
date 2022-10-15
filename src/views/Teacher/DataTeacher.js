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
import GradingIcon from "@mui/icons-material/Grading";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";

const MenuitemTeacher = [
  {
    title: "ตรวจสอบการเรียน",
    icon: GradingIcon,
    href: "/teacher",
  },
  {
    title: "ตรวจสอบจบ",
    icon: DomainVerificationIcon,
    href: "/teacher/checkactive",
  },

  // {
  //   title: "ทดสอบนะจ๊ะ",
  //   icon: AlbumOutlined,
  //   href: "/teacher/Test",
  // },
];

export default MenuitemTeacher;
