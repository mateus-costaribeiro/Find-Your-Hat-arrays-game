const prompt = require('prompt-sync')({sigint: true});

// Definition of the Field Elements: hat, hole, fieldCharacter, pathCharacter. The pathCharacter in a field defines where the player will be moving from
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// Only four moves are allowed in this game: up, down, left or right
const validMoves = ['up', 'down', 'right', 'left']

// Create a Field class that takes a two-dimension array as parameter. Each array inside the array parameter contains a sequence of three Field Elements
class Field {
    constructor(arr) {
        this._arr = arr
    }
    
    get field() {
        return this._arr
    }

    // Method to print the array of fieldElements (hats, holes, characters) in the array in an organized Field
    print() {
        for(let i=0; i<this._arr.length; i++) {
            const randomArr = this._arr[i].join('')
            console.log(randomArr)
        }
    }

    // Method that takes a direction (up, down, right or left) and returns whether the player 1) has won, 2) has lost, 3) should keep playing
    move(direction) {
        
        // Check if user inserted a valid direction (right, left, up or down)
        const arrayForValidityCheck = []

        const checkMoveValidity = () => {
            for(let i=0; i<validMoves.length; i++) {
                if(direction === validMoves[i]) {
                    arrayForValidityCheck.push(direction)
                } 
            }
        }
        checkMoveValidity()
        
        // Identify in which of the three arrays that make a Field class child the pathCharacter (*) is currently located in the field
        const arrayLocationArr = []
        // Identify in which position inside the arrayLocationArr the pathCharacter (*) is currently located in the field
        const positionLocationArr = []
        
        // This function fills the arrayLocationArr and positionLocationArr, which point the exact location of the pathCharacter (*) in the Field class child
        const findLocation = () => {
                for(let i=0; i<this._arr.length; i++) {
                for(let j=0; j<this._arr[i].length; j++) {
                    if(this._arr[i][j] === pathCharacter) {
                        arrayLocationArr.push(i)
                        positionLocationArr.push(j)
                    }
                }
            }            
        }
        
        findLocation()

        // Assign to variables the number that was pushed to the arrays by findLocation, making them easier to manipulate
        const arrayLocation = arrayLocationArr[0]
        const positionLocation = positionLocationArr[0]
        
        // Log for debugging purposes, to check if arrayLocation and positionLocation were correctly assigned
        console.log(arrayLocation, positionLocation)

        // Identify in which of the three arrays that make a Field class child the pathCharacter (*) will be moving to given the direction the player chose
        const newArrayLocationArr = []
        // Identify in which position inside the newArrayLocationArr the pathCharacter (*) will be moving to given the direction the player chose
        const newPositionLocationArr = []
        
        // This function fills the newArrayLocationArr and newPositionLocationArr, which point where the pathCharacter (*) will be moving to in the Field class child. The movement depends on the direction chosen by the player.
        const newLocation = () => {

            // If the player chose the 'right' direction, the pathCharacter (*) should move right in the Field. To accomplish that, the Array Location will not change and the Position Location of the pathCharacter will increase by 1
            if (direction === 'right') {
                const newPosition = positionLocationArr[0] +1
                newPositionLocationArr.push(newPosition)
                newArrayLocationArr.push(arrayLocation)
                                
            }
            
            // If the player chose the 'left' direction, the pathCharacter (*) should move left in the Field. To accomplish that, the Array Location will not change and the Position Location of the pathCharacter will decrease by 1
            else if (direction === 'left') {
                
                const newPosition = positionLocationArr[0] -1
                newPositionLocationArr.push(newPosition)
                newArrayLocationArr.push(arrayLocation)
                    
            }

            // If the player chose the 'up' direction, the pathCharacter (*) should move up in the Field. To accomplish that, the Array Location will decrease by one and the Position Location will not change
            else if (direction === 'up') {

                const newArr = arrayLocationArr[0] -1
                newArrayLocationArr.push(newArr)
                newPositionLocationArr.push(positionLocation)
                    
            }
    
            // If the player chose the 'down' direction, the pathCharacter (*) should move down in the Field. To accomplish that, the Array Location will increase by one and the Position Location will not change
            else if (direction === 'down') {
                
                const newArr = arrayLocationArr[0] +1
                newArrayLocationArr.push(newArr)
                newPositionLocationArr.push(positionLocation)
                    
            }

        }

        newLocation()

        // Assign to variables the number that was pushed to the arrays by newLocation, making them easier to manipulate
        const newPositionLocation = newPositionLocationArr[0]
        const newArrayLocation = newArrayLocationArr[0]

        // Log for debugging purposes, to check if newArrayLocation and newPositionLocation were correctly assigned
        console.log(newArrayLocation, newPositionLocation)
        
        // If statements to determine game outcome
        // If player inserted an invalid move, ask them to insert a valid one
        if(arrayForValidityCheck.length === 0) {

            console.log('Insert a valid move.')

        }

        // If player moved the pathCharacter too far to the left or to the right in the Field, he lost.
        else if (newPositionLocation > 2 || newPositionLocation < 0) {

            console.log(`You've lost: your move is out of bounds.`)            

        }

        // If player moved the pathCharacter too far up or down in the Field, he lost.
        else if (newArrayLocation > 2 || newArrayLocation < 0) {

            console.log(`You've lost: your move is out of bounds.`)

        }

        // If player moved the pathCharacter to a position in the Field where there was a hole, he lost.
        else if (this._arr[newArrayLocation][newPositionLocation] === hole) {

            console.log(`You've lost: you fell in a hole.`)

        }

        // If player moved the pathCharacter to a position in the Field where there was a hat, he won.
        else if (this._arr[newArrayLocation][newPositionLocation] === hat) {

            console.log(`You win! You've hit the hat.`)

        }

        // If player moved the pathCharacter inside the Field limits and did not find a hat or a hole, they should keep playing.
        else {
            
            this._arr[arrayLocation][positionLocation] = fieldCharacter
            this._arr[newArrayLocation][newPositionLocation] = pathCharacter
            console.log('Keep playing.')
            for(let i=0; i<this._arr.length; i++) {
                const randomArr = this._arr[i].join('')
                console.log(randomArr)
            }
            
        }
    }

}

// Create a child of the Field class in which the game will be played
const myField = new Field([
    ['░', '░', 'O'],
    ['░', '*', '░'],
    ['░', '^', '░']
])

// Insert here the player's move: right, left, up or down. The game's result will be logged to the console.
myField.move('down')