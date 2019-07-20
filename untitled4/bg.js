const body = document.querySelector("body");

const  IMG_NUMBER = 3 ; //이미지개수


function  paintImage(imgNumber) {
    const  image = new Image();  //const image = document.createElement("img")와 같은 행동임
    image.src = `images/${imgNumber+1}.jpg`;
    image.classList.add('bgImage');
    body.prepend(image); //appendChild하면 뒤로 넣어져서 글과 배경이함꼐가아니라 밑줄에 배경이깔리게됨

}

function  getRandom() {
    const  number = Math.floor(Math.random()*IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();