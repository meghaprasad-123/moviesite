
// tmdb
const API_KEY = 'api_key=c6c98328e18015ccd2d7e89e1e6ee08b';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const genres = [

    { id: 28, name: "Action" },

    { id: 12, name: "Adventure" },

    { id: 16, name: "Animation" },

    { id: 35, name: "Comedy" },

    { id: 80, name: "Crime" },

    { id: 18, name: "Drama" },

    { id: 10751, name: "Family" },

    { id: 14, name: "Fantasy" },

    { id: 36, name: "History" },

    { id: 27, name: "Horror" },

    { id: 10402, name: "Music" },

    { id: 9648, name: "Mystery" },

    { id: 10749, name: "Romance" },

    { id: 878, name: "Science Fiction" },

    { id: 10770, name: "TV Movie" },

    { id: 53, name: "Thriller" },

    { id: 10752, name: "War" },

    { id: 37, name: "Western" },

];

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const fills1 = document.getElementById("fills");
var selectedGenre = []
setGenre();
function setGenre() {
    fills1.innerHTML = ``;
    genres.forEach(genre => {
        const f = document.createElement('div');
        f.classList.add('fill');
        f.id = genre.id;
        f.innerText = genre.name;

        f.addEventListener('click', () => {
           
           
            if (selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            }
            else {
                if (selectedGenre.includes(genre.id)) {
                     selectedGenre.forEach((id,idx)=>{
                        if(id == genre.id){
                            selectedGenre.splice(idx,1);
                        }
                     })
                }
                else{
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre);
            getMovies(API_URL + '&with_genres='+ encodeURI(selectedGenre.join(',')));
            highlightSelector();
        })
        fills1.append(f);
    })
}

function highlightSelector(){
    const fills = document.querySelectorAll('.fill');
    fills.forEach(fill => {
        fill.classList.remove('highlight');
    })
    if(selectedGenre.length != 0){
        selectedGenre.forEach(id => {
            const highlightedFill = document.getElementById(id);
            highlightedFill.classList.add('hightlight');
        })
    }
}



getMovies(API_URL);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        if(data.results.length !== 0){
            showMovies(data.results);
        }
        else{
            main.innerHTML= `<h1 class="nop">No results found </h1>`
        }
       
    })
}

function showMovies(data) {

    main.innerHTML = ``;

    data.forEach(movie => {
        const { title, poster_path, vote_average } = movie
        const movie1 = document.createElement('div');
        movie1.classList.add('movie');
        movie1.innerHTML = `
        <img src="${IMG_URL + poster_path}"
                alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span >${vote_average}</span>
            </div>  
        `

        main.appendChild(movie1);
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    selectedGenre=[];
    highlightSelector();
    setGenre();
    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm)
    }
    else {
        getMovies(API_URL);
    }
})



const fill = document.querySelectorAll('.fill');

for(let i=0; i<fill.length;i++){
    fill[i].addEventListener('click',()=>{
        
        fill[i].classList.toggle('acu');
    })

}