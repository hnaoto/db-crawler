var cheerio = require('cheerio');
var superagent = require('superagent');
var async = require('async');
var fs = require('fs');



var proFootballUrl = 'http://www.pro-football-reference.com/';

//constructor
var fantasy = function(){
	this.loaded = false;
	this.urls= [];
}



fantasy.prototype.getOnePlayer = function(req, res, next) {


	_getPlayerUrls(function(urls){
		console.log(data);
		
		
		
		
	});
	

	

	

	getOnePlayerRequest( function(data){
		res.json(data);
	});
	

}








function _getPlayerUrls(callback){

	
	var urls =[];
	superagent.get('http://www.pro-football-reference.com/players/A/')
		.end(function(err, ares){
			
			if (err){
				throw err;
				return;
			}
			
		
			var $ = cheerio.load(ares.text);
			
			
		
			
				 
			$('#div_players').find('a').each(function(i, a){
			
					var year = $(a).parent().parent().text().split('-')[1];
					
					if (year == 2016) {
						urls.push(proFootballUrl + $(a).attr('href'));
					}
			});
				 
			callback(urls);
		
		
		});
	


}


fantasy.prototype.getAllPlayers = function(req, res, next) {
	
	
	
	_getPlayerUrls(function(urls){

		async.mapLimit(urls, 5,  function(url, callback){
			getOnePlayerRequest(url, callback);
		}, function(err, result){

			//result
			
			
		});
	
	});
	
	
}








function getOnePlayerRequest(url, callback) {


	superagent.get(url)
		.end(function(err, ares){
			
			if (err){
				throw err;
				return;
			}
			
	
		
			var $ = cheerio.load(ares.text);
			
				
			var name = $('h1').text();
			var team = $('span[itemprop="affiliation"]').find('a').text();
			var position = $('h1').next().next().text().split(':')[1].split('\n')[0].trim();
			
			var data =  {
				name: name,
				team: team,
				position: position,
			
			};

				 
				 
																					
			
			var stats = $('.stats_pullout')[0];
			
					
			$(stats).find('h4').each(function(i, h){
				data[$(h).text()] = $(h).next().text();
			});
			
			
			
			/**
			
			if (position == 'QB') {
			
			
				console.log($('#passing.2015').find('td[data-stat="pass_yds"]').text());
				//data['yds2']=  $('#passing.2015').find();
			
			}
			
			**/
			
			
			console.log(data);
			


			fs.readFile('data.json', function (err, read_data) {
				var json = JSON.parse(read_data);
				json.push(data);
				fs.writeFile('data.json', JSON.stringify(json));
			});

			callback(null, data);
			
			
			
	});



}

module.exports = exports = fantasy;

