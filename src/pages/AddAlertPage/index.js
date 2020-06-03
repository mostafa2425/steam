import React from 'react';
import { Provider } from "react-redux";
import store from "../../redux/store";
import SideBarContainer from '../../containers/SideBarContainer'
import DropdownList from '../../components/DropdownList'
import AlertForm from '../../components/AlertForm'
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


class AddAlertPage extends React.Component {

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
              <AlertForm
               title="Add Alert"
               onSubmit={showResults}
              />
            </Provider>
          </PageSection>
        </PageContainer>
      </Container>
    );
  }
}

export default AddAlertPage;
