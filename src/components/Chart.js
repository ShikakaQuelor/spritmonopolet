import React from 'react'
import Rainbow from 'rainbowvis.js'

export const Chart = ({ percent }) => {
    const rainbow = new Rainbow()
    rainbow.setSpectrum("green", "yellow", "red")

    const formatPercentage = Math.round(percent * 100)

    return (
        <svg viewBox="0 0 36 36" className="alko-chart" key={formatPercentage}>
            <path className="alko-circle-bg"
                d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path className="alko-circle"
                strokeDasharray={formatPercentage + ", 100"}
                style={{ stroke: rainbow.colorAt(formatPercentage) }}
                d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="alko-percentage">{formatPercentage}%</text>
        </svg>
    )
}
