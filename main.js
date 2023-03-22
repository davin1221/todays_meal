let meals = []
let tempMeals = [] // Id로 검색 전 확인하기 위해 담아둠 
let tempMeals2 = [] // Id로 검색 전 확인하기 위해 담아둠 


let resultMeals = []
let url = ""
let keyword = document.getElementById("searhKeyword")
let searchBtn = document.getElementById("searchBtn")



// 검색
const search = async() => {
    
    url = new URL(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword.value}`)
    let response = await fetch(url)
    let data = await response.json()
    meals = data.meals

    console.log(meals)

    let boardHTML = "";

    boardHTML = meals.map(item=>{

      return `<div class="flip1">
      <div class="card">
        <div class="front">
          <h3></h3>
          <img src="${item.strMealThumb}" alt="" class="imgStyle">
          <h4>${item.strMeal}</h4>
        </div>
      
        <div class="back1">
           <h3>recipe</h3>
           <div class="information">
           <b>1. From</b><br> ${item.strArea} <br>
           <b>2. Category</b><br> ${item.strCategory} <br>
           <b>3. Ingredient</b><br> ${item.strIngredient1}, ${item.strIngredient2}, ${item.strIngredient3} ... <br>
           <b>4. Instruction</b><br>${item.strInstructions.slice(1,100) + "..."}
           <br>
           <br>#${item.strTags}
           
           <p>
           <b>Detail Recipe</b><br>
           <a href="${item.strSource}">WebSite</a> <a href="${item.strYoutube}">Youtube</a>
           
           </p>
           </div>
        </div>
      </div>
   </div>`

    }).join("")

    document.getElementById("board").innerHTML = boardHTML
    
}

searchBtn.addEventListener("click", search)



// 랜덤 메뉴(로딩 시) 
const random = async() => {

    url = new URL(`https://www.themealdb.com/api/json/v1/1/random.php`)
    let response = await fetch(url)
    let data = await response.json()
    meals = data.meals

    for(let i = 0; i < meals.length; i++){

        let instruction = meals[i].strInstructions.slice(1,100) + "..."

        document.getElementById("board").innerHTML = 
        ` <div class="flip2 randombox">
            <div class="card radomcard">
              <div class="front">
                <h3>My recommendation is.. </h3>
                <img src="${meals[i].strMealThumb}" alt="" class="imgStyle">
                <h4>${meals[i].strMeal}</h4>
              </div>
            
              <div class="back2">
                 <h3>recipe</h3>
                 <div class="information">
                 <b>1. From</b><br> ${meals[i].strArea} <br>
                 <b>2. Category</b><br> ${meals[i].strCategory} <br>
                 <b>3. Ingredient</b><br> ${meals[i].strIngredient1}, ${meals[i].strIngredient2}, ${meals[i].strIngredient3} ... <br>
                 <b>4. Instruction</b><br>${instruction}
                 <br>
                 <br>#${meals[i].strTags}
                 </div>
                 <p>
                 <b>Detail Recipe</b><br>
                 <a href="${meals[i].strSource}">WebSite</a> <a href="${meals[i].strYoutube}">Youtube</a>
                 </p>
              </div>
            </div>
         </div>`
    }
}

random()


//---

// 검색창: 엔터로 검색 가능 / 검색창 누르면 값 없어짐 
keyword.addEventListener("keyup", (event)=>{
    if(event.keyCode === 13) {
      search(event)
    }
 });

 keyword.addEventListener("focus", ()=>{keyword.value = ""})