import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const BACKEND_URL = process.env.REACT_APP_BACKENDURL

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      target: "",
      url: "",
      linkCount: null
    }
    this.getStats()
  }

  render() {
    const { target, url, linkCount } = this.state;

    return (
        <div class="standard-font" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <div>
                    <h1 align="center">Genug von langen, komplizierten URLS?</h1>
                </div>
                <Card style={{marginTop: "20px"}}>
                    <CardContent>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <TextField
                                style={{width: "300px"}}
                                id="standard-name"
                                label="Ziel Url"
                                value={target}
                                onChange={(event)=>this.setState({target: event.target.value})}
                                margin="normal"
                            />
                            <Button variant="contained" color="primary" onClick={()=>this.submitTarget(target)}>
                                Generiere Link
                            </Button>
                            {url != "" ?
                            <div>
                                <a href={BACKEND_URL + '/' + url} >{BACKEND_URL + '/' + url}</a> 
                            </div>
                            : null}
                        </div>
                    </CardContent>
                </Card>
                <div style={{marginTop: "30px"}}>
                    Links: {linkCount}
                </div>


        </div>
    );
  }

  submitTarget = (target) => {
    fetch(BACKEND_URL + '/links', {
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
        .then(response=>{
            this.setState({url: response.url})
            this.setState({linkCount: response.linkCount})
        }
        )
    }

    getStats = () => {
        fetch(BACKEND_URL + '/stats')
            .then(response=>response.json())
            .then(response=>{
                console.log(response)
                this.setState({linkCount: response})
            }
            )
        }
}

export default App;
