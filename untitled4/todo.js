const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos'


let toDos = []; //빈배열 생성 (할일들 입력하면 저장되게할거임)

function deleteToDo(event) {
    const  btn = event.target;
    const  li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDO) {
        return toDO.id !== parseInt(li.id);
    }); //filter함수는 array에서 해당함수에서 true인것만 갖고 나머진 버리고 새로운 배열을만든다.
    toDos = cleanToDos; //새로운배열을 저장해준다. (17,18)
    saveToDos();
}


//스토리지에 저장하는 함수 (참고로 로컬스토리지에는 String형만 저장이가능하다, 자바스크립트 객체는 저장불가)
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //toDos는 객체니깐 JSON String으로 바꿔주어 저장해준다.
}


//할일작성하고 엔터누르면 호출될 함수 (해야할일적은것과 x버튼이 나타나게함)
function paintToDo(text) {
    const li = document.createElement("li"); //태그생성
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo); //X버튼 클릭시이벤트등록
    span.innerText = text;
    li.appendChild(span); //span을 li에 넣고 그다음 delBtn을 넣는다.
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);

    //게시물내용과 아이디값
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();//form에 입력을하고 엔터를 치면 입력글이 사라지고 페이지가 새로고침이되는데 그 이벤트를 막아줌
    const currentValue = toDoInput.value; //입력값 갖고옴
    paintToDo(currentValue);
    toDoInput.value = "";
}

//1
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS) //로컬에서 가져옴
    if (loadedToDos !== null) {
        //JSON으로 저장했으니깐 가져올때 객체로 변환해줌
        const parsedToDos = JSON.parse(loadedToDos)
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        })
    }

}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit); //전송버튼누르면 일어나는 이벤트등록
}

init();