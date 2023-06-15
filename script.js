class TrackRemover {
    constructor() {
        this.fav_title = document.querySelector("h1").innerText;
        this.elms = [];
        this.interv = null;
    }

    getElms() {
        this.elms = Array.from(document.querySelectorAll(`div[aria-label='${this.fav_title}'] div[data-testid='tracklist-row'] button[data-testid='add-button']`));
    }

    scrollToBottom() {
        window.scrollTo(0,document.body.scrollHeight);
    }

    removeTracks() {
        this.scrollToBottom();
        setTimeout(() => {
            this.getElms();
            if(this.elms.length > 0) {
                let i = this.elms.length;
                this.interv = setInterval(() => {
                    let elm = this.elms[--i];
                    console.log(elm, i);
                    if("click" in elm) elm.click();
                    if(i <= 0) {
                        clearInterval(this.interv);
                        this.getElms();
                        if(this.elms.length > 0) {
                            this.removeTracks();
                        } else {
                            console.log("Completed!");
                        }
                    }
                }, 400);
            }
        }, 2000);  // Give the page some time to scroll to the bottom before starting the removal process
    }
}

let trackRemover = new TrackRemover();
trackRemover.removeTracks();
