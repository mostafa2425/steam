import React from 'react';
import {
  Container,
  CompanyLogo,
  CompanyName,
  CompanyPhone,
  CompanyEmail,
  ActiveStatus,
  NotActiveStatus,
  ContentContainer,
  Icon,
} from './StyledComponents';

class ComponyProfile extends React.Component {
  componentDidMount() {
    !JSON.parse(localStorage.getItem("token")) && this.props.history.push("/login");
    
  }
  
  render() {
    const { name, email, emailIcon, phone, phoneIcon, image, active } = this.props;

    return (
      <Container>
        <CompanyLogo src={image} alt={name} />
        <ContentContainer>
          <CompanyName>{name}</CompanyName>
          {active ?
            <ActiveStatus>Active</ActiveStatus>
            :
            <NotActiveStatus>Not Active</NotActiveStatus>
          }
          <CompanyPhone><Icon src={phoneIcon} alt="email" />{phone}</CompanyPhone>
          <CompanyEmail><Icon src={emailIcon} alt="email" />{email}</CompanyEmail>
        </ContentContainer>
      </Container>
    );
  }
}

export default ComponyProfile;
