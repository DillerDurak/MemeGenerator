import React from "react";
import "../css/index.css";
import html2canvas from "html2canvas";

export default function Form() {

    const [meme, setMeme] = React.useState({
        topText: "Text",
        bottomText: "Text",
        fontText: 32,
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([])


    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js";
        document.body.appendChild(script);
    }, [])

    function getRandomMeme() {
            const randomNum = Math.floor(Math.random() * allMemes.length);
            const url = allMemes[randomNum].url
            setMeme(prevMeme => ({
                ...prevMeme,
                randomImage: url
            }))
    }


    function handleChange(event) {
        const {name, value} = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    function handleDownload(e) {
        e.preventDefault();
        let answer = window.confirm("Confirm download");
        if (answer) {
            let promise = new Promise((resolve, reject) => {
                const output = document.querySelector("#output");
                output.innerHTML = "";
                const meme = document.querySelector(".meme");
                html2canvas(meme, {allowTaint: true, useCORS: true}).then(
                    function(canvas) {
                        canvas.id = "canvas";
                        output.appendChild(canvas);
                        resolve("result");
                    }
                )

            }).then(
                    result => {
                        let canvas = document.getElementById("canvas");
                        let link = document.createElement("a");
                        link.download = "download.png";
                        link.href = canvas.toDataURL();
                        link.click();
                        link.remove();
                    }
                )
        }
    }

    return (
        <div className="container">
            <div className="form_container">
                <div className="form_inputs">
                    <input
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={meme.topText}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </div>

                <label htmlFor="fontText">Font-Size: <span id="fontSize">{meme.fontText}</span></label>
                <input type="range" min="20" max="80" onChange={handleChange} name="fontText" value={meme.fontText}/>

                <div className="btn_container">

                    <button className="form_btn" type="click" onClick={getRandomMeme}>Get a new meme image</button>
                    <button id="download" onClick={handleDownload}>Save Meme</button>

                </div>

            </div>


            <div className="meme_container">
                <div className="meme">
                    <img className="form_image" src={meme.randomImage} alt="" id="memeImg" crossOrigin="anonymous"/>
                    <h2 className="meme__text top" style={{fontSize: meme.fontText + "px"}}>{meme.topText}</h2>
                    <h2 className="meme__text bottom" style={{fontSize: meme.fontText + "px"}}>{meme.bottomText}</h2>

                </div>
            </div>


            <div id="output" style={{display: "none"}}></div>

        </div>
    )
}