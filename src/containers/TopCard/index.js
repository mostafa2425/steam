import React from 'react';
import RevenueListItem from '../../components/RevenueListItem';
import {
  Container,
  Title,
} from './StyledComponents';

class TopCard extends React.Component {
  state = {};

  render() {
    return (
      <Container>
        <Title>{this.props.title}</Title>
        {this.props.data && this.props.data.map((card, i) => <RevenueListItem index={i} card={card} type={this.props.type} />)}
        {/* <RevenueListItem type={this.props.type} />
        <RevenueListItem type={this.props.type} />
        <RevenueListItem type={this.props.type} /> */}
      </Container>
    );
  }
}

export default TopCard;
