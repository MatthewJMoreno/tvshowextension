const form = document.querySelector('#searchForm');

const getTVShows = async (show) => {
  let tvShow = "http://api.tvmaze.com/search/shows?q=";
  tvShow = tvShow.concat(show);
  const response = await axios.get(tvShow);
  let name = response.data[0].show.name;
  console.log(name);
  let img = response.data[0].show.image.original;
  let rating = response.data[0].show.rating.average;
  let summary = response.data[0].show.summary;
  let premiereDate = response.data[0].show.premiered;
  let status = response.data[0].show.status;
  let genre = response.data[0].show.genres;
  return {name: name, img: img, rating: rating, summary: summary, premiereDate: premiereDate, status: status, genre: genre};
}



form.addEventListener('submit', function(event){
  event.preventDefault();
  let tvShow = document.getElementById('query');
  const tvData = getTVShows(tvShow.value);
  tvData.then((response) => {
    console.log(response);
    console.log(response.img);
  });
});

let testInfo = {name: "Girls", 
                img: "http://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg",
                rating: 6.7,
                summary: "<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>",
                premiereDate: "2012-04-15",
                status: "Ended",
                genre: ["Drama", "Romance"]};