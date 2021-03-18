export function reducer(state = {}, action) {

    //series of if statements:
    if (action.type === "UPDATE_STATE_SOMEHOW") {
        //update state somehow
    }

    if (action.type === "UNFRIEND") {
        //
    }

    if (action.type === "") {
        //
    }

    //last thing we want to do is return the new state
    return state;
}

//its reall important to not mutate state so we have to clone a lot of things

//useful array methods (ones that dont mutate)
//filter(its great if we want to get rid of something from an array, remove one from it but not remove state) and map(always returns a new array of the same length, we will use it for accepting a friend request, still have the same number of friends but still have the same number on the page.)


//cloning objects

//shallow clones