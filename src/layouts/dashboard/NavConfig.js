// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'users',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'vouchers',
    path: '/dashboard/products',
    icon: getIcon('eva:percent-outline'),
  },
  {
    title: 'voucher detail',
    path: '/dashboard/voucher-detail',
    icon: getIcon('eva:pricetags-outline'),
  },
  {
    title: 'create voucher',
    path: '/dashboard/voucher-create',
    icon: getIcon('eva:edit-2-outline'),
  },
  {
    title: 'Brand Info',
    path: '/dashboard/brand-info',
    icon: getIcon('eva:twitter-outline'),
  },
];

export default navConfig;
