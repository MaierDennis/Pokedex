let pokemons = [];
let pokemonPower = 0;
let number = 10;
let lockFunction = true;
let lockLoadPokemon = false;

async function getFirstPokemons() {
    document.getElementById('loader').classList.remove('d-none');

    for (let j = 1; j < 20; j++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${j}/`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        let actualName = await currentPokemon['name'];
        pokemons.push(actualName);
    }
    document.getElementById('loader').classList.add('d-none');
    renderPokemonButton();
}

async function getAllPokemons() {
    if (lockLoadPokemon == false) {
        for (let j = 21; j < 890; j++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${j}/`;
            let response = await fetch(url);
            let currentPokemon = await response.json();
            let actualName = await currentPokemon['name'];
            pokemons.push(actualName);
        }
        lockLoadPokemon = true;
    }
}

async function getFromAPI(i) {
    let thisPokemon = pokemons[i];
    let currentPokemon;

    let url = `https://pokeapi.co/api/v2/pokemon/${thisPokemon}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    return currentPokemon;
}

function count() {
    number = number + 10;
    console.log(number)
    getMorePokemon();
}

function getMorePokemon() {
    let smallNumber = number - 10;
    console.log(number);

    renderNewPokemonButton(smallNumber, number);
    lockFunction == true;
}

async function filterPokemon() {
    let search = document.getElementById('input').value;
    search = search.toLowerCase();
    console.log(search);

    let button = document.getElementById('Buttons');
    button.innerHTML = '';

    if (search == '')
        renderPokemonButton();

    else
        renderSearchPokemons(search, button);
}

function renderSearchPokemons(search, button) {
    button.innerHTML = '';
    for (let i = 0; i < pokemons.length; i++) {
        let name = pokemons[i];

        if (name.toLowerCase().includes(search)) {
            button.innerHTML += generatePokemonCard(i);
            optimicePokemonButtons(i);
        }

    }
}

function generatePokemonCard(i) {
    return `
    <div class="smallButton" id="smallButton${i}"  onclick="showInfo(${i}) ">
        <div class="cardDesign">
            <div id="pokemonName${i}"></div>
            <div class="alignment">
                <div class="buttonInfos" id="typePillo${i}">
                    
                </div>
                <div class="buttonImage">
                    <img id="buttonImage${i}" src="" alt="">
                </div>
            </div>
        </div>
    </div>`;
}

function renderPokemonButton() {
    let button = document.getElementById('Buttons');

    button.innerHTML = ``;

    for (let i = 0; i < number; i++) {
        button.innerHTML += generatePokemonCard(i);
        optimicePokemonButtons(i);
    }
    getAllPokemons();
}

function renderNewPokemonButton(smallNumber, number) {
    let button = document.getElementById('Buttons');

    for (let i = smallNumber; i < number; i++) {
        button.innerHTML += generatePokemonCard(i);
        optimicePokemonButtons(i);
    }
}

async function optimicePokemonButtons(i) {
    let currentPokemon = await getFromAPI(i);

    let pokemonName = currentPokemon['name'];
    let PokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

    document.getElementById('pokemonName' + i).innerHTML = PokemonName;
    document.getElementById('buttonImage' + i).src = currentPokemon['sprites']['other']['dream_world']['front_default'];
    getPokemonTypeBG(i);
    getTypeButtons(i);

}

async function getPokemonTypeBG(i) {
    let currentPokemon = await getFromAPI(i);

    let pokemonType = currentPokemon['types'][0]['type']['name']
    let backgroundcolor = document.getElementById('smallButton' + i);
    let backgroundcolorCard = document.getElementById('pokedex');


    if (pokemonType == 'fire') {
        backgroundcolor.style.backgroundColor = 'rgba(250, 85, 66, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(250, 85, 66, 1)';
    }
    else if (pokemonType == 'grass') {
        backgroundcolor.style.backgroundColor = 'rgba(140, 216, 80, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(140, 216, 80, 1)';
    }
    else if (pokemonType == 'water') {
        backgroundcolor.style.backgroundColor = 'rgba(85, 174, 254, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(85, 174, 254, 1)';
    }
    else if (pokemonType == 'poison') {
        backgroundcolor.style.backgroundColor = 'rgba(169, 94, 161, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(169, 94, 161, 1)';
    }
    else if (pokemonType == 'fighting') {
        backgroundcolor.style.backgroundColor = 'rgba(168, 85, 67, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(168, 85, 67, 1)';
    }
    else if (pokemonType == 'electric') {
        backgroundcolor.style.backgroundColor = 'rgba(252, 229, 61, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(252, 229, 61, 1)';
    }
    else if (pokemonType == 'ghost') {
        backgroundcolor.style.backgroundColor = 'rgba(122, 116, 214, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(122, 116, 214, 1)';
    }
    else if (pokemonType == 'normal') {
        backgroundcolor.style.backgroundColor = 'rgba(189, 190, 175, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(189, 190, 175, 1)';
    }
    else if (pokemonType == 'flying') {
        backgroundcolor.style.backgroundColor = 'rgba(122, 164, 255, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(122, 164, 255, 1)';
    }
    else if (pokemonType == 'ground') {
        backgroundcolor.style.backgroundColor = 'rgba(240, 203, 86, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(240, 203, 86, 1)';
    }
    else if (pokemonType == 'rock') {
        backgroundcolor.style.backgroundColor = 'rgba(206, 188, 114, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(206, 188, 114, 1)';
    }
    else if (pokemonType == 'bug') {
        backgroundcolor.style.backgroundColor = 'rgba(195, 210, 31, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(195, 210, 31, 1)';
    }
    else if (pokemonType == 'psychic') {
        backgroundcolor.style.backgroundColor = 'rgba(250, 101, 182, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(250, 101, 182, 1)';
    }
    else if (pokemonType == 'ice') {
        backgroundcolor.style.backgroundColor = 'rgba(149, 241, 254, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(149, 241, 254, 1)';
    }
    else if (pokemonType == 'dragon') {
        backgroundcolor.style.backgroundColor = 'rgba(138, 117, 254, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(138, 117, 254, 1)';
    }
    else if (pokemonType == 'dark') {
        backgroundcolor.style.backgroundColor = 'rgba(141, 104, 85, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(141, 104, 85, 1)';
    }
    else if (pokemonType == 'steel') {
        backgroundcolor.style.backgroundColor = 'rgba(196, 194, 217, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(196, 194, 217, 1)';
    }
    else if (pokemonType == 'fairy') {
        backgroundcolor.style.backgroundColor = 'rgba(250, 172, 255, 0.7)';
        backgroundcolorCard.style.backgroundColor = 'rgba(250, 172, 255, 1)';
    }
}

async function getTypeButtons(i) {
    let currentPokemon = await getFromAPI(i);
    document.getElementById('typePillo' + i).innerHTML = '';

    for (let j = 0; j < currentPokemon.types.length; j++) {
        let type = currentPokemon['types'][j]['type']['name'];
        document.getElementById('typePillo' + i).innerHTML += `
        <div id="pilloColor${i}${j}" class="typePillo">${type}</div>
        `;

        getTypeButtonsBG(i, type, j);
    }

    function getTypeButtonsBG(i, type, j) {
        let pillo = document.getElementById('pilloColor' + i + j);

        if (type == 'fire') {
            pillo.style.backgroundColor = 'rgb(290, 85, 66)';
        }
        else if (type == 'grass') {
            pillo.style.backgroundColor = 'rgb(140, 216, 80)';
        }
        else if (type == 'water') {
            pillo.style.backgroundColor = 'rgb(85, 174, 254)';
        }
        else if (type == 'poison') {
            pillo.style.backgroundColor = 'rgb(169, 94, 161)';
        }
        else if (type == 'fighting') {
            pillo.style.backgroundColor = 'rgb(168, 85, 67)';
        }
        else if (type == 'electric') {
            pillo.style.backgroundColor = 'rgb(252, 229, 61)';
            pillo.style.color = 'black';
        }
        else if (type == 'ghost') {
            pillo.style.backgroundColor = 'rgb(122, 116, 214)';
        }
        else if (type == 'normal') {
            pillo.style.backgroundColor = 'rgb(189, 190, 175)';
        }
        else if (type == 'flying') {
            pillo.style.backgroundColor = 'rgb(122, 164, 255)';
        }
        else if (type == 'ground') {
            pillo.style.backgroundColor = 'rgb(240, 203, 86)';
        }
        else if (type == 'rock') {
            pillo.style.backgroundColor = 'rgb(206, 188, 114)';
        }
        else if (type == 'bug') {
            pillo.style.backgroundColor = 'rgb(195, 210, 31)';
        }
        else if (type == 'psychic') {
            pillo.style.backgroundColor = 'rgb(250, 101, 182)';
        }
        else if (type == 'ice') {
            pillo.style.backgroundColor = 'rgb(149, 241, 254)';
        }
        else if (type == 'dragon') {
            pillo.style.backgroundColor = 'rgb(138, 117, 254)';
        }
        else if (type == 'dark') {
            pillo.style.backgroundColor = 'rgb(141, 104, 85)';
        }
        else if (type == 'steel') {
            pillo.style.backgroundColor = 'rgb(196, 194, 217)';
        }
        else if (type == 'fairy') {
            pillo.style.backgroundColor = 'rgb(250, 172, 255)';
        }
    }

}

function showInfo(i) {
    document.getElementById('overview').classList.add('d-none');
    document.getElementById('infos').classList.remove('d-none');
    document.getElementById('tableStats').classList.add('d-none');
    document.getElementById('tableInfo').classList.remove('d-none');
    document.getElementById('moves').classList.add('d-none');
    document.getElementById('aboutButton').classList.add('active');
    document.getElementById('baseStatsButton').classList.remove('active');
    document.getElementById('movesButton').classList.remove('active');

    renderPokemonInfo(i);
}

async function renderPokemonInfo(i) {
    let currentPokemon = await getFromAPI(i);

    let pokemonName = currentPokemon['name'];
    let PokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

    document.getElementById('bigPokemonName').innerHTML = PokemonName;
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['dream_world']['front_default'];

    getPokemonTypeBG(i);
    showSpecies(i);
    showHeight(i);
    showWeight(i);
    showAbilities(i);
    showPokemonStatsHP(i);
    showPokemonStatsATT(i);
    showPokemonStatsDEF(i);
    showPokemonStatsSpAtk(i);
    showPokemonStatsSpDef(i);
    showPokemonStatsSpeed(i);
    showPokemonStatsTotal();
    renderMoves(i);
}


function showAbout() {
    document.getElementById('tableStats').classList.add('d-none');
    document.getElementById('tableInfo').classList.remove('d-none');
    document.getElementById('moves').classList.add('d-none');
    document.getElementById('aboutButton').classList.add('active');
    document.getElementById('baseStatsButton').classList.remove('active');
    document.getElementById('movesButton').classList.remove('active');
}

async function showSpecies(i) {
    let currentPokemon = await getFromAPI(i);

    document.getElementById('species').innerHTML = ``;
    for (let j = 0; j < currentPokemon.types.length; j++) {
        let type = currentPokemon['types'][j]['type']['name'];
        let Type = type.charAt(0).toUpperCase() + type.slice(1);

        document.getElementById('species').innerHTML += `[${Type}]`;
    }

}

async function showHeight(i) {
    let currentPokemon = await getFromAPI(i);
    let height = currentPokemon['height'];

    document.getElementById('height').innerHTML = `${height}`;
}

async function showWeight(i) {
    let currentPokemon = await getFromAPI(i);
    let weight = currentPokemon['weight'];

    document.getElementById('weight').innerHTML = `${weight}`;
}

async function showAbilities(i) {
    let currentPokemon = await getFromAPI(i);

    document.getElementById('abilities').innerHTML = ``;
    for (let j = 0; j < currentPokemon.abilities.length; j++) {
        let ability = currentPokemon['abilities'][j]['ability']['name'];
        let Ability = ability.charAt(0).toUpperCase() + ability.slice(1);

        document.getElementById('abilities').innerHTML += `[${Ability}]`;
    }
}

function showBaseStats() {
    document.getElementById('tableInfo').classList.add('d-none');
    document.getElementById('tableStats').classList.remove('d-none');
    document.getElementById('moves').classList.add('d-none');
    document.getElementById('baseStatsButton').classList.add('active');
    document.getElementById('aboutButton').classList.remove('active');
    document.getElementById('movesButton').classList.remove('active');
}

function showMoves() {
    document.getElementById('tableInfo').classList.add('d-none');
    document.getElementById('tableStats').classList.add('d-none');
    document.getElementById('moves').classList.remove('d-none');
    document.getElementById('baseStatsButton').classList.remove('active');
    document.getElementById('aboutButton').classList.remove('active');
    document.getElementById('movesButton').classList.add('active');
}

async function showPokemonStatsHP(i) {
    let currentPokemon = await getFromAPI(i);
    let hpStat = currentPokemon['stats'][0]['base_stat'];

    document.getElementById('hp').innerHTML = hpStat;
    document.getElementById('hpBar').style.width = `${hpStat}%`;

    pokemonPower += hpStat;
    if (hpStat < 50) {
        document.getElementById('hpBar').classList.remove('bg-success');
        document.getElementById('hpBar').classList.add('bg-danger');
    }
    else {
        document.getElementById('hpBar').classList.add('bg-success');
        document.getElementById('hpBar').classList.remove('bg-danger');
    }
}

async function showPokemonStatsATT(i) {
    let currentPokemon = await getFromAPI(i);
    let attStat = currentPokemon['stats'][1]['base_stat'];

    document.getElementById('attack').innerHTML = attStat;
    document.getElementById('attBar').style.width = `${attStat}%`;
    pokemonPower += attStat;
    if (attStat < 50) {
        document.getElementById('attBar').classList.remove('bg-success');
        document.getElementById('attBar').classList.add('bg-danger');
    }
    else {
        document.getElementById('attBar').classList.add('bg-success');
        document.getElementById('attBar').classList.remove('bg-danger');
    }
}

async function showPokemonStatsDEF(i) {
    let currentPokemon = await getFromAPI(i);
    let defStat = currentPokemon['stats'][2]['base_stat'];

    document.getElementById('defense').innerHTML = defStat;
    document.getElementById('defBar').style.width = `${defStat}%`;
    pokemonPower += defStat;

    if (defStat < 50) {
        document.getElementById('defBar').classList.remove('bg-success');
        document.getElementById('defBar').classList.add('bg-danger');
    }
    else {
        document.getElementById('defBar').classList.add('bg-success');
        document.getElementById('defBar').classList.remove('bg-danger');
    }
}

async function showPokemonStatsSpAtk(i) {
    let currentPokemon = await getFromAPI(i);
    let spAtkStat = currentPokemon['stats'][3]['base_stat'];

    document.getElementById('spAtk').innerHTML = spAtkStat;
    document.getElementById('spAtkBar').style.width = `${spAtkStat}%`;
    pokemonPower += spAtkStat;

    if (spAtkStat < 50) {
        document.getElementById('spAtkBar').classList.remove('bg-success');
        document.getElementById('spAtkBar').classList.add('bg-danger');
    }
    else {
        document.getElementById('spAtkBar').classList.add('bg-success');
        document.getElementById('spAtkBar').classList.remove('bg-danger');
    }
}

async function showPokemonStatsSpDef(i) {
    let currentPokemon = await getFromAPI(i);
    let spDefStat = currentPokemon['stats'][4]['base_stat'];

    document.getElementById('spDef').innerHTML = spDefStat;
    document.getElementById('spDefBar').style.width = `${spDefStat}%`;
    pokemonPower += spDefStat;

    if (spDefStat < 50) {
        document.getElementById('spDefBar').classList.remove('bg-success');
        document.getElementById('spDefBar').classList.add('bg-danger');
    }
    else {
        document.getElementById('spDefBar').classList.add('bg-success');
        document.getElementById('spDefBar').classList.remove('bg-danger');
    }
}

async function showPokemonStatsSpeed(i) {
    let currentPokemon = await getFromAPI(i);
    let speedStat = currentPokemon['stats'][5]['base_stat'];

    document.getElementById('speed').innerHTML = speedStat;
    document.getElementById('speedBar').style.width = `${speedStat}%`;
    pokemonPower += speedStat;

    if (speedStat < 50) {
        document.getElementById('speedBar').classList.remove('bg-success');
        document.getElementById('speedBar').classList.add('bg-danger');
    }
    else {
        document.getElementById('speedBar').classList.add('bg-success');
        document.getElementById('speedBar').classList.remove('bg-danger');
    }

    showPokemonStatsTotal(pokemonPower);
}

function showPokemonStatsTotal(pokemonPower) {
    let totalStat = Math.round(pokemonPower / 6);

    document.getElementById('total').innerHTML = totalStat;
    document.getElementById('totalBar').style.width = `${totalStat}%`;

    if (totalStat < 50) {
        document.getElementById('totalBar').classList.remove('bg-success');
        document.getElementById('totalBar').classList.add('bg-danger');
    }
    else {
        document.getElementById('totalBar').classList.add('bg-success');
        document.getElementById('totalBar').classList.remove('bg-danger');
    }
}



async function renderMoves(i) {
    let currentPokemon = await getFromAPI(i);
    document.getElementById('moves').innerHTML = ``;
    for (let j = 0; j < currentPokemon.moves.length; j++) {
        let move = currentPokemon['moves'][j]['move']['name'];
        let Move = move.charAt(0).toUpperCase() + move.slice(1);

        document.getElementById('moves').innerHTML += `
    <div class="thisMove">${Move}</div>`;
    }
}

function returnToStart() {
    document.getElementById('overview').classList.remove('d-none');
    document.getElementById('infos').classList.add('d-none');

    pokemonPower = 0;
}

function doNotClose(event) {
    event.stopPropagation();
}



/*function scrollDown() {

    if (checkLoad == true) {
        checkLoad = false;
        const buttonDiv = document.querySelector('.button');

        buttonDiv.addEventListener('scroll', () => {

            
            console.log(buttonDiv.scrollTop);
            console.log(buttonDiv.scrollHeight);
            if ((buttonDiv.scrollTop + 600) > buttonDiv.scrollHeight) {
                setTimeout(count, 1000);
                
            }
            
            
        });
    }
    
}*/
function scrollDown() {
    document.getElementById('Buttons').addEventListener(
        'scroll',
        function () {
            var scrollTop = document.getElementById('Buttons').scrollTop;
            var scrollHeight = document.getElementById('Buttons').scrollHeight;
            var offsetHeight = document.getElementById('Buttons').offsetHeight;
            var contentHeight = scrollHeight - offsetHeight;

            if (contentHeight <= scrollTop + 5 && lockFunction == true) {
                lockFunction == false;
                count();
            }
        },
        false
    )
}