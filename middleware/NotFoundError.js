
const notfound = (req, res) => {
    res.status(404).json({msg: 'No Routes Found for this API!!!'})
}

module.exports = notfound