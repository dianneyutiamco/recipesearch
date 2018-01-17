import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {SearchAPI} from './sampleData.jsx';
import Stars from './starsRating.jsx';
import '../css/app.css';

class Search extends Component {
	constructor(props) {
		super(props);
		let initFilters = {
			mealType: 0,
			cuisineType: 0
		};

		SearchAPI.searchKey = '';
		SearchAPI.filters = initFilters;
		const searchresults = SearchAPI.search();
		this.state = {
			searchKey: '',
			filters: initFilters,
			searchresults: searchresults,
		}

		this.handleSearchClick = this.handleSearchClick.bind(this);
	}

	/**
	Search button click handler
	*/
	handleSearchClick(event, passedState) {
		if(passedState) {
			this.loadSearchResults(passedState);
		} else {
			this.loadSearchResults(this.state);
		}
		
	};

	/**
	Sets the search key and filters and calls search
	*/
	loadSearchResults(passedState) {
		// TODO, server call
		SearchAPI.searchKey = passedState.searchKey;
		SearchAPI.filters.mealType = passedState.filters.mealType;
		SearchAPI.filters.cuisineType = passedState.filters.cuisineType;
		const searchresults = SearchAPI.search();
		this.setState({searchresults: searchresults});
	};

	/**
	Search Component's render function
	*/
	render() {
		const searchResults = this.state.searchresults;
		let results = <div className="recipe-not-found"><h3>Sorry, there were no results found.</h3></div>;
		if (searchResults.length > 0) {
			results = <SearchResults searchresults={searchResults}/>
		}
		return(
			<div className="searchbox">
				<div style={{marginBottom: '70px'}}>
					<SearchBox 
						onSearchClick={this.handleSearchClick}/>
				</div>
				<br />
				<div className="center-contents-div">
					{results}
				</div>
			</div>
		);
	}
}

class SearchBox extends Component {
	constructor(props) {
		super(props);
		let initFilters = {
			mealType: 0,
			cuisineType: 0
		};

		SearchAPI.searchKey = '';
		SearchAPI.filters = initFilters;
		this.state = {
			searchKey: '',
			filters: initFilters,
			openFilters: false
		}

		this.handleSearchClick = this.handleSearchClick.bind(this);
	}

	/**
	Search Box Text Change handler
	*/
	handleSearchKeyChange(event) {
		this.setState({searchKey: event.target.value});
	}

	/**
	Meal Type Dropdown Change handler
	*/
	handleMealTypeChange(event) {
		let newMealType = event.target.value;
		let filters = Object.assign({}, this.state.filters);
		filters.mealType = newMealType;
		this.setState({filters:filters}, this.loadSearchResults);
	}

	/**
	Cuisine Type Dropdown Change handler
	*/
	handleCuisineTypeChange(event) {
		let newCuisineType = event.target.value;
		let filters = Object.assign({}, this.state.filters);
		filters.cuisineType = newCuisineType;
		this.setState({filters: filters}, this.loadSearchResults);
	}

	/**
	Search button click handler
	*/
	handleSearchClick(event) {
		this.props.onSearchClick(event, this.state);
	}

	/**
	Toggle Search Box filters
	TRUE: Open filter div
	FALSE: Close filter div	
	*/
	toggleFilters() {
		this.setState({
			openFilters: !this.state.openFilters
		});
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	render() {
		return(
			<div className="searchbox">
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="search-key-div">
						<input type="text" 
							className="search-key-text"
							autoComplete="off"
							placeholder="Search Recipe..."
							id="recipeSearchBox"
							value={this.state.searchKey}
							onChange={this.handleSearchKeyChange.bind(this)}/>
						{
							/*
								icon from https://www.iconsdb.com/custom-color/search-12-icon.html
							*/
						}
						<input className="filter-icon" type="image" src="/app/img/filter_icon.png" onClick={this.toggleFilters.bind(this)}/>
						<input className="search-icon" type="image" src="/app/img/search_icon.png" onClick={this.handleSearchClick}/>
					</div>
					<div className={"search-key-div search-filter collapse " + (this.state.openFilters? "off" : "")} >
						<div className="filters-outer">
							<div className="meal-type">
								<label>Meal Type</label>
								<select value={this.state.filters.mealType} onChange={this.handleMealTypeChange.bind(this)}>
									<option value="0">All</option>
									<option value="1">Appeizer</option>
									<option value="2">Entree</option>
									<option value="3">Dessert</option>
									<option value="4">Others</option>
								</select>
							</div>
							<div className="cuisine-type">
								<label>Cuisine Type</label>
								<select value={this.state.filters.cuisineType} onChange={this.handleCuisineTypeChange.bind(this)}>
									<option value="0">All</option>
									<option value="1">Chinese</option>
									<option value="2">Italian</option>
									<option value="3">Mexican</option>
									<option value="4">Others</option>
								</select>
							</div>
							<span className="apply-filters" onClick={this.handleSearchClick}>APPLY</span>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

class SearchResults extends Component {
	render() {
		const searchResults = this.props.searchresults;
		return(
			<div>
				{
					searchResults.map((searchResult)=>
						<SearchResultItem 
							key={searchResult.id} 
							item={searchResult}/>
					)
				}
			</div>

		);
	}
}

function SearchResultItem(props) {
	const item = props.item;
	const totalStars = SearchAPI.perfectRating;
	const onPath = SearchAPI.starOnPath;
	const offPath = SearchAPI.starOffPath;
	const reviewsText = item.rating.voteCount > 1 ? 'Reviews' : 'Review';
	return(
		<div className="search-result-item-div">
			<div  className="search-result-img">
				<img src="/app/img/sample_img1.png" />
			</div>
			<div className="search-result-info">	
				<div>
					<Link className="recipe-title" to={{pathname: `/recipe/${item.id}`, state:{modal:true}}}>{item.title}</Link>
				</div>
				<div>
					<Stars
							on={item.rating.stars}
							total={totalStars}
							onPath={onPath}
							offPath={offPath}/>
						<span style={{marginLeft:'10px'}}>({item.rating.voteCount} {reviewsText})</span>
				</div>
				<div>
					<span>{item.description}</span>
				</div>
			</div>
		</div>
	);
}

export default Search