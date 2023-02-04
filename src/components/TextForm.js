import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase!", "success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase!", "success");
  };

  const handleClearClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Text Cleared!", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  // Credits: A
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to Clipboard!", "success");
  };

  // Credits: Coding Wala
  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra spaces removed!", "success");
  };
  const handleJson = () => {
    let newtext = JSON.parse(text);
    setText(newtext);
    props.showAlert("Converted into JSON Format", "success");
  };

  const handleIndentation = () => {
    let indentationlevel = 2;
    let indentation = " ";

    let indentedText = text;
    for (let i = 0; i < indentationlevel; i++) {
      indentedText = indentation + indentedText;
      setText(indentedText);
      props.showAlert("Indentation is done.", "success");
    }
  };

  const handleWraptext = () => {
    let maxLinelength = 25;
    let wrappedText = "";
    let words = text.split(" ");
    let currentLine = "";
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      if (currentLine.length + word.length + 1 <= maxLinelength) {
        currentLine += word + " ";
      } else {
        wrappedText += currentLine.trim() + "\n";
        currentLine = word + " ";
      }
    }

    wrappedText += currentLine.trim();
    setText(wrappedText);
    props.showAlert("Your Text has been Wrapped!", "success");
  };

  const handleReplacetext = () => {
    let find = prompt("Enter the word you want to find:");
    let replaceWith = prompt("Enter the word you want to replace with:");
    let replacedText = text.replace(find, replaceWith);
    setText(replacedText);
    props.showAlert("Text has been replaced", "success");
  };

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
      case "uppercase":
        handleUpClick();
        break;
      case "lowercase":
        handleLoClick();
        break;
      case "clear":
        handleClearClick();
        break;
      case "copy":
        handleCopy();
        break;
      case "removeExtraSpaces":
        handleExtraSpaces();
        break;
      case "json":
        handleJson();
        break;
      case "indentation":
        handleIndentation();
        break;
      case "wrap":
        handleWraptext();
        break;
      case "replace":
        handleReplacetext();
        break;
      default:
        break;
    }
  };

  const [text, setText] = useState("");
  // text = "new text"; // Wrong way to change the state
  // setText("new text"); // Correct way to change the state
  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h1 className="mb-4">{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "#13466e" : "white",
              color: props.mode === "dark" ? "white" : "#042743",
            }}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <select
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onChange={handleSelectChange}
          style={{ backgroundColor: "white", color: "black" }}
        >
          <option value="" disabled selected>
            Select an option
          </option>
          <option value="uppercase">Convert to Uppercase</option>
          <option value="lowercase">Convert to Lowercase</option>
          <option value="clear">Clear Text</option>
          <option value="copy">Copy Text</option>
          <option value="removeExtraSpaces">Remove Extra Spaces</option>
          <option value="json">Convert to JSON</option>
          <option value="indentation">Indentation</option>
          <option value="wrap">Wrap Text</option>
          <option value="replace">Replace Text</option>
        </select>
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h2>Your text summary</h2>
        <p>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          words and {text.length} characters
        </p>
        <p>
          {0.008 *
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          Minutes read
        </p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
      </div>
    </>
  );
}
