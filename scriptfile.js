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
    const indice=(blocco.dataset.element);
    const divtitle=document.createElement("div");
    divtitle.classList.add("title");
   const title=document.createElement("h1");
   title.textContent=RESULT_MAP[indice].titolo;
   const immagine1=document.createElement("img");
   immagine1.src=RESULT_MAP[indice].immaginelike;
   divtitle.appendChild(title);
   divtitle.appendChild(immagine1);
   blocco.appendChild(divtitle);
   const immagine2=document.createElement("img");
   immagine2.src=RESULT_MAP[indice].immagine;
   blocco.appendChild(immagine2);
   const bottonemore=document.createElement("span");
   const divinformation=document.createElement("div");
   divinformation.classList.add("information");
   blocco.appendChild(divinformation);
   bottonemore.textContent="SHOW MORE";
   bottonemore.classList.add("button");
   blocco.appendChild(bottonemore);
}




function showless(event){
  const bottoneless=event.currentTarget;
  const flexitem=bottoneless.parentNode;
  const casella=flexitem.parentNode;
  flexitem.innerHTML="";
  const bottonemore=casella.querySelector("span");
  bottonemore.classList.remove("hidden");
  bottoneless.removeEventListener('click',showless);
  bottonemore.addEventListener('click',showmore);
}



function showmore(event){
  const bottonemore=event.currentTarget;
  const flexitem=bottonemore.parentNode;
  const index=(flexitem.dataset.element);
  const descrizione=RESULT_MAP[index].descrizione;
  const prezzo=RESULT_MAP[index].prezzo;
  bottonemore.classList.add("hidden");
  const desc=document.createElement("p");
  const prezz=document.createElement("h3");
  const bottoneless=document.createElement("span");
  bottoneless.classList.add("button");
  bottoneless.textContent="SHOW LESS";
  desc.textContent=descrizione;
  prezz.textContent=prezzo;
    const div=flexitem.querySelector(".information");
  div.appendChild(desc);
  div.appendChild(prezz);
  div.appendChild(bottoneless);
  bottonemore.removeEventListener('click',showmore);
  bottoneless.addEventListener('click',showless);
}





function showsearch(event){
  const searchbox=event.currentTarget;
  const caselle= document.querySelectorAll('.flex-itemsection');
  const filter=searchbox.value.toUpperCase();
  for (const casella of caselle)
  {
      const titolo=casella.querySelector("h1").textContent;
      if(titolo.toUpperCase().indexOf(filter)>-1){
        casella.classList.remove("hidden");
      }
      else{
        casella.classList.add("hidden");
      }
}
}

function rimuovipreferiti(event){
  const dislike=event.currentTarget;
  const divtitle=dislike.parentNode;
  const itempreferiti=divtitle.parentNode;
  const index=itempreferiti.dataset.element;
  const itemcontainer=document.querySelector(".preferiti-container");
  const figli=itemcontainer.childNodes;
  const titolo=document.querySelector(".preferiti h1");
  itemcontainer.removeChild(itempreferiti);
  if(figli.length==1){
    titolo.classList.add("hidden");
  }
  const likebuttons=document.querySelectorAll(".flex-itemsection .title img");
  for(const button of likebuttons){
        if(button.parentNode.parentNode.dataset.element===index)
         button.addEventListener("click",showpreferiti);
}
}



function showpreferiti(event){
  const titolo=document.querySelector(".preferiti h1");
  titolo.classList.remove("hidden");
  const flexsection=document.querySelector(".preferiti-container");
  const divtitlepreferiti=document.createElement("div");
  divtitlepreferiti.classList.add("title");
  const preferbutton=event.currentTarget;
  const divtitleold=preferbutton.parentNode;
  const casella=divtitleold.parentNode;
  const indice=(casella.dataset.element);
  const flexitem=document.createElement("div");
  flexitem.classList.add("item-preferiti");
  flexitem.setAttribute("data-element",indice);
  flexsection.appendChild(flexitem);
  flexitem.appendChild(divtitlepreferiti);
  const title=document.createElement("h1");
  title.textContent=RESULT_MAP[indice].titolo;
  const imgdesc=document.createElement("img");
  imgdesc.src=RESULT_MAP[indice].immagine;
  const immagineunprefer=document.createElement("img");
  immagineunprefer.src=RESULT_MAP[indice].immagineunlike;
  divtitlepreferiti.appendChild(title);
  divtitlepreferiti.appendChild(immagineunprefer);
  flexitem.appendChild(imgdesc);
  preferbutton.removeEventListener('click',showpreferiti);
  const bottonedislike=divtitlepreferiti.querySelector("img");
  bottonedislike.addEventListener('click',rimuovipreferiti);
}




/*PARTE IN CUI AGGIUNGO EVENTLISTENER AI SELETTORI CSS*/
const caselle = document.querySelectorAll('.flex-itemsection .button');
for (const casella of caselle)
{
  casella.addEventListener('click', showmore);
}

const titolo=document.querySelector(".preferiti h1");
titolo.classList.add("hidden");
const preferbuttons=document.querySelectorAll(".flex-itemsection .title img");
for(const button of preferbuttons){
  button.addEventListener('click',showpreferiti);
}

const searchbox=document.querySelector("#searchbox-item input");
searchbox.addEventListener('keyup',showsearch);
