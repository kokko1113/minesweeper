import { useEffect, useState } from "react"
import "./Block.css"
import FieldObject from "../../constants/fieldObject"

export default function Block({ field, box, setIsGameover, y, x }) {
    const [isBlock, setIsBlock] = useState(false)//ブロックが空いてるかどうか
    const { OBJECT } = FieldObject()

    let num = 0
    let item
    let count = 0
    let openX = 0
    let openY = 0
    const countDirection = [
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: -1, y: 1 },
        { x: -1, y: 1 },
    ]
    const openDirection = [
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
    ]

    for (let i = 0; i < countDirection.length; i++) {
        //フィールド外に出ていないかの判定
        if (y + (countDirection[i].y) >= 0 && x + (countDirection[i].x) >= 0 &&
            y + (countDirection[i].y) < field.length && x + (countDirection[i].x) < field.length) {
            //8方向の爆弾の数を確認
            if (field[y + (countDirection[i].y)][x + (countDirection[i].x)] == OBJECT.bomb) {
                count++
            }
        }
    }
    num = (count > 0 ? count : "")

    if (box == OBJECT.num) {
        item = num
    } else if (box == OBJECT.bomb) {
        item = "💣"
    }

    const openBlock = () => {
        openX = x
        openY = y
        for (let i = 0; i < openDirection.length; i++) {
            if (y + (openDirection[i].y) >= 0 && x + (openDirection[i].x) >= 0 &&
                y + (openDirection[i].y) < field.length && x + (openDirection[i].x) < field.length) {
                if (num == 0) {//空けたのが、周りに爆弾がないブロックだったら隣接する同じブロックも空ける

                }
            }
        }
    }

    //空けたブロックに何があるか判定
    const checkBlock = () => {
        if (isBlock) {
            if (box == OBJECT.num) {

            } else if (box == OBJECT.bomb) {
                setTimeout(() => {
                    setIsGameover(true)
                }, 1000);
            }
        }
    }

    useEffect(() => {
        checkBlock()
    }, [isBlock])

    return (
        <>
            {!isBlock ?
                <div className="block" onClick={() => setIsBlock(true)}></div>
                : item
            }

        </>
    )
}