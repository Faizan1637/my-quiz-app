import questions from './data.json'
import React, {useEffect,useState} from 'react'
let control = 1;


 

function App() {
  let [left,setLeft]=useState(0);
  let [correct,setCorrect]=useState(0);
  let [incorrect,setIncorrect]=useState(0);
  let [score,setScore]=useState(0);
  let [obj, setMcq] = useState([{}]);
  let [clickedObjects, setObj] = useState([]);
  let initializeTimer= 15;
  let [count,setCount]=useState(initializeTimer);

  const handleAppPlay=()=>{
     setLeft(0)
     setCorrect(0)
     setIncorrect(0)
     setScore(0);
     setMcq([{}]);
     setObj([]);
     initializeTimer = 15;
     setCount(initializeTimer);
     control=1;
  }
  
useEffect(()=>{
const interval =setInterval(() => {
    if(!count==0){
    setCount(count-1)
    }else{
         handleMcqStates() ;
         setCount(initializeTimer)
    }
  }, 1000)
  return ()=>clearInterval(interval)
})

const getClass = (id, opt, cOption, array) => {
    for (let n in array) {
      if (array[n].Id == id) {
        if (opt === cOption)
          return "btn btn-success"
        else
          return "btn btn-danger"
      }
    }
}

function handlerClickedObj(id, opt, cOption) {
    let obj = { Id: id, selectedOption: opt, correct: cOption }
    setObj([...clickedObjects, obj])
     if(opt==cOption){
      setCorrect(correct+1);
      setScore(score+5);
      setCount(0);
     }
     else{
       setIncorrect(incorrect + 1);
       setScore(score-2);
       setCount(0);
     }
}

  function handleMcqStates() {
    setMcq(questions.filter((obj) => {
      if (obj.id == control) {
        return obj;
      }
    }
    ));
    if(control!=(correct+incorrect+left)){
       if(left<questions.length)
      setLeft(left+1)
    }
    ++control;
}

function HandleOptions(q) {
    return (
      <React.Fragment key={q.id}>
        <h1 className={`${count<=5?"red":""}`}>Timer:{count}</h1>
        <h6 className="card-text">{q.statement}</h6>
        <div className="row gy-2">
          {q.options.map((val,index)=>{
            return <div className="col-5" key={index}><button  className={`${getClass(q.id, val, q.correctoption, clickedObjects)} btn1`} onClick={() => handlerClickedObj(q.id,val, q.correctoption)}>{val}</button></div>
          }
          )}
        </div>
      </React.Fragment>
    )
  }
  return (
    <>
    {questions.length>control ?(
    <>
      <div className="container-md">
        <div className="row  note">"Note" Each incorrect 2 points minus, 5 points awarded for Wrong and 0 point when leave Mcqs</div>
        <div className="row  head">Entry Test Preparation</div>
        <div className="row">
          <div className="col cor">Correct:{correct}</div>
          <div className="col uncor">Incorrect:{incorrect}</div>
          <div className="col uncor">Skipped:{left}</div>
          <div className="col score">Score:{score}</div>
        </div>
      </div>
      <div className="container">
        <div className="card"> 
          <h5 className="card-title">GK  Quiz</h5>
          <div className="card-body">
    
            {questions.map(obj => {
              if (control == obj.id)
                return HandleOptions(obj)
            })}
            <button type="button" className="btn btn-secondary my-1" onClick={() => {handleMcqStates()
            setCount(initializeTimer)
            }}>SKIP</button>
          </div>
        </div>
      </div>
      </>
    ):(
      <>
          <h2 className='center green'>QUIZ is Completed</h2>
          <h3 className={`${(score /(questions.length * 4) * 100)>= 50?"green center":"red center"}`}>
             Your aggregate =
            { `${score/(questions.length*4)*100}`}%</h3>
          
            <div className="text-center">
          <button className="btn btn-dark center" onClick={()=>handleAppPlay()}>TRY AGAIN</button>
          </div>
      </>
    )}
    </>  
    )
}
export default App;
