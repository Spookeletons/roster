const {Student, Course} = require('../models')

//view all
module.exports.viewAll = async function(req,res){
    const students = await Student.findAll();
    res.render('student/view_all', {students});
}

//profile


//render add


//add


//render edit


//edit


//delete