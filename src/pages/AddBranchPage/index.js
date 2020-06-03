import React from 'react';
import { Provider } from "react-redux";
import store from "../../redux/store";
import SideBarContainer from '../../containers/SideBarContainer'
import DropdownList from '../../components/DropdownList'
import BranchForm from '../../components/BranchForm'
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


class AddBranchPage extends React.Component {

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
              <BranchForm
               title="Add Branch"
               onSubmit={showResults}
              />
            </Provider>
          </PageSection>
        </PageContainer>
      </Container>
    );
  }
}

export default AddBranchPage;
