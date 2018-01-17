import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {RecipeAPI} from './sampleData.jsx';
import Stars from './starsRating.jsx';
import Comment from './comments.jsx';

class Recipe extends Component {

	render() {
		const param = this.props.match.params.id;
		const recipeItem = RecipeAPI.get(parseInt(param, 10));
		const totalStars = RecipeAPI.perfectRating;
		const onPath = RecipeAPI.starOnPath;
		const offPath = RecipeAPI.starOffPath;
		const reviewsText = recipeItem.rating.voteCount > 1 ? 'Reviews' : 'Review';

		if (!recipeItem) {
			return(
				<div className="recipe-not-found">
					<h3>Sorry, the recipe was not found. <Link className="goback" to={{pathname: `/`}}> Go Back.</Link></h3>
				</div>
			)
		}
		return(
			
			<div className="center-contents-div">
				<Link className="goback" to={{pathname: `/`}}>&lt; Go Back</Link>
				<div className="recipe prep">
					<h3 className="recipe-title">{recipeItem.title}</h3>

					<div className="recipe-rating">
						<Stars
							on={recipeItem.rating.stars}
							total={totalStars}
							onPath={onPath}
							offPath={offPath}/>
						<span style={{marginLeft:'10px'}}>({recipeItem.rating.voteCount} {reviewsText})</span>
					</div>
				</div>

				<div className="recipe prep">		
					<div className="prep-info">
						<div>
							<span>PREPARATION TIME: </span>
							{recipeItem.prepTime}
						</div>
						<div>
							<span>LEVEL: </span>
							{recipeItem.skillLevel}
						</div>
					</div>
					<div className="recipe-ingredients">
						<div>
							<h4>Ingredients</h4>
						</div>
						<div>
							<Ingredients ingredients={recipeItem.ingredients}/>
						</div>

					</div>

					<div className="recipe-directions">
						<div>
							<h4>Directions</h4>
						</div>
						<div>
							<Directions directions={recipeItem.directions}/>
						</div>
					</div>
				</div>

				<div className="recipe comment-section">
					<Comment />
				</div>
			</div>
		);
	}
}

function Ingredients(props) {
	const ingredients = props.ingredients;
	return(
		<ul style={{ listStyleType: "none" }}>
			{
				ingredients.map((ingredient, index) => 
					<li key={index}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
				)
			}
		</ul>
	);
}

function Directions(props) {
	const directions = props.directions;
	return(
		<ol>
			{
				directions.map((direction, index) => <li key={index}>{direction.description}</li>)
			}
		</ol>);
}

export default Recipe;