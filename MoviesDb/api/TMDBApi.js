const apiToken = '15751c04cd220b68b8d82b42eb10033e'

export const getMoviesTmdbBySearch = (text, page) => {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiToken + '&language=fr&query=' + text + "&page=" + page

    return (
        fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
    )
}

export const getImgTmdb = (posterPath) => {
    return 'https://image.tmdb.org/t/p/w300' + posterPath
}

export const getBackdropImgTmdb = (backdropPath) => {
    return 'https://image.tmdb.org/t/p/w780' + backdropPath
}

export const getMovieDetails = (id) => {
    return (
        fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + apiToken + '&language=fr')
        .then((response) => response.json())
        .catch((error) => console.error(error))
    )
}