function showless(event){
  const bottoneless=event.currentTarget;
  const divinformation=bottoneless.parentNode;
  const casella=divinformation.parentNode;
  divinformation.innerHTML="";
  divinformation.classList.add("hidden");
  const bottonemore=casella.querySelector("span");
  bottonemore.classList.remove("hidden");
}

function showmore(event){
  const bottonemore=event.currentTarget;
  const flexitem=bottonemore.parentNode;
  const index=flexitem.dataset.element;
  bottonemore.classList.add("hidden");
  const descrizione=document.createElement("p");
  const prezzo=document.createElement("h3");
  const bottoneless=document.createElement("span");
  bottoneless.classList.add("button");
  bottoneless.textContent="SHOW LESS";
  descrizione.textContent=RESULT_MAP[index].descrizione;
  prezzo.textContent=RESULT_MAP[index].prezzo;
  const div=flexitem.querySelector(".information");
  div.classList.remove("hidden");
  div.appendChild(descrizione);
  div.appendChild(prezzo);
  div.appendChild(bottoneless);
  bottoneless.addEventListener('click',showless);
}


function showsearch(event){
  const searchbox=event.currentTarget;
  const filter=searchbox.value.toUpperCase();
  for (const blocco of blocchi)
  {
      const titolo=blocco.querySelector("h1").textContent;
      if(titolo.toUpperCase().indexOf(filter)>-1){
        blocco.classList.remove("hidden");
      }
      else{
        blocco.classList.add("hidden");
      }
}
}


function rimuovipreferiti(event){
  const dislike=event.currentTarget;
  const divtitle=dislike.parentNode;
  const itempreferiti=divtitle.parentNode;
  const index=itempreferiti.dataset.element;
  const preferiticontainer=document.querySelector(".preferiti-container");
  const divpreferiti=preferiticontainer.parentNode;
  const figli=preferiticontainer.childNodes;
  preferiticontainer.removeChild(itempreferiti);
  if(figli.length==1){
    divpreferiti.classList.add("hidden");
  }
  for(const button of preferbuttons){
        if(button.parentNode.parentNode.dataset.element===index)
         button.addEventListener("click",showpreferiti);
}
}


function showpreferiti(event){
  preferiti.classList.remove("hidden");
  const flexsection=preferiti.querySelector(".preferiti-container");
  const preferbutton=event.currentTarget;
  const divtitlesection=preferbutton.parentNode;
  const casella=divtitlesection.parentNode;
  const indice=casella.dataset.element;
  const flexitem=document.createElement("div");
  flexitem.classList.add("item-preferiti");
  flexitem.setAttribute("data-element",indice);
  flexsection.appendChild(flexitem);
  const divtitlepreferiti=document.createElement("div");
  divtitlepreferiti.classList.add("title");
  flexitem.appendChild(divtitlepreferiti);
  const title=document.createElement("h1");
  title.textContent=RESULT_MAP[indice].titolo;
  const immagineunprefer=document.createElement("img");
  immagineunprefer.src=RESULT_MAP[indice].immagineunlike;
  divtitlepreferiti.appendChild(title);
  divtitlepreferiti.appendChild(immagineunprefer);
  const imgdesc=document.createElement("img");
  imgdesc.src=RESULT_MAP[indice].immagine;
  flexitem.appendChild(imgdesc);
  preferbutton.removeEventListener('click',showpreferiti);
  const bottonedislike=divtitlepreferiti.querySelector("img");
  bottonedislike.addEventListener('click',rimuovipreferiti);
}



//AGGIUNGO DINAMICAMENTE I DIV//
for(let index in RESULT_MAP){
  const div=document.createElement("div");
  div.setAttribute("data-element",index);
  div.classList.add("flex-itemsection");
  const section=document.querySelector(".flex-section");
  section.appendChild(div);
}

//IN MANIERA DINAMICA AGGIUNGO IL CONTENUTO AD OGNI DIV PRECEDENTE CREATO//
const blocchi=document.querySelectorAll('.flex-itemsection');
for(const blocco of blocchi){
    const indice=blocco.dataset.element;
    const divtitle=document.createElement("div");
    divtitle.classList.add("title");
    const title=document.createElement("h1");
    title.textContent=RESULT_MAP[indice].titolo;
    const immaginelike=document.createElement("img");
    immaginelike.src=RESULT_MAP[indice].immaginelike;
    divtitle.appendChild(title);
    divtitle.appendChild(immaginelike);
    blocco.appendChild(divtitle);
   const immaginedesc=document.createElement("img");
   immaginedesc.src=RESULT_MAP[indice].immagine;
   blocco.appendChild(immaginedesc);
   const divinformation=document.createElement("div");
   divinformation.classList.add("information");
   divinformation.classList.add("hidden");
   blocco.appendChild(divinformation);
   const bottonemore=document.createElement("span");
   bottonemore.textContent="SHOW MORE";
   bottonemore.classList.add("button");
   blocco.appendChild(bottonemore);
}


/*PARTE IN CUI AGGIUNGO EVENTLISTENER AI SELETTORI CSS*/
const caselle = document.querySelectorAll('.flex-itemsection .button');
for (const casella of caselle)
{
  casella.addEventListener('click', showmore);
}

const preferiti=document.querySelector(".preferiti");
preferiti.classList.add("hidden");
const preferbuttons=document.querySelectorAll(".flex-itemsection .title img");
for(const button of preferbuttons){
  button.addEventListener('click',showpreferiti);
}

const searchbox=document.querySelector("#searchbox-item input");
searchbox.addEventListener('keyup',showsearch);
