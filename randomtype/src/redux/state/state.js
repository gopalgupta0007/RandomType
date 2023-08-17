// this state show how much and how many data are initially stored into localstorage. 
console.log("state.js");
const state = {
    // isAuth:false,
    word_per_minute: 0,
    typing_accuracy: 100,
    typing_test_timer: 30, // 30seconds
    typing_test_data:{
        total_wpm:[0],
        total_accuracy:[0],
        no_of_test:[0]
    }
}

export default state;