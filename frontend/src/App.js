import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grow from '@material-ui/core/Grow';
import Background from './files/background.jpg';
import Loading from './files/loading.svg'
import ReactSVG from 'react-svg'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import SplitFlapDisplay from 'react-split-flap-display';

const BACKEND_URL = process.env.REACT_APP_BACKENDURL

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      target: "",
      url: "",
      linkCount: 0,
      showCopyFeedback: false,
      showResult: false,
      fetching: false
    }

    this.getStats()
  }

  render() {
    const { target, url, linkCount, showCopyFeedback, showResults, fetching } = this.state;

    return (
        <div class="standard-font" style={{backgroundImage: `url(${Background})`, height: "100vh"}}>
            <div>
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <div>
                            <h1 style={{paddingTop: "8vh", color: "white", fontSize: "50px"}}>Links, die man sich merken kann. 🎉</h1>
                        </div>
                    <div style={{marginBottom: "30px"}}>
                        <SplitFlapDisplay
                            characterSet={SplitFlapDisplay.NUMERIC}
                            value={linkCount.toString()}
                            fontSize='5vh'
                        />
                    </div>
                    <Card>
                        <CardContent>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <TextField
                                        style = {{width:"30vw"}}
                                        autoFocus
                                        id="standard-name"
                                        label="Link"
                                        value={target}
                                        onChange={(event)=>(this.setState({target: event.target.value}), this.setState({showResults: false}))}
                                        margin="normal"
                                    />
                                    <Button style={{width: "25%", alignSelf: "flex-end", background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white',}}
                                            variant="contained" onClick={()=>this.submitTarget(target)}>
                                        Vereinfachen
                                    </Button>
                                    {fetching ? <div style={{alignSelf: "center"}}> <ReactSVG svgStyle={{ width: "30px", height: "30px" }} src={Loading}/> </div> : null}
                                </div>
                        </CardContent>
                    </Card>
                            <Grow in = {showResults}>
                                <Card style={{marginTop: "20px"}}>
                                    <CardContent>
                                            <div style={{marginTop: "10px"}}>
                                                <div style={{paddingBottom: "20px", opacity: "0.6", whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    maxWidth: "30vw"}}>
                                                    {target}</div>
                                                <div style={{flexDirection: 'row', display: 'flex'}}>
                                                    <div>
                                                        <a style={showCopyFeedback ? {color: "#FE6B8B"} : null} href={BACKEND_URL + '/' + url} >{BACKEND_URL + '/' + url}</a>
                                                    </div>
                                                    <div style={{marginLeft: "20px"}}>
                                                        <CopyToClipboard text = {BACKEND_URL + '/' + url}>
                                                            <Button onClick={()=>this.showCopyFeedback()} size="small" variant="outlined">Copy</Button>
                                                        </CopyToClipboard>
                                                    </div>
                                                </div>
                                            </div>
                                    </CardContent>
                                </Card>
                            </Grow>
                </div>
                <div style={{position: "absolute", bottom: 0}}>
                    <Link style={{paddingLeft: "15px", color: "white"}} to="/impressum">Impressum</Link>
                    <Link style={{paddingLeft: "15px", color: "white"}} to="/datenschutz">Datenschutz</Link>
                </div>
            </div>
        </div>
    );
  }

  submitTarget = (target) => {
    this.setState({fetching: true})
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
            this.setState({showResults: true})
            this.setState({fetching: false})
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

     showCopyFeedback = () => {
        this.setState({showCopyFeedback: true})
         setTimeout(()=>this.setState({showCopyFeedback: false}), 300)
     }
}

export default App;
