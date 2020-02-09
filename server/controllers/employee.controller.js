const Employee = require('../models/employee');

const employeeCtrl = {};

employeeCtrl.getEmployees= async (req, res)=>{
    //res.send('Hello World');
    /*
    res.json({
        status: 'Employees goes here'
    });
    */
    const employees = await Employee.find()
    res.json(employees);

};

employeeCtrl.createEmployee= async (req,res) => {
    const employee = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    //console.log(employee);
    await employee.save();
    res.json({
        'status': 'Employee Saved!'
    });
    
};

employeeCtrl.getEmployee= async (req, res)=>{
    //params trae todos los parametros de la url
    //console.log(req.params.id);
    //encuentra empleado por id
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
    
};

employeeCtrl.editEmployee= async (req,res) => {
    const { id } = req.params;
    const employee ={
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary

    }
    await Employee.findByIdAndUpdate(id, {$set: employee}, {new: true});
    res.json({
        status: 'Employee Update'
    });
}

employeeCtrl.deleteEmployee= async (req,res) => {
    await Employee.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Employee Deleted!'
    });
};



module.exports = employeeCtrl;