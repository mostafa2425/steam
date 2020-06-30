import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import {
  Container,
  Image,
  Title,
  MenuContiner,
  MenuItem,
} from './StyledComponents';
import { createHashHistory } from 'history'

class DropdownList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  state = { isMenuOpened: false }

  handelLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    this.props.history.push("/login");
  }
  render() {
    const { isMenuOpened } = this.state;
    const { title, list, titleImage } = this.props;

    return (
      <Container className="profile-holder" onClick={() => this.setState({ isMenuOpened: !isMenuOpened })}>
        <Image src={titleImage} alt={title} />
        <Title>{title}</Title>
        {isMenuOpened && (
          <MenuContiner>
          <>
            {list.map(item => (
              <MenuItem>{item}</MenuItem>
            ))}
            <MenuItem onClick={this.handelLogout} className="logout-link">logout</MenuItem>
            </>
          </MenuContiner>
        )}
      </Container>
    );
  }
}

// export default DropdownList;
export default withRouter (DropdownList);
