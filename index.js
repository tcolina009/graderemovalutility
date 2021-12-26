function addGrade() {
    num_grades = num_grades + 1

    if (num_grades > 2) {
        removeGradeButton.style.display = 'inline-block'
    }

    const gradeLabel = document.createElement("p")
    gradeLabel.style.fontWeight = 'bold';
    const gradeLabelText = document.createTextNode(`Grade #${num_grades}:`)
    gradeLabel.appendChild(gradeLabelText)

    const gradeEarned = document.createElement("input")
    gradeEarned.type = "number"
    gradeEarnedList.push(gradeEarned)

    const outOf = document.createElement("p")
    const outOfText = document.createTextNode(`out of`)
    outOf.appendChild(outOfText)

    const gradeTotal = document.createElement("input")
    gradeTotal.type = "number"
    gradeTotalList.push(gradeTotal)
    
    mainDiv.appendChild(document.createElement("br"))
    mainDiv.appendChild(document.createElement("br"))
    mainDiv.appendChild(document.createElement("br"))
    mainDiv.appendChild(gradeLabel)
    mainDiv.appendChild(gradeEarned)
    mainDiv.appendChild(outOf)
    mainDiv.appendChild(gradeTotal)
}

function removeGrade() {

    num_grades = num_grades - 1

    if (num_grades === 2) {
        removeGradeButton.style.display = 'none'
    }

    for (let i=0;i<7;i++) {
        mainDiv.removeChild(mainDiv.lastChild)
    }

    gradeEarnedList.pop()
    gradeTotalList.pop()
}

let mainDiv = document.getElementById("main-div")

let addGradeButton = document.getElementById('add-grade-button')
let removeGradeButton = document.getElementById('remove-grade-button')
let calculateButton = document.getElementById('calculate-button')
let resultsBox = document.getElementById('results-box')

let num_grades = 2

addGradeButton.addEventListener('click', ()=>{addGrade()})
removeGradeButton.addEventListener('click', ()=>{removeGrade()})

// Acutal calculation part
let gradeEarnedList = [document.getElementById("grade-1-earned"), document.getElementById("grade-2-earned")]
let gradeTotalList = [document.getElementById("grade-1-total"), document.getElementById("grade-2-total")]

calculateButton.addEventListener('click', ()=>{

    for (let i=0;i<gradeEarnedList.length;i++) {
    
        if (gradeEarnedList[i].value === "" || gradeTotalList[i].value === "") {
            return
        }
    }

    resultsBox.removeChild(resultsBox.lastChild)
    resultsBox.removeChild(resultsBox.lastChild)
    resultsBox.removeChild(resultsBox.lastChild)
    resultsBox.removeChild(resultsBox.lastChild)
    resultsBox.removeChild(resultsBox.lastChild)
    resultsBox.removeChild(resultsBox.lastChild)
    resultsBox.removeChild(resultsBox.lastChild)
    resultsBox.removeChild(resultsBox.lastChild)
    resultsBox.removeChild(resultsBox.lastChild)
    resultsBox.removeChild(resultsBox.lastChild)
    resultsBox.removeChild(resultsBox.lastChild)
    resultsBox.removeChild(resultsBox.lastChild)
    resultsBox.removeChild(resultsBox.lastChild)
    resultsBox.removeChild(resultsBox.lastChild)
    resultsBox.removeChild(resultsBox.lastChild)
    resultsBox.removeChild(resultsBox.lastChild)
    resultsBox.removeChild(resultsBox.lastChild)

    let totalPointsEarned = 0
    let totalPoints = 0

    for (let i=0;i<gradeEarnedList.length;i++) {
        totalPoints = parseFloat(totalPoints) + parseFloat(gradeTotalList[i].value)
        totalPointsEarned = parseFloat(totalPointsEarned) + parseFloat(gradeEarnedList[i].value)
    }

    let currentGrade = (totalPointsEarned/totalPoints).toFixed(4)
    
    let alteredGradeList = []

    for (let i=0; i<num_grades; i++) {
        let totalPointsAltered = parseFloat(totalPoints) - parseFloat(gradeTotalList[i].value)
        let totalPointsEarnedAltered = parseFloat(totalPointsEarned) - parseFloat(gradeEarnedList[i].value)

        let alteredGrade = (totalPointsEarnedAltered/totalPointsAltered).toFixed(4)
        alteredGradeList.push(parseFloat(alteredGrade))
    }

    // Get the maximum grade by finding the maximum value in the altered grade list
    let maxAlteredGrade = Math.max.apply(null, alteredGradeList)
    // Get the index of the max to find the final altered grade
    let maxGradeIndex = alteredGradeList.indexOf(maxAlteredGrade)
    let finalAlteredGrade = alteredGradeList[maxGradeIndex]

    // This section adds paragraph elements to the results box

    // If the maximum altered grade is above a 105% it's probably madeline
    if (maxAlteredGrade >= 1.05 && maxAlteredGrade <= 1.10) {
        window.location.href = "otherpages/transcendence.html"
    } 
    
    const resultsP = document.createElement("p")
    const resultsText = document.createTextNode(`Remove Grade #${maxGradeIndex+1}: ${gradeEarnedList[maxGradeIndex].value}/${gradeTotalList[maxGradeIndex].value}`)
    resultsP.appendChild(resultsText)
    resultsBox.appendChild(resultsP)

    resultsBox.appendChild(document.createElement("br"))

    const gradeWithoutRemovalP = document.createElement("p")
    const gradeWithoutRemovalText = document.createTextNode(`Grade without removal: ${(currentGrade * 100).toFixed(2)}%`)
    gradeWithoutRemovalP.appendChild(gradeWithoutRemovalText)
    resultsBox.appendChild(gradeWithoutRemovalP)

    const gradeWithRemovalP = document.createElement("p")
    const gradeWithRemovalText = document.createTextNode(`Grade with removal: ${(maxAlteredGrade * 100).toFixed(2)}%`)
    gradeWithRemovalP.appendChild(gradeWithRemovalText)
    resultsBox.appendChild(gradeWithRemovalP)

    resultsBox.appendChild(document.createElement("br"))

    // Minimum grade calculations
    const gradeCalculationTitleP = document.createElement("p")
    const gradeCalculationTitleText = document.createTextNode("Assuming the exam is 20% of the semester grade and the lowest grade has been removed, the student needs a")
    gradeCalculationTitleP.appendChild(gradeCalculationTitleText)
    resultsBox.appendChild(gradeCalculationTitleP)

    let goalGrades = []
    let seniorGoalGrades = []

    let goals = [.98, .93, .90, .87, .83, .80, .77, .73, .70, .65]
    let seniorGoals = [.975, .925, .895, .865, .825, .795, .765, .725, .695, .645]

    for (let i=0; i<goals.length;i++) {
        let gradeNeeded = (goals[i] - (.8 * (finalAlteredGrade))) * 5
        goalGrades.push(gradeNeeded)

        let seniorGradeNeeded = (seniorGoals[i] - (.8 * (finalAlteredGrade))) * 5
        seniorGoalGrades.push(seniorGradeNeeded)
    }

    let letterGrades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D"]

    for (let i=0;i<letterGrades.length;i++) {
        const gradeP = document.createElement("p")
        const gradePText = document.createTextNode(`${(goalGrades[i]*100).toFixed(2)}% (Senior round: ${(seniorGoalGrades[i]*100).toFixed(2)}%) for a ${letterGrades[i]}`)
        gradeP.appendChild(gradePText)
        resultsBox.appendChild(gradeP)
    }


    resultsBox.style.display = 'block'
})