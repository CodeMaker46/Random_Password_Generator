import { useState,useCallback, useEffect ,useRef} from 'react'
// useRef hook ko insert kar diya 
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length, setlen] = useState(8)
  const [numallow , setnum] = useState(false)
  const [charsallow,setchar] = useState(false)
  const[password, setpass] = useState("")

  //  useRef hook

  const passwordRef = useRef(null)

  const passwordgenerate = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numallow) str+="0123456789"
    if(charsallow) str+="!@#$%^&*(){}[]~`"

    for(let i=1; i<=length; i++)
    {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char) // ye jo char aya hai usae
      // use kar lo in pass append karna     
    }

    setpass(pass)

  }, [length,numallow,charsallow,setpass]) 
  // setpass hi kam kar rha hai memoization ka 
  // optimization ka hai ye 

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select() 
    passwordRef.current?.setSelectionRange(0,length)
    window.navigator.clipboard.writeText(password)
  },[password])

  // NOTE : you can use the keyword "window" in react but not in the 
  // nodejs as wha pe sara kam server pe hota hai

  useEffect(()=>{passwordgenerate()},[length, numallow,charsallow,passwordgenerate]) // parameters same as useCallback
  // use effect : agar inme se koi bhi change hua then run the 
  // function passwordgenerate
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className='text-white text-center'>Password Generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className='outline-none w-full py-1 px-3' 
        placeholder='Password'
        readOnly 
        ref={passwordRef}/>

        <button 
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white
        px-3 py-0.5 shrink-0'>
          copy          
        </button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer' 
          onChange={(e)=>{setlen(e.target.value)}}/>
          <label >Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={numallow}
          id="numberInput" 
          onChange={()=>{setnum((prev)=>!prev)}}/>
          <label >Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={charsallow}
          id="charInput" 
          onChange={()=>{setchar((prev)=>!prev)}}/>
          <label >Characters</label>
        </div>

      </div>

      </div>      
    </>
  )
}

export default App
