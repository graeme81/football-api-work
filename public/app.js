var num;

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.setRequestHeader('X-Auth-Token', "d05a758a12b345e9802a6953707abd2e");
  request.onload = callback;
  request.send();
};

var requestComplete = function(){
  if (this.status !== 200) return;

    var jsonString = this.responseText;
    var data = JSON.parse(jsonString);

    displayLeagueHeadings(data);
};

var displayLeagueHeadings = function(data){
  var div = document.getElementById('fixtures');

  for(var i = 1; i < data.length; i++){

    var p = document.createElement('p');
    p.setAttribute('id','p'+i); 
    p.innerText = data[i].caption;

    num = i;
    div.appendChild(p);

    url = data[i]._links.fixtures.href;
    makeRequest(url, getFixtures);

    console.log(num);
  };
};

var getFixtures = function(){
  console.log('happened');
  if (this.status !== 200) return;
    var jsonString = this.responseText;
    var data = JSON.parse(jsonString);

    games = data.fixtures;

    games.forEach(function(tie){
      if((tie.status==='SCHEDULED'|| tie.status ==='TIMED' ) && tie.odds){

        var li = document.createElement('li');
        li.innerText = tie.homeTeamName + " vs " + tie.awayTeamName;
        
        var p = document.getElementById('p'+num);

        p.appendChild(li);
        
      }
    });
}

var app = function(){
  var url = "http://api.football-data.org/v1/competitions";
  makeRequest(url, requestComplete);
};

window.onload  = app;