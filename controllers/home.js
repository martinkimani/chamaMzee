/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
exports.index = function(req, res) {
  res.locals.ip = req.ip;
  res.render('home');
};