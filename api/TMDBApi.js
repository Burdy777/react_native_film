const API_TOKEN = "9593f1d550462b96f5aff570bbbd6246";

export function getFilmsFromApiWithSearchedText(text, page) {
    const url =  "https://api.themoviedb.org/3/search/movie?api_key="+ API_TOKEN +"&language=fr&query=" + text +"&page="+ page;

    return fetch(url)
        .then((res) => res.json(res))
        .catch((err) => console.error(err))
}

export function getPosterFromApi(name) {
    const url = "https://image.tmdb.org/t/p/w300";
    return `${url}/${name}`;
}