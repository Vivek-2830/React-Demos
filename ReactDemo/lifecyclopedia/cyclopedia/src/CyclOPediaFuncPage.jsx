import React, { useEffect, useRef, useId ,useState } from "react";
import { getRandomUser } from "./Utility/api";
import Instructor from "./Instructor";
 
const CyclOPediaFuncPage =()=> {
    const [state, setState] = useState(() => {
        return {
        instructor: undefined,
        studentList: [],
        studentCount: 0,
        hideInstructor: false, 
    };
    });     
    // const [totalRender, setTotalRender] = useState(0);
    const totalRender = useRef(0);
    const prevStudentCount = useRef(0);     
    const FeedbackInputRef = useRef(null);
    const id = useId();

    const [inputName, setInputName] = useState(()=> {
        return  "";
    });
    const [inputFeedback, setInputFeedback] = useState(()=> {
        return  "";
    });

    useEffect(() => {
        //setTotalRender((prevState) => prevState + 1);
        totalRender.current = totalRender.current +1;
        console.log("rendor"+ totalRender.current);
    });

 
    useEffect(() =>{
        const getUser = async () => {
            const response = await getRandomUser();
        
       setState((prevState)=> {
            return {
                ...prevState,
               studentList: [
                {
                    name : response.data.first_name + " " + response.data.last_name,
                },
               ],
            };
        });
        };
        if (prevStudentCount.current < state.studentCount) {
            getUser(); 
        } else if (prevStudentCount.current > state.studentCount) {
            setState((prevState) => {
                return { ...prevState, studentList: []};
            });
        }
    }, [state.studentCount]); 
    
    
    useEffect(() => {
        //setTotalRender((prevState) => prevState + 1);
        console.log("Prev Count" + prevStudentCount.current);
        console.log("Current Count" + state.studentCount);
        prevStudentCount.current = state.studentCount;
        console.log("Prev Count" + prevStudentCount.current);
        console.log("Current Count" + state.studentCount);
    },[state.studentCount]);

    useEffect(() =>{
        const getUser = async () => {
            const response = await getRandomUser();
        
       setState((prevState)=> {
            return {
                ...prevState,
                instructor: {
                    name: response.data.first_name + " " + response.data.last_name,
                    email: response.data.email,
                    phone: response.data.phone_number,
                },
            };
        });
        };
        if (state.hideInstructor) {
            getUser();
        }
    }, [state.hideInstructor]);    


    useEffect(() => {
        console.log("This will be called on whenever value of hideInstructor changes");
    }, [inputFeedback, inputName]);

    useEffect(() => {
        FeedbackInputRef.current.focus();
        //console.log("This will be called on Initial/first Render/Mount");
        return() => {
           // console.log("This will be called on when component will be UNMOUNTED");
        }
    }, []);

    const handleAddStudent = () => {
        setState((prevState) => {
            return {
                ...prevState, 
                studentCount: prevState.studentCount + 1,
            };
        });
    };

    const handleRemoveAllStudent = () => {
        setState((prevState) => {
            return {
                ...prevState,
                studentCount: 0,
            };
        });
    };

    const handletoggleInstructor = () => {
       setState((prevState) => {
            return {
                ...prevState,   
                hideInstructor: prevState.hideInstructor,
            };
        });
    };

        return (
        <div>
            <div className="p-3">   
            <span className="h4 text-success">Instructor &nbsp;</span>
            <i className={`bi ${state.hideInstructor ? " bi-toggle-off" : " bi-toggle-on"} btn btn-success btn-sm`}
            onClick={handletoggleInstructor}></i>
            {!state.instructor && state.instructor ? (    
                <Instructor instructor={state.instructor} />
            ): null}
            </div>
            <div className="p-3">Total Render : {totalRender.current}</div>
          <div className="p-3"> 
            <span className="h4 text-success">Feedback</span>
            <br />
            <input type="text" 
                value={inputName} 
                    placeholder="Name.."
                    onChange={(e) => {
                        setInputName(e.target.value );
                    }}    
                    id = {`${id}-inputName`}
                ></input>{" "}
                <label htmlFor={`${id}-inputName`}> Name Value : </label>{inputName}
            <br />
            <textarea 
                value={inputFeedback} 
                ref={FeedbackInputRef}
                id = {`${id}-inputFeedback`}
                onChange={(e) => {
                    setInputFeedback(e.target.value );
            }}  
                placeholder="Feedback..."
            ></textarea>
            <label htmlFor={`${id}-inputFeedback`}> Feedback Value : </label> {" "} {inputFeedback}
          </div>  
          <div className="p-3">
            <span className="h4 text-success">Students</span> <br />
            <div>Student Count:{state.studentCount}</div>
            <button className="btn btn-success btn-sm" onClick={handleAddStudent}>Add Student</button>
            <button className="btn btn-danger btn-sm" onClick={handleRemoveAllStudent}>Remove All Student</button>
            {state.studentList.map((student,index)=>{
                return(
                    <div className="text-white" key={index}>- {student.name}</div>
                )
            })}
          </div>
        </div>
      )
    }


export default CyclOPediaFuncPage; 