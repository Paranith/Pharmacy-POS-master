import React from 'react';
import AddCategory01 from './views/categories/mainCategory/AddMainCategory';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const AddCompany = React.lazy(() => import('./views/Company/AddCompany'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));
const ManageBranches = React.lazy(() => import('./views/Branches/ManageBranches'));
const AddBranch = React.lazy(() => import('./views/Branches/AddBranch'));
const AddEmployee = React.lazy(() => import('./views/Employee/AddEmployee'));
const ManageEmployee = React.lazy(() => import('./views/Employee/ManageEmployee'));
const AddMainCategory = React.lazy(() => import('./views/categories/mainCategory/AddMainCategory'));
const ManageSecondCategory = React.lazy(() => import('./views/categories/secondCategory/ManageSecondCategory'));
const ManageThirdCategory = React.lazy(() => import('./views/categories/ThirdCategory/ManageThirdCategory'));
const ManageMainCat = React.lazy(() => import('./views/categories/mainCategory/ManageMainCat'));
const AddSecondCategory = React.lazy(() => import('./views/categories/secondCategory/AddSecondCategory'));
const AddThirdCategory = React.lazy(() => import('./views/categories/ThirdCategory/AddThirdCategory'));
const AddItem = React.lazy(() => import('./views/Item/AddItem'));
const ManageItems = React.lazy(() => import("./views/Item/ManageItems"));
const AddSupplier = React.lazy(() => import('./views/Suppliers/AddSupplier'));
const ManageSupplier = React.lazy(()=> import('./views/Suppliers/ManageSupllier'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/managecompany', name: 'Manage Company', component: AddCompany },
  { path: '/managebranches', name:'Manage Branches', component: ManageBranches},
  { path: '/addbranch', name:'Add Branch', component: AddBranch},
  { path: '/updateBranch/:id', name: 'Update Branch Category', component: AddBranch },
  { path: '/addEmployee', name: 'Add Employee', component: AddEmployee },
  { path: '/updateEmp/:id', name: 'Update Employee', component: AddEmployee },
  { path: '/manageemployees', name: 'Manage Employee', component: ManageEmployee },
  { path: '/addMainCategory', name: 'Add Main Categories', component: AddMainCategory },
  { path: '/managemaincategory', name: 'Manage Main Categories', component: ManageMainCat },
  { path: '/manageSecondCategory', name: 'Manage Secondary Categories', component: ManageSecondCategory },
  { path: '/addsecondcategory', name: 'Add Secondary Categories', component: AddSecondCategory },
  { path: '/manageThirdCategory', name: 'manage Third Categories', component: ManageThirdCategory },
  { path: '/addthirdcategory', name: 'Add Third Categories', component: AddThirdCategory },
  { path: '/updateCat01:id', name: 'Update Main Category', component: AddMainCategory },
  { path: '/updateCat02/:id', name: 'Update Secondary Category', component: AddSecondCategory},
  { path: '/updateCat03/:id', name: 'Update Third Category', component: AddThirdCategory },
  { path: '/additem', name:'Add Item', component: AddItem },
  { path: '/manageitems', name: 'Manage Items', component: ManageItems },
  { path: '/updateItems/:id', name: 'Update Items', component: AddItem },
  { path: '/addsupplier', name:'Add Supplier', component: AddSupplier },
  { path: '/manageSupplier', name:'Manage Supplier', component: ManageSupplier },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
];

export default routes;
