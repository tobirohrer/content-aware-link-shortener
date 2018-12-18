import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {NotFound} from "./notfound/notfound";
import {Impressum} from "./impressum/impressum";

const Root = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={'/'} component={App} />
            <Route path={'/impressum'} component={Impressum} />
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
