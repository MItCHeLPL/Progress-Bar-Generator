var generatedBars = 0; //amount of generated bars
var barsFontSize = []; //base font size

//Generate bar
function generate(chars, length, progress, invert)
{
    var result = document.getElementById("result");

    var barString = "<span id='bar"+generatedBars+"'>" + Math.floor(progress*100) + "% "; //begin bar

    //Place characters
    for(var i=0; i<Math.floor(length * progress); i++)
    {
        if(invert)
        {
            barString += chars[1];
        }
        else
        {
            barString += chars[0];
        }
    }
    for(var i=0; i<(length - Math.floor(length * progress)); i++)
    {
        if(invert)
        {
            barString += chars[0];
        }
        else
        {
            barString += chars[1];
        }
    }

    barString += " 100%</span><br />"; //Finish bar

    result.innerHTML += barString;

    var bar = document.getElementById("bar"+generatedBars);

    if(bar.offsetWidth > 1600)
    {
        bar.style.fontSize = ((window.innerWidth / length) * 2) + "%"; //fit bar to widow
    }

    barsFontSize[generatedBars] = parseInt(window.getComputedStyle(bar).fontSize); //save base font size

    bar.scrollIntoView(); //scroll to newest bar
    
    generatedBars++;

    sliderResize(); //resize bar to fit slider
}

//Initialize
function startBar()
{
    var type = document.getElementById("type");

    var chars = type.options[type.selectedIndex].text;
    if(chars == "Custom")
    {
        chars = document.getElementById("customCharsInput").value; //if type is custom than pick characters from input
    }

    var length = document.getElementById("length").value;

    var progress = document.getElementById("progress").value/100; //convert for easier math

    var invert = document.getElementById("invert").checked;

    generate(chars, length, progress, invert); //generate bar
}

function showElement(id)
{
    document.getElementById(id).style.display = "block";
}

function hideElement(id)
{
    document.getElementById(id).style.display = "none";
}

//Calling function from string
function callFunction(x)
{
    eval(x);
}

function focusInput(id)
{
    document.getElementById(id).focus();
}

//fit bars to window when resizing
function recalculateBars() 
{
    var length;
    var bar;
    for(var i=0; i<generatedBars; i++) //each generated bar
    {
        bar = document.getElementById("bar"+i);
        length = bar.innerHTML.length - 9; //subtract additional characters from bar
        if(length >= 20) //if bar is bigger than 20 characters it can go out of bounds
        {
            bar.style.fontSize = (window.innerWidth / length) * 2 * document.getElementById("slider").value/100  + "%"; //fit bar to widow
        }
    }
}

//Update bars to fit slider
function sliderResize()
{
    var slider = document.getElementById("slider").value;
    
    for(var i=0; i<generatedBars; i++) //each generated bar
    {
        var bar = document.getElementById("bar"+i);

        bar.style.fontSize = barsFontSize[i] * slider/100 + "px";
    }
    prevSlider = slider;
}

//Update slider text at any input
document.getElementById("slider").oninput = function() 
{
    document.getElementById("sliderValue").innerHTML = this.value+"%"
    sliderResize();
}