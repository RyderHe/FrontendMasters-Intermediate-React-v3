export default function location(state = "Seatle, WA", action) {
    switch (action.type) {
        case "CHANGE_LOCATION":
            return action.payload;
        default:
            return state;
    }
}

/* ACtion
{
    type: "CHANGE_LOCATION",
    payload: "salt lake city, UT" 
    payload: {
        city: "",
        state: ""
    }
}
*/