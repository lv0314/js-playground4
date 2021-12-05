var btnSpace = document.getElementById("btnSpace");
var getBtn = document.getElementsByClassName("btns");
var storage = [];

function nums(){
    for(i = 1; i < 16; i++){
        storage.push(i);
    }
    storage.push("bl");
}

function createBtn(){
    var btn = document.createElement("button");
    return btn;
}

function setBtn(btn){
    btn.setAttribute("class", "btns");
    btnSpace.appendChild(btn);
    return btn;
}

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

function setBlank(){
    var idxBl = storage.indexOf("bl");
    getBtn[idxBl].style.color = "red";
}

function renew(){
    for(var i = 0; i < 16; i++){
        getBtn[i].innerHTML = storage[i]
        getBtn[i].style.color = "black";
    }
    setBlank();
}

function swtIdx(a, b){
    var temp = storage[a];
    storage[a] = storage[b];
    storage[b] = temp;
}

function swtBtn(a, b){
    if(a-4 == b){swtIdx(a, b); renew();}
    else if(a-1 == b){swtIdx(a, b); renew();}
    else if(a+1 == b){swtIdx(a, b); renew();}
    else if(a+4 == b){swtIdx(a, b); renew();}
}

function clickNum(){
    var t = Number(this.innerHTML);
    var index = storage.indexOf(t);
    var index16 = storage.indexOf("bl");
    swtBtn(index, index16);
}

function getClick(){
    for(i = 0; i < 16; i++){
        getBtn[i].addEventListener("click", clickNum)
    }
}

function setOpbtn(btn){
    btn.setAttribute("class", "opbtns");
    opSpace.appendChild(btn);
    return btn;
}

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

function opSolve(){
    var ans = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, "bl"]
    for(i = 0; i < 16; i++){
        if(storage[i] !== ans[i]){
            return false;
        } 
    }
}

function alertAns(ans){
    if(typeof(ans) == "undefined"){
        alert("clear!");
    } else {
        alert("try again!");
    }
}

function opShuffle(arr){
    for (var i = 0; i < arr.length; i++){
        var j = Math.floor(Math.random() * (i+1));

        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    renew();
}

function main(){
    nums();
    createBtns();
    createOpbtns();
    getClick();
}

main();
