let _id = 1;
let isNewData = true;   // boolean letiable to specify if data entered is new or edited
let studentsArray = []; // to store students details
let rowToEdit = null //  to track what row we are editing "if any row is getting updated"

// handles onsubmit of form
function onFormSubmit() {
    event.preventDefault()  // prevents refreshing

    let data = getFormData(isNewData) // get data entered

    // if it is not an edit add data in students array
    if (isNewData) {
        insertNewData(data);
        studentsArray.push(data)
        console.log(studentsArray)
        _id = generateId() // generates new id for each student which helps to distinguish between students
    }

    else {

        // obtain row to edit
        let rowNum = rowToEdit.cells[0].innerHTML

        let index = studentsArray.findIndex((student) => student["rowNumber"] == rowNum)
        console.log(index)
        studentsArray[index] = data;

        rowToEdit.cells[1].innerHTML = data.name
        rowToEdit.cells[2].innerHTML = data.city
        rowToEdit.cells[3].innerHTML = data.fees
        rowToEdit = null;
        isNewData = true;
    }
    document.getElementsByClassName('input-area-form')[0].reset(); // reset form after submitting

    updateStats() // call updateStats to update statistics
    let table = document.getElementById('student-list').getElementsByTagName('tbody')[0];
    // console.log(table.length)
}

// get data filled in the form
function getFormData(isNewData) {
    let studentData = {}
    if (isNewData) {
        studentData["_id"] = _id;
        let table = document.getElementById('student-list');
        studentData["rowNumber"] = table.rows.length;
    }
    else {
        studentData["rowNumber"] = parseInt(rowToEdit.cells[0].innerHTML, 10)
    }
    // studentData["rowNumber"] = parseInt(rowToEdit.cells[0].innerHTML, 10)
    studentData["name"] = document.getElementById("name").value;
    studentData["city"] = document.getElementById("city").value;
    studentData["fees"] = document.getElementById("fees").value;
    // console.log(studentData)
    return studentData;
}

// insert new data
function insertNewData(data) {
    let table = document.getElementById('student-list').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length)

    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = data["rowNumber"];

    let cell2 = newRow.insertCell(1)
    cell2.innerHTML = data.name

    let cell3 = newRow.insertCell(2)
    cell3.innerHTML = data.city

    let cell4 = newRow.insertCell(3)
    cell4.innerHTML = data.fees

    let cell5 = newRow.insertCell(4)
    cell5.innerHTML = '<a href = "#" onclick="editData(this)">Edit</a> <a href = "#" onclick="onDelete(this)">Delete</a>'
}

// edit data
function editData(td) {
    let rowSelected = td.parentElement.parentElement;
    document.getElementById('name').value = rowSelected.cells[1].innerHTML;
    document.getElementById('city').value = rowSelected.cells[2].innerHTML;
    document.getElementById('fees').value = rowSelected.cells[3].innerHTML;
    rowToEdit = rowSelected;
    isNewData = false
}

// delete row from html
function onDelete(td) {
    let rowSelected = td.parentElement.parentElement;
    if (confirm("Do You Really Want to delete this ?")) {
        let toDelete = parseInt(rowSelected.cells[0].innerHTML)
        deleteFromArray(toDelete)
        document.getElementById('student-list').deleteRow(rowSelected.rowIndex);
        updateStats()
    }
}
// delete from array
const deleteFromArray = (rowNum) => {
    console.log("row number", rowNum)
    let newStudentsArray = studentsArray.filter((student) => student["rowNumber"] != rowNum)
    newStudentsArray.forEach((student) => {
        if (student["rowNumber"] > rowNum) {
            student["rowNumber"] -= 1;
        }
    })
    studentsArray = newStudentsArray
    console.log(studentsArray)
}

// total fees function
const totalFees = () => {
    const totalFeesCalculated = studentsArray.reduce((accumulator, currentElement) => accumulator + parseInt(currentElement.fees), 0)
    // console.log(totalFeesCalculated)
    return totalFeesCalculated;
}

// total students
const totalStudents = () => studentsArray.length

// students name starts with R
const nameStartsWithR = () => {
    const rArray = studentsArray.filter((student) => student.name.at(0) === 'R')
    return rArray.length
}

// city name of fourth student
const cityNameOf4 = () => {
    let fourth_student = studentsArray.filter((student) => student["rowNumber"] === 4)
    console.log("student with 4", fourth_student)
    if (fourth_student.length === 0)
        return ""
    else
        return fourth_student[0].city
}

