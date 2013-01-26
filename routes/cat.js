var mongoose = require("mongoose");

mongoose.connect(process.env.MONGOLAB_URI || 'localhost');

var catschema = mongoose.Schema({
        'age': Number,
        'colors': [],
        'name': String
});

var Cat = mongoose.model('Cat', catschema);

alcats = {}

exports.list = function(req, res){
  Cat.find(
            {},
            null,
            {sort: {age: 1}},
            function(err, docs) {
            if (!err){ 
               console.log(docs);
               res.render('allcats', { title: 'Express', allcats: docs });
              }
            else { throw err;}

            }
  );
};


exports.sort = function(req, res){
  var clr = req.params.color;
  Cat.find(
            {'colors': new RegExp('^'+clr+'$', "i")},
            null,
            {sort: {age: 1}},
            function(err, docs) {
             if (!err){ 
               console.log(docs);
               res.render('sorted', { title: 'Express', cats: docs, color: clr});
              }
              else { throw err;}

            }
  );

};




exports.del = function(req, res){
	Cat.find(
            {},
            null,
            {sort: {age: 1}},
            function(err, docs) {
             if (!err){ 
               console.log(docs);
               docs[docs.length-1].remove();
              }
              else { throw err;}

            }
  );
  res.redirect('/cats');
};






exports.new = function(req, res){
	res.render('newcat', { title: 'Express' });
};
exports.newcat = function(req, res){
  console.log(req.body);
  var data = req.body;
  
  var nucat = new Cat({name: data.name, age: data.age, colors: data.colors.split(" ")});
  nucat.save(function (err) {
    console.log('saving');
    if (err) return console.log("error", err);
  });
  res.redirect('/cats');
};
