// STATE
// part1
// create the local version of the data for todo list
const state = {
  todos: [],
};
// part 2
// Assign the existed UL with the Id to variable
const toDoUL = document.querySelector("#todo-list");
const newform = document.querySelector("form")

newform.addEventListener("submit", (event) => {
    // event.preventDefault()
    const newTask = {
        title: event.target.title.value,
    }
    const newTaskAsJSONString = JSON.stringify(newTask)

    const options ={
        method: "POST",
        body:newTaskAsJSONString,
        headers: {
        "Content-Type": "application/json",
        },
    }

    fetch("http://localhost:3000/todos", options)
    .then((newLi)=> {
        return newLi.json();
    })
    .then((toDoLi) => {
        console.log("Created new Task:", toDoLi)
    })
})
// part 3

// create the function to get the all list of item in the server
function getAllToDo() {
  // than by using the fetch function get the list of items to read on the browser
  // send as GET request to receive all people
  fetch("http://localhost:3000/todos") // send a Request
    .then((toDOList) => {
      // response = the Response from the server
      return toDOList.json();
    })
    .then((toDOListData) => {
      console.log("Received list", toDOListData);
      // update local STATE with fetched todo list
      state.todos = toDOListData;
      // call the function of rendingtodo list at the end of thi function.
      renderToDoList();
    });
}

// part 4
//create the function for rendering the all the todo list information from the json file.
function renderToDoList() {
  // clear my list before re-rendering
  toDoUL.innerHTML = "";
  // create the for each loop to get the data.
  state.todos.forEach((list) => {
    // convert person JS Object to a <li>
    // create the list of the todo list
    const li = document.createElement("li");
    li.innerText = `${list.title}`;

    if (list.completed) {
      li.setAttribute("class", "completed");
    }

    // append li onto ul
    toDoUL.append(li);
  });
}

getAllToDo();

// as soon as page loads : call the fetch function