import { useEffect, useState } from "react"
import "./Block.css"
import FieldObject from "../../constants/fieldObject"

export default function Block({ field, box, y, x, isBlock, directions }) {
    const { OBJECT } = FieldObject()
    let num = 0
    let item
    let count = 0

    for (let i = 0; i < directions.length; i++) {
        //フィールド外に出ていないかの判定
        if (y + (directions[i].y) >= 0 && x + (directions[i].x) >= 0 &&
            y + (directions[i].y) < field.length && x + (directions[i].x) < field.length) {
            //8方向の爆弾の数を確認
            if (field[y + (directions[i].y)][x + (directions[i].x)] == OBJECT.bomb) {
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

    return (
        <>
            {isBlock ? <div className="block">{item}</div> : <div className="cover" id={item}></div>}
        </>
    )
}