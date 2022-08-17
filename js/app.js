const allPlayers = () => {
    document.getElementById('player-container').innerHTML = "";
    const searchValue = document.getElementById('search-box').value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showPlayerDetails(data.player));
};

const showPlayerDetails = players => {
    const parentContainer = document.getElementById('player-container');
    for(const player of players){
        // console.log(player);
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card border p-5">
            <div class="pro-pic">
                <img class="w-50" src="${player.strThumb}" alt="">
                <h2>Name:${player.strPlayer}</h2>
                <h4>Country:${player.strNationality}</h4>
                <div class="all-button">
                    <button class="btn btn-danger">Delete</button>
                    <button onclick="details('${player.idPlayer}')" class="btn btn-success">Details</button>
                </div>
            </div>
        </div>
    `;
    parentContainer.appendChild(div);
    }
};

const details = (id) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => setDetails(data.players[0]));
};

const setDetails = info => {

    if(info.strGender == 'Male'){
        document.getElementById('male').style.display = "block";
        document.getElementById('female').style.display = "none";
    }else{
        document.getElementById('male').style.display = "none";
        document.getElementById('female').style.display = "block";
    }
    document.getElementById('details-container').innerHTML = `
        <div>
            <img class="w-50" src="${info.strThumb}" alt="">
            <h1>Name: ${info.strPlayer}</h1>
            <h4>Country:${info.strNationality}</h4>
            <h4>Country:${info.strGender}</h4>
            <p>${info.strDescriptionEN.slice(0,250)}</p>
        </div>
    `
}