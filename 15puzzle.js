var btnSpace = document.getElementById("btnSpace");
var getBtn = document.getElementsByClassName("btns");
var storage = [];

//배열에 요소 넣기
function nums(){
    for(i = 1; i < 16; i++){
        storage.push(i);
    }
    storage.push("bl");
}

//버튼 만들기
function createBtn(){
    var btn = document.createElement("button");
    return btn;
}

//버튼 세팅
function setBtn(btn){
    btn.setAttribute("class", "btns");
    btnSpace.appendChild(btn);
    return btn;
}

//공백 버튼 세팅
function setBlank(){
    var idxBl = storage.indexOf("bl");
    getBtn[idxBl].style.color = "red";
}

//16개 버튼 만들기
function createBtns(){
    for (var i = 0; i < 15; i++){
        var btns = setBtn(createBtn());
        btns.innerHTML = storage[i];
        if((i % 4) == 3){
            btnSpace.innerHTML += "<br>";
        }   
    }
    var btnBlank = setBtn(createBtn());
    btnBlank.innerHTML = "bl";
    btnBlank.style.color = "red";
    btnBlank.setAttribute("id", "blank")
}

//화면 갱신
function renew(){
    for(var i = 0; i < 16; i++){
        getBtn[i].innerHTML = storage[i]
        getBtn[i].style.color = "black";
    }
    setBlank();
}

//배열 요소 자리 바꾸기
function swtIdx(a, b){
    var temp = storage[a];
    storage[a] = storage[b];
    storage[b] = temp;
}

//상하좌우 bl있으면 자리 바꾸기
function swtBtn(a, b){
    if(a-4 == b){swtIdx(a, b); renew();}
    else if(a-1 == b){swtIdx(a, b); renew();}
    else if(a+1 == b){swtIdx(a, b); renew();}
    else if(a+4 == b){swtIdx(a, b); renew();}
}

//숫자버튼 클릭 시 공백과 자리 바꾸기
function clickNum(){
    var t = Number(this.innerHTML);
    var index = storage.indexOf(t);
    var index16 = storage.indexOf("bl");
    swtBtn(index, index16);
}

//숫자 버튼 클릭에 함수 추가
function getClick(){
    for(i = 0; i < 16; i++){
        getBtn[i].addEventListener("click", clickNum)
    }
}

//기능 버튼 세팅
function setOpbtn(btn){
    btn.setAttribute("class", "opbtns");
    opSpace.appendChild(btn);
    return btn;
}

//기능 버튼 추가
function createOpbtns(){
    var b1 = setOpbtn(createBtn());
    b1.innerHTML = "SOLVE"
    b1.setAttribute("id", "solve")
    b1.addEventListener("click", function(){
        alertAns(opSolve());
    })

    var b2 = setOpbtn(createBtn());
    b2.innerHTML = "SHUFFLE"
    b2.setAttribute("id", "shuffle")
    b2.addEventListener("click", function(){
        opShuffle(storage);
    })
}

//solve 기능 구현
function opSolve(){
    var ans = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, "bl"]
    for(i = 0; i < 16; i++){
        if(storage[i] !== ans[i]){
            return false;
        } 
    }
}

//solve 알람
function alertAns(ans){
    if(typeof(ans) == "undefined"){
        alert("clear!");
    } else {
        alert("try again!");
    }
}

//shuffle 기능 구현
function opShuffle(arr){
    for (var i = 0; i < arr.length; i++){
        var j = Math.floor(Math.random() * (i+1));

        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    renew();
}

//실행 함수
function main(){
    nums();
    createBtns();
    createOpbtns();
    getClick();
}

main();
