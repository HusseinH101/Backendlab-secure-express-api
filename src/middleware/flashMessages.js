function flashMessages(req, res, next) {
    // Copy the message from the session to the view
    res.locals.flashMessage = req.session.flashMessage || null

    // Clear the flash message so it only shows once
    req.session.flashMessage = null

    next()
}

export default flashMessages