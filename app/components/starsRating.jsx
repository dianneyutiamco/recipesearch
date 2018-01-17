import React, {Component} from 'react';
import '../css/app.css';

class Stars extends Component {
	render() {
		const starsOnCount = this.props.on;
		const starsTotal = this.props.total;
		const starsOnPath = this.props.onPath;
		const starsOffPath = this.props.offPath;
		const starOnImg = <img src={starsOnPath}/>;
		const starOffImg = <img src={starsOffPath}/>;

		const starsImgArr = [];
		starsImgArr.length = starsTotal;
		starsImgArr.fill(starsOffPath, 0, starsTotal);
		if (starsOnCount > 0) {
			starsImgArr.fill(starsOnPath, 0, starsOnCount);
		}

		return(
			<div style={{display: 'inline-block'}}>
				{
					starsImgArr.map((starImg, index) => 
						<img key={index} src={starImg} />
					)
				}
			</div>
		);
	}	
}

export default Stars