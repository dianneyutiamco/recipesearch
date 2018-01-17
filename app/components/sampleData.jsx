const recipes = 
	[
		{
			id: 0,
			title: 'Healthy Appetizer',
			description: "Savor a moist dark chocolate cake with a delicious strawberry whipped cream filling. Fresh strawberries & Hershey's cocoa are made for each other in this recipe!",
			mealType: 1,
			cuisineType: 1,
			rating: {
				stars: 5,
				voteCount: 3
			},
			prepTime: "30 Minutes",
			skillLevel: "Beginner", 
			ingredients: [
				{unit: 'cup', quantity: '3/4', name: 'broccoli'},
				{unit: 'spoon', quantity: '1', name: 'spinach'}
			],
			directions: [
				{order:1, description: 'Boil broccoli and spinach for 5 minutes'},
				{order:2, description: 'Drain water'},
				{order:3, description: 'Serve while hot. Enjoy!'}
			]
		},
		{
			id: 1, 
			title: 'Healthy Main Course',
			description: "Savor a moist dark chocolate cake with a delicious strawberry whipped cream filling. Fresh strawberries & Hershey's cocoa are made for each other in this recipe!",
			mealType: 2,
			cuisineType: 2,
			rating: {
				stars: 3,
				voteCount: 1
			},
			prepTime: "1 Hour",
			skillLevel: "Intermediate", 
			ingredients: [
				{unit: 'kg', quantity: '1/2', name: 'beef'},
				{unit: 'tsp', quantity: '1/4', name: 'salt'},
				{unit: 'handfool', quantity: '1', name: 'mixed vegetables'}
			],
			directions: [
				{order:1, description: 'Grill beef'},
				{order:2, description: 'Boil mixed veggies'},
				{order:3, description: 'Drizzle with salt'},
				{order:4, description: 'Serve while hot. Enjoy!'}
			]

		},
		{
			id: 2, 
			title: 'Healthy Sweets',
			description: "Savor a moist dark chocolate cake with a delicious strawberry whipped cream filling. Fresh strawberries & Hershey's cocoa are made for each other in this recipe!",
			mealType: 3,
			cuisineType: 3,
			rating: {
				stars: 2,
				voteCount: 300
			},
			prepTime: "1 Hour & 30 Mintues",
			skillLevel: "Expert", 
			ingredients: [
				{unit: 'can', quantity: '1', name: 'garbanzo beans'},
				{unit: 'cup', quantity: '1/4', name: 'chocolate chips'}
			],
			directions: [
				{order:1, description: 'Preheat oven'},
				{order:2, description: 'Mash garbanzo beans'},
				{order:3, description: 'Mix garbanzo beans and chocoloate chips'},
				{order:4, description: 'Bake at 180 degrees'},
				{order:5, description: 'Let it cool down before serving'},
			]
		},
		{
			id: 3, 
			title: 'Kind of Healthy',
			description: "Savor a moist dark chocolate cake with a delicious strawberry whipped cream filling. Fresh strawberries & Hershey's cocoa are made for each other in this recipe!",
			mealType: 3,
			cuisineType: 3,
			rating: {
				stars: 1,
				voteCount: 3000
			},
			prepTime: "2 Hours & 30 Mintues",
			skillLevel: "Expert", 
			ingredients: [
				{unit: 'can', quantity: '1', name: 'garbanzo beans'},
				{unit: 'cup', quantity: '1/4', name: 'chocolate chips'},
				{unit: 'can', quantity: '1', name: 'garbanzo beans'},
				{unit: 'cup', quantity: '1/4', name: 'chocolate chips'},
				{unit: 'can', quantity: '1', name: 'garbanzo beans'},
				{unit: 'cup', quantity: '1/4', name: 'chocolate chips'}
			],
			directions: [
				{order:1, description: 'Preheat oven'},
				{order:2, description: 'Mash garbanzo beans'},
				{order:3, description: 'Mix garbanzo beans and chocoloate chips'},
				{order:4, description: 'Bake at 180 degrees'},
				{order:5, description: 'Let it cool down before serving'},
				{order:6, description: 'Preheat oven'},
				{order:7, description: 'Mash garbanzo beans'},
				{order:8, description: 'Mix garbanzo beans and chocoloate chips'},
				{order:9, description: 'Bake at 180 degrees'},
				{order:10, description: 'Let it cool down before serving'},
				{order:11, description: 'Preheat oven'},
				{order:12, description: 'Mash garbanzo beans'},
				{order:13, description: 'Mix garbanzo beans and chocoloate chips'},
				{order:14, description: 'Bake at 180 degrees'},
				{order:15, description: 'Let it cool down before serving'},
			]
		}
	];

const SearchAPI = {
	searchKey: '',
	filters: {
		mealType: 1,
		cuisineType: 0
	},
	recipes: recipes,
	perfectRating: 5,
	starOnPath: "/app/img/star_on.png",
	starOffPath: "/app/img/star_off.png",
	search: function() {
		let filteredByKey = this.recipes.filter((r) => new RegExp(this.searchKey).test(r.title));
		let filteredByType = filteredByKey.filter(r => {
			let isValid = (this.filters.mealType == 0 || this.filters.mealType == r.mealType)
				&& (this.filters.cuisineType == 0 || this.filters.cuisineType == r.cuisineType);
			return isValid;
		});

		return filteredByType;
	}
};

const RecipeAPI = {
	perfectRating: 5,
	starOnPath: "/app/img/star_on.png",
	starOffPath: "/app/img/star_off.png",
	recipes: recipes,
	get: function(id) {
		
		const recipeQuery = p => p.id === id;
		return this.recipes.find(recipeQuery);
	}
}

const CommentAPI = {
	perfectRating: 5,
	starOnPath: "/app/img/star_on.png",
	starOffPath: "/app/img/star_off.png",
	comments: [
		{
			id: 1,
			userName: "User 1",
			starsRating: 3,
			commentDescription: "Great Recipe!"
		},
		{
			id: 2,
			userName: "User 2",
			starsRating: 5,
			commentDescription: "Thank you! I'm recommending this to my friends."
		},
		{
			id: 3,
			userName: "User 3",
			starsRating: 2,
			commentDescription: "Difficult to make. But worth it!"
		}
	],
	add: function(comment) {
		let id = this.comments.length + 1;
		comment.id = id;
		comment.userName = comment.userName;
		comment.starsRating = comment.starsRating;
		comment.commentDescription = comment.comment;
		this.comments.push(comment);
	}
}

export {SearchAPI, RecipeAPI, CommentAPI}