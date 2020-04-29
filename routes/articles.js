let express = require('express');
let router = express.Router();

//Bring in articles model
let Article = require('../models/article');

//Show all articles
router.get('/articles', (req,res) => {
    Article.find({})
    .lean()
    .then(articles => {
      res.render('articles', {articles: articles, title:'My Articles', header:'Articles'});
    })
})

// Show one article using its id
router.get('/article/:id', (req,res) => {
  var id = req.params.id;
   Article.findById(id)
   .then(article => {
     res.render('article', {
      article:article
     })
   })
   .catch(err => {
    console.log(err);
   })
})

// router.get('/article/:id', (req,res) => {
//   var id = req.query.id;
//     Article.find({"_id.$oid":id})
//     .lean()
//     .then(articles => {
//       res.render('articles', {article: article});
//     })
// })

// router.get('/article/:id', function(req, res) {
//    var id = req.query.id;
//    // MongoClient.connect(dburl, function(err, db) {
//    //  if(err) {  throw err;  }
//     Article.find({"_id": new mongodb.ObjectID(id)}).toArray(function(err, article){
//       if(err) throw err;
//       res.render('article', {article: article});
//       // db.close();
//     });
//   // });
// });
// router.get('/article/:id', (req, res) => {
//   Article.find({"_id.$oid": req.params.id}, (err, article) => {
//     if (err) {
//       // handleError(res, err.message, "Failed to get clients.");
//       console.log(err);
//     } else {
//       // console.log(article);
//       res.render('article', {article: article})
//     }
//   });
// })

// router.get('/article/:id', (req, res) => {
//   Article.findOne({_id: req.params.id})
//   .lean()
//   .then(article => {
//       res.render('article', {article:article});
//     })
// })


//Add Articles
router.get('/articles/add', (req,res) => {
  res.render('addArticle', {
    title: 'Add Articles'
  })
})

//Submit POST Route
router.post('/articles/add', (req,res) => {
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save((err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  })
})

module.exports = router;
