import React from 'react';
import { Link } from 'react-router-dom';
import Location from '../../images/pin.png'
import Email from '../../images/email.png'
import Phone from '../../images/phone.png'
import Fans from '../../images/users.png'
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
import { DeleteClub } from '../../Dashboard/store/actions';
import { connect } from 'react-redux';
const { confirm } = Modal;
class VendorCard extends React.Component {
  state = {};

  componentDidMount() {
    console.log(this.props.history)

      let images = document.querySelectorAll(".card-img");
      images.forEach(image => {
        image.addEventListener("error", () => {
          image.src = avatarPlaceholder;
        });
      });
  }

  deleteVendorCard = () => {
    fetch(`http://native-001-site2.ctempurl.com/api/DeleteCompany?CompanyId=${1}`).then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          // this.setState({companies, loading : false})
          message.success('company deleted successfully'); 
        });
      } else {
        message.error('Network response was not ok.');
        // this.setState({loading : false})
      }
    })
    .catch((error) => {
      this.setState({loading : false})
      message.error('There has been a problem with your fetch operation: ' + error.message);
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
        fetch(`http://native-001-site2.ctempurl.com/api/DeleteCompany?CompanyId=${cardId}`)
        .then((response) => {
          console.log(response)
          if(response.ok) {
            response.json().then((data) => {
              message.success('company deleted successfully'); 
              setTimeout(() => {
                window.location.reload();
              }, 800)
              
            });
          } else {
            if(response.status === 400){
              message.warning(`can't delete ${name} beacuse it has active venodrs, Please delete Vendors first`);
            }else{
              message.error('Network response was not ok.');
            }
          }
        })
        .catch((error) => {
          this.setState({loading : false})
          message.error('There has been a problem with your fetch operation: ' + error.message);
        });
      }else if(this.props.fans){
        fetch(`http://native-001-site2.ctempurl.com/api/DeleteClub?ClubId=${cardId}`)
        .then((response) => {
          if(response.ok) {
            response.json().then((data) => {
              message.success('club deleted successfully'); 
              this.props.dispatch(DeleteClub(cardId))
              // setTimeout(() => {
              //   window.location.reload();
              // }, 800)
              
            });
          } else {
            message.error('Network response was not ok.');
          }
        })
        .catch((error) => {
          this.setState({loading : false})
          message.error('There has been a problem with your fetch operation: ' + error.message);
        });
      }else{
        fetch(`http://native-001-site2.ctempurl.com/api/DeleteVendor?VendorId=${cardId}`)
        .then((response) => {
          console.log(response)
          if(response.ok) {
            response.json().then((data) => {
              message.success('vendor deleted successfully'); 
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
      }
      },
    });
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
              <FansNumber>{activeUser}K</FansNumber>
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