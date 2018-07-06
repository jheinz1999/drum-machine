import React from 'react';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const TransportContainer = styled.div`
  width: 100%;
  height: 50px;
  background: #616161;
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  color: #202020;
`;

const PlayButton = styled.div`
  height: 30px;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 4px 15px;
  margin-left: 10px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const PauseButton = styled.div`
  height: 30px;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 4px 15px;
  margin-left: 10px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const StopButton = styled.div`
  height: 30px;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 4px 15px;
  margin-left: 10px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const BPMLabel = styled.div`
  height: 30px;
  border-radius: 5px;
  padding: 4px;
  margin-left: 10px;
  font-weight: bold;
`;

const BPM = styled.input`
  height: 30px;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 4px;
  margin-left: 10px;
  font-weight: bold;
  max-width: 70px;
`;

const PadsToggle = styled.div`
  height: 30px;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 4px 15px;
  margin-left: 100px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const BeatIndicator = styled.div`
  height: 30px;
  border-radius: 5px;
  padding: 4px;
  margin-left: 10px;
  font-weight: bold;
`;

const options = ["Synth Drumkit", "Sampled Drumkit"];

class Transport extends React.Component {

  constructor(props) {

    super(props);
    this.state = {

      kitName: this.props.kitName

    };
    console.log("WHAT THE FUCKJ " + this.props.kitName);

  }

  render() {

    var selected = {value: 0, label: this.props.kitName};
    console.log(this.props.kitName);

    return (
      <TransportContainer>
        <PlayButton onClick={this.props.play}>PLAY</PlayButton>
        <PauseButton onClick={this.props.pause}>PAUSE</PauseButton>
        <StopButton onClick={this.props.stop}>STOP</StopButton>
        <BPMLabel>BPM</BPMLabel>
        <BPM defaultValue="120" onChange={this.props.changeBPM}/>
        <PauseButton onClick={this.props.clearSequences}>CLEAR</PauseButton>
        <BeatIndicator>BEAT: {this.props.beat + 1}</BeatIndicator>
        <PadsToggle onClick={this.props.togglePads}>CONTROLS</PadsToggle>
        <Dropdown options={options} onChange={this.props.setKit} value={selected}/>
      </TransportContainer>
    );
  }
}

export default Transport;
