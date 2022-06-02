
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

  task_id = Math.floor(Math.random() * 1000)

  $(".task").each(function() {

    if ($(this).attr("id") == task_id) {
      return generateID()
    }
  })
  return task_id
}