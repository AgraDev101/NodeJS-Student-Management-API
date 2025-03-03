export let checkRole = (roles) => {
    return function (req, res, next) {
        let userRole = req.user.role
        let hasRole = roles.some(role => role == userRole)
        if (hasRole) {
            next()
        } else {
            res.json({message: "Access denied"})
        }
    }
}