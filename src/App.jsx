import { useState , useCallback ,useEffect, useRef} from 'react'

import './App.css'

function App() {
  
  let [length ,setLength] = useState(8)
  let [numbersAllowed ,setNumbersAllowed] = useState(false)
  let [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState("")

  // Ref Hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback (()=>{

    let pass = "";    
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(charAllowed){
      string += `!"#$%&'()*+,-./:;<=>?@[\]^_{|}~`;
    }
    if(numbersAllowed){
      string += "0123456789";
    }

    for(let i=0; i<length; i++){
      let indexInString = Math.round(Math.random() * string.length + 1);

      //Append the character  at that position in the string to our password.
      pass += string.charAt(indexInString);
    }
    // Set the Password 
    setPassword(pass);

  } , [length, numbersAllowed, charAllowed])


  const generatePassword = ()=>{
    passwordGenerator();
  }

  useEffect(()=>{
    passwordGenerator();
  } , [length , numbersAllowed, charAllowed])

  // Copy Function
  const copyPasswordToClipboard = useCallback(()=>{
    // NOTE : ? only means that select the value if it is not null like you'll call the select if only passwordref is holding a value
    passwordRef.current?.select(); // Select the Password  
    // passwordRef.current?.setSelectionRange(0,31)
    
    // Copy Password to Clipboard
    window.navigator.clipboard.writeText(password) 
  } , [password])

  return (
  <>
  {/* <h1 className='font-serif text-2xl text-blue-300 text-center m-10 hover:underline cursor-pointer tracking-wider'>Click  Generate Button to generate the Password</h1> */}

    {/* Main DIV */}
    <div className="flex flex-col items-center justify-center h-screen bg-white">
  <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-8 py-6 my-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
    {/* Heading */}
    <h1 className="text-center text-3xl font-bold mb-4 tracking-wide">Password Generator</h1>

    {/* Password Field */}
    <div className="flex items-center gap-4">
      <input
        type="text"
        placeholder="Password"
        className="flex-1 py-2 px-4 bg-gray-100 text-gray-800 rounded-md focus:outline-none"
        value={password}
        readOnly
        ref={passwordRef}
      />

      {/* Copy Button */}
      <button
        onClick={copyPasswordToClipboard}
        className="bg-blue-500 hover:bg-black text-white px-4 py-2 rounded-3xl focus:outline-none"
      >
        Copy
      </button>

      {/* Generate Button */}
      <button
        onClick={generatePassword}
        className="bg-blue-500 hover:bg-black text-white px-4 py-2 rounded-3xl focus:outline-none"
      >
        Generate
      </button>
    </div>

    {/* Password Options */}
    <div className="flex items-center justify-between mt-4">
      {/* Range */}
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={6}
          max={30}
          value={length}
          className="cursor-pointer"
          onChange={(e) => setLength(e.target.value)}
        />
        <label className="text-gray-200">Length: {length}</label>
      </div>

      {/* Checkboxes */}
      <div className="flex items-center gap-4">
        <label className="flex items-center text-gray-200 cursor-pointer">
          <input
            type="checkbox"
            checked={numbersAllowed}
            onChange={() => setNumbersAllowed((prev) => !prev)}
            className="form-checkbox focus:ring-blue-500 h-4 w-4 text-blue-600"
          />
          <span className="ml-2">Numbers</span>
        </label>

        <label className="flex items-center text-gray-200 cursor-pointer">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            className="form-checkbox focus:ring-blue-500 h-4 w-4 text-blue-600"
          />
          <span className="ml-2">Characters</span>
        </label>
      </div>
    </div>
  </div>
</div>


    </>
  )
}

export default App;