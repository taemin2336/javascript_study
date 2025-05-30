const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjJiZmJmMTcyOTY2YTg0OWQ1NWFhYThjNjkwZDM5MiIsIm5iZiI6MTc0ODM5NDc3Ny4yODYsInN1YiI6IjY4MzY2MzE5M2E3ZjBiNTc4MTgzODkxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b_jMHpnYy3O9GIwXCcZZwRmJKwqPzfXNydUNvsG80uo',
   },
}

const url = `https://api.themoviedb.org/3/discover/tv?language=ko-KR&page=3&with_original_language=ko`

const main = async (url) => {
   try {
      const response = await fetch(url, options)
      const data = await response.json()
      const results = data.results

      const main = document.querySelector('.main-content')

      let rowsHtml = ''

      for (let i = 0; i < results.length; i += 2) {
         let rowHtml = '<div class="row">'

         for (let j = 0; j < 2; j++) {
            const index = i + j

            const tv = results[index]

            let imgSrc = !tv.backdrop_path ? `./images/person.png` : `https://image.tmdb.org/t/p/w500${tv.backdrop_path}`

            rowHtml += `
                <div class="card mb-3" style="max-width: 400px;">
  <div class="row g-0">
    <div class="col-md-6">
    <a href="./detail.html?tv_id=${tv.id}">
      <img src="${imgSrc}" class="img-fluid rounded-start" alt="img"></a>
    </div>
    <div class="col-md-6">
      <div class="card-body">
        <h5 class="card-title">${tv.original_name}</h5>
        <p class="card-text">${tv.overview == '' ? '줄거리요약X' : tv.overview}</p>
        <p class="card-text"><small class="text-body-secondary">평점 : ${tv.vote_average == 0 ? '미반영' : tv.vote_average.toFixed(1)}</small></p>
      </div>
    </div>
  </div>
</div>`
         }

         rowHtml += '</div>'
         rowsHtml += rowHtml
      }
      main.innerHTML = rowsHtml
   } catch (error) {}
}
main(url)
