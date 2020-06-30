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
import {
  LogoutOutlined,
} from '@ant-design/icons';

class DropdownList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : null
    };
  }
  state = { isMenuOpened: false }
  componentDidMount() {
    this.setState({data : JSON.parse(localStorage.getItem("userInfo"))})
  }
  
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
        <Title>{this.state.data ? this.state.data.UserName :title}</Title> 
        {isMenuOpened && (
          <MenuContiner>
          <>
            {list.map(item => (
              <MenuItem>{item}</MenuItem>
            ))}
            <MenuItem onClick={this.handelLogout} className="logout-link"> <LogoutOutlined /> logout</MenuItem>
            </>
          </MenuContiner>
        )}
      </Container>
    );
  }
}

// export default DropdownList;
export default withRouter (DropdownList);
