//Создание переменных
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//Функция подключения API
let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    
    //Если поле ввода пустое
    if(movieName.length <= 0){
        result.innerHTML = `<h3 class="msg">Пожалуйста, введите название фильма </h3>`
    }

    //Если поле ввода НЕ пустое
    else {
        fetch(url)
        .then(resp => resp.json())
        .then((data) => {

                //Если фильм существует
                if(data.Response == 'True'){
                    result.innerHTML = `  
                    <div id="invoice" style="background-color: #201f28; color:#fff">                  
                        <div class="info">
                            <img src=${data.Poster} class="poster">
                            <div>
                                <h2>${data.Title}</h2>
                                <div class='rating'>
                                    <img src="icon.png">
                                    <h4>${data.imdbRating}</h4>
                                </div>
                                <div class="details">
                                    <span>${data.Rated}</span>
                                    <span>${data.Year}</span>
                                    <span>${data.Runtime}</span>
                                </div>
                                <div class="genre">
                                    <div>${data.Genre.split(",")
                                    .join("</div><div>")}</div>
                                </div>
                            </div>
                        </div>
                        <h3>Сюжет:</h3>
                        <p>${data.Plot}</p>
                        <h3>Актеры:</h3>
                        <p>${data.Actors}</p>
                        <button onclick="generatePDF()" class="download-btn">Сохранить в PDF</button>
                    </div>
                    `;
                }
                //Если фильма не существует
                else{
                    result.innerHTML = `<h3 class="msg">Фильм не найден!</h3>`
                }               
            });            
    }   
};

searchBtn.addEventListener("click", getMovie);
