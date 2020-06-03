import React from 'react';
import {
  Container,
  Title,
  Description,
  StatisticsImage,
  ContentContainer,
} from './StyledComponents';

class SmallCard extends React.Component {

  render() {
    const { title, image, number, transparent } = this.props;

    return (
      <Container style={(transparent && { backgroundColor: 'transparent', boxShadow: 'none' })}>
        <StatisticsImage src={image} alt="users" />
        <ContentContainer>
          <Description>{number}</Description>
          <Title>{title}</Title>
        </ContentContainer>
      </Container>
    );
  }
}

export default SmallCard;
