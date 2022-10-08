const max_power = 6000
const min_power = 2500
const max_team = 2

function change_teams(e){
    let teams_sel = e.target;
    let v = teams_sel.value;
    let t = teams_sel.options[teams_sel.selectedIndex].text;
    console.log(v + t + e);

    let current_players = players.filter(p => p.Club === t);
    console.log(current_players);
    team_members_sel.innerHTML = "";
    team_members_sel.add(new Option("Choose...", 0))
    current_players.forEach(d => team_members_sel.add(new Option(d.Name,d.ID)));
    p_player.innerText = current_players.length

}

function change_team_player(e) {
    let player_sel = e.target;
    let v = player_sel.value;
    let t = player_sel.options[player_sel.selectedIndex].text;
    if(t === "Choose..."){
        player_img.src = ""

        return;
    }

    let curr_player = players.find(p => p.Name === t);
    console.log(curr_player.PhotoUrl);
    player_img.src = curr_player.PhotoUrl;

    current_player = curr_player
    changeData(curr_player)

}

function initPage() {
    p_player = document.getElementById("player_count")
    p_player.innerText = 0

    p_team = document.getElementById("team_count")
    p_team.innerText = teams.length
    players.forEach(d => d.power = Math.round(Math.random()*(max_power-min_power)+min_power))
    players.forEach(d => d.picked = false)
}


function setImage(url){

}

function changeSelector(){
    let selector1 = document.querySelector(".player_container.player1 > .header_wrapper > .selection_indicator")
    let selector2 = document.querySelector(".player_container.player2 > .header_wrapper > .selection_indicator")

    curr_selector = selector1.getAttribute("active")
    selector = Boolean(curr_selector)

    if(team_selection == 1){
        selector1.setAttribute("active", true)
        selector2.setAttribute("active", false)
    }else {
        selector1.setAttribute("active", false)
        selector2.setAttribute("active", true)
    }
}

function changeData(player){
    let divs = info_box.querySelectorAll("div")
    let info1 = divs[0]
    let info2 = divs[1]

    info1.querySelector(".name").innerText = "Name: " + player.Name
    info1.querySelector(".team").innerText = "Team: " + player.Club
    info1.querySelector(".age").innerText = "Age: " + player.Age
    info1.querySelector(".stamina").innerText = "Stamina: " + player.Stamina
    info2.querySelector(".valueEUR").innerText = "Value(€): " + new Intl.NumberFormat("de-DE", {style: 'currency', currency:"EUR"}).format(player.ValueEUR)
    info2.querySelector(".height").innerText = "Height: " + player.Height
    info2.querySelector(".strength").innerText = "Strength: " + player.Strength
    info2.querySelector(".potential").innerText = "Potential: " + player.Potential   

}

function addToTeam(team, player){
    let index = getNextIndex(team)

    if(index > 5 && teamFull(team)){
        alert("Team cap reached!")
        return 120 //Error-Code 120 = Team Cap reached
    }

    console.warn(player)
    let player_container = document.querySelector(".player_container.player" + team     )
    let charEl = player_container.querySelector(".card.char" + index)
    let paras = charEl.querySelectorAll("p")
    let image = charEl.querySelector("img")
    console.log(player_container)
    paras[0].innerText = player.Name.replace(" ", " ")
    paras[2].innerText = player.power
    
    image.src = player.PhotoUrl


    if(team == 1)
        team1[index-1] = player
    else
        team2[index-1] = player
    

    charEl.setAttribute('filled', true)
    return 0
}

function teamFull(team){
    let container

    if(team == 1)
        container = document.querySelector(".player_container.player1")
    else
        container = document.querySelector(".ülayer_container.player2")

    let cards = container.querySelectorAll(".cards")
    alert("lllo")
    return cards.filter(element => element.getAttribute("filled") == false) >= max_team
}

function getNextIndex(team){
    let container

    if(team == 1)
        container = document.querySelector(".player_container.player1")
    else
        container = document.querySelector(".player_container.player2")

    let cards = container.querySelectorAll(".card")

    let index
    let indexChosen = false

    cards.forEach((element) => {
        if(!indexChosen && element.getAttribute("filled") == "false"){
            index = element.className.split("char")[1]
            indexChosen = true
        }
        
    })

    return parseInt(index)
}

function getPlayerCards(){
    return document.querySelectorAll(".card")
}

console.log(teams);
console.log(players[10]);

let teams_sel = document.getElementById("teams");
teams_sel.add(new Option("Choose...", "0"))
teams.forEach(d => teams_sel.add(new Option(d.Name,d.ID)));
teams_sel.addEventListener("change", change_teams);
let team_members_sel = document.getElementById("team_members");
team_members_sel.addEventListener("change", change_team_player);

let info_box = document.querySelector(".info_box")

let selectButton = document.getElementById("select_button")

// selectButton.addEventListener('click', ()=>{
//     let player = players.filter(d => d.Name == team_members_sel[team_members_sel.selectedIndex].innerText)
//     console.log(team_selection)

//     if(addToTeam(team_selection, player) != 0) 
//         return

//     if(team_selection%max_team == 0)
//         team_selection = 1
//     else
//         team_selection++

//     changeSelector()
// })

let chooser_player1 = document.getElementById("select_player1")
let chooser_player2 = document.getElementById("select_player2")

chooser_player1.addEventListener('click', () => {
    addToTeam(1, current_player)
    
})
chooser_player2.addEventListener('click', () => {
    addToTeam(2, current_player)
})


let cards = document.querySelectorAll(".card")

cards.forEach(p => p.addEventListener('click', (event) => {
    let target = event.currentTarget

    let name = target.querySelector("* > p.name") 
    
    let power = target.querySelector("p.power")

    let img = target.querySelector("img.face")

    name.innerText = ""
    power.innerText = ""
    img.src=" "

    target.setAttribute("filled", false)
    
}))


let player_img = document.getElementById("player_img");

let old_player = 0

let p_player
let p_team

let current_player

let team1 = []
let team2 = []


let team_selection = 1

initPage()
