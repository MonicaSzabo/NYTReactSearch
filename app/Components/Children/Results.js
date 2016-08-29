// Include React 
var React = require('react');

// Component creation
var Results = React.createClass({

	getInitialState: function(){
		return {
			title: "",
			date: "",
			url: ""
		}
	},

	// When a user clicks save article
	handleClick: function(){
	
		this.props.saveArticle(this.state.title, this.state.date, this.state.url);

	},

	// Here we render the function
	render: function(){
		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center"><strong>Results</strong></h3>
				</div>
				<div className="panel-body">
						{this.props.results.map(function(search, i)
						{
							return <div className="list-group-item" key={i}>{search.headline.main}<br />{search.pub_date}<br />{search.web_url}<br /><button className="btn btn-primary">Save</button></div>
						}
					)}

				</div>
			</div>

		)
	}
});

// Export the component back for use in other files
module.exports = Results;