console.log("author start");

let data = {
    UserData:{}
}

localStorage.setItem("DBdata", (localStorage.getItem("DBdata")==null)?btoa(data):localStorage.getItem("DBdata"));
export default data;
console.log("author end");