import React from 'react';
import DataTable from 'react-data-table-component';
import {
  Container,
} from './StyledComponents';
import { Link } from 'react-router-dom';
import { DeleteFilled, FormOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, message } from 'antd';
const { confirm } = Modal;

function showDeleteConfirm(branchID, branchName, value){
  console.log(value)
  confirm({
    title: `Are you sure delete ${branchName} ?`,
    icon: <ExclamationCircleOutlined />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk : () =>  {
      fetch(`https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/DeleteBranch?BranchId=${branchID}`)
      .then((response) => {
        if(response.ok) {
          response.json().then((data) => {
            message.success('branch deleted successfully'); 
            setTimeout(() => {
              window.location.reload();
            }, 800)
            
          });
        } else {
          message.error('Network response was not ok.');
        }
      })
      .catch((error) => {
        this.setState({loading : false})
        message.error('There has been a problem with your fetch operation: ' + error.message);
      });
    },
  });
}
const columns = [
  {
    name: 'Branch ID',
    selector: 'Id',
    sortable: true,
  },
  {
    name: 'Reference Name',
    selector: 'Name', 
    sortable: true,
  },
  {
    name: 'Branches Statues',
    selector: 'Type',  
    sortable: true,
    cell: (values) => <p>{values.Enable ? "Active" : "InActive"}</p>
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
    cell : (value) => <div className="table-action"><DeleteFilled onClick={() => showDeleteConfirm(value.Id, value.Name, value)} className="mr-10" style={{fontSize : '16px', color : "#d83025", cursor : 'pointer'}} /><Link to={{ pathname : "/update-branch", data : value}} className=""><FormOutlined /></Link></div>
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
