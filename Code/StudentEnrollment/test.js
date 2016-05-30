function updateStudentAlStream(Student,event,params){
if(Student.civilState==true){
Student.lastName=Student.lastName + "Maths";
Providers.getPersistenceProvider().save(Student);
}
}