
module.exports = (err, req, res, next) => {
  // console.log(err)
  if (err) {
    res.status(200).json({
      "messages": [
        { "text": "Có lỗi xảy ra" },
      ]
    }
    )
  }
}