const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d02341f80f551377865762c6ef039361'
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=d02341f80f551377865762c6ef039361&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

// fetching data from url
getMovies(API_URL)

async function getMovies(url) {
     const res = await fetch(url)
     const data = await res.json()

     showMovies(data.results)

}

// put data in dom
     function showMovies(movies){
          main.innerHTML = ''

          movies.forEach((movie) => {

               const {title, poster_path, vote_average, overview} = movie
               const movieEl = document.createElement('div')
               movieEl.classList.add('movie')

               movieEl.innerHTML= `

                    <img src="${IMAGE_PATH + poster_path}" alt="${title}" />
                         <div class="movie-info">
                              <h3>${title}</h3>
                              <span class="${getColorRating(vote_average)}">${vote_average}</span>
                         </div>
                    <div class="overview">
                         <h3>Overview</h3>
                              ${overview}
                    </div>
               
               `
               main.appendChild(movieEl)
               
          })
     }


     function getColorRating(vote){
          if(vote>=8){
               return 'green'
          }else if(vote>=5){
               return 'orange'
          }else{
               return 'red'
          }
     }

// Search bar functionality
form.addEventListener('submit', (e) => {
     e.preventDefault()

     const searchterm = search.value

     if (searchterm && searchterm != '') {
          getMovies(SEARCH_URL + searchterm)
          search.value = ''
     } else {
          window.location.reload()
     }

})