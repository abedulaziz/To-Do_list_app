
class Task {
  constructor(id, title, description, points) {
    this.id = id,
    this.title = title,
    this.description = description,
    this.points = points,
    this.isDone = false,
    this.createdAt = new Date()
  }
}

// return tasks form local storage
for (let i =0; i< 100; i++) {
  let el = localStorage.getItem(i)
  
  if (el) {
    parsedEl = JSON.parse(el)
    let newTask = $(`<div class="task" id="${parsedEl.id}" data-points="${parsedEl.points}" data-isDone=${parsedEl.isDone}>
    <div class="task-options">
      <div class="finish_task edit_button"><i class="${parsedEl.isDone ? "fa-solid fa-check":"fa-regular fa-circle"}"></i></div>
      <div class="trash edit_button"><i class="fa-regular fa-trash-can"></i></div>
      <div class="rate"><span class="rate_num">${parsedEl.points}</span><i class="fa-solid fa-star"></i></div>
    </div>
    <div class="task_det">
      <h4 class="task-head">${parsedEl.title}</h4>
      <p class="description">${parsedEl.description}</p>
    </div>
  </div>`)
    
    if (parsedEl.isDone) $(".finished_tasks").append(newTask)
    else $(".unfinished_tasks").append(newTask)
  }
}


$("#addTask").focus(activeAddTask)
$("#addTask").focusout(unActiveAddTask)


$(".set_options i").each(function(index) {
  $(this).click(() => {
    
    $(this).parent().attr("data-rate", index +1)
    $(".set_options i").each(function(i) {
      if (i <= index) {
        $(this).addClass("important fa-solid").removeClass("fa-regular")
      }
      else {
        $(this).addClass("fa-regular").removeClass("important fa-solid")
      }
    })
  })
})

// trash on click
$(".unfinished_tasks, .finished_tasks").click(function(ev) {
  if ($(ev.target).is(".fa-trash-can")) {
    
    var parent = $(ev.target).closest(".task")
    localStorage.removeItem(parent[0].id)
    parent.remove()
  }
  else if($(ev.target).is(".fa-circle")) {

    var parent = $(ev.target).closest(".task")
    $(ev.target).addClass("fa-solid fa-check").removeClass("fa-regular fa-circle")
    parent.attr("isdone", "true")

    localStorage.setItem(parent[0].id, localStorage.getItem(parent[0].id).replace(`"isDone":false`, `"isDone":true`))

    $(".finished_tasks").append(parent)
  }
})


$("#tasksOrder").on("change", sortByTime)


// functions

function activeAddTask() {

  $(this).attr("placeholder", "Add task title")
  $(document).bind("keydown", addHeader)
}

function addHeader(e) {
  if (e.key === "Enter" && $("#addTask").val()) {
    
    var header=$("<div class='new_task_head'><span class='new_task_desc'>Task header: </span>" + $("#addTask").val()+"</div>")
    
    var headerInfo = $("#addTask").val()
    $(".add-task").append(header)

    $("#addTask").val("")
    $("#addTask").attr("placeholder", "Add task description")

    // $("body").off("keydown", $(document), addHeader)
    $(document).off()
    $(document).bind("keydown",{headerInfo: headerInfo}, addDescription)

  }
}


function addDescription(ev) {
  if (ev.key === "Enter" && $("#addTask").val()) {
    var id =generateID()

    var newTask = $(`<div class="task" id="${id}" data-points="${parseInt($(".set_options").attr("data-rate"))}" data-isDone="false">
    <div class="task-options">
      <div class="finish_task edit_button"><i class="fa-regular fa-circle"></i></div>
      <div class="trash edit_button"><i class="fa-regular fa-trash-can"></i></div>
      <div class="rate"><span class="rate_num">${parseInt($(".set_options").attr("data-rate"))}</span><i class="fa-solid fa-star"></i></div>
    </div>
    <div class="task_det">
      <h4 class="task-head">${ev.data.headerInfo}</h4>
      <p class="description">${$("#addTask").val()}</p>
    </div>
  </div>`)


    $(".unfinished_tasks").append(newTask)
    var task = new Task(id, ev.data.headerInfo, $("#addTask").val(), parseInt($(".set_options").attr("data-rate")))

    $(".set_options").attr("data-rate", "1")
    $(".set_options i").each(function() {
      $(this).addClass("fa-regular").removeClass("important fa-solid")
    })

    localStorage.setItem(id, JSON.stringify(task))

    console.log(task)
    $("#addTask").val("").attr("placeholder", "Add task title")
    $(".new_task_head").remove()

    $(document).off()
    $(document).bind("keydown", addHeader)
  }
}


function unActiveAddTask() {
  $(this).attr("placeholder", "Create a new todo...")
}

// function generates unique ID 
function generateID() {

  task_id = Math.floor(Math.random() * 100)

  $(".task").each(function() {

    if ($(this).attr("id") == task_id) {
      return generateID()
    }
  })
  return task_id
}


function sortByTime(e) {
  
  if (this.value == "by-date") {
    var sortedByTime = insertionSort($(".unfinished_tasks .task"))
    for (let j = 0; j < sortedByTime.length; j++) {
      
      $(".unfinished_tasks").append(sortedByTime[j])
    }
  }
  else {
    
  }
}




console.log($(".unfinished_tasks .task").length)

// let haha = JSON.parse(localStorage.getItem()).createdAt

// 545:"{"id":545,"title":"asdkfksdf","description":"sdf","points":1,"isDone":false,"createdAt":"2022-06-02T17:23:39.012Z"}"
// insertion sort
function insertionSort(inputArr) {
  let n = inputArr.length;
      for (let i = 1; i < n; i++) {
          // Choosing the first element in our unsorted subarray
          let current = inputArr[i];
          // The last element of our sorted subarray
          let j = i-1; 
          while ((j > -1) && (JSON.parse(localStorage.getItem(current.id)).createdAt > JSON.parse(localStorage.getItem(inputArr[j].id)).createdAt)) {
            inputArr[j+1] = inputArr[j];
              j--;
          }
          inputArr[j+1] = current;
      }
      console.log(inputArr);
  return inputArr;
}