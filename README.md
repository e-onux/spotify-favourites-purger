
# spotify-favourites-purger
A tool for clean your Spotify "Favourite Songs" list completely with Chrome Browsers.
Actually, you can clean it with Spotify Desktop.([How? Click to learn it.](https://community.spotify.com/t5/iOS-iPhone-iPad/Delete-all-songs/td-p/1411628#:~:text=Removing%20all%20Liked%20Songs%20at,right%20clicking%20and%20deleting%20them.)) But Spotify Desktop is only available for Windows and Mac users. So it is especially useful for Linux users. 

# Usage:

 - First of all install [this extension](https://chrome.google.com/webstore/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden/related) to touch Spotify via scripts. 
(It removes Content-Security-Policy headers temporarily from Spotify Web App.
After cleaning process, you can remove this plugin.)

 - Click CSP disable button of this extension.
 - Open your "Favourite Songs" List
 - Press `F12` ( or `CMD+Shift+C` for Mac users) to open DevTools. 
 - Click Console tab paste this code and press `Enter` to see magic:
 - 
 
    var jq = document.createElement('script');
    
    jq.src = "https://code.jquery.com/jquery-latest.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
    
    fav_title = $("h1").text();
    
    var elms, interv;
    getElms = function(){ 
    elms = $("div[aria-label='"+fav_title+"'] div[data-testid='tracklist-row'] button[data-testid='add-button']");
    };
    
    removeTracks = function(){
        
        getElms();
        elms[elms.length-1].scrollIntoView();
        var i = elms.length;
        
        interv = setInterval(function() {
            var elm = elms[i--];
            console.log(elm,i);
            $(elm).trigger("click");
            if(i < 0 ) {
                clearInterval(interv);
                getElms();
                if(elms.length>0)removeTracks();
                else console.log("Completed!");
            }
        }, 400);
    };
    removeTracks();
