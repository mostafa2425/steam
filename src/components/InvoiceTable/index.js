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

import { Menu, Dropdown, message, Spin } from 'antd';
import { MoreOutlined, MailOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import InvoicePage from '../../pages/InvoicePage';
import { connect } from 'react-redux';
import { setBranchesList } from '../../Dashboard/store/actions';

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
const columns = [
  {
    name: 'Record ID',
    selector: 'Id',
    sortable: true,
  },
  {
    name: 'Invoice ID',
    selector: 'Id',
    sortable: true,
  },
  {
    name: 'Vendor ID',
    selector: 'VendorId',
    sortable: true,
  },
  {
    name: 'Vendor Name',
    selector: 'VendorTypeName',
    sortable: true,
  },
  {
    name: 'Invoice Amount Due',
    selector: 'VendorTypeName',
    sortable: true,
  },
  {
    name: 'Invoice paid Amount',
    selector: 'Id',
    sortable: true,
  },
  {
    name: 'Invoice Remaining Amount',
    selector: 'Id',
    sortable: true,
  },
  {
    name: 'Invoice Date',
    selector: 'VendorTypeName',
    sortable: true,
  },
  {
    name: 'Type',
    selector: 'Type',
    sortable: true,
    cell: (values) => <p>{values.Type ? "true" : "false"}</p>
  },
  // {
  //   name: 'Branch ID',
  //   selector: 'Id',
  //   sortable: true,
  // },
  // {
  //   name: 'City',
  //   selector: 'VendorTypeName',
  //   sortable: true,
  // },
  // {
  //   name: 'Total orders',
  //   selector: 'Id',
  //   sortable: true,
  // },
  {
    name: 'Statues',
    selector: 'Enable',
    sortable: true,
    cell: (values) => <p>{values.Enable ? "true" : "false"}</p>
  },
  {
    name: 'Actions',
    selector: 'actions',
    sortable: true,
    right: true,
    cell: () => <Link to="/invoice" style={{ textDecoration: 'none', display: 'flex' }}><button className="primary-fill" style={{ fontWeight: 'bold' }}>print</button></Link>,
  },
];



class InvoiceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branches : [],
    }
  }
  componentDidMount() {
    if(!this.props.brnachesList.length > 0){
      fetch('https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetBranches?Page=0').then((response) => {
        if(response.ok) {
          response.json().then((data) => {
            let branches = data.model;
            this.setState({branches, loading : false})
            this.props.dispatch(setBranchesList(branches)) 
          });
        } else {
          message.error('Network response was not ok.');
          this.setState({loading : false})
        }
      })
      .catch((error) => {
        this.setState({loading : false})
        message.error('There has been a problem with your fetch operation: ' + error.message);
      });
    }else{
      this.setState({branches : this.props.brnachesList, loading : false})
    }
  }
  
  render() {

    return (
      <Container className="invoice-page-wrapper">
        {!this.state.loading ? 
        <DataTable
          title="Branches"
          columns={columns} 
          data={this.state.branches.length > 0 ? this.state.branches : []}
          striped
          pointerOnHover
          persistTableHead
          pagination
        /> : <Spin />}
        
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
      brnachesList: state.dashboard.branchesList,
  }
}

export default connect(mapStateToProps)(InvoiceTable);
