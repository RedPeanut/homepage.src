import React from "react"
import "../../../www/css/w3schools30.css"
import {w3color} from "./w3color.js"

class ColorConverter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      color01: "rgb(0, 191, 255)"
    }
  }

  componentDidMount() {
    //convertColor();
  }

  onChangeColor01 = (e) => {
    //console.log("e.target.value = ", e.target.value);
    this.setState({color01: e.target.value});
    this.convertColor();
  }

  onKeyDownColor01 = (e) => {
    if(e.key === "Enter" || e.charCode === 13) {
      this.validateColor();
    }
  };

  convertColor() {
    var color = document.getElementById("color01").value;
    if (color === "") {
      this.validateColor();
      return;
    }
    color = color.toLowerCase();
    color = color.replace(/;/g, ","); //replace any semicolon with a comma
    //document.getElementsByTagName("h1")[0].style.color = w3color(color).toRgbString();
    var c = w3color(color);
    if (c.valid) {
      document.getElementById("resultTable").style.display = "table";
      document.getElementById("error01").innerHTML = "";
      document.getElementById("result01").style.backgroundColor = c.toRgbaString();
      if (c.toName() === "") {
        document.getElementById("name01").style.fontStyle = "italic";
        document.getElementById("name01").style.color = "#757575";
        document.getElementById("name01").innerHTML = "no name";
      } else {
        document.getElementById("name01").style.fontStyle = "normal";
        document.getElementById("name01").style.color = "#000000";
        document.getElementById("name01").innerHTML = c.toName();
      }
      document.getElementById("helpname01").innerHTML = "Name";
      document.getElementById("hex01").innerHTML = c.toHexString();
      document.getElementById("helphex01").innerHTML = "<a href='colors_hexadecimal.asp?color=" + c.toHexString().substr(1) + "'>Hex</a>";
      document.getElementById("cmyk01").innerHTML = c.toCmykString();
      document.getElementById("helpcmyk01").innerHTML = "<a href='colors_cmyk.asp?color=" + c.toCmykStringDecimal() + "'>Cmyk</a>";
      document.getElementById("helpncol01").innerHTML = "<a href='colors_ncol.asp?color=" + c.toNcolStringDecimal() + "'>Ncol</a>";
      if ((color.indexOf("rgba") > -1 || color.indexOf("hsla") > -1 || color.indexOf("hwba") > -1 || color.indexOf("ncola")) > -1
        || (color.indexOf("cmyk") === -1 && color.split(",").length === 4)
        || (color.indexOf("cmyk") > -1 && color.split(",").length === 5)) {
        document.getElementById("rgb01").innerHTML = c.toRgbaString();
        document.getElementById("hsl01").innerHTML = c.toHslaString();
        document.getElementById("hwb01").innerHTML = c.toHwbaString();
        document.getElementById("ncol01").innerHTML = c.toNcolaString();
        document.getElementById("helprgb01").innerHTML = "Rgba";
        document.getElementById("helphsl01").innerHTML = "Hsla";
        document.getElementById("helphwb01").innerHTML = "Hwba";
      } else {
        document.getElementById("rgb01").innerHTML = c.toRgbString();
        document.getElementById("hsl01").innerHTML = c.toHslString();
        document.getElementById("hwb01").innerHTML = c.toHwbString();
        document.getElementById("ncol01").innerHTML = c.toNcolString();
        document.getElementById("helprgb01").innerHTML = "<a href='colors_rgb.asp?color=" + c.toRgbString() + "'>Rgb</a>";
        document.getElementById("helphsl01").innerHTML = "<a href='colors_hsl.asp?color=" + c.toHslStringDecimal() + "'>Hsl</a>";
        document.getElementById("helphwb01").innerHTML = "<a href='colors_hwb.asp?color=" + c.toHwbStringDecimal() + "'>Hwb</a>";
      }

      //document.getElementById("linktocp").innerHTML = "<hr style='border-color:#dfdfdf'><p><a href='colors_picker.asp?color=" + c.toHexString().substr(1) + "'>Use this color in our Color Picker</a></p>";
      
    } else {
      this.validateColor();
    }
  }

  validateColor() {
    var color, c, x, i, l;
    color = document.getElementById("color01").value;
    color = color.replace(/;/g, ","); //replace any semicolon with a comma  
    c = w3color(color);
    if (color === "" || !c.valid) {
      document.getElementById("result01").style.backgroundColor = "#f1f1f1";
      document.getElementById("resultTable").style.display = "none";
      document.getElementById("error01").innerHTML = "Not a legal color value";
      document.getElementById("hex01").innerHTML = "";
      document.getElementById("rgb01").innerHTML = "";
      document.getElementById("hsl01").innerHTML = "";
      document.getElementById("hwb01").innerHTML = "";
      document.getElementById("ncol01").innerHTML = "";
      document.getElementById("helpname01").innerHTML = "";
      document.getElementById("helphex01").innerHTML = "";
      document.getElementById("helprgb01").innerHTML = "";
      document.getElementById("helphsl01").innerHTML = "";
      document.getElementById("helphwb01").innerHTML = "";
      document.getElementById("helpncol01").innerHTML = "";
    } else {
      document.getElementById("resultTable").style.display = "table";
      document.getElementById("error01").innerHTML = "";
    
      this.convertColor();
    }
  }

  render() {

  return (
    <div className="w3-container w3-padding-large ws-grey" style={{borderRadius:"5px"}}>
    <div className="w3-row">
      <div className="w3-col l6">
        <h2>Enter a Color:</h2>
        <label><span className="xw3-text-grey"><i>name, hex, rgb, hsl, hwb, cmyk, ncol:</i></span></label>
        <input ref="color01" id="color01" type="text" value={this.state.color01 || ""}  className="w3-input w3-border"
          onChange={this.onChangeColor01} onKeyDown={this.onKeyDownColor01}/>
        <br/>
        <div className="resultStrings">
          <div id="error01"></div>
          <table id="resultTable" style={{display:"table"}}>
            <tbody>
              <tr>
                <td id="helpname01">Name</td><td id="name01" style={{fontStyle:"normal", color:"rgb(0, 0, 0)"}}>DeepSkyBlue</td>
              </tr>
              <tr>
                <td id="helprgb01"><span data-href="colors_rgb.asp?color=rgb(0, 191, 255)">Rgb</span></td><td id="rgb01">rgb(0, 191, 255)</td>
              </tr>
              <tr>
                <td id="helphex01"><span data-href="colors_hexadecimal.asp?color=00bfff">Hex</span></td><td id="hex01">#00bfff</td>
              </tr>
              <tr>
                <td id="helphsl01"><span data-href="colors_hsl.asp?color=hsl(195, 1, 0.5)">Hsl</span></td><td id="hsl01">hsl(195, 100%, 50%)</td>
              </tr>
              <tr>
                <td id="helphwb01"><span data-href="colors_hwb.asp?color=hwb(195, 0, 0)">Hwb</span></td><td id="hwb01">hwb(195, 0%, 0%)</td>
              </tr>
              <tr>
                <td id="helpcmyk01"><span data-href="colors_cmyk.asp?color=cmyk(1, 0.25, 0, 0)">Cmyk</span></td><td id="cmyk01">cmyk(100%, 25%, 0%, 0%)</td>
              </tr>
              <tr>
                <td id="helpncol01"><span data-href="colors_ncol.asp?color=C25, 0, 0">Ncol</span></td><td id="ncol01">C25, 0%, 0%</td>
              </tr>
              {/* <!--<tr><td id="helpasterix" colspan="2">*Not a web standard.</td></tr>--> */}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w3-col l6" style={{padding:"40px 40px 10px 40px"}}>
        <div id="behindresult01">
          <div style={{height:"294px", backgroundColor:"rgb(0, 191, 255)"}} id="result01">&nbsp;</div>
        </div>
      </div>
    </div>
    {/* <div className="w3-row">
      <div className="w3-col">
      <div id="linktocp"><hr style={{borderColor:"#dfdfdf"}}/><p><a href="colors_picker.asp?color=00bfff">Use this color in our Color Picker</a></p></div>
      </div>
    </div> */}
    </div>
  )
  }
}

export default ColorConverter;