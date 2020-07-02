import React from "react";
import SideBarContainer from "../../containers/SideBarContainer";
import DropdownList from "../../components/DropdownList";
import InvoiceTable from "../../components/InvoiceTable";
import UserAvatar from "../../images/avatar.jpg";
import { withRouter } from "react-router-dom";
import {
  Container,
  PageContainer,
  PageSection,
  HeaderPageSection,
} from "./StyledComponents";

class InvoicePage extends React.Component {
  componentDidMount() {
    !JSON.parse(localStorage.getItem("token")) &&
      this.props.history.push("/login");
    console.log(this.props.location.vendorId, "id");
  }

  render() {
    return (
      <Container>
        <PageContainer>
          <HeaderPageSection>
            <DropdownList
              title="user name"
              list={["Edit Profile", "Notification"]}
              titleImage={UserAvatar}
            />
          </HeaderPageSection>
          <PageSection>
            <InvoiceTable vendorId={this.props.location.vendorId} isInvoices />
          </PageSection>
        </PageContainer>
      </Container>
    );
  }
}

// export default InvoicePage;
export default withRouter(InvoicePage);
