var jq = document.createElement('script');

jq.src = "https://code.jquery.com/jquery-latest.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

fav_title = "Lieblingssongs";

var elms, interv;
getElms = function(){ elms = $("div[aria-label='"+fav_title+"'] div[data-testid='tracklist-row'] button[data-testid='add-button']");};

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
