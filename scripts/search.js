$( document ).ready(function() {
  
$('#search-btn').click(


  function(event){

   
    event.preventDefault();
    var searchQuery = $('#searchStr').val();
    searchQuery = searchQuery.split(" ").join("%20");
    
    $('#listofArtists').empty();
    $('#listofAlbums').empty();
    $('#userMessage1').empty();
    $.ajax({
    type: 'GET',
    url:'https://api.spotify.com/v1/search?type=artist&query=' + searchQuery,
    dataType: "json",
    success:SearchArtist,
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

function SearchArtist(response){

  if(response.artists.items == 0 || response.artists.items == undefined) { 
    console.log("No Data");
    $('#noData').show('slow');
    $('.searchResults').hide();
    $('.artistAlbums').hide();
  }
  response.artists.items.forEach(function(artist) {
    
    $('#userMessage').text("Here are the artists you were looking for:");
    $('#listofArtists').append('<hr>'+ "<li>" + 
      '<button class= "btn btn-primary" id="'+ artist.id +'" type="submit">'+ artist.name +'</button>' +"</li>"+ 
      '<img src="' + artist.images[0].url + '" alt="jQuery" width="160" height="160">');   
    $('.searchResults').show();
    $('#noData').hide();
    $('.artistAlbums').hide();
    
    
  })
}

function SearchAlbum(response){
   
      $('.artistAlbums').focus();
  response.items.forEach(function(album) {
    $('#userMessage1').text("Here are few albums of the artist selected:");
    $('#listofAlbums').append('<hr>'+ "<li>"  + album.name +"</li>"+ 
      '<img src="' + album.images[0].url + '" alt="jQuery" width="160" height="160">');   
      $('.artistAlbums').show();
     
  })

    

}

function Fail(jqXHR, status, errorThrown){
        alert("Something Went Wrong!"
          + status + ', ' + errorThrown)
}

var $loading = $('.searchResults').hide();
$(document)
  .ajaxStart(function () {
    $loading.show();
  })
  .ajaxStop(function () {
    $loading.hide();
  });

var $loading1 = $('.artistAlbums').hide();
$(document)
  .ajaxStart(function () {
    $loading1.show();
  })
  .ajaxStop(function () {
    $loading1.hide();
  });


});
