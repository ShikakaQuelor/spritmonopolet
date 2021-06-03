import React from 'react'
import SearchInput from '../components/SearchInput'

const About = () => {
    return (
        <div className="wrapper">
            <SearchInput big={false} />
            <div className="about-wrapper">
                <p><b>Varför?</b></p>
                <li>
                    <p>Sidan är skapad i syfte att lära mig React då jag sedan tidigare endast programmerat i Vue och vanilla Javascript</p>
                </li>
                <p><b>Hur?</b></p>
                <li>
                    <p>Idé tagen från min goda vän <a href="https://.herrborgstrom.se" >Joakim Borgström</a></p>
                </li> <li>
                    <p>För att lära dig hur den fungerar hänvisar jag till Borgströms ursprungliga version skriven i Vue på <a href="https://skatt.herrborgstrom.se/about">Alkoholskatt</a></p>
                </li>
                <li>
                    <p>Jag har skrivit all kod själv bortsett från uträkningarna av alkoholskatt</p>
                </li>
            </div>
        </div>
    )
}

export default About;