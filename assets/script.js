var BTN = $("#search");
var UserI = $("#animetitle");
var userIn = [""];
var apidate = " ";
var apidate1 = " ";
if (JSON.parse(localStorage.getItem("past searches")) != null) {
  var PSbuttons = JSON.parse(localStorage.getItem("past searches"));
} else {
  var PSbuttons = [];
}

$(document).ready(() => {
  var Pastsearches = JSON.parse(localStorage.getItem("past searches"));
  if (Pastsearches != null) {
    for (i = 0; i < Pastsearches.length; i++) {
      var button = $("<button></button>")
        .text(Pastsearches[i])
        .attr("id", Pastsearches[i])
        .addClass("button is-small button is-link style-button" );
      $("aside").append(button);
    }
  }
  $("button").click(function () {
    var id = $(this).attr("id");

    fetch("https://api.jikan.moe/v4/anime?q=" + id + "&limit=1", {
      method: "GET",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.data.length == 1) {
          var info = [
            data.data[0].title_english,
            data.data[0].episodes,
            data.data[0].rating,
            data.data[0].status,
            data.data[0].synopsis,
            data.data[0].year,
            data.data[0].images.jpg.large_image_url,
          ];
          var genres = [];
          for (i = 0; i < data.data[0].genres.length; i++) {
            genres.push(data.data[0].genres[i].name);
          }
          var syn = info[4].replace("[Written by MAL Rewrite]", "");
          $("#title").text(info[0]);
          $("#episodes").text("Episodes - " + info[1]);
          $("#rating").text(info[2]);
          $("#status").text(info[3]);
          $("#synopsis").text(syn);
          $("#date").text(info[5]);
          $("#genre").text(genres);
          $("#pic").attr("src", info[6]);
          apidate1 += info[5]

        }
            })
            fetch('https://api.watchmode.com/v1/search/?apiKey=ohYP4vnMNvPPW1O0egOBVQfqKwvQqDOTKITGb4cI&search_field=name&search_value=' + id, {
            method: 'GET',
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var titleAR = data.title_results
                var filteredItems = [];
                for (let i = 0; i < titleAR.length; i++) {
                    if (titleAR[i].type == "tv_series") {
                        filteredItems.push(titleAR[i])
                    }
                }
                var itemID = filteredItems[0].id;

                fetch('https://api.watchmode.com/v1/title/' + itemID + '/details/?apiKey=ohYP4vnMNvPPW1O0egOBVQfqKwvQqDOTKITGb4cI&append_to_response=sources', {
                    method: 'GET',
                })
                .then(function (response2) {
                    return response2.json();
                })
                .then(function(data2) {
                  var date = data2.release_date
                 var dateyear = date.split('-')
                  if (dateyear[0] != apidate) {
                    var sources = data2.sources
                  var simTITLE1 = data2.similar_titles[0]
                  var simTITLE2 = data2.similar_titles[1]
                  var sourceEL = " "
                  var showsall = " " 
                  if (sources.length > 0) {
                      var sourcesLIST = data2.sources[0]
                      sourceEL += sourcesLIST.type + ' on ' + sourcesLIST.web_url
                      $("#source").text(sourceEL)
                  } else {
                      sourceEL = ("Sorry, I do not know where to find this show legally")
                      $('#source').text(sourceEL)
                  }  } else { 
                    $('#sim').text("I am sorry, I cannot find any similar shows or places to watch")
                    $('#source').text(" ")
                  }
                  
                  fetch('https://api.watchmode.com/v1/title/' + simTITLE1 + '/details/?apiKey=ohYP4vnMNvPPW1O0egOBVQfqKwvQqDOTKITGb4cI&append_to_response=sources', {
                      method: 'GET',
                  })
                  .then(function (response3) {
                      return response3.json()
                  })
                  .then(function(data3) {
                      var simSHOW1 = data3.title
                      showsall += "Similar shows are " + simSHOW1 
                  fetch('https://api.watchmode.com/v1/title/' + simTITLE2 + '/details/?apiKey=ohYP4vnMNvPPW1O0egOBVQfqKwvQqDOTKITGb4cI&append_to_response=sources', {
                      method: 'GET',
                  })
                  .then(function (response4) {
                      return response4.json()
                  })
                  .then(function(data4) {
                      var simSHOW2 = data4.title
                      var simSHOW2 = data4.title
                      showsall += " and " + simSHOW2
                      $('#sim').text(showsall)
                  })
                }) 
              })
      });
  });
});

