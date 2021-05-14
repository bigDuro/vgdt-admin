import React from 'react';
import PostAddIcon from '@material-ui/icons/PostAdd';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import BusinessIcon from '@material-ui/icons/Business';
import ImageIcon from '@material-ui/icons/Image';

export const navigation = [
  {
    name: 'Users',
    route: 'users',
    icon: (<SupervisedUserCircleIcon />),
    table: 'users'
  },
  {
    name: 'LoadBoard',
    route: 'loads',
    icon: (<PostAddIcon />),
    table: 'loads',
    admin: true
  },
  {
    name: 'Brokers',
    route: 'brokers',
    icon: (<BusinessIcon />),
    table: 'brokers',
    admin: true
  },
  {
    name: 'Invoices',
    route: 'invoices',
    icon: (<MonetizationOnIcon />),
    table: 'invoices',
    admin: true
  },
  {
    name: 'Employees',
    route: 'employees',
    icon: (<PeopleIcon />),
    table: 'employees',
    admin: true
  },
  // {
  //   name: 'Drivers',
  //   route: 'employees/type/driver',
  //   icon: (<PeopleIcon />),
  //   table: 'employees',
  //   type: 'driver'
  // },
  // {
  //   name: 'Dispatch',
  //   route: 'employees/type/dispatch',
  //   icon: (<PeopleOutlineIcon />),
  //   table: 'employees',
  //   type: 'dispatch'
  // },
  {
    name: 'Equipment',
    route: 'equipment',
    icon: (<LocalShippingIcon />),
    table: 'equipment',
    admin: true
  },
  // {
  //   name: 'Tractors',
  //   route: 'equipment/type/tractor',
  //   icon: (<LocalShippingIcon />),
  //   table: 'equipment',
  //   type: 'tractor'
  // },
  // {
  //   name: 'Trailers',
  //   route: 'equipment/type/trailer',
  //   icon: (<LocalShippingIcon />),
  //   table: 'equipment',
  //   type: 'trailer'
  // },
  // {
  //   name: 'Assets',
  //   route: 'assets',
  //   icon: (<ImageIcon />),
  //   table: 'assets'
  // },
]
