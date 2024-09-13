import "./FieldScene.css";
import useField from "../../hooks/useField";
import Block from "../Block/Block";
import { useEffect, useRef, useState } from "react";
import FieldObject from "../../constants/fieldObject";

export default function Field({ setResultMessage }) {
    const { OBJECT } = FieldObject();
    const { field } = useField();
    const fieldRef = useRef(null);
    const [boxElements, setBoxElements] = useState([])
    const [fieldBoolean, setFieldBoolean] = useState([[]])
    const directions = [
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: -1, y: 1 },
        { x: -1, y: 1 },
    ];
    const rowLength = 9
    const columnLength = 9

    const checkBlock = (y, x) => {//ブロックの中身を判別
        if (field[y][x] === OBJECT.num) {
            tansaku(y, x)
        }
        if (field[y][x] === OBJECT.bomb) {
            openBlock(y, x)
            setTimeout(() => {
                setResultMessage(prev => prev = "GameOver")
            }, 1000);
        }
    };

    const tansaku = (y, x) => {//周りに爆弾がないか
        openBlock(y, x)
        const arr = []
        for (let i = 0; i < directions.length; i++) {
            const newY = y + directions[i].y
            const newX = x + directions[i].x
            if (newY >= 0 && newX >= 0 && newY < rowLength && newX < columnLength) {
                arr.push(field[newY][newX])
            }
        }
        if (arr.every(a => a == 0)) {
            openSearch(y, x)
        }
    }

    const openSearch = (y, x) => {//周りに爆弾ゼロ個のブロックだったら周りのも開く
        const newBoolean = [...fieldBoolean];
        for (let i = 0; i < directions.length; i++) {
            const Y1 = y + directions[i].y
            const X1 = x + directions[i].x
            if (Y1 >= 0 && X1 >= 0 && Y1 < rowLength && X1 < columnLength) {
                if (boxElements[Y1][X1].children[0].id == "") {
                    if (!newBoolean[Y1][X1]) {
                        newBoolean[Y1][X1] = true; // このセルを訪問済みにする
                        openSearch(Y1, X1);
                    } // 既に訪問済みなら処理を終了
                } else {
                    openBlock(Y1, X1)
                }
            }
        }
    };

    const openBlock = (y, x) => {//ブロックを開ける
        setFieldBoolean(prevBoolean => {
            const newBoolean = structuredClone(prevBoolean)
            newBoolean[y][x] = true
            return newBoolean
        })
    }

    useEffect(() => {
        if (field[0]) {
            if (fieldRef.current) {
                const rows = fieldRef.current.querySelectorAll(".row");
                const newBoxElements = Array.from(rows).map(row => {
                    const boxes = row.querySelectorAll(".box");
                    return Array.from(boxes);
                });
                setBoxElements([...newBoxElements])
            }
            setFieldBoolean(prevBoolean => {
                let newBoolean = structuredClone(prevBoolean)
                newBoolean = Array.from({ length: rowLength }, () => Array.from({ length: columnLength }, () => false));
                return newBoolean
            })
        }

    }, [field]);

    useEffect(() => {
        let count = 0
        if (field.length === rowLength && field.every(row => row.length === columnLength)) {
            if (fieldBoolean.length === rowLength && fieldBoolean.every(row => row.length === columnLength)) {
                for (let y = 0; y < rowLength; y++) {
                    for (let x = 0; x < columnLength; x++) {
                        if (field[y][x] == 0 && fieldBoolean[y][x]) {
                            count++
                        }
                    }
                }
            }
        }
        if (count == 71) {
            setTimeout(() => {
                setResultMessage(prev => prev = "GameClear")
            }, 1000);
        }
    }, [fieldBoolean, setResultMessage]);

    return (
        <>
            <div className="all">
                <div className="field" ref={fieldRef}>
                    {field.map((row, y) => (
                        <div className="row" key={y}>
                            {row.map((box, x) => (
                                <div className="box" key={x} onClick={() => checkBlock(y, x)}>
                                    <Block box={box} field={field} y={y} x={x} isBlock={fieldBoolean[y][x]} directions={directions}></Block>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
