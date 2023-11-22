module.exports = [
    {
        id: 1,
        title: "Pick up Prescription",
        description: "Pick up prescription at CVS pharmacy. Prescription in the name of Manuel Martinez.",
        status: "In Progress",
        priorityLevel: "High",
        users_id: 3,
        deadline: new Date("2023-12-03T12:00:00-05:00"),
    },
    {
        id: 2,
        title: "Made a Doctor appointment",
        description: "Set-up appointment with Dr. Maxwell. the appointment is for eyes check up.",
        status: "Pending",
        priorityLevel: "Low",
        users_id: "3",
        deadline: new Date("2024-01-15T09:00:00-05:00"),
    },
    {
        id: 3,
        title: "Pay electric bill",
        description: "Pay electric bill for the month of december in FPL.",
        status: "Pending",
        priorityLevel: "Medium",
        users_id: "3",
        deadline: new Date("2023-12-26T09:00:00-05:00"),
    }
]