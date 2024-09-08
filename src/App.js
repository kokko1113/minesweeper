import { useState } from "react"
import "./App.css"
import Field from "./components/FieldScene/FieldScene"
import ResultScene from "./components/ResultScene/ResultScene"

export default function App() {
  const [isGameover, setIsGameover] = useState(false)

  return (
    <>
      {!isGameover ? <Field setIsGameover={setIsGameover}></Field> : <ResultScene></ResultScene>}
    </>
  )
}