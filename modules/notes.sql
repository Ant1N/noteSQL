var getNotes = (req) => {
  let sql = 'SELECT id, noteName FROM notesContent';

  req.app.locals.con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    return result;
  });
};

module.exports = router;