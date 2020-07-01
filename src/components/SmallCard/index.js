import React from 'react';
import {
  Container,
  Title,
  Description,
  StatisticsImage,
  ContentContainer,
} from './StyledComponents';
import { Progress } from 'antd';
import { Link } from 'react-router-dom';

class SmallCard extends React.Component {

  render() {
    const { title, image, number, transparent, isProgress, isInvoice } = this.props;
    return (
      <Container style={(transparent && { backgroundColor: 'transparent', boxShadow: 'none' })}>
        <StatisticsImage src={image} alt="users" />
        <ContentContainer>
          <Description>{number}</Description>
          { isInvoice ? <Title><Link style={{color: "#81b955"}} to="/invoice">{title}</Link></Title> : <Title>{title}</Title>} 
          {isProgress && <Progress className="progress-holder" percent={this.props.number ? +this.props.number.replace("%" , ' ') : 0} showInfo={false} />}
        </ContentContainer>
      </Container>
    );
  }
}

export default SmallCard;