// total fees of third and fifth student
const totalFeesOfThirdAndFifth = () => {
    const newArr = studentsArray.filter((student) => student._id == 3 || student._id == 5)
    let totalNow = 0
    // console.log(newArr, "3rd and 5th array")
    totalNow = newArr.reduce((accumulator, currentElement) => accumulator + parseInt(currentElement.fees), 0)
    return totalNow
}

// calculates number of students for fees between 2000 and 3900
const between2and3Thousand = () => {
    const ourStudents = studentsArray.filter((student) => parseInt(student.fees) >= 2000 && parseInt(student.fees) <= 3900)
    // console.log(ourStudents, "between two and three thousand")
    return ourStudents.length;
}

// calculates number of students for fees less than 1000
const lessthan_Thousand = () => {
    const ourStudents = studentsArray.filter((student) => parseInt(student.fees) < 1000)
    // console.log(ourStudents)
    return ourStudents.length;
}

// calculates students whoose name starts with 'S' and city starts with 'Ch' 
const nameSCityCh = () => {
    const ourStudents = studentsArray.filter((student) => (student.name.at(0) === 'S' || student.name.at(0) === 's') && (student.city.substring(0, 2) === 'Ch' || student.city.substring(0, 2) === 'ch'))
    return ourStudents.length
}

//  calculates students whoose name starts with 'J' and city starts with 'H' 
const nameJCityH = () => {
    const ourStudents = studentsArray.filter((student) => student.name.at(0) === 'J' || student.name.at(0) === 'j' || student.city.at(0) === 'H' || student.city.at(0) === 'h')
    return ourStudents.length
}

// calculates minimum and maximum 
const minAndMax = () => {

    if (studentsArray.length === 0) {
        return {
            min: 0,
            max: 0
        }
    }

    let min = parseInt(studentsArray[0].fees)
    let max = parseInt(studentsArray[0].fees)
    studentsArray.forEach((student) => {
        if (parseInt(student.fees) < min) {
            min = parseInt(student.fees)
        }

        if (parseInt(student.fees) > max) {
            max = parseInt(student.fees)
        }
    })
    // console.log(min, max, "min and max in that order")

    return {
        min,
        max
    }
}

// generates ID for every new student
function generateId() {
    let max = 0;
    for (let i = 0; i < studentsArray.length; i++) {
        if (studentsArray[i]._id > max)
            max = studentsArray[i]._id
    }

    return max + 1;
}

function updateRowNumbers() {
    for (let i = 0; i < studentsArray.length; i++) {
        let cell0 = document.getElementById('student-list').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].cells[0];
        console.log(cell0.innerHTML, " Inside update row numbers")
        cell0.innerHTML = studentsArray[i].rowNumber
    }

}

// function to update all the fields
function updateStats() {
    // set total fees 
    let totalFeeLabel = document.getElementById('total-fees');
    totalFeeLabel.innerHTML = totalFees();

    // set total students
    let totalStudentsLabel = document.getElementById('total-students');
    totalStudentsLabel.innerHTML = totalStudents();

    // set total with R
    let totalStudentsR = document.getElementById('total-students-r');
    totalStudentsR.innerHTML = nameStartsWithR();

    // set 2000 and 3900
    let twoAndThreeThousand = document.getElementById('two-and-three-thousand')
    twoAndThreeThousand.innerHTML = between2and3Thousand()

    // less than 1000
    let lessThanThousand = document.getElementById('less-than-thousand')
    lessThanThousand.innerHTML = lessthan_Thousand()

    // name with S and city with Ch
    let nameScityCh = document.getElementById('S-and-Ch')
    nameScityCh.innerHTML = nameSCityCh()

    // name with J and city with H
    let nameJcityH = document.getElementById('J-and-H')
    nameJcityH.innerHTML = nameJCityH()

    // set min and max
    let minMax = document.getElementById('min-max')
    let minAndMaxObj = minAndMax()
    minMax.innerHTML = `Min is ${minAndMaxObj["min"]} and max is ${minAndMaxObj["max"]}`

    // set third and fifth total fees
    let thirdFifthFees = document.getElementById('third-fifth-student')
    thirdFifthFees.innerHTML = totalFeesOfThirdAndFifth()

    updateRowNumbers()

    // set city name of fourth student
    let cityName = document.getElementById('fourth-student')
    cityName.innerHTML = cityNameOf4()

}

