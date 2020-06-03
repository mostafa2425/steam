import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  ListTitle,
} from './StyledComponents';

class SideList extends React.Component {

  render() {
    const { to, text } = this.props;

    return (
      <Container>
        <Link to={to} style={{ textDecoration: 'none', display: 'flex' }}>
          <ListTitle>{text}</ListTitle>
        </Link>
      </Container>
    );
  }
}

export default SideList;
