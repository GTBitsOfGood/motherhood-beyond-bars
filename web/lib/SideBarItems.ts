import caretakers_icon from "../public/caretakers_icon.svg";
import children_and_baby_books_icon from "../public/children_and_baby_books_icon.svg";
import item_requests_icon from "../public/item_requests_icon.svg";
import resource_library_icon from "../public/resource_library_icon.svg";
import settings_icon from "../public/settings_icon.svg";

const AdminSideBarItems = [
  {
    name: "Caregivers",
    route: "/admin/caregivers",
    icon: caretakers_icon,
  },
  {
    name: "Children & Baby Books",
    route: "/admin/babies",
    icon: children_and_baby_books_icon,
  },
  {
    name: "Item Requests",
    route: "/admin/item-requests",
    icon: item_requests_icon,
  },
  {
    name: "Resource Library",
    route: "/admin/resource-library",
    icon: resource_library_icon,
  },
  {
    name: "Settings",
    route: "/admin/settings",
    icon: settings_icon,
  },
];

const CaregiverSideBarItems = [
  {
    name: "Baby Book",
    route: "/caregiver/book",
    icon: children_and_baby_books_icon,
  },
  {
    name: "MBB Support",
    route: "/caregiver/items",
    icon: item_requests_icon,
  },
  {
    name: "Resource Library",
    route: "/caregiver/resources",
    icon: resource_library_icon,
  },
  {
    name: "Settings",
    route: "/caregiver/settings",
    icon: settings_icon,
  },
];

const SideBarItems = {
  AdminSideBarItems,
  CaregiverSideBarItems
};

export default SideBarItems;
