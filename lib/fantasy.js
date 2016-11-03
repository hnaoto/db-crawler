var cheerio = require('cheerio');
var superagent = require('superagent');
var async = require('async');


exports.getOnePlayer = function(req, res, next) {



	getOnePlayerRequest( function(data){
		res.json(data);
	});
	
	

}



function getOnePlayerRequest(callback) {

	var url = 'http://www.pro-football-reference.com/players/M/McCoCo00.htm';
	
	superagent.get(url)
		.end(function(err, ares){
			
			if (err){
				throw err;
				return;
			}
			
	
		
			var $ = cheerio.load(ares.text);
			
				
			var name = $('h1').text();
			var team = $('span[itemprop="affiliation"]').find('a').text();
			
			
			
			var data =  {
				name: name,
				team: team,
				
			
			};

		

			
			console.log($);
			
			callback(data);
			
			
			
	});





}

