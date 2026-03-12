// Returns information about a date and whether it is Friday
function getFridayInfo(inputDate) {
    // Use provided date from query string, otherwise use current date
    const date = inputDate ? new Date(inputDate) : new Date()

    // Array of weekday names
    const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    // Get the weekday name
    const dayName = weekdays[date.getDay()]

    // Check if the day is Friday
    const isFriday = dayName === "Friday"

    return {
        date: date.toISOString().split("T")[0],
        dayName,
        isFriday
    }
}

export default getFridayInfo