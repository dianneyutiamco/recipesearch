import React, {Component} from 'react';
import Stars from './starsRating.jsx';
import {CommentAPI} from './sampleData.jsx';
import '../css/app.css';

class Comment extends Component {
	constructor(props) {
		super(props);

		const comments = CommentAPI.comments;
		this.state = {
			comments: comments
		}

		this.handleAddComment = this.handleAddComment.bind(this);
	}

	handleAddComment(event, passedState) {
		if(passedState) {
			this.setState({comments: passedState});
		}
	}

	render() {
		// const comments = CommentAPI.comments;
		return(
			<div>
				<div style={{marginBottom: '30px'}}>
					<div className="comment-recipe-section-inner">
						<CommentArea onAddComment={this.handleAddComment}/>
					</div>
				</div>
				<div>
					<div className="comment-recipe-section-inner">
						<CommentList comments={this.state.comments}/>
					</div>
				</div>
			</div>
		);
	}
}

class CommentArea extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userName: '',
			comment: '',
			starsRating: 0
		};

		this.handleStarClick = this.handleStarClick.bind(this);
	}

	handleCommentSubmit(event) {
		CommentAPI.add(this.state);
		this.props.onAddComment(event, CommentAPI.comments);
		event.preventDefault();
	}

	handleCommentOnChange(event) {
		this.setState({comment: event.target.value});
	}

	handleUserNameChange(event) {
		this.setState({userName: event.target.value});
	}

	handleStarClick(event, rating) {
		this.setState({starsRating: rating});	
	}

	render() {
		return(
			<form onSubmit={this.handleCommentSubmit.bind(this)}>
				<div>
					<input 
						className="comment-box-userName"
						type="text"
						autoComplete="off"
						placeholder="Please Enter Your Name"
						value={this.state.userName}
						onChange={this.handleUserNameChange.bind(this)}/>
				</div>
				<div>
					<textarea className="comment-box-desc" value={this.state.comment} onChange={this.handleCommentOnChange.bind(this)} />
				</div>
				<div>
					<StarsRating onStarClick={this.handleStarClick}/>
				</div>
				<div>
					<input className="comment-box-button" type="submit" value="POST COMMENT"/>
				</div>

			</form>
		);
	}
	
}

function CommentList(props) {
	const commentList = props.comments;
	return(
		<div>
			{
				commentList.map((comment)=>
					<CommentItem 
						key={comment.id} 
						item={comment}/>
				)
			}
		</div>

	);
}

function CommentItem(props) {
	const item = props.item;
	const totalStars = CommentAPI.perfectRating;
	const onPath = CommentAPI.starOnPath;
	const offPath = CommentAPI.starOffPath;
	return(
		<div className="comment-item">
			<div  className="comment-user-img">
				<img src="/app/img/sample_img1.png" />
			</div>
			<div className="comment-info">
				<div className="comment-username">
					{item.userName}
				</div>
				<div>
					<Stars
							on={item.starsRating}
							total={totalStars}
							onPath={onPath}
							offPath={offPath}/>
				</div>
				<div>
					<span>{item.commentDescription}</span>
				</div>
			</div>
		</div>
	);
}

class StarsRating extends Component {
	constructor(props) {
		super(props);

		this.state = {
			initState: [false, false, false, false, false],
			imageIdPrefix: "img-",
			totalStars: 5,
			starOnPath: "/app/img/star_on.png",
			starOffPath: "/app/img/star_off.png"
		};
	}

	handleImageMouseOver(index, event) {
		const imageIdPrefix = this.state.imageIdPrefix;
		for(let i = 0; i <= index; i++) {
			var element = document.getElementById(imageIdPrefix + i);
			element.src = this.state.starOnPath;
		}
	}

	handleImageMouseOut(index, event) {
		const imageIdPrefix = this.state.imageIdPrefix;
		for(let i = 0; i <= index; i++) {
			var element = document.getElementById(imageIdPrefix + i);
			element.src = this.state.starOffPath;
		}
	}

	handleDivMouseOut(event) {
		const initState = this.state.initState;
		const totalStars = this.state.totalStars;
		const imageIdPrefix = this.state.imageIdPrefix;
		for(let i = 0; i <= totalStars; i++) {
			let isOn = initState[i];
			let imgSrc = this.state.starOffPath;
			if (isOn) {
				imgSrc = this.state.starOnPath;
			}
			let elementImg = document.getElementById(imageIdPrefix + i);
			if(elementImg) {
				elementImg.src = imgSrc;
			}
		}
	}

	handleImageClick(index, event) {
		const imageIdPrefix = this.imageIdPrefix;
		let initState = this.state.initState.slice();
		initState.fill(false);
		initState.fill(true, 0, index+1);
		this.setState({initState: initState});
		this.props.onStarClick(event, index + 1);
	}

	render() {
		const starsOffPath = this.state.starOffPath;
		const starsTotal = this.state.totalStars;
		const starsImgArr = [];
		const imageIdPrefix = this.state.imageIdPrefix;
		starsImgArr.length = starsTotal;
		starsImgArr.fill(starsOffPath, 0, starsTotal);

		return(
			<div style={{display: 'inline-block'}} onMouseOut={this.handleDivMouseOut.bind(this)}>
				{
					starsImgArr.map((starImg, index) => 
						<img id={imageIdPrefix + index} key={index} src={starImg} 
							onMouseOver={this.handleImageMouseOver.bind(this, index)}
							onMouseOut={this.handleImageMouseOut.bind(this, index)}
							onClick={this.handleImageClick.bind(this, index)}/>
					)
				}
			</div>
		);
	}
	
}

export default Comment