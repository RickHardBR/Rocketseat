import "./css/index.css"
import IMask from "imask"

/*criei uma const ccBgColorX que pega o DOM - document usar a funcionalidade querySelector que
  serve para selecionar um elemnto (seletor ex: body, p, className, id) html da mesma forma que
  eu selecionaria no css normal, pequei os seletores da html ('.cc-bg svg >g g:nth-child(1) path')
  e por ultimo o caminho do que quero modificar, no caso abaixo o path do svg.
  :ntg-child(x) pega o elemento filho onde "x" é o numero da posição so filho.
*/
const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

/*depois chamo a const e uso o setAttribute para atribuir ao seletor esclhido no final o valor
que ero, neste caso ("fill", "green") onde fill é onde escolhe a cor das imagens svg.
 */

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    nubank: ["#36165c", "#820ad1"],
    bradesco: ["#900b0e", "#bd0619"],
    amex: ["#DAA520", "#363636"],
    discover: ["#D2691E", "#FFFFFF"],
    diners: ["#2D57F2", "#FFFFFF"],
    jcb: ["#900b0e", "#32CD32"],
    unionpay: ["#2D57F2", "#32CD32"],
    maestro: ["#900b0e", "#2D57F2"],
    elo: ["#2D57F2", "#900b0e"],
    default: ["#000000", "#323238"]
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    }
  }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 000000 00000",
      regex: /^3[47][0-9]{13}/,
      cardtype: "amex"
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
      cardtype: "discover"
    },
    {
      mask: "0000 000000 0000",
      regex: /(36[0-8][0-9]{3}|369[0-8][0-9]{2}|3699[0-8][0-9]|36999[0-9])/,
      cardtype: "diners"
    },
    {
      mask: "0000 000000 0000",
      regex:
        /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
      cardtype: "elo"
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard"
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:35\d{0,2})\d{0,12}/,
      cardtype: "jcb"
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
      cardtype: "maestro"
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:4\d{0,15})/,
      cardtype: "visa"
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^62\d{0,14}/,
      cardtype: "unionpay"
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default"
    }
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    return foundMask
  }
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  alert("Cartão adicionado com sucesso!")
})

document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault()
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", event => {
  const ccHolder = document.querySelector(".cc-holder .value")

  ccHolder.innerText =
    cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

// tramento do CVC - Inicio
const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000"
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)
// tramento do CVC - fim

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")

  ccSecurity.innerText = code.length === 0 ? "123" : code
}

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)
  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number) {
  const ccCardNumber = document.querySelector(".cc-number ")

  ccCardNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}

expirationDateMasked.on("accept", () => {
  ExpirationDate(expirationDateMasked.value)
})

function ExpirationDate(date) {
  const ccExpirationDate = document.querySelector(".cc-expiration .value")

  ccExpirationDate.innerText = date.length === 0 ? "02/32" : date
}
