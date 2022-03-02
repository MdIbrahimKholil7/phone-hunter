
// selecting all essential elements 
const searchContainer = document.getElementById('search-container');
const searchBtn = document.getElementById('search-btn');
const inputField = document.getElementById('search-field');
const searchLength = document.getElementById('search-length')
const showCard = document.getElementById('show-details')
const searchParent = document.getElementById('search-parent');
const spinner = document.querySelector('.spinner')
// searching element by btn
searchBtn.addEventListener('click', () => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${inputField.value.toLowerCase()}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data.data));
    spinner.style.display='block'
    // clear input field and container 
    inputField.value = '';
    searchParent.textContent=''
    searchContainer.textContent = '';
    showCard.textContent = ''
    searchLength.textContent = ''
})

// showing fetch data 
const showData = (data) => {
    
    let cutItem = data.slice(0, 20);
    let cutRemainingItem = data.slice(20, data.length)
    console.log(cutRemainingItem[1])
    if (data.length === 0) {
        searchLength.innerHTML = `
            No Result Found With Your Search
        `
        
        spinner.style.display='none'
        return searchLength;
    } else {
        // adding search length 
        searchLength.innerHTML = `
    <h3>${data.length} Matches Result Found With Your Search</h3>
`
        console.log(data.length)
        cutItem.forEach(elem => {
            // create div 
            const div = document.createElement('div');
            const classes=['col']
            div.classList.add(...classes);
            div.innerHTML = `
            <div class="card custom-property">
                <div class="img">
                    <img width="180px" src="${elem.image}" alt="">
                </div>
                <div class="card-body">
                    <p><span class="brand-name">Brand:</span>${elem.brand}</p>
                    <p><span class="brand-name">Name:</span>${elem.phone_name}</p>
                    <button onclick="showDetails('${elem.slug}')" class="details-btn">Details</button>
                </div>
            </div>
`
            // append the creating element 
            searchContainer.appendChild(div)
        })
        spinner.style.display='none'
    }
    const div = document.createElement('div');
    div.classList.add('text-center')
    div.innerHTML = `
            <button onclick='showAllData("${data}")' class='show-all'>Show All</button>
        `
    searchParent.appendChild(div)
    console.log(data)
}

// showing all data 
const showAllData = (num) => {
    
    console.log(num)
    const url = ` https://openapi.programming-hero.com/api/phones?search=${inputField.value.toLowerCase()}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.data))
}

// show details by id
const showDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetailsPhone(data.data))
    console.log(url)

}
// show details phone 
const showDetailsPhone = (id) => {
    // 
    // console.log(...sensor)
    showCard.textContent = ''
    const details = id;
    const a = details.others
    // console.log(a.WLAN)
    console.log(details)
    const div = document.createElement('div');
    const classes = ['card', 'custom-property', 'details-card',]
    div.classList.add(...classes)
    div.innerHTML = `
        <div class="img w-100 text-center">
        <img class="details-img" src="${details.image}"
            alt="">
        </div>
        <div class="card-body">
        <p><span class="brand-name">Brand: </span>${details.brand}</p>
        <p><span class="brand-name">Name :</span>${details.name}</p>
        <p><span class="brand-name">Release Date: </span>${details?.releaseDate ? details?.releaseDate : 'No Release Date Found'}</p>
        <div class="main-information">
            <h5 class="text-center">Main Features</h5>
            <p><span class="brand-name">Display Size: </span>6.7 inch</p>
            <p><span class="brand-name">Memory: </span><small>128GB 6GB RAM, 256GB 6GB RAM, 512GB 6GB
                    RAM, 1TB 6GB RAM"</small></p>
            <p id='sensor'><span id='sensor' class="brand-name">Sensors: </span></p>
        </div>
        <div class="others-information">
            <h6 class="text-center mb-4">Others Information</h6>
            <div class="information d-flex justify-content-between ">
            <div class="w-50 left-border pe-3">
            <p><span class="brand-name">WLAN: </span><small>${details?.others?.WLAN ? details?.others?.WLAN : 'No Result'}</small></p>
            <p><span class="brand-name">Bluetooth: </span><small>${details?.others?.Bluetooth ? details?.others?.Bluetooth : 'No result'}</small></p>
            <p><span class="brand-name">GPS: </span><small>${details?.others?.GPS ? details?.others?.GPS : 'No result'}</small></p>
        </div>
        <div class="w-50 ps-1">
            <p><span class="brand-name">NFC: </span><small>${details?.others?.NFC ? details?.others?.NFC : 'No result'}</small></p>
            <p><span class="brand-name">Radio: </span><small>${details?.others?.Radio ? details?.others?.Radio : 'No result'}</small></p>
            <p><span class="brand-name">USB: </span><small>${details?.others?.USB ? details?.others?.USB : 'No Result'}</small></p>
        </div>
            </div>
        </div>
        </div>

    `
    showCard.appendChild(div)

    let sensor = id.mainFeatures.sensors
    const sensorId = document.getElementById('sensor')
    for (let sens of sensor) {
        const span = document.createElement('span')
        span.classList.add('brand-name')
        span.innerText = `${sens}, `
        sensorId.appendChild(span)
        console.log(sens)
    }
    // console.log(sensor)



    // debugger

    console.log()
    console.log(id)
}


