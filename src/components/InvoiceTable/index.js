import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

import Location from '../../images/pin.png'
import Email from '../../images/email.png'
import Phone from '../../images/phone.png'
import Fans from '../../images/users.png'
import DunkinDonutsIcon from '../../images/logo-png.png'
import DropdownList from '../../components/DropdownList'
import UserAvatar from '../../images/avatar.jpg'
import {
  Container,
  AddBtn,
} from './StyledComponents';

import { Menu, Dropdown } from 'antd';
import { MoreOutlined, MailOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import InvoicePage from '../../pages/InvoicePage';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="">Edit</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <a href="">View</a>
    </Menu.Item>
  </Menu>
);
const data = [
  {
    id: 1,
    branchId: 9,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 2,
    branchId: 39,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 3,
    branchId: 7,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 4,
    branchId: 5,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 6,
    branchId: 23,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 7,
    branchId: 10,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 8,
    branchId: 1,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 9,
    branchId: 4,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 10,
    branchId: 9,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 11,
    branchId: 39,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 12,
    branchId: 7,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 13,
    branchId: 5,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 14,
    branchId: 23,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 15,
    branchId: 10,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 16,
    branchId: 1,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 17,
    branchId: 4,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 19,
    branchId: 9,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 19,
    branchId: 39,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 20,
    branchId: 7,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 21,
    branchId: 5,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 22,
    branchId: 23,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 23,
    branchId: 10,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 24,
    branchId: 1,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 25,
    branchId: 4,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 26,
    branchId: 9,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 27,
    branchId: 39,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 28,
    branchId: 7,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 29,
    branchId: 5,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 30,
    branchId: 23,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 31,
    branchId: 10,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 32,
    branchId: 1,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 33,
    branchId: 4,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
]
const columns = [
  {
    name: 'Branch ID',
    selector: 'branchId',
    sortable: true,
  },
  {
    name: 'City',
    selector: 'city',
    sortable: true,
  },
  {
    name: 'Total orders',
    selector: 'totalOrders',
    sortable: true,
  },
  {
    name: 'Statues',
    selector: 'statues',
    sortable: true,
  },
  {
    name: 'Actions',
    selector: 'actions',
    sortable: true,
    right: true,
    cell: () => <Link to="/invoice" style={{ textDecoration: 'none', display: 'flex' }}><AddBtn style={{ fontWeight: 'bold' }}>print</AddBtn></Link>,
  },
];



class InvoiceTable extends React.Component {
  
  render() {

    return (
      <Container className="invoice-page-wrapper">
        <DataTable
          title="Branches"
          columns={columns}
          data={data}
          striped
          pointerOnHover
          persistTableHead
          pagination
        />
      </Container>
      // <div className="vendor-table">
      //   {[...Array(10)].map(card => 
      //       <Link to="/vendor-profile" className="vendor-card">
      //       <Dropdown overlay={menu} trigger={['click']}>
      //         <MoreOutlined />
      //       </Dropdown>
      //         <img className="vendor-card--img" src={DunkinDonutsIcon} />
      //         <div style={{"display" : "flex", "juasifyContent" : "space-between"}}>
      //           <div className="info">
      //           <h3 className="vendor-name">Dunkin Donuts</h3>
      //           <span className="location">KSA</span>
      //           </div>
      //           <p className="status">Active</p>
      //         </div>
      //         <div className="detailes">
      //           <p><MailOutlined /> abc@gmail.com </p>
      //           <p><EnvironmentOutlined /> Riyadh </p>
      //           <p><PhoneOutlined /> +966547777777 </p>
      //         </div>
      //       </Link>
      //     )}
      // </div>
    );
  }
}

export default InvoiceTable;
