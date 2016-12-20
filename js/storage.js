
$(document).ready(function(){
	$("#send").click(function(){
		if($("#noteContent").val()!=""){
      CreateNote();
      $("#noteContent").val("");//清空输入框里的值
    }
	});
	var notesArr=GetNotesArr();
	for(var i=0;i<notesArr.length;i++){
		var key=notesArr[i];
		var content=JSON.parse(localStorage.getItem(key));
		AddNoteToDom(key,content);
	}
function AddNoteToDom(key,noteObj){
	var $li=$("<li></li>")
	var notes=$(".note_list");
	var note =$("<li></li>");//创建li元素
	note.attr("id",key);
	note.attr("class",noteObj.level);
	note.text(noteObj.content);
	// 点击触发事件
	note.click(function(e){
		DeleteNote(e);
	});
	notes.append(note);//li放在ul下
}
function DeleteNoteFormDom(key) {
	$("#"+key).remove();
}
function CreateNote(){
	var noteContent=$("#noteContent").val();
  var level=$("#note_level").val();
	var noteObj={
		"level":level,
		"content":noteContent
	}
  var date=new Date();
  var key="note_"+date.getTime();
  localStorage.setItem(key,JSON.stringify(noteObj));
  var notesArr=GetNotesArr();
  notesArr.push(key);
  localStorage.setItem("notesArr",JSON.stringify(notesArr));
  AddNoteToDom(key,noteObj);
}
function DeleteNote(e){
	var key=e.target.id;
	localStorage.removeItem(key);
	var notesArr=GetNotesArr();
	for(var i=0;i<notesArr.length;i++){
		if(key==notesArr[i]){
			notesArr.splice(i,1);
		}
	}
	localStorage.setItem("notesArr", JSON.stringify(notesArr));
  DeleteNoteFormDom(key);
}
function GetNotesArr(){
	var notesArr=localStorage.getItem("notesArr");
	if (!notesArr) {
		notesArr = [];
		localStorage.setItem("notesArr", JSON.stringify(notesArr));
	} else {
		notesArr = JSON.parse(notesArr);
	}
	return notesArr;
}

});