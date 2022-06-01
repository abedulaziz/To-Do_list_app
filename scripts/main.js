
class Task {
  constructor(id, title, description, point) {
    id = this.id,
    title = this.title,
    description = this.description,
    point = this.point,
    isDone = false,
    createdAt = new Date()
  }
}


$("#addTask").focus(activeAddTask)
$("#addTask").focusout(unActiveAddTask)



function activeAddTask() {

  $(this).attr("placeholder", "Add task title")

  // $(document).keydown(addHeader)
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
    var newTask = $(`<div class="task">
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
    $("#addTask").val("").attr("placeholder", "Add task title")
    $(".new_task_head").remove()

    // $("body").off("keydown", $(document), addDescription)
    $(document).off()
    $(document).bind("keydown", addHeader)
  }
}


function unActiveAddTask() {
  // console.log("unfocused")
}