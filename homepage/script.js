var images = ['breakfast.png', 'lunch.png', 'snacks.png', 'dinner.png', 'drinks.png', 'nightlife.png']

var updateImages = () =>{
    images.map((img) => {
        document.getElementById('category-container').innerHTML = document.getElementById('category-container').innerHTML + `
        <div class="category">
            <div class="category-image" style="background-image:url('${img}')"></div>
            <div class="category-content-container">
                <h1 class="category-name">${img.split('.')[0].toUpperCase()}</h1>
                <h2 class="category-description">Start you day with amazing breakfast options</h2>
            </div>
        </div>
        `
    })
}