import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import moment from 'moment';
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

import { Menu, Dropdown, message, Spin, Select } from 'antd';
import { MoreOutlined, MailOutlined, PrinterOutlined, FormOutlined } from '@ant-design/icons';
import InvoicePage from '../../pages/InvoicePage';
import { connect } from 'react-redux';
import { setBranchesList } from '../../Dashboard/store/actions';

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
    sortable: true,
    cell: (values) => <p>{values.Vendor.Name}</p>
  },
  {
    name: 'Invoice Amount Due',
    selector: 'DueAmount',
    sortable: true,
  },
  {
    name: 'Invoice paid Amount',
    selector: 'PaidAmount',
    sortable: true,
  },
  {
    name: 'Invoice Remaining Amount',
    sortable: true,
    cell: (values) => <p>{values.DueAmount - values.PaidAmount}</p>

  },
  {
    name: 'Invoice Date',
    sortable: true,
    cell: (values) => <p>{moment(values.CreatedAt).format('L')}</p>
  },
  {
    name: 'Type',
    selector: 'Type',
    sortable: true,
    cell: (values) => <p>{values.Type ? "true" : "false"}</p>
  },
  {
    name: 'Statues',
    selector: 'Enable',
    sortable: true,
    cell: (values) => <p>{values.Status ? "true" : "false"}</p>
  },
  {
    name: 'Actions',
    selector: 'actions',
    sortable: true,
    right: true,
    cell : (value) => <div className="table-action"><Link to={{ pathname : "/update-invoice", data : value}} className="mr-15"><FormOutlined /></Link><Link style={{ color:'#000'}} to={{ pathname : "/invoice", data : value}} ><PrinterOutlined /></Link></div>
  },
];



class InvoiceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branches : [],
      vendors : [],
      isFilterd : false
    }
  }
  componentDidMount() {
    // eslint-disable-next-line no-lone-blocks
    {this.props.isInvoices &&
      fetch('https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetVendors?Page=0').then((response) => {
        if(response.ok) {
          response.json().then((data) => {
            let vendors = data.model;
            this.setState({vendors, loading : false})
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
  }
  
    if(!this.props.brnachesList.length > 0){
      fetch('http://native-001-site2.ctempurl.com/api/GetAllInvoices?Page=0').then((response) => {
        if(response.ok) {
          response.json().then((data) => {
            let branches = data.model;
            this.setState({branches, loading : false})
            // this.props.dispatch(setBranchesList(branches)) 
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

  onChangeVendor = (value) => {
    if(!this.state.isFilterd){
      this.setState({orginalBranches : this.state.branches, isFilterd : true},() => {
        let filter = this.state.branches.filter(branch => branch.VendorId ==  value);
        this.setState({branches : filter})
      })
    }else{
      let filter = this.state.orginalBranches.filter(branch => branch.VendorId ==  value);
        this.setState({branches : filter})
    }
  }
  
  render() {

    return (
      <Container className="invoice-page-wrapper">
        {!this.state.loading ? 
        <>
        {
        this.props.isInvoices && 
          <Select onChange={this.onChangeVendor} size="large" style={{width : "280px"}} placeholder="filter by vendor">
          {this.state.vendors && this.state.vendors.map(vendor => <Select.Option value={`${vendor.Id}`}>{vendor.Name}</Select.Option>)}
        </Select>
        }
        <h3>invoices</h3>
        <DataTable
          title={ this.props.isInvoices ? '' : 'Branches'}
          // title={ this.props.isInvoices ? 'Invoices' : 'Branches'}
          columns={columns} 
          data={this.state.branches.length > 0 ? this.state.branches : []}
          striped
          pointerOnHover
          persistTableHead
          pagination
        /> 
        </>
        : <Spin />}
        
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
