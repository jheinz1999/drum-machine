import React from 'react';
import { Container } from 'reactstrap';
import Sequence from './Sequence';
import Timeline from './Timeline';
import styled from 'styled-components';

const LedSpacer = styled.div`
  width: 100%;
  height: 10px;
`;

class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time
    };
  }

  render() {
    return (
      <Container>
        <LedSpacer />
        <Timeline
          currentBeat={this.props.currentBeat}
          sequenceLength={this.props.sequenceLength}
        />
        <LedSpacer />
        {Object.keys(this.props.sounds).map((name, index) => {
          return (
            <div>
              <Sequence
                key={index}
                name={name}
                playSound={this.props.sounds[name]}
                context={this.props.context}
                gain={this.props.gains[name]}
                clear={this.props.clear}
                unsetClear={this.props.unsetClear}
                currentBeat={this.props.currentBeat}
                sequenceLength={this.props.sequenceLength}
              />
              <LedSpacer />
            </div>
          );
        })}
      </Container>
    );
  }
}

export default Sequencer;
