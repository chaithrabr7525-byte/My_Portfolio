// ===== TYPING EFFECT =====
const roles = ["Cloud Engineer","Game Developer","MERN Developer"];
let i=0,j=0,del=false;

function typing(){
    const el = document.getElementById("typing-text");
    if(!el) return;

    let text = roles[i];

    el.innerText = text.substring(0,j);

    if(!del) j++; else j--;

    if(j === text.length) del = true;
    if(j === 0){
        del = false;
        i = (i+1)%roles.length;
    }

    setTimeout(typing, del ? 50 : 100);
}
typing();