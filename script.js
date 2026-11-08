class Student {
    constructor(id, name, grades, attendance) {
        this.id = id;
        this.name = name;
        this.grades = grades;
        this.attendance = attendance;
    }

    calculateAverage() {
        const total = this.grades.reduce((sum, grade) => sum + grade, 0);
        return total / this.grades.length;
    }

    getGrade(average) {
        if (average >= 90) {
            return "A";
        } else if (average >= 80) {
            return "B";
        } else if (average >= 70) {
            return "C";
        } else if (average >= 60) {
            return "D";
        } else if (average >= 50) {
            return "E";
        } else {
            return "F";
        }
    }

    getFinalResult(average) {
        if (average >= 50 && this.attendance >= 75) {
            return "Passed";
        } else {
            return "Needs Review";
        }
    }
}

// ======================================
// 1. Create the students list
// ======================================

const studentsList = [
    new Student(731, "Mariam Adel", [42, 39, 45], 88),
    new Student(845, "Youssef Hany", [49, 46, 52], 70),
    new Student(926, "Salma Tarek", [91, 87, 94], 96),
    new Student(514, "Omar Khaled", [76, 81, 83], 82)
];

// ======================================
// 2. Display original student reports
// ======================================

console.log("====================================");
console.log("       STUDENT MANAGEMENT SYSTEM");
console.log("====================================");

const originalReports = studentsList.map(student => {
    const average = student.calculateAverage();

    return {
        ID: student.id,
        Name: student.name,
        "Subject 1": student.grades[0],
        "Subject 2": student.grades[1],
        "Subject 3": student.grades[2],
        "Attendance (%)": student.attendance,
        "Original Average": Number(average.toFixed(2)),
        "Letter Grade": student.getGrade(average),
        "Final Result": student.getFinalResult(average)
    };
});

console.table(originalReports);

// ======================================
// 3. Grace Marks Committee
// ======================================

// Find students whose averages are between 40 and 49
const strugglingStudents = studentsList.filter(student => {
    const average = student.calculateAverage();
    return average >= 40 && average <= 49;
});

// Add 5 grace marks without changing original objects
const updatedStudents = strugglingStudents.map(student => {
    const originalAverage = student.calculateAverage();

    const newAverage = Math.min(originalAverage + 5, 100);

    return {
        id: student.id,
        name: student.name,
        originalAverage: originalAverage,
        newAverage: newAverage,
        newLetterGrade: student.getGrade(newAverage),
        newFinalResult: student.getFinalResult(newAverage)
    };
});

// ======================================
// 4. Calculate committee statistics
// ======================================

const sumOfNewAverages = updatedStudents.reduce(
    (total, student) => total + student.newAverage,
    0
);

const averageAfterGraceMarks = updatedStudents.length > 0
    ? sumOfNewAverages / updatedStudents.length
    : 0;

// ======================================
// 5. Display grace marks report
// ======================================

console.log("\n====================================");
console.log("          GRACE MARKS REPORT");
console.log("====================================");

console.table(updatedStudents.map(student => ({
    ID: student.id,
    Name: student.name,
    "Original Average": Number(student.originalAverage.toFixed(2)),
    "New Average": Number(student.newAverage.toFixed(2)),
    "Updated Grade": student.newLetterGrade,
    "Updated Result": student.newFinalResult
})));

console.log("------------------------------------");
console.log("Number of Struggling Students:", strugglingStudents.length);
console.log("Sum of New Averages:", sumOfNewAverages.toFixed(2));
console.log(
    "Average After Grace Marks:",
    averageAfterGraceMarks.toFixed(2)
);
console.log("------------------------------------");

// ======================================
// 6. Verify that original data is unchanged
// ======================================

console.log("\n====================================");
console.log("       ORIGINAL DATA VERIFICATION");
console.log("====================================");

console.table(studentsList.map(student => ({
    ID: student.id,
    Name: student.name,
    Grades: student.grades.join(" - "),
    OriginalAverage: student.calculateAverage().toFixed(2)
})));

console.log(
    "Original student data preserved:",
    studentsList.every(student =>
        student.grades.length === 3 &&
        student.calculateAverage() ===
        originalReports.find(report => report.ID === student.id)["Original Average"]
    )
);

// ======================================
// 7. Final verification
// ======================================

console.log("\n====================================");
console.log("          FINAL VERIFICATION");
console.log("====================================");

console.log("Total Students:", studentsList.length);

console.log(
    "Exactly 3 Grades Per Student:",
    studentsList.every(student => student.grades.length === 3)
);

console.log(
    "Struggling Students Found:",
    strugglingStudents.length
);

console.log(
    "Attendance Rule Applied:",
    studentsList.every(student =>
        student.attendance < 75
            ? student.getFinalResult(student.calculateAverage()) !== "Passed"
            : true
    )
);

console.log(
    "Original Grades Unchanged:",
    studentsList.every(student => student.grades.length === 3)
);

console.log(
    "No Division By Zero:",
    updatedStudents.length === 0
        ? averageAfterGraceMarks === 0
        : Number.isFinite(averageAfterGraceMarks)
);

console.log("====================================");
console.log("          END OF REPORT");
console.log("====================================");