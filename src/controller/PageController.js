import getFridayInfo from "../utils/friday.js"

class PageController {
    // Show landing page
    index(req, res) {
        res.render("index")
    }

    // Show friday page
    friday(req, res) {
        // Read optional date from query string
        const inputDate = req.query.date

        // Get info about the date
        const fridayInfo = getFridayInfo(inputDate)

        // Render date view and send data to it
        res.render("todaysDate", fridayInfo)
    }
}

export default new PageController()