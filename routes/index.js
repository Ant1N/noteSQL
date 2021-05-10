var express = require('express');
var router = express.Router();
var SqlString = require('sqlstring');

/* GET home page. */

router.get('/', function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let sql = 'SELECT id, noteName FROM notesContent';

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }
      res.render('index', { title: 'Express', notes: result });
    });
  });
});

router.put('/', function (req, res, next) {
  let sql = `UPDATE notesContent SET noteName='${req.body.header}', noteText='${req.body.content}' WHERE id=${req.body.id}`;
  req.app.locals.con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log('sucess:', result);
  });
});

router.post('/', function (req, res, next) {
  let sql = `INSERT INTO notesContent (noteName, noteText) VALUES ("${req.body.header}","${req.body.content}")`;
  req.app.locals.con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log('sucess:', result);
  });
  // let sql2 = 'SELECT id, noteName FROM notesContent';

  // req.app.locals.con.query(sql2, function (err, result) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.render({ notes: result });
  // });
});

router.get('/notes', function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let sql = 'SELECT id, noteName FROM notesContent';

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }

      res.send({ result });
    });
  });
});

router.get('/notes/:id', function (req, res, next) {
  req.app.locals.con.connect(function (err) {
    if (err) {
      console.log(err);
    }

    let sql =
      'SELECT noteText, noteName FROM notesContent WHERE id= ' +
      SqlString.escape(req.params.id);

    req.app.locals.con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
      }

      console.log(result);
      textContent = result[0].noteText.toString('utf8');

      res.send({
        textContent: textContent,
        id: req.params.id,
        noteName: result[0].noteName,
      });
    });
  });
});
module.exports = router;
