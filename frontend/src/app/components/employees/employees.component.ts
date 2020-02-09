import { Component, OnInit } from '@angular/core';
//importar el servicio
import { EmployeeService } from '../../services/employee.service';
import { ProviderAst } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

//declaracion de variable Toast(Materialize)
declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form: NgForm){
  //console.log(form.value);

  if(form.value._id){
    this.employeeService.putEmployee(form.value)
     .subscribe(res =>{
       //console.log(res);
       this.resetForm(form);
       M.toast({html: 'Updated succesfuly'});
       //para volver a ejecutar y mostrar nuevo employee agregado
       this.getEmployees();
     })
  }else{
    this.employeeService.postEmployee(form.value)
     .subscribe(res=>{
       this.resetForm(form);
       M.toast({html: 'Save succesfuly'});
       //para volver a ejecutar y mostrar nuevo employee agregado
       this.getEmployees();
     })
  }
  
  }

  getEmployees(){
    this.employeeService.getEmployees()
     .subscribe(res =>{
       //la respuesta es un arreglo de empleados
       this.employeeService.employees = res as Employee[];
       console.log(res);
     })
  }

  resetForm(form?: NgForm){
    if (form){
      form.reset();
      this.employeeService.selectedEmployee=new Employee();
    }
  }

  editEmployee(employee: Employee){
    //obtener el empleado seleccionado desde la interfaz(icono)
    this.employeeService.selectedEmployee= employee;
  }

  deleteEmployee(_id: string){
    if(confirm('Are you sure you want to delete it?')){
      this.employeeService.deleteEmployee(_id)
     .subscribe(res =>{
       //console.log(res);
       this.getEmployees();
       M.toast({html:'Deleted Successfully!'});
     });
    }
    
  }

}
