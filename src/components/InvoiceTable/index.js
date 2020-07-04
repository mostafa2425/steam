import React from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import moment from "moment";
import Location from "../../images/pin.png";
import Email from "../../images/email.png";
import Phone from "../../images/phone.png";
import Fans from "../../images/users.png";
import DunkinDonutsIcon from "../../images/logo-png.png";
import DropdownList from "../../components/DropdownList";
import UserAvatar from "../../images/avatar.jpg";
import { Container, AddBtn } from "./StyledComponents";

import { Menu, Dropdown, message, Spin, Select } from "antd";
import {
  MoreOutlined,
  MailOutlined,
  PrinterOutlined,
  FormOutlined,
} from "@ant-design/icons";
import InvoicePage from "../../pages/InvoicePage";
import { connect } from "react-redux";
import {
  setBranchesList,
  setAllVendorList,
} from "../../Dashboard/store/actions";

const columns = [
  {
    name: "Record ID",
    selector: "Id",
    sortable: true,
  },
  {
    name: "Invoice ID",
    selector: "Id",
    sortable: true,
  },
  {
    name: "Vendor ID",
    selector: "VendorId",
    sortable: true,
  },
  {
    name: "Vendor Name",
    sortable: true,
    cell: (values) => <p>{values.Vendor.Name}</p>,
  },
  {
    name: "Invoice Amount Due",
    selector: "DueAmount",
    sortable: true,
  },
  {
    name: "Invoice paid Amount",
    selector: "PaidAmount",
    sortable: true,
  },
  {
    name: "Invoice Remaining Amount",
    sortable: true,
    cell: (values) => <p>{values.DueAmount - values.PaidAmount}</p>,
  },
  {
    name: "Invoice Date",
    sortable: true,
    cell: (values) => <p>{moment(values.CreatedAt).format("L")}</p>,
  },
  {
    name: "Type",
    selector: "Type",
    sortable: true,
    cell: (values) => <p>{values.Type ? "online" : "physical"}</p>,
  },
  {
    name: "Statues",
    selector: "Enable",
    sortable: true,
    cell: (values) => <p>{values.Status ? "Active" : "InActive"}</p>,
  },
  {
    name: "Actions",
    selector: "actions",
    sortable: true,
    right: true,
    cell: (value) => (
      <div className="table-action">
        <Link
          to={{ pathname: "/update-invoice", data: value }}
          className="mr-15"
        >
          <FormOutlined />
        </Link>
        <Link
          style={{ color: "#000" }}
          to={{ pathname: "/invoice", data: value }}
        >
          <PrinterOutlined />
        </Link>
      </div>
    ),
  },
];

class InvoiceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branches: [],
      vendors: [],
      isFilterd: false,
      loading: true,
    };
  }

  fetchAllInvoices = () => {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("token")),
    });
    if (!this.props.brnachesList.length > 0) {
      fetch(
        "https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetAllInvoices?Page=-1",
        {
          method: "GET",
          headers: myHeaders,
        }
      )
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              let branches = data.model;
              this.setState({ branches, loading: false }, () => {
                if (this.props.vendorId) {
                  this.onChangeVendor(this.props.vendorId);
                }
              });
              // this.props.dispatch(setBranchesList(branches))
            });
          } else {
            message.error("Network response was not ok.");
            this.setState({ loading: false });
          }
        })
        .catch((error) => {
          this.setState({ loading: false });
          message.error(
            "There has been a problem with your fetch operation: " +
              error.message
          );
        });
    } else {
      this.setState({
        branches: this.props.brnachesList,
        loading: false,
      });
    }
  };
  componentDidMount() {
    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("token")),
    });

    if (this.props.isInvoices) {
      if (!this.props.allVendorList.length > 0) {
        fetch(
          "https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetVendors?Page=-1",
          {
            method: "GET",
            headers: myHeaders,
          }
        )
          .then((response) => {
            if (response.ok) {
              response.json().then((data) => {
                let vendors = data.model;
                this.setState({ vendors }, () => {
                  this.props.dispatch(setAllVendorList(vendors));
                  this.fetchAllInvoices();
                });
              });
            } else {
              message.error("Network response was not ok.");
              this.setState({ loading: false });
            }
          })
          .catch((error) => {
            this.setState({ loading: false });
            message.error(
              "There has been a problem with your fetch operation: " +
                error.message
            );
          });
      } else {
        this.setState({ vendors: this.props.allVendorList, loading: false });
        this.fetchAllInvoices()
      }
    }
  }

  onChangeVendor = (value) => {
    if (!this.state.isFilterd) {
      if (value === "All") {
        // this.setState({})
      } else {
        this.setState(
          { orginalBranches: this.state.branches, isFilterd: true },
          () => {
            let filter = this.state.branches.filter(
              (branch) => branch.VendorId === value
            );
            this.setState({ branches: filter });
          }
        );
      }
    } else {
      if (value === "All") {
        this.setState({ branches: this.state.orginalBranches });
      } else {
        let filter = this.state.orginalBranches.filter(
          (branch) => branch.VendorId === value
        );
        this.setState({ branches: filter });
      }
    }
  };

  render() {
    return (
      <Container className="invoice-page-wrapper">
        {!this.state.loading ? (
          <>
            {this.props.isInvoices && (
              <Select
                onChange={this.onChangeVendor}
                defaultValue={this.props.vendorId && this.props.vendorId}
                size="large"
                style={{ width: "280px" }}
                placeholder="filter by vendor"
              >
                {this.state.vendors && (
                  <>
                    <Select.Option style={{ fontWeight: "bold" }} value="All">
                      All Vendors
                    </Select.Option>
                    {this.state.vendors.map((vendor) => (
                      <Select.Option value={vendor.Id}>
                        {vendor.Name}
                      </Select.Option>
                    ))}
                  </>
                )}
              </Select>
            )}
            <h3>invoices</h3>
            <DataTable
              title={this.props.isInvoices ? "" : "Branches"}
              // title={ this.props.isInvoices ? 'Invoices' : 'Branches'}
              columns={columns}
              data={this.state.branches.length > 0 ? this.state.branches : []}
              striped
              pointerOnHover
              persistTableHead
              pagination
              overflowY={false}
              // overflowYOffset=
              // style={{minHeight : '150px'}}
            />
          </>
        ) : (
          <Spin />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    brnachesList: state.dashboard.branchesList,
    allVendorList: state.dashboard.allVendorList,
  };
};

export default connect(mapStateToProps)(InvoiceTable);
