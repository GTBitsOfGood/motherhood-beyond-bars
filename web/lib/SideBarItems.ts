import caretakers_icon from '../public/caretakers_icon.png';
import children_and_baby_books_icon from '../public/children_and_baby_books_icon.png';
import item_requests_icon from '../public/item_requests_icon.png';
import resource_library_icon from '../public/resource_library_icon.png';
import settings_icon from '../public/settings_icon.png';

const SideBarItems = [
	{
		name: 'Caregivers',
		route: '/admin/caregivers',
		icon: caretakers_icon,
	},
	{
		name: 'Children & Baby Books',
		route: '/admin/babies',
		icon: children_and_baby_books_icon,
	},
	{
		name: 'Item Requests',
		route: '/admin/item-requests',
		icon: item_requests_icon,
	},
	{
		name: 'Resource Library',
		route: '/admin/resource-library',
		icon: resource_library_icon,
	},
	{
		name: 'Settings',
		route: '/admin/settings',
		icon: settings_icon,
	},
];

export default SideBarItems;
