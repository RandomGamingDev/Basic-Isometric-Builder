var keyMap = [];

window.addEventListener('keydown', (e)=>{
    if(!keyMap.includes(e.keyCode))
        keyMap.push(e.keyCode);
})

window.addEventListener('keyup', (e)=>{
    if(keyMap.includes(e.keyCode))
        keyMap.splice(keyMap.indexOf(e.keyCode), 1);
})

function keyCodePressed(x){
    return (keyMap.includes(x));
}