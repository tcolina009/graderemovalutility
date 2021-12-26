const answerInput = document.getElementById("answer-input")
const messageh5 = document.getElementById("message-h5")
const randomLink = document.getElementById("random-link")

const answerDiv = document.getElementById("answer-div")

// madeline if you are reading this, pouring milk before the cereal is ideal in all circumstances. aang said so himself.

answerDiv.addEventListener("click", ()=>{

    console.log("got here")

    if (answerInput.value.toLowerCase() === "grand calculus") {
        messageh5.style.display = "inline-block"
        randomLink.style.display = "inline-block"
    }
})