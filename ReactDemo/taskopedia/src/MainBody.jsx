import Student from './Components/Student/Student';
import StudentReview from "./Components/Student/StudentReview";
import React from 'react';

class MainBody extends React.Component {
  render() {
    const whatWewillLearn = "React JS";
    const lectureCount= 3
    return (
    <div style={{ minHeight: "70vh" }}>
      <p>In this Course, we will learn {whatWewillLearn} building  TaskOpedia!
         <br />
        Total Lecture - {lectureCount}
      </p>
      <ul>
          <li>Basic Foundation</li>
          <li>Functional and Class Components</li>
      </ul>
     { /*<div>
        Enter Task : { " " }
        <input maxLength={5} readOnly={false} placeholder='Vivek'></input>
      </div>*/ }
        <div className="container row">Students Enrolled</div>
        <Student experience={2} name="Vivek Gohil" >
            <StudentReview />
        </Student>

        <Student experience={5} name="Krish Wally" >
            <StudentReview />
        </Student>
        
        <Student experience={7} name="Kunal Shah" >
            <StudentReview />  
        </Student>
    </div>
    );
  }
}

export default MainBody;