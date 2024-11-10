// Array to store subject entries, each with subject name, grade, and credit hours
let subjects = [];

// Function to add or edit a subject entry
function addSubject() {
    // Retrieve and clean up subject name input from the form
    const subject = document.getElementById("subject").value.trim();
    
    // Retrieve the grade as a floating-point number from the dropdown
    const grade = parseFloat(document.getElementById("grade").value);
    
    // Retrieve the credit as an integer from the form input
    const credit = parseInt(document.getElementById("credit").value);

    // Validate input: Ensure subject name isn't empty and credit is a valid number greater than 0
    if (subject === "" || isNaN(credit) || credit < 1) {
        document.getElementById("inputError").innerText = "Please enter valid subject, grade, and credit.";
        return; // Exit the function if validation fails
    }
    // Clear any existing error messages if input is valid
    document.getElementById("inputError").innerText = "";

    // Check if subject already exists in the subjects array
    const existingSubjectIndex = subjects.findIndex(s => s.subject === subject);

    // If the subject exists, update its grade and credit; otherwise, add a new entry
    if (existingSubjectIndex !== -1) {
        subjects[existingSubjectIndex] = { subject, grade, credit };
    } else {
        subjects.push({ subject, grade, credit });
    }

    // Update the table display to reflect the latest entries
    updateSubjectTable();

    // Clear the form inputs for new entries
    clearFormInputs();
}

// Function to update the table with subjects, grades, and credits
function updateSubjectTable() {
    // Find the tbody where the subject list will be displayed
    const subjectList = document.getElementById("subjectList");

    // Clear existing rows in the table to avoid duplicates
    subjectList.innerHTML = "";

    // Loop over each subject entry in the subjects array
    subjects.forEach((item, index) => {
        // Create a new table row for each subject
        const row = document.createElement("tr");

        // Set row content with subject details and a delete button
        row.innerHTML = `
            <td>${item.subject}</td>
            <td>${item.grade}</td>
            <td>${item.credit}</td>
            <td><button onclick="deleteSubject(${index})">Delete</button></td>
        `;
        // Append the row to the subject list in the table
        subjectList.appendChild(row);
    });
}

// Function to delete a subject entry by its index in the array
function deleteSubject(index) {
    // Remove the subject entry at the specified index
    subjects.splice(index, 1);

    // Refresh the table display after deletion
    updateSubjectTable();
}

// Function to calculate and display CGPA based on entered subjects
function calculateCGPA() {
    let totalQualityPoints = 0; // Variable to store total grade points for all subjects
    let totalCredits = 0;       // Variable to store total credits for all subjects

    // Loop over each subject to calculate total quality points and credits
    subjects.forEach(item => {
        totalQualityPoints += item.grade * item.credit; // Grade points for the subject
        totalCredits += item.credit;                    // Total credit hours
    });

    // Calculate CGPA by dividing total quality points by total credits
    const cgpa = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : 0.00;

    // Display the calculated CGPA in the designated HTML element
    document.getElementById("cgpa").innerText = cgpa;
}

// Function to reset the form, clearing both subjects list and CGPA display
function resetForm() {
    subjects = []; // Clear the subjects array

    // Refresh the table to remove displayed subjects
    updateSubjectTable();

    // Reset displayed CGPA to default
    document.getElementById("cgpa").innerText = "0.00";

    // Clear the form input fields
    clearFormInputs();
}

// Function to clear inputs in the form, preparing it for new entries
function clearFormInputs() {
    document.getElementById("subject").value = "";   // Clear subject input
    document.getElementById("grade").value = "4.00"; // Reset grade to default "4.00" (A grade)
    document.getElementById("credit").value = "";    // Clear credit input
}
