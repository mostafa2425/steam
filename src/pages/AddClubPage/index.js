import React from 'react';
import { Provider } from "react-redux";
import store from "../../redux/store";
import SideBarContainer from '../../containers/SideBarContainer'
import DropdownList from '../../components/DropdownList'
import ClubForm from '../../components/ClubForm'
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


class AddClubPage extends React.Component {

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
              <ClubForm
               title="Add Club"
               onSubmit={showResults}
              />
            </Provider>
          </PageSection>
        </PageContainer>
      </Container>
    );
  }
}

export default AddClubPage;
