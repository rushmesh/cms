const express = require('express');
const bodyParser = require('body-parser');

//const multer = require('multer');  //  multer are using to upload the images
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
const mysql = require('mysql2');


var con = mysql.createConnection({
  host: 'localhost',
  port:3306,
  user: 'root',
  password:'rushmesh',
  database: 'cms'
  });
/*
const storage = multer.diskStorage({
  destination:(req,file,callBack) =>{
    callBack(null,'neeraj_${file.originalname}')
  }
})*/
//var upload = multer({storage:storage})
var result={};
result.status=0;
result.content="";

con.connect(function(err)
{
 if(err)
 { 

    throw err;
 }
 else
 {
  app.post("/studentlogin" , function(req,res){

    var userid = req.body.studentid; 
    var password = req.body.password ; 
    console.log(userid);
    console.log(password);
    con.query("SELECT * FROM Student where studentId = ? && password = ? ",[userid , password], (err, res1) => {
        if (err)
         {
         
         
             res1.stid=0;
             res.send( res1[0]);
         
        }
        else
         {   
            if(res1[0]!=undefined)
            {
              res.send(res1[0]);
              console.log(res1[0])
          
            }
              else{
              console.log("else");
                 res1.userid = 0 ;
               res.send(res1);
                 
              }
              
        };
        
      });

});

app.post("/stafflogin" , function(req,res){
  console.log("hello staff");
 var id = req.body.facultyid; 
 var password = req.body.password ; 
 con.query("SELECT * FROM Faculity where FacultyID = ? && password = ? ",[id , password], (err, res1) => {
     if (err)
      {
      
          console.log("hello");
          res1.id=0;
          res.send( res1[0]);
      
     }
     else
      {   
         if(res1[0]!=undefined)
         {
           res.send(res1[0]);
           console.log("if")
           console.log(res1[0])
         }
           else{
           console.log("else");
            res.send(res1);
              
           }
           
     };
     
   });

});

app.post("/adminLogin" , function(req,res){

  var userid = req.body.userid; 
  var password = req.body.password ; 
  console.log(userid);
  console.log(password);
  con.query("SELECT * FROM admin where userid = ? && password = ? ",[userid , password], (err, res1) => {
      if (err)
       {
           res.send( res1[0]);
      }
      else
       {   
          if(res1[0]!=undefined)
          {
            res.send(res1[0]);
        
          }
            else{
            console.log("else");
               res1.userid = 0 ;
             res.send(res1);
               
            }
            
      };
      
    });

});

app.post("/updateStudent",function(req,res)
{
    console.log("reach")
  var studentId = req.body.studentid; 
  var password = req.body.password;
  var StudentName = req.body.studentname ; 
  var FatherName = req.body.fathername;
  var MotherName = req.body.mothername;
  var Address = req.body.address;
  var Email = req.body.email;
  var Phone = req.body.phoneno;
  var Branch = req.body.branch;
  var year = req.body.year;
  var dob = req.body.dob;
  var pic=req.body.pic;
  console.log(studentId,password,StudentName,FatherName,MotherName,Address,Email,pic);
    con.query('update student set StudentName = ?,FatherName =?,MotherName=?,Address =?,Email=?,PhoneNo=?,Branch=?,Year=?,DateOfBirth=? where StudentID= ? ', 
    [StudentName,FatherName,MotherName,Address,Email,Phone,Branch,year,dob,studentId],(err, res1) => {
        if (err)
         {
            res.send(err);
        }
        else {
              res.send(res1);
        };
        
      });

});



 app.post("/resetStudentPassword",function(req,res)
 {
     console.log("reach")
   var studentId = req.body.studentid; 
   var password = req.body.password;
  
  
     con.query('update student set password=? where StudentID= ? ', 
     [password,studentId],(err, res1) => {
         if (err)
          {
            console.log("errrrr")
             res.send(err);
         }
         else {
          console.log(password)
               res.send(res1);
         };
         
       });  
 
 });
   app.post("/stdmark",function(req,res)
    {
       
    
        var id =req.body.studentid;
        console.log(id)
        con.query('SELECT * FROM attendmark where studentId = ? ', [id],(err, res1) => {
            if (err)
             {
                res.send(err);
            }
            else {
                  res.send(res1);
                  console.log("hello4545355")
                  console.log(res1)
            };
            
          });
	
    });


    app.post("/updateFaculity",function(req,res)
    {
        console.log("reach")
      var FacultyID = req.body.facultyid; 
      var password = req.body.password;
      var FacultyName = req.body.facultyname ; 
      var Doj = req.body.doj;
      var Address = req.body.address;
      var Email = req.body.email;
      var Phone = req.body.phoneno;
      var Department = req.body.department;
     console.log(FacultyID);
        con.query('update faculity set FacultyName = ?,Doj =?,Address =?,Email=?,PhoneNo=?,Department=? where FacultyID= ? ', 
        [FacultyName,Doj,Address,Email,Phone,Department,FacultyID],(err, res1) => {
            if (err)
             { console.log("reach")
                res.send(err);
            }
            else { 
                  res.send(res1);
            };
            
          });
    
    });

    app.post("/marksUpdate",function(req,res)
    {    
   
        var id =req.body.studentid;
        var subject=req.body.subjectname;
        var mark = req.body.mark;
        var attendence = req.body.attendence;
        console.log(id,mark,subject,attendence)
        con.query('update attendmark set mark=?,attendence=? where StudentId= ?&& subjectName=? ', [mark,attendence,id,subject],(err, res1) => {
            if (err)
             {
                res.send(err); console.log("yeah"); console.log("yeah")
            }
            else {
                  res.send(res1);
                  console.log("yeah")
            };
            
          });
	
    });

    app.post("/timetable",function(req,res)
    {    
      var course =req.body.course;
      var year=req.body.year;
      var semester = req.body.semester;
       console.log(course,year,semester)
        con.query('select * from timetable where course=? AND year=? And semester=?',[course,year,semester], (err, res1) => {
            if (err)
             {
                res.send(err); console.log("Error in timetable query"); 
            }
            else {
                  res.send(res1);
                  console.log("work timetable query")
                  console.log(res1)
            };
            
          });
	
    });


    app.post("/resetFaculityPassword",function(req,res)
    {
        console.log("reach")
      var FacultyID = req.body.facultyid; 
      var password = req.body.password;
     
     
        con.query('update faculity set password=? where FacultyID= ? ', 
        [password,FacultyID],(err, res1) => {
            if (err)
             {
               console.log("errrrr")
                res.send(err);
            }
            else {
             console.log(password)
                  res.send(res1);
            };
            
          });  
    
    });

    app.post("/attendencestudent",function(req,res)
    {
       
    
        var id =req.body.studentid;
        console.log(id)
        con.query('SELECT * FROM attendmark where studentId = ? ', [id],(err, res1) => {
            if (err)
             {
                res.send(err);
            }
            else {
                  res.send(res1);
                  console.log("hello")
            };
            
          });
	
    });

    app.post("/allCourse",function(req,res)
    {
        con.query('SELECT * FROM course',(err, res1) => {
            if (err)
             {
                res.send(err);
                console.log("hello");
            }
            else {
                  res.send(res1);
                  console.log("hello4565637");
            };
            
          });
	
    });
    app.post("/addCourse",function(req,res)
    {
      console.log("Work fine addcourse")
      var coursename=req.body.coursename;
      var semester=req.body.semester;
      var year=req.body.year;
      console.log(coursename,semester,year)
        con.query('insert into course values(?,?,?)',[coursename,semester,year],(err, res1) => {
            if (err)
             {
                res.send(err);
                console.log("hello");
            }
            else {
                  res.send(res1);
                  console.log("hello4565637");
            };
            
          });
	
    });

    app.post("/allstudent",function(req,res)
    {
      console.log("all student")
     
        con.query('select * from student',(err, res1) => {
            if (err)
             {
                res.send(err);
                console.log("hello");
            }
            else {
                  res.send(res1);
                  console.log(res1);
            };
            
          });
	
    });
 
    app.post("/newstudent",function(req,res)
    {console.log("fdhbtgrh")
   var studentId = req.body.studentid; 
  var password = req.body.password;
  var StudentName = req.body.studentname ; 
  var FatherName = req.body.fathername;
  var MotherName = req.body.mothername;
  var Address = req.body.address;
  var Email = req.body.email;
  var Phone = req.body.phoneno;
  var Branch = req.body.branch;
  var year = req.body.year;
  var dob = req.body.dob;
  var pic = req.body.pic;
  //const pic1=req.pic;
 //console.log(file.filename);
// res.send(pic1);
        con.query('insert into student values(?,?,?,?,?,?,?,?,?,?,?,?)',[studentId,password,StudentName,FatherName,MotherName,Address,Phone,Email,Branch,year,dob,pic],(err, res1) => {
            if (err)
             {
                res.send(err);
            }
            else {
                  res.send(res1);
                  console.log("hello4565637");
            };
            
          });
	
    });


    

    app.post("/deletestudent",function(req,res)
    { 
      console.log("delete")
        var id =req.body.studentid;
        console.log(id)
        con.query('delete from student where studentId = ? ', [id],(err, res1) => {
            if (err)
             {
                res.send(err);
            }
            else {
                  res.send(res1);
                  console.log("hello")
            };
            
          });
	
    });
    
    app.post("/allFaculity",function(req,res)
    {
      
     
        con.query('select * from faculity',(err, res1) => {
            if (err)
             {
                res.send(err);
                console.log("hello");
            }
            else {
                  res.send(res1);
             
            };
            
          });
	
    });

    app.post("/deletestaff",function(req,res)
    { 
      console.log("delete")
        var id =req.body.facultyid;
        console.log(id)
        con.query('delete from Faculity where FacultyID = ? ', [id],(err, res1) => {
            if (err)
             {
                res.send(err);
            }
            else {
                  res.send(res1);
                  console.log("hello")
            };
            
          });
	
    });
  
    app.post("/newFaculity",function(req,res)
    {console.log("fdhbtgrh")
   var FacultyID = req.body.facultyid; 
  var password = req.body.password;
  var FaculityName = req.body.facultyname ; 
  var Address = req.body.address;
  var Email = req.body.email;
  var Phone = req.body.phoneno;
  var Department = req.body.department;
  var doj = req.body.doj;
 // console.log(studentId,StudentName)
        con.query('insert into faculity values(?,?,?,?,?,?,?,?)',[FacultyID,password,FaculityName,doj,Address,Phone,Email,Department],(err, res1) => {
            if (err)
             {
                res.send(err);
                console.log("hello");
            }
            else {
                  res.send(res1);
                  console.log("hello4565637");
            };
            
          });
	
    });


    


  




     app.listen(9000, function () {
    console.log("server listening at port 90...");
    });

}
});