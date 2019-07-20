const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const  USER_LS = "currentUser",
    SHOWING_CN = "showing";

//로컬스토리지에서 내 이름을 기억하게 저장
function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

//3
function handleSubmit(event) {
    event.preventDefault(); //form에 입력을하고 엔터를 치면 입력글이 사라지고 페이지가 새로고침이되는데 그 이벤트를 막아줌
    const  currentValue = input.value; //인풋텍스트값 받아옴
    paintGreeting(currentValue);//출력과
    saveName(currentValue); //로컬에 저장해줌
}

//2.이름묻는 입력텍스트가 나오게한다.
function askForName() {
    form.classList.add(SHOWING_CN); //form태그 showing css 스타일 추가
    form.addEventListener("submit" , handleSubmit)
}


//2헬로 + 이름 출력
function  paintGreeting(text) {
    form.classList.remove(SHOWING_CN);  //showing css스타일을 form에서 제거해줌
    greeting.classList.add(SHOWING_CN);  //showing css스타일을 greeting 에 해줌
    greeting.innerText = `Hello ${text}`; //텍스트적용
}

//1.이름출력여부 결정
function loadName() {
    form.classList.remove(SHOWING_CN);
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        //유저없을때
        askForName(); //이름물음
    }else{
        //유저있을때
        paintGreeting(currentUser) //인사말텍스트 나오게함
    }
}
function init() {
    loadName();
}
init();