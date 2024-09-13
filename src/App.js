import { useEffect, useState } from "react"
import "./App.css"
import Field from "./components/FieldScene/FieldScene"
import ResultScene from "./components/ResultScene/ResultScene"

export default function App() {
  const [isGameover, setIsGameover] = useState(false)
  const [resultMessage, setResultMessage] = useState("")

  useEffect(() => {
    if(resultMessage != ""){
      setIsGameover(true)
    }
  }, [resultMessage])

  return (
    <>
      {!isGameover ? <Field setResultMessage={setResultMessage}></Field> : <ResultScene message={resultMessage}></ResultScene>}
    </>
  )
}