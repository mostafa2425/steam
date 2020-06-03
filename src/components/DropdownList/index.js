import React from 'react';
import {
  Container,
  Image,
  Title,
  MenuContiner,
  MenuItem,
} from './StyledComponents';

class DropdownList extends React.Component {
  state = { isMenuOpened: false }

  render() {
    const { isMenuOpened } = this.state;
    const { title, list, titleImage } = this.props;

    return (
      <Container className="profile-holder" onClick={() => this.setState({ isMenuOpened: !isMenuOpened })}>
        <Image src={titleImage} alt={title} />
        <Title>{title}</Title>
        {isMenuOpened && (
          <MenuContiner>
            {list.map(item => (
              <MenuItem>{item}</MenuItem>
            ))}
          </MenuContiner>
        )}
      </Container>
    );
  }
}

export default DropdownList;
