const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-Parser")
const moment = require('moment')
const Pagamento = require("./models/Pagamento")

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    helpers: {
    formatDate: (date) => {
        return moment(date).format('DD/MM/YYYY')
    }
    }
}))

app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//rotas

app.get('/pagamento', function(req, res){
    Pagamento.findAll({order: [['id', 'DESC']]}).then(function(pagamentos){
        res.render('layouts/pagamento', {pagamentos: pagamentos});
})
});

app.get('/cad-pagamento', function(req, res){
    res.render('layouts/cad-pagamento');
});

//adicionando registros
app.post('/add-pagamento', function(req, res){
    Pagamento.create({
        nome: req.body.nome,
        valor: req.body.valor
    }).then(function(){
        res.redirect('/pagamento')
        //res.send("pagamento cadastrado com sucesso!")
    }).catch(function(erro){
        res.send("ERRO: pagamento nao foi cadastrado com sucesso " + erro)
    })
    
    
    //res.send("Nome: " + req.body.nome + "<br>Valor: " + req.body.valor + "<br>")

})
//apagando registros
app.get('/del-pagamento/:id', function(req, res){
    Pagamento.destroy({
        where: {'id' : req.params.id}
    }).then(function(){
       res.redirect('/pagamento')
       //res.send("pagamento apagado com sucesso");
    }).catch(function(erro){
        res.send( "PAGAMENTO NaO APAGADO COM SUCESSO!" + erro);
    })
});



app.listen(8080);