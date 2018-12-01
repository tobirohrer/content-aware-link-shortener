import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      target: "",
      result: ""
    }
  }

  render() {
    const { target, result } = this.state;

      this.submitTarget = (target) => {
          fetch('http://127.0.0.1:8000/links', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  target: target
              })
          })
              .then(response=>response.json())
              .then(json=>
                  this.setState({result: json})
              )
      }

    return (
      <div>
            <TextField
                id="standard-name"
                label="target-Url"
                value={target}
                onChange={(event)=>this.setState({target: event.target.value})}
                margin="normal"
            />
          <Button variant="contained" color="primary" onClick={()=>this.submitTarget(target)}>
              Generate Link!
          </Button>
          {result != "" ? <a href={'http://localhost:8000/' + result} >{'http://localhost:8000/' + result}</a> : null}

      </div>
    );
  }
}

export default App;
