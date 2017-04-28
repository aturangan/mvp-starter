import React from 'react';
import ListInfo from './ListInfo.jsx';

class Search extends React.Component {
	constructor(props) {
		super(props); 

		this.onChange = this.onChange.bind(this); 	
		this.search = this.search.bind(this); 	

		this.state = {
			word: ''; 
		}
	}

	onChange(e) {
		this.setState({
			word: e.target.value
		}); 
	}

	search() {
		this.props.onSearch(this.state.word); 
	}

	render() {
		return (
			<div>
				<h1>Star Wars Information</h1> 
				Enter a Star Wars Character: <input value={this.state.word} onChange={this.onChange}/>
				<button onClick={this.search}> Stats </button>
			</div>
		)
	}
}

export default Search;




// const List = (props) => (
//   <div>
//     <h4> List Component </h4>

//     //There are { props.SW.length } items.
//     //{ props.items.map(item => <ListItem item={item}/>)}
//   </div>
// )

// export default List;