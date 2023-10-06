var BTN = $('#search');
var UserI = $('#animetitle');

BTN.on('click', function () {
    fetch('https://api.jikan.moe/v4/anime?q=' + UserI.val() + "&limit=1" , {
        method: 'GET',
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var info = [data.data[0].title_english, data.data[0].episodes, data.data[0].rating, data.data[0].status, data.data[0].synopsis, data.data[0].year, data.data[0].images.jpg.large_image_url]
        console.log(info)
        $('#title').text(info[0])
        $('#episodes').text(info[1] + " - Episodes")
        $('#rating').text(info[2])
        $('#status').text(info[3])
        $('#synopsis').text(info[4])
        $('#date').text(info[5])
        $( "#pic" ).attr('src', info[6]);
        
    })
})
