import React from 'react';
import { Link } from 'react-router-dom';
import SideBarContainer from '../../containers/SideBarContainer'
import VendorCard from '../../containers/VendorCard'
import DunkinDonutsIcon from '../../images/logo-png.png'
import DropdownList from '../../components/DropdownList'
import UserAvatar from '../../images/avatar.jpg'
import {
  Container,
  PageContainer,
  PageSection,
  AddBtn,
  HeaderPageSection,
} from './StyledComponents';
import { Spin,message, Pagination } from 'antd';
import { connect } from 'react-redux';
import { setVendorList } from '../../Dashboard/store/actions';

class VendorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vendors : null,
      loading : true,
      current: 1,
      total: 15,
      pageSize: 10,
    }
    this.cardRef = React.createRef()
  }

  fetchVendorList = (isPaginate = false) => {
      const myHeaders = new Headers({
        "Content-Type": "application/json",
        'Authorization': JSON.parse(localStorage.getItem("token")),
      });
      this.setState({loading : true})
      if (!this.props.vendorList.length > 0 || isPaginate) {
      fetch(`https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/GetVendors?Page=${this.state.current - 1}`, {
        method: 'GET',
        headers: myHeaders, 
      }).then((response) => {
        if(response.ok) {
          response.json().then((data) => {
            let vendors = data.model;
            let total = data.total.total;
            this.setState({vendors,total, loading : false} , () => {
              this.props.dispatch(setVendorList(vendors));
            })
          });
        } else {
          response.json().then((data) => {
            this.setState({ loading: false });
            message.error(`${data.errors.message}`); 
          });
        }
      })
      .catch((error) => {
        this.setState({loading : false})
        message.error('There has been a problem with your fetch operation: ' + error.message);
      });
    }else{
      this.setState({ vendors: this.props.vendorList, loading: false });
    }
  }
  
  componentDidMount() {
    !JSON.parse(localStorage.getItem("token")) && this.props.history.push("/login");
    this.fetchVendorList();
  }

  onChangePage = (page) => {
    this.setState(
      {
        current: page,
      },
      () => {
        this.fetchVendorList(true);
        // this.cardRef.setState({ current : page })
      }
    );
  };

  render() {

    return (
      <Container className="vendor-page-wrapper">
        <PageContainer>
          <HeaderPageSection>
          <Link to="/add-vendor" style={{ textDecoration: 'none', display: 'flex' }}>
            <button className="primary-fill">Add Vendor</button> 
          </Link>
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          {!this.state.loading ? 
          <>
          <div className="vendor-card-list">
            {this.state.vendors && this.state.vendors.map( (vendor, i )=>
            <VendorCard 
              index={i}
              ref = {this.cardRef}
              name={vendor.Name}
              image={vendor.Logo}
              email = {vendor.Email}
              status={vendor.Enable}
              link="Veiw Dashboard" 
              phone={vendor.Phone}
              cardId ={vendor.Id}
              editLink={{ pathname: "/update-vendor", vendorInfo :vendor, }}
              // editLink={`/update-vendor`}
              location
              to={`/vendor-profile/:${vendor.Id}`}
              />
            )}
            </div>
            {this.state.total > this.state.pageSize && (
                <Pagination
                  showTotal={(total) => `Total ${total} vendors`}
                  current={this.state.current}
                  pageSize={this.state.pageSize}
                  onChange={this.onChangePage}
                  total={this.state.total}
                />
              )}
            </>
        : <Spin />}
        </PageContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vendorList: state.dashboard.vendorList,
  };
};

export default connect(mapStateToProps)(VendorPage);
