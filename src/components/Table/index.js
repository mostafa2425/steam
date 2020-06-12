import React from 'react';
import DataTable from 'react-data-table-component';
import {
  Container,
} from './StyledComponents';
import { Link } from 'react-router-dom';
import { MoreOutlined, MailOutlined, PrinterOutlined, FormOutlined } from '@ant-design/icons';

// DeletedAt: null
// DeviceId: null
// Email: "t33333est@gmail.com"
// Enable: false
// Id: 30
// IdentityId: "65588e45-f8de-49b4-821d-32f3ce9cb61a"
// Latitude: 29.3471842
// LocalId: null
// Logo: "starbucks.png"
// Longitude: 30.867465199999998
// Name: "weeeeeeeeeeeeeeee"
// NameLT: "wewewe"
// Phone: "322323"
// RegisterationDate: "2020-06-06T22:39:08.711899"
// Token: null
// Type: false
// VendorId: 1
// VendorTypeName: "starbucks"
// VendorTypeNameLT: "ستاربكس"
const columns = [
  {
    name: 'Branch ID',
    selector: 'Id',
    sortable: true,
  },
  {
    name: 'Reference Name',
    selector: 'VendorTypeName',
    sortable: true,
  },
  {
    name: 'Branches Statues',
    selector: 'Type',  
    sortable: true,
    cell: (values) => <p>{values.Enable ? "true" : "false"}</p>
  },
  {
    name: 'Total Orders',
    selector: 'Id',
    sortable: true,
    maxWidth : "120px",
  },
  {
    name: 'Actions',
    selector: 'actions',
    maxWidth : "100px",
    sortable: true,
    right: true,
    cell : () => <div className="table-action"><Link to="/add-branch" className=""><FormOutlined /></Link></div>
  },

];

class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTable : this.props.data
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.state.dataTable){
      this.setState({ dataTable : nextProps.data})
    }
  }
  
  render() {

    return (
      <Container>
        <DataTable
          title="Branches"
          columns={columns}
          data={this.state.dataTable.length > 0  ? this.state.dataTable : []}
          // data={data} 
          striped
          pointerOnHover
          persistTableHead
          pagination
        />
      </Container>
    );
  }
}

export default TableComponent;
