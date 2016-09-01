// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// New York Times API
var nytAPI = "097be422255e45a18b6864a8176f4a6c";

// Helper Functions
var helpers = {

	runQuery: function(topic, startYear, endYear){

		//Figure out the geolocation
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";

		return axios.get(queryURL)
			.then(function(response){

				var newResults = [];
				var fullResults = response.data.response.docs;
				var counter = 0;

				//Gets first 5 articles that have all 3 components
				for(var i = 0; i < fullResults.length; i++){

					if(counter > 4) {
						return newResults;
					}

					if(fullResults[counter].headline.main && fullResults[counter].pub_date && fullResults[counter].web_url) {
						newResults.push(fullResults[counter]);
						counter++;
					}
				}

				return newResults;
		})

	},


	// This function posts saved articles to our database.
	postArticle: function(title, date, url){

		axios.post('/api/saved', {title: title, date: date, url: url})
		.then(function(results){

			console.log("Posted to MongoDB");
			return(results);
		})
	}

}


// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;