import React from "react";
import { Container, Row } from "reactstrap";
import Sample from "./Sample";
import styled from "styled-components";

const RowSpacer = styled.div`
  height: 30px;
`;

class SampleContainer extends React.Component {
  render() {
    if (this.props.show) {
      return (
        <Container>
          <RowSpacer />
          <Row>
            {Object.keys(this.props.sounds).slice(0,4).map((name, index) =>{
              return <Sample
              key={index}
              name={name}
              playSound={this.props.sounds[name]}
              context={this.props.context}
              gain={this.props.gains[name]}
              />
            })}
          </Row>
          <RowSpacer />
          <Row>
            {Object.keys(this.props.sounds).slice(4).map((name, index) =>{
                return <Sample
                key={index + 4}
                name={name}
                playSound={this.props.sounds[name]}
                context={this.props.context}
                gain={this.props.gains[name]}
                />
              })}
          </Row>
          <RowSpacer />
        </Container>
      );
    } else {
      return null;
    }
  }
}

export default SampleContainer;
