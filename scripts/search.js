
$('#search-btn').click(

  function(event){

    event.preventDefault();
    var searchQuery = $('#searchStr').val();
    searchQuery = searchQuery.split(" ").join("%20");
  
    $('#listofArtists').empty();
 
    $.ajax({
    type: 'GET',
    url:'https://api.spotify.com/v1/search?type=artist&query=' + searchQuery,
    dataType: "json",
    success:Search,
    error:Fail
    });
})

$('.searchResults').on('click', '.btn-primary', '', function(){
    $('#listofAlbums').empty();
    var id = $(this).attr('id');
    $.ajax({
      url:'https://api.spotify.com/v1/artists/'+id+"/albums",
      dataType: "json",
      success: SearchAlbum,
      error: Fail
    });
  })

function Search(response){
  response.artists.items.forEach(function(artist) {
    $('#userMessage').text("Here are the artists you were looking for:");
    $('#listofArtists').append("<li>" + 
      '<button class= "btn btn-primary" id="'+ artist.id +'" type="submit">'+ artist.name +'</button>' +"</li>"+ 
      '<img src="' + artist.images[0].url + '" alt="jQuery" height="140">');   
  })
}

function SearchAlbum(response){
  response.items.forEach(function(album) {
    $('#userMessage1').text("Here are the albums for the artist selected:");
    $('#listofAlbums').append("<li>"  + album.name +"</li>"+ 
      '<img src="' + album.images[0].url + '" alt="jQuery" height="140">');   
  })
}

function Fail(jqXHR, status, errorThrown){
        alert("Something Went Wrong!"
          + status + ', ' + errorThrown)
}