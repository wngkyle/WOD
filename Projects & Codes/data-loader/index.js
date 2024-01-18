const fs = require('fs')
const { parse } = require('csv-parse')
const { ApolloClient, InMemoryCache, gql, HttpLink, useMutation, useQuery } = require('@apollo/client')

const link = new HttpLink({
    uri: "https://workout-wiki.hasura.app/v1/graphql",
    headers: {
        'x-hasura-admin-secret': 'QoslZIKwg0hx3KWp4Jub9F49qJThKRbEegHv7Fm65y1BuqSQ4A3fz5q6XVX5JZj5'
    }
})

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
})

const GET_MOVEMENT = gql`
    query getMovement {
        movement {
            id
            name
            exercise
            targetMuscle
            movementPattern
            equipment
            skillLevel
            description
        }
    }
`

const ADD_MOVEMENT = gql`
    mutation MyMutation($name: String!, $exercise: String!, $targetMuscle: String!, $movementPattern: String!, $equipment: String!, $skillLevel: String!, $description: String!) {
        insert_movement_one(object: {name: $name, exercise: $exercise, targetMuscle: $targetMuscle, movementPattern: $movementPattern, equipment: $equipment, skillLevel: $skillLevel, description: $description}) {
            id
            name
            exercise
            movementPattern
            targetMuscle
            equipment
            skillLevel
            description
        }
    }
`

async function mutateMovement(inputMovement) {
    try {
        const result = await client.mutate({ 
            mutation: ADD_MOVEMENT, 
            variables : inputMovement 
        })
        console.log(result.data.insert_movement_one)
    } catch (error) {
        console.log("Error:", error.message)
    }
}

function queryMovement() {
    client 
        .query({
            query: GET_MOVEMENT
        })
        .then((result) => {
            console.log(result.data)
        })  
        .catch((error) => {
            console.log("Error: ", error.message)
        })
}

function readCSV() {
    fs.createReadStream("./workout-wiki-data.csv")
    .pipe(parse({ delimiter: ",", from_line: 2, to_line: 5 })) // can add to_line: to restrict range
    .on("data", (row) => {
        inputMovement = {
            name: row[1],
            exercise: row[2],
            targetMuscle: row[3],
            movementPattern: row[4],
            equipment: row[5],
            skillLevel: row[6],
            description: row[7]
        }
        mutateMovement(inputMovement)
        console.log(row)
    })
    .on("error", (error) => {
        console.log(error.message)
    })
    .on("end", () => {
        console.log("Finished")
    })
}

function addSingleMovement() {
    inputMovement = {
        name: "Dumbbell Bent-Over Row",
        exercise: "Strength",
        targetMuscle: "Upper Back",
        movementPattern: "Pull",
        equipment: "Dumbbell",
        skillLevel: "Intermediate",
        description: "Dumbbell Bent-Over Row is an excellent fitness movement for targeting the back, shoulders, and arms It is done by standing with your feet shoulder-width apart while holding a pair of dumbbells in your hands and bending over at a 45-degree angle from your hips with your back straight The aim is to pull the dumbbells back towards your torso, squeezing your back muscles and shoulders, before returning them to the starting position It is an important exercise for building"
    }
    mutateMovement(inputMovement)
}
  
function main() {
    readCSV()
    // addSingleMovement()
}

main()