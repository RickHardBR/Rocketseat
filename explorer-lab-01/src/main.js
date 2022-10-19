import "./css/index.css"
/*criei uma const ccBgColorX que pega o DOM - document usar a funcionalidade querySelector que
  serve para selecionar um elemnto (seletor ex: body, p, className, id) html da mesma forma que
  eu selecionaria no css normal, pequei os seletores da html ('.cc-bg svg >g g:nth-child(1) path')
  e por ultimo o caminho do que quero modificar, no caso abaixo o path do svg.
  :ntg-child(x) pega o elemento filho onde "x" é o numero da posição so filho.
*/
const ccBgColor01 = document.querySelector(".cc-bg svg >g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg >g g:nth-child(2) path")
const ccBand = document.querySelector(".cc-logo span:nth-child(2) img")

/*depois chamo a const e uso o setAttribute para atribuir ao seletor esclhido no final o valor
que ero, neste caso ("fill", "green") onde fill é onde escolhe a cor das imagens svg.
 */

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    nubank: ["#36165c", "#820ad1"],
    bradesco: ["#900b0e", "#bd0619"],
    american: ["#DAA520", "#100418"],
    default: ["#000000", "#323238"]
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccBand.setAttribute("src", `cc-${type}.svg`)
}

setCardType("nubank")

globalThis.setCardType = setCardType
