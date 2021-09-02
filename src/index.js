let filterToggle = true;
document.addEventListener('DOMContentLoaded', function(){
    const dogBar = document.querySelector('#dog-bar')
    const dogInfo = document.querySelector('#dog-info')
    const filterButton = document.querySelector('#good-dog-filter')
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(obj => obj.forEach(dog =>{
        let span = document.createElement('span');
        span.innerText = dog.name
        span.goodDog = dog.isGoodDog;
        span.addEventListener('click', function(){
            dogInfo.innerHTML ='';
            let div = document.createElement('div');
            let img = document.createElement('img');
            let h2 = document.createElement('h2');
            let button = document.createElement('button');
            img.src = dog.image;
            h2.innerText = dog.name;
            if (dog.isGoodDog === true){
                button.innerText = 'Good Dog!'
                button.goodDog = true
            }else{
                button.innerText = 'Bad Dog!'
                button.goodDog = false
            }
            button.addEventListener('click', function(e){
                let configObj = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        isGoodDog: !e.target.goodDog
                    })
                }
                fetch(`http://localhost:3000/pups/${dog.id}`, configObj)
                .then(resp => resp.json())
                .then(obj => {
                    if (obj.isGoodDog === true){
                        e.target.innerText = 'Good Dog!'
                        e.target.goodDog = obj.isGoodDog
                    }else if (obj.isGoodDog === false){
                        e.target.innerText = 'Bad Dog!'
                        e.target.goodDog = obj.isGoodDog
                    }
                })
            })
            div.appendChild(img);
            div.appendChild(h2);
            div.appendChild(button);
            dogInfo.appendChild(div);
        })
        dogBar.appendChild(span)
    }))
    filterButton.addEventListener('click', function(e){
        let spanList = dogBar.childNodes;
        if (filterToggle === true){
            e.target.innerText = 'Filter good dogs: ON'
            spanList.forEach(node => {
                if (node.nodeType === 1){
                    if(node.goodDog === false){
                        node.style.display = 'none'
                    }
                }
            })
            console.log(spanList)
        }else{
            e.target.innerText = 'Filter good dogs: OFF'
            spanList.forEach(node => {
                if (node.nodeType === 1){
                    node.style.display = 'flex';
                }
            })
        }
        filterToggle = !filterToggle
    })
})