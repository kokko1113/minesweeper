import "./FieldScene.css"
import useField from "../../hooks/useField"
import Block from "../Block/Block"
import { useEffect, useState } from "react"

export default function Field({ setIsGameover }) {
    const { field } = useField()

    return (
        <>
            <div className="field">{
                field.map((row, y) => {
                    return <div className="row">{
                        row.map((box, x) => {
                            return <div className="box">
                                <Block setIsGameover={setIsGameover} box={box} field={field} y={y} x={x}></Block>
                            </div>
                        })
                    }</div>
                })
            }</div>
        </>
    )
}