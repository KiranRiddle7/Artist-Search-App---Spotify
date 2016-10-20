$( document ).ready(function() {
  
   $('.searchResults').hide();
   $('.artistAlbums').hide();

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
        
        $('.error-messages').text("Sorry! The requested artist information is not available currently. Please try searching for a different artist.").fadeIn();
        $('.searchResults').hide();
        $('.artistAlbums').hide();
      }
      response.artists.items.forEach(function(artist) {
        
        if(artist.images.length >0 ) {
        $('#userMessage').text("Here are the artists you were looking for:");
        $('#listofArtists').append('<hr>'+ "<li>" + 
          '<button class= "btn btn-primary" id="'+ artist.id +'" type="submit">'+ artist.name +'</button>' +"</li>"+ 
          '<img src="' + artist.images[0].url + '" alt="jQuery" width="160" height="160">' + 
          '<h4>' + 'Followers: ' + artist.followers.total + '</h4>' +
          '<h4>' + 'Genres: ' + artist.genres + '</h4>' +
          '<h4>' + 'Popularity: ' + artist.popularity + '</h4>' +
          '<h4> <a href="' + artist.external_urls.spotify + '">' + 'More Info..' + '</a> </h4>');

        $('.searchResults').show();
        $('.error-messages').hide();
        $('.artistAlbums').hide();
        
        }
      })
    }

    function SearchAlbum(response){
       
          $('.artistAlbums').focus();
      response.items.forEach(function(album) {
        $('#userMessage1').text("Here are few albums of the artist:");
        $('#listofAlbums').append('<hr>'+ "<li>"  + album.name +"</li>"+ 
          '<img src="' + album.images[0].url + '" alt="jQuery" width="160" height="160">');   
          $('.artistAlbums').show();

      })  

    }

function Fail(jqXHR, status, errorThrown){
      
       $(".error-messages").text("Something went wrong! Please enter a valid artist name.").fadeIn();

}

});
