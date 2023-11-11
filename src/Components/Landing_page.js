import React, { useState } from 'react';
import './Landing_page.css'

const ComicStripGenerator = () => {
    // Use an array to store the text input for each panel
    const [panelTextInputs, setPanelTextInputs] = useState(Array(10).fill(''));
    const [panelSampleImg, setpanelSampleImg] = useState(Array(10).fill(null));
    const [comicPanels, setComicPanels] = useState([]);
    const [flag, setFlag] = useState(true);

    const handlePanelInputChange = (index, value) => {
        // Update the corresponding text input for the panel 
        setPanelTextInputs((prevInputs) => {
            const newInputs = [...prevInputs];
            newInputs[index] = value;
            return newInputs;
        });
    };

    const handleSubmit = async () => {

        try {
            // Clear existing comic panels before making new requests
            setComicPanels([]);
            for (let i = 0; i < panelTextInputs.length; i++) {
                if (panelTextInputs[i].length === 0) {
                    alert("Kindly enter all the text values in the boxes provided to you and press the button Generate Comic")
                    return;
                }
            }
            setFlag(false);
            // Loop through each panel's text input and make API requests
            alert("Generating images. Kindly wait for a while to see the result");
            for (let i = 0; i < panelTextInputs.length; i++) {


                const response = await fetch(
                    "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
                    {
                        method: "POST",
                        headers: {
                            "Accept": "image/png",
                            "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ "inputs": [panelTextInputs[i]] })
                    }
                );

                const imageBlob = await response.blob();

                // Update the comic panels state with the new image
                setComicPanels((prevPanels) => [...prevPanels, imageBlob]);
            }
        } catch (error) {
            console.error("Error generating comic:", error);
        }
    };

    return (
        <div className="comic-strip-generator">
            <h1 className='main-title'>Comic Generator</h1>
            <div className="instruction-box">
                <h2>Instructions:</h2>
                <p>
                    Welcome to our platform! Follow these steps to get started:
                </p>
                <ol>
                    <li>First of all enter the text to convert them to images</li>
                    <li>Then press the button Click here to Generate Comic and wait for time to let us generate best image for you.</li>
                    <li>Note: You have to enter all the panel texts</li>
                </ol>
            </div>
            {/* Form for Inputting Text */}
            <form className='input-panel-form'>
                {panelTextInputs.map((text, index) => (
                    <div key={index} className="comic-panel-input">
                        <label className="inputLabel" htmlFor={`textInput-${index + 1}`}>{`Input text for Panel ${index + 1}:`}</label>
                        <input
                            type="text"
                            id={`textInput-${index + 1}`}
                            value={text}
                            onChange={(e) => handlePanelInputChange(index, e.target.value)}
                            required
                            className="input-panel"
                        />
                    </div>
                ))}
            </form>
            <button type="button" onClick={handleSubmit} className='submitbtn'>Click here to Generate Comic</button>
            <h3>Below shown is the desired comic. Hope you like it!</h3>
            {
                flag &&
                <div className="main-comic">
                    <div className="comic-strip image-grid">
                        {panelSampleImg.map((panel, index) => (
                            <div className="sample_img_div">
                                Panel {index+1} Image will be inserted here
                            </div>
                        ))}
                    </div>
                </div>
            }
            {/* Display Area for Generated Comic Panels */}
            <div className="main-comic">

                <div className="comic-strip image-grid">
                    {comicPanels.map((panel, index) => (
                        <img
                            key={index}
                            src={URL.createObjectURL(panel)}
                            alt={`Comic Panel ${index + 1}`}
                            style={{ maxWidth: "100%" }}
                        />
                    ))}
                </div>
            </div>
            <hr />
            <footer className='footer'>&copy; Suraj Kumar, IIT Roorkee</footer>
        </div>
    );
}

export default ComicStripGenerator;