BTN.on("click", function () {
  if (UserI.val() == "") {
    return;
  }
  fetch("https://api.jikan.moe/v4/anime?q=" + UserI.val() + "&limit=1", {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.data.length == 1) {
        var info = [
          data.data[0].title_english,
          data.data[0].episodes,
          data.data[0].rating,
          data.data[0].status,
          data.data[0].synopsis,
          data.data[0].year,
          data.data[0].images.jpg.large_image_url,
        ];
        var genres = [];
        for (i = 0; i < data.data[0].genres.length; i++) {
          genres.push(data.data[0].genres[i].name);
        }
        var syn = info[4].replace("[Written by MAL Rewrite]", "");
        $("#title").text(info[0]);
        $("#episodes").text("Episodes - " + info[1]);
        $("#rating").text(info[2]);
        $("#status").text(info[3]);
        $("#synopsis").text(syn);
        $("#date").text(info[5]);
        $("#genre").text(genres);
        $("#pic").attr("src", info[6]);
        apidate += info[5]
        for (i = 0; i < userIn.length; i++) {
          if (UserI.val() == userIn[i] || UserI.val() == userIn[i].toUpperCase()) {
            var buttons = false;
            break;
          } else {
            var buttons = true;
          }
        }
        var buttonss = true;
        var Pastsearches = JSON.parse(localStorage.getItem("past searches"));
        if (Pastsearches != null) {
          for (i = 0; i < Pastsearches.length; i++) {
            if (UserI.val() == Pastsearches[i] || UserI.val() == Pastsearches[i].toUpperCase() ) {
              var buttonss = false;
              break;
            } else {
              var buttonss = true;
            }
          }
        }
        userIn.push(UserI.val().toLowerCase());

        var place = userIn.length - 1;
        if (buttons == true && buttonss == true) {
          var button = $("<button></button>")
            .text(userIn[place])
            .attr("id", userIn[place])
            .addClass("button is-small button is-link style-button" );
          $("aside").append(button);
          PSbuttons.push(UserI.val().toLowerCase());
          localStorage.setItem("past searches", JSON.stringify(PSbuttons));
        } 
    } else {
      $("#title").text("NO DATA FOUND");
      $("#episodes").text("NO DATA FOUND");
      $("#rating").text("NO DATA FOUND");
      $("#status").text("NO DATA FOUND");
      $("#synopsis").text("NO DATA FOUND");
      $("#date").text("NO DATA FOUND");
      $("#genre").text("NO DATA FOUND");
      $("#pic").attr(
        "src",
        "https://t4.ftcdn.net/jpg/04/75/01/23/360_F_475012363_aNqXx8CrsoTfJP5KCf1rERd6G50K0hXw.jpg"
      );
      }
    })
          fetch('https://api.watchmode.com/v1/search/?apiKey=ohYP4vnMNvPPW1O0egOBVQfqKwvQqDOTKITGb4cI&search_field=name&search_value=' + UserI.val(), {
          method: 'GET',
          })
          .then(function (response) {
              return response.json();
          })
          .then(function (data) {
              var titleAR = data.title_results
              var filteredItems = [];
              for (let i = 0; i < titleAR.length; i++) {
                  if (titleAR[i].type == "tv_series") {
                      filteredItems.push(titleAR[i])
                  }
              }
              var itemID = filteredItems[0].id;

              fetch('https://api.watchmode.com/v1/title/' + itemID + '/details/?apiKey=ohYP4vnMNvPPW1O0egOBVQfqKwvQqDOTKITGb4cI&append_to_response=sources', {
                  method: 'GET',
              })
              .then(function (response2) {
                  return response2.json();
              })
              .then(function(data2) {
                  var date = data2.release_date
                 var dateyear = date.split('-')
                  if (dateyear[0] != apidate) {
                    var sources = data2.sources
                  var simTITLE1 = data2.similar_titles[0]
                  var simTITLE2 = data2.similar_titles[1]
                  var sourceEL = " "
                  var showsall = " " 
                  if (sources.length > 0) {
                      var sourcesLIST = data2.sources[0]
                      sourceEL += sourcesLIST.type + ' on ' + sourcesLIST.web_url
                      $("#source").text(sourceEL)
                  } else {
                      sourceEL = ("Sorry, I do not know where to find this show legally")
                      $('#source').text(sourceEL)
                  }  } else { 
                    $('#sim').text("I am sorry, I cannot find any similar shows or places to watch")
                    $('#source').text(" ")
                  }
                  
                  fetch('https://api.watchmode.com/v1/title/' + simTITLE1 + '/details/?apiKey=ohYP4vnMNvPPW1O0egOBVQfqKwvQqDOTKITGb4cI&append_to_response=sources', {
                      method: 'GET',
                  })
                  .then(function (response3) {
                      return response3.json()
                  })
                  .then(function(data3) {
                      var simSHOW1 = data3.title
                      showsall += "Similar shows are " + simSHOW1 
                  fetch('https://api.watchmode.com/v1/title/' + simTITLE2 + '/details/?apiKey=ohYP4vnMNvPPW1O0egOBVQfqKwvQqDOTKITGb4cI&append_to_response=sources', {
                      method: 'GET',
                  })
                  .then(function (response4) {
                      return response4.json()
                  })
                  .then(function(data4) {
                      var simSHOW2 = data4.title
                      var simSHOW2 = data4.title
                      showsall += " and " + simSHOW2
                      $('#sim').text(showsall)
                  })
                }) 
              })
    
    })
  })
