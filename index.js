const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-button');
const videosList = document.getElementById('videos-list');
const videoIframe = document.getElementById('iframe');
const modal = document.getElementById('myModal');
const modalCloseButton = document.getElementsByClassName('close')[0];

searchBtn.addEventListener('click', getVideos);

modalCloseButton.addEventListener('click', () => {
    closeModal();
});

modal.addEventListener("click", (e) => {
    if(e.target === modal) {
        closeModal();
    }

})

function closeModal(){
    videoIframe.src = "";
    modal.style.display = "none";
}

function getVideos() {
    let keyWord = searchInput.value;
    let endPoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&key=AIzaSyBhQRo8PQsct5Lhn9pJ4IULUuy8UnmcjFw&q=${keyWord}`;

    fetch(endPoint)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            videosList.innerHTML = null;
            data.items.forEach(item => {
                addVideo(item);
            });
        });

    // addVideo(keyWord);
}

function addVideo(item) {
    const li = document.createElement('li');
    const image = document.createElement('img');
    image.src = item.snippet.thumbnails.medium.url;
    image.id = item.id.videoId;
    videosList.appendChild(li);
    li.appendChild(image);
}

function playVideo(videoId) {
    iframe.src = 'https://www.youtube.com/embed/' + videoId;
    modal.style.display = "block";
}

videosList.addEventListener('click', (e) => {
    if(e.target.tagName === "IMG"){
        playVideo(e.target.id);
    }
    
})