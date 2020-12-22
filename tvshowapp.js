const form = document.querySelector('#searchForm');

const getTVShows = async (show) => {
  let tvShow = "http://api.tvmaze.com/search/shows?q=";
  tvShow = tvShow.concat(show);
  const response = await axios.get(tvShow);
  return response;
}

//The API returns the top 10 tv shows but we don't use all the data it returns
function extractTVShowData(tvShows){
  shows = [];
  for (const show of tvShows){
    const name = show.show.name;
    const img = show.show.image.original;
    const rating = show.show.rating.average;
    const summary = show.show.summary;
    const premiereDate = show.show.premiered;
    const status = show.show.status;
    const genre = show.show.genres;
    shows.push({name: name, img: img, rating: rating, summary: summary, premiereDate: premiereDate, status: status, genre: genre})
  }

  return shows;
}

function buildTVShowCards(tvShowData){
  for (show of tvShowData){
    let tvShowCard = document.createElement("div");
    tvShowCard.className = 'tv-show';

    let imgContainer = document.createElement('div');
    imgContainer.className = 'img-container';

    let img = document.createElement('img');
    img.src = show.img;
    imgContainer.appendChild(img);

    tvShowCard.appendChild(imgContainer);
    document.getElementById('tv-shows-container').appendChild(tvShowCard);
  }
}

form.addEventListener('submit', function(event){
  event.preventDefault();
  let tvShow = document.getElementById('query');
  const topTenTVShows = getTVShows(tvShow.value);
  topTenTVShows.then((response) => {
    //console.log(response);
    //console.log(response.img);
    if (response.data.length === 0) throw new Error("No results found");
    const tvShowData = extractTVShowData(response.data);
    buildTVShowCards(tvShowData);
    console.log(tvShowData);
  })
  .catch(error => {
    console.log(error);
  });
});

let testInfo = {name: "Girls", 
                img: "http://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg",
                rating: 6.7,
                summary: "<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>",
                premiereDate: "2012-04-15",
                status: "Ended",
                genre: ["Drama", "Romance"]};