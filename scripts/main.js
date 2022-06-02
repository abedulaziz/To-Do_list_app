
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
    var id =checkID()

    var newTask = $(`<div class="task" id="${id}">
    <div class="task-options">
      <div id="isChecked" class="edit_button"><i class="fa-regular fa-circle"></i></div>
      <div class="trash edit_button"><i class="fa-regular fa-trash-can"></i></div>
    </div>
    <div class="task_det">
      <h4 class="task-head">${ev.data.headerInfo}</h4>
      <p class="description">${$("#addTask").val()}</p>
    </div>
  </div>`)


    $(".unfinished_tasks").append(newTask)
    var task = new Task(3, ev.data.headerInfo,$("#addTask").val(), parseInt($(".set_options").attr("data-rate")))

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
function checkID() {

  task_id = Math.floor(Math.random() * 1000)

  $(".task").each(function() {

    if ($(this).attr("id") == task_id) {
      return checkID()
    }
  })
  return task_id
}