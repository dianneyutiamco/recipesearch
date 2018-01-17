import React, {Component} from 'react';
import Search from './search.jsx';
import Recipe from './recipe.jsx';
import {HashRouter, Switch, Route} from 'react-router-dom';

class RecipeApp extends Component {

	render() {
		return(
			<HashRouter>
				<Switch>
					<Route exact path="/" component={Search}/>
					<Route path="/recipe/:id" component={Recipe}/>
				</Switch>
			</HashRouter>
		);
	}
}

export default RecipeApp;