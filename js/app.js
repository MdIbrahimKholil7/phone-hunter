
// selecting all essential elements 
const searchContainer = document.getElementById('search-container');
const searchBtn = document.getElementById('search-btn');
const inputField = document.getElementById('search-field');
const searchLength = document.getElementById('search-length')
const showCard = document.getElementById('show-details')
// searching element by btn
searchBtn.addEventListener('click', () => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${inputField.value.toLowerCase()}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data.data))
    // clear input field and container 
    inputField.value = '';
    searchContainer.textContent = '';
    showCard.textContent=''
})

// showing fetch data 
const showData = (data) => {
    let validate=(data.length === 0) ? alert('no result found'):console.log('result found')

    // adding search length 
    searchLength.innerHTML = `
            <h3>${data.length} Matches Result Found With Your Search</h3>
        `
    console.log(data.length)
    data.forEach(elem => {
        // create div 
        const div = document.createElement('div');
        div.classList.add('col');
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
    console.log(data)
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

    // debugger
    showCard.textContent=''
    const details = id;
    const a=details.others
    // console.log(a.WLAN)
    console.log(details)
    const div = document.createElement('div');
    const classes = ['card', 'custom-property', 'details-card', 'cols-md-8']
    div.classList.add(...classes)
    div.innerHTML = `
        <div class="img w-100 text-center">
        <img class="details-img" src="${details.image}"
            alt="">
        </div>
        <div class="card-body">
        <p><span class="brand-name">Brand: </span>${details.brand}</p>
        <p><span class="brand-name">Name :</span>${details.name}</p>
        <p><span class="brand-name">Release Date: </span>${details.releaseDate}</p>
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
            <p><span class="brand-name">WLAN: </span><small></small></p>
            <p><span class="brand-name">Bluetooth: </span><small>${details ?.others?.Bluetooth? details?.others?.Bluetooth:'no result'}</small></p>
            <p><span class="brand-name">GPS: </span><small>${details?.others?.GPS ? details?.others?.GPS:'No result'}</small></p>
        </div>
        <div class="w-50 ps-1">
            <p><span class="brand-name">NFC: </span><small>${details?.others?.NFC ? details?.others?.NFC:'No result'}</small></p>
            <p><span class="brand-name">Radio: </span><small>${details?.others?.Radio ? details?.others?.Radio:'No result'}</small></p>
            <p><span class="brand-name">USB: </span><small>${details?.others?.USB ? details?.others?.USB:'no result'}</small></p>
        </div>
            </div>
        </div>
        </div>

    `
    showCard.appendChild(div)

    // let sensor=id.mainFeatures.sensors
    // const sensorId=document.getElementById('sensor')
    // for(let sens of sensor){
    //     const span=document.createElement('span')
    //     span.classList.add('brand-name')
    //     sensorTxt.innerText=sens
    //     console.log(sens)
    // }
    // console.log(sensor)








    console.log()
    console.log(id)
}


