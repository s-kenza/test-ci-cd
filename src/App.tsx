import { useState } from 'react'
import './App.css'

function App() {
  const [calc, setCalc] = useState("")

  const handleClick = (value: string) => {
    setCalc(calc + value)
  }

  const calculate = () => {
    if (!calc) return; // Si l'expression est vide, on ne fait rien.
    try {
      const result = eval(calc);
      setCalc(String(result));
    } catch (error) {
      console.error(error);

      setCalc("Erreur");
    }
  };

  const clearCalc = () => {
    setCalc("")
  }

  const deleteLast = () => {
    setCalc(calc.slice(0, -1))
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">Une simple calculette !</h1>
      </header>

      {/* Contenu principal */}
      <main className="flex-grow p-4">


        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="mb-4">
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 text-right"
                value={calc}
                readOnly
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => handleClick("7")} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">7</button>
              <button onClick={() => handleClick("8")} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">8</button>
              <button onClick={() => handleClick("9")} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">9</button>
              <button onClick={() => handleClick("/")} className="bg-orange-400 hover:bg-orange-500 p-4 rounded">/</button>

              <button onClick={() => handleClick("4")} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">4</button>
              <button onClick={() => handleClick("5")} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">5</button>
              <button onClick={() => handleClick("6")} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">6</button>
              <button onClick={() => handleClick("*")} className="bg-orange-400 hover:bg-orange-500 p-4 rounded">*</button>

              <button onClick={() => handleClick("1")} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">1</button>
              <button onClick={() => handleClick("2")} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">2</button>
              <button onClick={() => handleClick("3")} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">3</button>
              <button onClick={() => handleClick("-")} className="bg-orange-400 hover:bg-orange-500 p-4 rounded">-</button>

              <button onClick={() => handleClick("0")} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">0</button>
              <button onClick={() => handleClick(".")} className="bg-gray-200 hover:bg-gray-300 p-4 rounded">.</button>
              <button onClick={calculate} className="bg-green-400 hover:bg-green-500 p-4 rounded">=</button>
              <button onClick={() => handleClick("+")} className="bg-orange-400 hover:bg-orange-500 p-4 rounded">+</button>

              <button onClick={clearCalc} className="col-span-2 bg-red-400 hover:bg-red-500 p-4 rounded">C</button>
              <button onClick={deleteLast} className="col-span-2 bg-yellow-400 hover:bg-yellow-500 p-4 rounded">DEL</button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-800 p-4 text-center">
        © 2025 Une simple calculette. Tous droits réservés.
      </footer>
    </div>
  )
}

export default App
