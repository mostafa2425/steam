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
import { MoreOutlined, MailOutlined, EnvironmentOutlined, SettingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
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

 showDeleteConfirm = (cardId) => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK', cardId);
      },
      onCancel() {
        console.log('Cancel', cardId);
      },
    });
  }

 
  render() {    
    const { image, name, link, fans, location, to, phone, status, email, HeadQuarter, isCompany, cardId, editLink } = this.props;
    console.log(editLink)
    return (
      <Container>
        <Dropdown className="dropdown-list" overlay={
        <Menu className="dropdown-list-holder">
          <Menu.Item key="0">
            <Link to ={{ pathname: `${editLink.pathname}`, vendorInfo :editLink.vendorInfo, }}>Edit</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="1" onClick={() => this.showDeleteConfirm(cardId)}>
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
            <VendorName>{name}</VendorName>
            <VendorCountry>{HeadQuarter ? HeadQuarter : 'KSA'}</VendorCountry>
            {status ? <VendorStatus style={{color : "#81b955"}}>Active</VendorStatus> : <VendorStatus>Not Active</VendorStatus>}
            
          </FansTextContainer>
        </VendorContainer>
        {fans && (
          <FansContiner>
            <FansImage src={Fans} alt="fans" />
            <FansTextContainer>
              <FansNumber>200K</FansNumber>
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
              <Details>Riyadh</Details>
            </ListingText>
          )}
          <ListingText>
            <TitleImage src={Phone} alt="title" />
          <Details> <a href="tel:+${phone}" style={{ color: '#969696'}}>{phone}</a> </Details>
          </ListingText>
        </ContantContainer>
        <Link to={to}  style={{ textDecoration: 'none', display: 'flex' }}>
          <VeiwBotton>{link}</VeiwBotton>
        </Link>
      </Container>
    );
  }
}

export default VendorCard;