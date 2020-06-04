import React from 'react';
import {
  Container,
  Title,
  Description,
  StatisticsImage,
  ContentContainer,
} from './StyledComponents';
import { Progress } from 'antd';

class SmallCard extends React.Component {

  render() {
    const { title, image, number, transparent, isProgress } = this.props;
    return (
      <Container style={(transparent && { backgroundColor: 'transparent', boxShadow: 'none' })}>
        <StatisticsImage src={image} alt="users" />
        <ContentContainer>
          <Description>{number}</Description>
          <Title>{title}</Title> 
          {isProgress && <Progress className="progress-holder" percent={41} showInfo={false} />}
        </ContentContainer>
      </Container>
    );
  }
}

export default SmallCard;
