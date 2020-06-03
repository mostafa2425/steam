import React from 'react';
import { Provider } from "react-redux";
import store from "../../redux/store";
import SideBarContainer from '../../containers/SideBarContainer'
import DropdownList from '../../components/DropdownList'
import Forms from '../../components/Forms'
import UserAvatar from '../../images/avatar.jpg'
import {
  Container,
  PageContainer,
  PageSection,
  HeaderPageSection,
} from './StyledComponents';

function showResults(values) {
  console.log("test")
};


class AddCompanyPage extends React.Component {

  render() {

    return (
      <Container>
        
        <PageContainer>
          <HeaderPageSection>
            <DropdownList 
              title="user name"
              list={["Edit Profile", "Notification", "Logout"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          <PageSection>
            <Provider store={store}>
              <Forms
               title="Add Company"
               onSubmit={showResults}
              />
            </Provider>
          </PageSection>
        </PageContainer>
      </Container>
    );
  }
}

export default AddCompanyPage;
