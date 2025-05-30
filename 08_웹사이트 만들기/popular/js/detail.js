const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjJiZmJmMTcyOTY2YTg0OWQ1NWFhYThjNjkwZDM5MiIsIm5iZiI6MTc0ODM5NDc3Ny4yODYsInN1YiI6IjY4MzY2MzE5M2E3ZjBiNTc4MTgzODkxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b_jMHpnYy3O9GIwXCcZZwRmJKwqPzfXNydUNvsG80uo',
   },
}

// 특정 쿼리 스트링 값 가져오기 (movie_id 값)
const urlParams = new URLSearchParams(location.search)
const tvId = urlParams.get('tv_id')

const tvUrl = `https://api.themoviedb.org/3/tv/${tvId}?language=ko-KR&page=3&with_original_language=ko`
const mainContainer = document.querySelector('main .detail')

const detail = async (tvUrl) => {
   try {
      const response = await fetch(tvUrl, options)
      const data = await response.json()

      let imgSrc = !data.backdrop_path ? `./images/person.png` : `https://image.tmdb.org/t/p/w500${data.backdrop_path}`

      const rowHtml = `<div class="card mb-3" style="max-width: 800px;">
<div class="row g-0">
  <div class="col-md-6">
    <img src="${imgSrc}" class="img-fluid rounded-start" alt="${imgSrc}">
  </div>
  <div class="col-md-6">
    <div class="card-body">
      <h5 class="card-title p-1">${data.name}</h5>
      <p class="card-text2 p-1">${data.overview == '' ? '줄거리요약X' : data.overview}</p>
      <p class="card-text p-1">첫 방영 : ${data.first_air_date}</p>
      <p class="card-text p-1">장르 : ${data.genres
         .map((genre) => {
            return genre.name
         })
         .join(', ')}</p>
         <p class="card-text p-1">평점 : ${data.vote_average == 0.0 ? '미반영' : data.vote_average.toFixed(1)}</p>
    </div>
  </div>
</div>
</div>
`
      mainContainer.innerHTML += rowHtml
      let bottom = `<div class="card mb-3" style="max-width: 800px;">`
      for (i = 0; i < data.seasons.length; i++) {
         bottom += `
         <p class="p-4">${data.seasons[i].name} (첫 방영 - ${data.seasons[i].air_date}) - 에피소드 -> ${data.seasons[i].episode_count}개</p>
         `
      }
      bottom += `</div>`

      mainContainer.innerHTML += bottom
   } catch (error) {}
}
detail(tvUrl)
