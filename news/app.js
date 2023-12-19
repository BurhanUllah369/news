const key = '196092d7e9524ccf9e1f1b310e0a2cd2'
const categories = document.querySelectorAll('li')
let category = 'general'
let activeCategory = null;
categories.forEach(cat => cat.addEventListener('click', (e) => {
    if (activeCategory) {
        activeCategory.classList.remove('active')
    }

    category = e.target.innerHTML.toLowerCase()
    cat.classList.add('active'); 
    activeCategory = cat; 

    updateNews()
}))

window.onload = () => {
    updateNews()
}

const updateNews = () => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${key}`
    fetch(url)
    .then(data => data.json())
    .then(item => {    
        const container = document.querySelector('.container');
        container.innerHTML = '';     
        
        for(i in item.articles){
            const generateUi = () => {
                const generalCategory = document.querySelector('.general')
                generalCategory.classList.add('active')
                if(category != 'general') {
                    generalCategory.classList.remove('active')
                }
                

                const div = document.createElement('div')
                div.classList = 'news'
                const image = document.createElement('img')
                image.src = `${item.articles[i].urlToImage || 'https://media.istockphoto.com/id/1440979913/photo/view-of-stacked-newspapers-on-blurred-background.webp?b=1&s=170667a&w=0&k=20&c=6Kn30RmS2WQthvlh9sTX1BKbaXMYtMQw57_h3zJ5RzM='}`
                const bold = document.createElement('p')
                bold.classList = 'bold'
                bold.textContent = `${item.articles[i].title}`
                const desc = document.createElement('p')
                desc.classList = 'desc'
                desc.textContent = `${item.articles[i].description}`
                const anchor = document.createElement('a')
                anchor.textContent = 'Read More'
                anchor.classList = 'button'
                anchor.href = `${item.articles[i].url}`
                anchor.target = '_blank'
                div.appendChild(image)
                div.appendChild(bold)
                div.appendChild(desc)
                div.appendChild(anchor)
                document.querySelector('.container').appendChild(div)
        
            }

            generateUi()
        }
    })


    
}