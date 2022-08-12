import { useState, useEffect } from 'react'
import React from 'react'


export default function Soldier ({color}) {
    return (
        <div style={{backgroundColor: color, height: 40, width: 40}}></div>
    )
}