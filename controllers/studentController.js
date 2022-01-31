const {Student, Course} = require('../models')
const grade_levels = [9,10,11,12].sort();

//view all
module.exports.viewAll = async function(req,res){
    const students = await Student.findAll();
    res.render('student/view_all', {students});
}

//profile
module.exports.viewProfile = async function(req,res){
    const student = await Student.findByPk(req.params.id, {
        include: 'courses'
    });
    res.render('student/profile', {student})
}

//render add form
module.exports.renderAddForm = function(req,res){
    const student = {
        first_name:'',
        last_name:'',
        grade_level:[0]
    }
    res.render('student/add', {student, grade_levels});
}

//add
module.exports.addStudent = async function(req,res){
    const student = await Student.create({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        grade_level:req.body.grade_level
    });
    res.redirect(`/students/profile/${student.id}`);
}

//render edit form
module.exports.renderEditForm = async function(req,res){
    const student = await Student.findByPk(req.params.id);
    res.render('student/edit', {student, grade_levels});
}

//update
module.exports.updateStudent = async function(req, res){
    const student = await Student.update({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        grade_level:req.body.grade_level
    }, {
        where: {
            id:req.params.id
        }
    });
    res.redirect(`/students/profile/${req.params.id}`);
}

//delete
module.exports.deleteStudent = async function(req,res){
    await Student.destroy({
        where: {
            id:req.params.id
        }
    });
    res.redirect('/students');
}