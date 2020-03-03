import React, { useState, useEffect } from "react"
import './App.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, } from 'recharts'

const Chart = (props) => {

    const [data, setData] = useState([])
    const [finalData, setFinalData] = useState([])

    useEffect(() => {
        setData(props.data)
    },[props.data])

    useEffect(() => {
        getData()
    },[data])

    const getData = () => {
        let nextIndex = 0
        let sum = 0
        let rolling = []
        let preStandard = []

        for(let i = 20; i < data.length; i++) {
            for (let j = nextIndex; j < i; j++) {
                sum += data[j].last
            }
            nextIndex++

            let mean = sum / 20
            rolling.push(mean)
            sum = 0

            preStandard.push(Math.pow(data[i].last - mean, 2))
        }

        nextIndex = 0
        sum = 0
        let standardDevs = []
        
        for(let i = 20; i < data.length; i++) {
            for (let j = nextIndex; j < i; j++) {
                if (j <= preStandard.length - 1) {
                    sum += preStandard[j]
                }
            }
            nextIndex++
            let mean = sum / 20
            let currStandardDev = Math.sqrt(mean)
            standardDevs.push(currStandardDev)
            sum = 0
        }

        nextIndex = 0
        sum = 0
        let upper = []
        let lower = []
        
        for (let i = 0; i < standardDevs.length; i++) {
            let upperBand = rolling[i] + (standardDevs[i] * 2)
            let lowerBand = rolling[i] - (standardDevs[i] * 2)
            upper.push(upperBand)
            lower.push(lowerBand)
        }

        let finalData = []
        for (let i = 20; i < data.length; i++) {
            finalData.push({
                "date": data[i].date,
                "last": data[i].last,
                "rolling": rolling[i - 20],
                "upper": upper[i -20],
                "lower": lower[i -20]
            })
        }        
        setFinalData(finalData)
    }

    return(
        <div>
            <div className="chart">{props.title}</div>
            <LineChart
            width={800}
            height={500}
            data={finalData}
            margin={{
                top: 50, right: 50, left: 200, bottom: 50,
            }}
            >
                <XAxis dataKey="date" tick={{fontSize: 10}} />
                <YAxis tick={{fontSize: 10}} />
                <Tooltip />
                <Legend />
                <Line tick={{fontSize: 5}} dot={false} type="monotone" dataKey="last" stroke="#32CD32" activeDot={{ r: 3 }} />
                <Line tick={{fontSize: 5}} dot={false} type="monotone" dataKey="rolling" stroke="#BEBEBE" activeDot={{ r: 3 }}/>
                <Line tick={{fontSize: 5}} dot={false} type="monotone" dataKey="upper" stroke="#BEBEBE" activeDot={{ r: 3 }}/>
                <Line tick={{fontSize: 5}} dot={false} type="monotone" dataKey="lower" stroke="#BEBEBE" activeDot={{ r: 3 }}/>
            </LineChart>
        </div>
    )
}

export default Chart
