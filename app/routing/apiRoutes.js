var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var actions = require("../data/friends");

app.get("/api/friends", function(req, res) {
  res.send(actions.getFriends());
});

app.post("/api/friends", function(req, res) {
  var name = "";
  var imgURL = "";
  var scores = [];
  for (var i = 0; i < req.body.length; i++) {
    if (req.body[i].name === "name") {
      name = req.body[i].value;
    } else if (req.body[i].name === "imgURL") {
      imgURL = req.body[i].value;
    } else {
      scores.push(req.body[i].value);
    }
  }

  var friendVar = actions.addAFriend(name, imgURL, scores);
  console.log(friendVar);
  // res.send(actions.addAFriend(name, imgURL, scores));
  var closestFriend = calculateClosedFriend(scores);
  var responseJSON = {
    closest: closestFriend
  };
  console.log(closestFriend);
  res.json(responseJSON);
});

function calculateClosedFriend(scores) {
  var friends = actions.getFriends();
  var minDiff = Number.MAX_SAFE_INTEGER;
  var matchFriendName = "";
  for (var i = 0; i < friends.length; i++) {
    console.log("**************************");
    console.log(friends[i].scores);
    console.log(scores);
    console.log("**************************");
    var diffCurrent = calculateDelta(friends[i].scores, scores);
    if (diffCurrent < minDiff) {
      minDiff = diffCurrent;
      matchFriendName = friends[i].name;
    }
  }
  return matchFriendName;
}

function calculateDelta(scores1, scores2) {
  var diff = 0;
  for (var i = 0; i < scores1.length; i++) {
    diff += Math.abs(scores1[i] - scores2[i]);
  }
  return diff;
}

module.exports = app;
