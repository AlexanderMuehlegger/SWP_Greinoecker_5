const {createApp} = Vue
import {wordList} from './data/wordlist.js'


Array.prototype.random = function() {
    return this[Math.floor(Math.random()*this.length)]
}

String.prototype.getOccur = function(char) {
    if(typeof char !== 'string')
        return;

    let indexes = []
    
    for(let i = 0; i < this.length; i++)
        if(this[i] === char)
            indexes.push(i)
    
    return indexes
}

String.prototype.replaceAt = function(index, replacement){
    return this.substring(0, index) + replacement + this.substring(index + replacement.length)
}

const IMG_SIZE = 10

class HighScoreRow {
    constructor(score, cheatMode){
        this.score = score
        this.cheatMode = cheatMode? 'Active' : 'Inactive'
    }
}

var app = createApp({
    data() {
        return {
            letters: [],
            wordList: wordList,
            solution: {
                default: ""
            },
            searchProg: "",
            cheatMode: false,
            imgs: [],
            errCount: -1,
            lost: false,
            won: false,
            score: 0,
            highscoreTable: [],
            timerInterval: "",
            time: 0
        }
    },
    methods: {
        onClick(event){
            if(this.lost || this.won)
                return;

            let char = event.currentTarget.innerHTML.toLowerCase()

            let occurences = this.solution.getOccur(char)

            if(occurences.length == 0){
                this.addMistake()
                this.letters.splice(this.letters.indexOf(char.toUpperCase()), 1)
                this.score -= 10
                return
            }
            
            this.calcScore(false)

            occurences.forEach((element) => {
                this.searchProg = this.searchProg.replaceAt(element, char)
            })
             
            this.letters.splice(this.letters.indexOf(char.toUpperCase()), 1)
            this.calcScore(false)
            if(this.solution === this.searchProg){
                this.won = true

                this.highscoreTable.push(new HighScoreRow(this.score, this.cheatMode))
                localStorage.setItem('highscores', JSON.stringify(this.highscoreTable))
            }
        },
        drawWord(){
            this.solution = this.wordList.random()
            this.searchProg = '_'.repeat(this.solution.length)
            
            let symbolCheck = this.solution.getOccur("-")

            if(symbolCheck != []){
                symbolCheck.forEach(index => {
                    this.searchProg = this.searchProg.replaceAt(index, "-")
                })
            }else {
                console.log("not there")
            }
        },
        reset() {
            this.drawWord()  
            this.errCount = -1
            this.lost = false
            this.won = false
            this.score = 0
            this.letters = this.createLetters()
            console.log(this.highscoreTable)
            this.time = 0
        },
        addMistake() {
            if(this.errCount >= IMG_SIZE){
                this.lost = true
                return;
            }
            this.errCount++
        },
        calcScore(fromtime){
            let score = this.score
            if(!fromtime){
                score += this.solution.length * .25
                score += 4
            }else{
                score += this.time*.075
            }

            this.score = Math.round(score*100)/100
            
        },
        createLetters() {
            return Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 65))
        },
        refreshTime(){
            this.time++
            this.calcScore(true)
        }
    },
    mounted() {
        this.drawWord()

        for(let i = 0; i <= IMG_SIZE; i++){
            this.imgs.push(`./data/img/${i}.jpg`)
        }

        this.letters = this.createLetters()

        hotkeys('ctrl+c', (event, handler) => {
            switch(handler.key){
                case 'ctrl+c': 
                    this.cheatMode = !this.cheatMode
                    break;
            }
        })

        let highScores = localStorage.getItem("highscores")
        if(highScores != null && highScores.length > 0){
            this.highscoreTable = JSON.parse(highScores)
        }

        this.timerInterval = setInterval(this.refreshTime, 1000)
    }
}).mount('#app')