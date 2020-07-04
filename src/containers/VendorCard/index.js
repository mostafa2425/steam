import React from 'react';
import { Link } from 'react-router-dom';
import Location from '../../images/pin.png'
import Email from '../../images/email.png'
import Phone from '../../images/phone.png'
import Fans from '../../images/activeUsers.png'
import DunkinDonutsIcon from '../../images/logo-png.png'
import avatarPlaceholder from '../../images/company-placholder.png'
import {
  Container,
  VendorStatus,
  ContantContainer,
  VendorName,
  ListingText,
  TitleImage,
  Details,
  VeiwBotton,
  VendorImage,
  FansContiner,
  FansTextContainer,
  FansImage,
  FansNumber,
  FansText,
  VendorCountry,
  VendorContainer,
} from './StyledComponents';
import { Menu, Dropdown, message, Modal } from 'antd';
import { SettingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { DeleteClub, DeleteCompany, DeleteVendor, deleteAllClubList, deleteAllVendorList } from '../../Dashboard/store/actions';
import { connect } from 'react-redux';
const { confirm } = Modal;
class VendorCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVendor: 0,
      currentCompany: 0,
      currentClub: 0,
    }
  }

  componentDidMount() {
    console.log(this.props.history)

      let images = document.querySelectorAll(".card-img");
      images.forEach(image => {
        image.addEventListener("error", () => {
          image.src = avatarPlaceholder;
        });
      });
  }

 showDeleteConfirm = (cardId, name) => {
    confirm({
      title: `Are you sure delete ${name} ?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk : () =>  {
        if(this.props.isCompany){
        fetch(`https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/DeleteCompany?CompanyId=${cardId}`)
        .then((response) => {
          if(response.ok) {
            response.json().then((data) => {
              message.success('company deleted successfully'); 
              this.props.dispatch(DeleteCompany(cardId))
            });
          } else {
            response.json().then((data) => {
              this.setState({ loadingBtn: false });
              message.error(`${data.errors.message}`);
            });
          }
        })
        .catch((error) => {
          this.setState({loading : false})
          message.error('There has been a problem with your fetch operation: ' + error.message);
        });
      }else if(this.props.fans){
        fetch(`https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/DeleteClub?ClubId=${cardId}`)
        .then((response) => {
          if(response.ok) {
            response.json().then((data) => {
              message.success('club deleted successfully'); 
              this.props.dispatch(DeleteClub(cardId))
              this.props.dispatch(deleteAllClubList(cardId))
            });
          } else {
            response.json().then((data) => {
              this.setState({ loadingBtn: false });
              message.error(`${data.errors.message}`);
            });
          }
        })
        .catch((error) => {
          this.setState({loading : false})
          message.error('There has been a problem with your fetch operation: ' + error.message);
        });
      }else{
        fetch(`https://cors-anywhere.herokuapp.com/http://native-001-site2.ctempurl.com/api/DeleteVendor?VendorId=${cardId}`)
        .then((response) => {
          console.log(response)
          if(response.ok) {
            response.json().then((data) => {
              message.success('vendor deleted successfully'); 
              this.props.dispatch(DeleteVendor(cardId))
              this.props.dispatch(deleteAllVendorList(cardId))
            });
          } else {
            response.json().then((data) => {
              this.setState({ loadingBtn: false });
              if(data.errors.Code === 34){
                message.error("Vendor cannot be deleted because there are branches, please delete branches first"); 
              }else{
                message.error(`${data.errors.message}`);  
              }
            });
          }
        })
        .catch((error) => {
          this.setState({loading : false})
          message.error('There has been a problem with your fetch operation: ' + error.message);
        }); 
      }
      },
    });
  }

  covertTokFormatter = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' G';
   }
   if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' M';
   }
   if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' K';
   }
   return num;
  }
 
  render() {    
    const { image, name, link, fans, location, to, phone, status, email, HeadQuarter, isCompany, cardId, editLink, league, activeUser } = this.props;
    return (
      <Container>
        <Dropdown className="dropdown-list" overlay={
        <Menu className="dropdown-list-holder">
          <Menu.Item key="0">
            <Link to ={{ pathname: `${editLink.pathname}`, data : editLink.vendorInfo }}>Edit</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="1" onClick={() => this.showDeleteConfirm(cardId, name)}>
            <a>Delete</a>
          </Menu.Item>
        </Menu>} 
        trigger={['click']}> 
      <SettingOutlined />
      </Dropdown>
        <VendorContainer className={`${isCompany && "company-info"}`}>
          { !isCompany ? image ?
          <VendorImage className="card-img" src={ fans ? `http://native-001-site2.ctempurl.com/images/clubimages/${image}` : `http://native-001-site2.ctempurl.com/images/vendorimages/${image}`} alt="vendor" /> :  <VendorImage className="card-img" src={avatarPlaceholder} alt="vendor" /> : null
        }
          <FansTextContainer >
            <VendorName>{ name}</VendorName>
            { !isCompany && ( fans ? <VendorCountry>{league == 1 ? "First Division" : "second Division"}</VendorCountry> : <VendorCountry>{HeadQuarter ? HeadQuarter : 'KSA'}</VendorCountry> )}
            {status ? <VendorStatus style={{color : "#81b955"}}>Active</VendorStatus> : <VendorStatus>Not Active</VendorStatus>}
            
          </FansTextContainer>
        </VendorContainer>
        {fans && (
          <FansContiner>
            <FansImage src={Fans} alt="fans" />
            <FansTextContainer>
              <FansNumber>{this.covertTokFormatter(activeUser)}</FansNumber>
              <FansText>Active Users</FansText>
            </FansTextContainer>
          </FansContiner>
        )}
        <ContantContainer>
          <ListingText>
            <TitleImage src={Email} alt="title" />
            <Details> <a href="mailto:{email}" style={{ color: '#969696'}}>{email}</a></Details> 
          </ListingText>
          { location && (
            <ListingText>
              <TitleImage src={Location} alt="title" />
              <Details>{HeadQuarter ? HeadQuarter : "KSA"}</Details>
            </ListingText>
          )}
          <ListingText>
            <TitleImage src={Phone} alt="title" />
          <Details> <a href="tel:+${phone}" style={{ color: '#969696'}}>{phone}</a> </Details>
          </ListingText>
        </ContantContainer>
        {isCompany ? 
        <Link to ={{ pathname: `${to}`, companyId : cardId }}  style={{ textDecoration: 'none', display: 'flex' }}>
          <VeiwBotton>{link}</VeiwBotton>
        </Link>
        : 
        <Link to={to}  style={{ textDecoration: 'none', display: 'flex' }}> 
          <VeiwBotton>{link}</VeiwBotton>
        </Link>
        }
      </Container>
    );
  }
}

export default connect()(VendorCard);