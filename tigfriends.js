/*                  _____
     _____  _____  /    /____  ___
    |     \/     |/    /    /_|   |_ ___ ______  ___
    |            /    /    /\__   __|___|      \|___|
    |   \    /  /____     ___/|   | |   |   |   |   |
    |___|\__/|___|  /    /    |____\|___|___|___|___|
                   /____/     Created by: M4tini.com
*/

// polyfill
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x){
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
}
if(!window.requestAnimationFrame){
    var lastTime = 0,
    requestAnimationFrame = function(callback){
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16.6 - (currTime - lastTime));
        window.setTimeout(function(){
            callback(lastTime = currTime + timeToCall);
        }, timeToCall);
    }
}

function shuffle(a)
{
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

// cache globals
var body = document.body,
    width = window.innerWidth,
    height = window.innerHeight,
    tiniSources = 1;

// tini preparation
var tini = document.getElementById('tini');
if(undefined == tini)
{
    tini = document.createElement('canvas');
    tini.id = 'tini';
    tini.innerHTML = 'Update your browser to FireFox, Chrome or Internet Explorer 9 or higher';
    body.appendChild(tini);
}
var tini_parent = tini.parentNode;
var tini_width = 800;
var tini_height = 200;
var tini_top = height / 2 - tini_height / 2;
var tini_left = width / 2 - tini_width / 2;
var tini_style = tini.style;
tini_style.marginTop = tini_top + 'px';
tini_style.marginLeft = tini_left + 'px';
tini_style.position = 'absolute';

// prepare canvas
var ctx = tini.getContext('2d');
ctx.canvas.width = tini_width;
ctx.canvas.height = tini_height;
ctx.lineWidth = 3;
ctx.font = 'bold 18px Courier,sans-serif';
ctx.fillStyle = '#fff';
ctx.fillText('LOADING', tini_width / 2 - ctx.measureText('LOADING').width / 2, tini_height / 2);

// make nice
document.title = 'TIG Friends | M4tini';
var body_style = body.style;
body_style.margin = 0;
body_style.background = 'url(tigfamousbg.jpg)';
tini_style.cursor = 'pointer';
var divHead = document.createElement('div'),
    divPost = document.createElement('div');
divHead.style = 'position:absolute; top:0; width:100%; height:56px; background:#44AB53;';
divPost.style = 'width:860px; height:' + height + 'px; margin:0 auto; background:#fff;';
document.body.appendChild(divHead);
document.body.appendChild(divPost);

// tini snake
function dirX(x) { return x == (tini_width  - upl_margin) || x == upl_margin; }
function dirY(y) { return y == (tini_height - upl_margin) || y == upl_margin; }
function addX(x, swap) { if(swap) upl_xd *= -1; return (1 == upl_xd) ? x + upl_speed : x - upl_speed; }
function addY(y, swap) { if(swap) upl_yd *= -1; return (1 == upl_yd) ? y + upl_speed : y - upl_speed; }
var upl_margin = 4,
    upl_speed = 2,
    upl_x1 = 2 * upl_margin,
    upl_x2 = tini_height - upl_x1,
    upl_xd = 1,
    upl_y1 = upl_margin,
    upl_y2 = upl_margin,
    upl_yd = -1;

function tiniSnake(thisLoop)
{
    // calc lines
    ctx.beginPath();
    ctx.moveTo(upl_x1, upl_y1); // tail
    if(upl_y1 != upl_y2)
    {
        if(1 == upl_xd * upl_yd) {
            ctx.lineTo(upl_x2, upl_y1); // corner
        } else {
            ctx.lineTo(upl_x1, upl_y2); // corner
        }
    }
    ctx.lineTo(upl_x2, upl_y2); // head
    // draw lines
    var snakeGrad = ctx.createLinearGradient(upl_x1, upl_y1, upl_x2, upl_y2);
    snakeGrad.addColorStop(0, 'rgba(255,255,255,0)');
    snakeGrad.addColorStop(1, 'rgba(255,255,255,1)');
    ctx.strokeStyle = snakeGrad;
    ctx.stroke();

    // move snake
    if(!dirX(upl_x1)) // tail horizontal
    {
        upl_x1 = addX(upl_x1);
        if(dirX(upl_x1)) upl_y1 = addY(upl_y1);
    }
    if(!dirY(upl_y1)) // tail vertical
    {
        upl_y1 = addY(upl_y1);
        if(dirY(upl_y1)) upl_x1 = addX(upl_x1);
    }
    if(!dirX(upl_x2)) // head horizontal
    {
        upl_x2 = addX(upl_x2);
        if(dirX(upl_x2)) upl_y2 = addY(upl_y2, true);
    }
    if(!dirY(upl_y2)) // head vertical
    {
        upl_y2 = addY(upl_y2);
        if(dirY(upl_y2)) upl_x2 = addX(upl_x2, true);
    }
}

// tini dots
var dotImg = new Image(),
    dotColors = [],
    dotObjects = [],
    dotMaxElements = 0,
    frameNeedsUpdate = 1,
    frameCurrent = 0,
    frameNext = 0,
    dotPixelWidth = 4,
    dotPixelMargin = 6;

//dotImg.src = 'tigfriends.png'; // base64 encoded this image to avoid Same Origin Policy security error in github preview
dotImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAACQCAYAAAB6Zyl1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABC1JREFUeNrsnNGSrCAMRNXi/3/Z+3BrtlyWhO6kwzju+rTFKkQkh06A2bdtOzfjOs9z38Br3/cz+qxb7/+6flbWN4hcr3pezyqMbL1R10otw/vy0XORF5wa2PfAtZFZL1+NVBm3bdt2jBp8NXSe5z77TMg9MgOthlgDlAbvnhdHHENt6H6e53bna1dxMGzAhJ/N81ClN0aHSQkHo+WwF/dvYvXkqJe9e5lyiIPIJ68eHo3l4Kxh5l7EESUcVDrTj/H9sRyU6bmkThzqQTX/EJVjGT7k4GtcKdjWezQrjo/IZ2LLLUmG4KhFx1J2TF6N9upuyFhh2abUimkOVvHvGXpQro4DTHTj4ooojWVi894Q4Vc1Ew8vjBzxa6YNZ/qQqRMGNfP5+sazY7exlaENzj4lWqeUgz3QoyLkWz1VHLSMYT95i3Aq0hOSzALDvtH8rJyzITWDcGpkiBUdItzs/z4sfqGf/spMM/Ah4uchB5Ec37WRPnFplUXi52FuJhsXR0LPvk6LmxIOIgai9/zo4bvoQXOO7zFzt9g4zMGsDkSNDHEwU846VIiDCMtmWIINRDmIjrVR3Ju5UuskI3Ga0X63ioth4Xv3uLgpeFXFTykHMznAcg5mc4CugciDHoRnPZidkdIcnOm8LA9pPbgqWJJxkJlbI4Z/Xn5w1iOzbAGSRmb4+S0/aHnljHEzo5AXtkjRRr3n9RL6PxUbD2QgWzk9dS5wauBIYFYFSGgbLZsYysbDci9erRF/LwelBlZxUPGJpRxEwOvlAss5WKEJpRxk990g43UJB9kp8BYchPPX7+Ags4YS2j9YzT6Tg8xYzLCPeaH0/kF2j01KbqGf1Mv3MXsN07mZ6JurFhKHHPTmZctB0HtlaqZKVf+OuHh1aiPFQUQWVRt7zHBiLR6u6kV3H7W3zWRVYAXvo2buKTPwMV680kmed55EhRl4j05ED6rjYM/xQnrQEgYV5/DS50nYcnYN+ahinGoWOjIo8coZQ5btH8wG/M/ID65kXGlcrMzdeC9Dr7hHzsox+whdUEcWYtjyGfCHmLE291QoZ+bs8lcPqve6MPeXn6uL9CC1ivDxcfHKGJji4KrIbdYBbaRiKvASnQyalzGwfkchoguZzL6bfkPnWOt8nFUenfpaZKww01rW6b4wM/vE73KSZ+UH38HEKQdXZ7PcHqziYIaThyV7mPN0XrmVFEX3YC9PvyGHoa/3tGpMoM9Nj+++i4PPzg8+Wg+qXkyqByuEroyDVQ51+2WIY/WYCmNGzUHZibK/9WIlB701YlYXSjnI8gzZI6jqQejAi3duJBrvUpjxZhKrd9g8X2omUcwIVUYOOajQgn8cXMk+9yeMUA6uSoH0TghzcNVvEfbj/2BDxIrfIvTWjmkORsZXaqO3koPWeePMukkZB2VOc3cO/hsALbeR56bzgYwAAAAASUVORK5CYII=';
dotImg.onload = function(){
    precalcDots(dotImg);
    tiniSources--;
};

function precalcDots(dotImg)
{
    var imgWidth = dotImg.width,
        imgHeight = dotImg.height,
        imgRowHeight = 8,
        imgRows = imgHeight / imgRowHeight,
        imgCanvas = document.createElement('canvas').getContext('2d');
    imgCanvas.drawImage(dotImg, 0, 0);
    var dotImgData = imgCanvas.getImageData(0, 0, imgWidth, imgHeight).data;

    for(var i = 0; i < imgRows; i++)
    {
        var rand1 = {
            x: Math.random(),
            y: Math.random()
        };
        var dotobj1 = [];
        for(var y = i * imgRowHeight, y2 = y + imgRowHeight; y < y2; y++)
        {
            for(var x = 0; x < imgWidth; x++)
            {
                var index = (y * imgWidth + x) * 4; // rgba = 4
                if(dotImgData[index + 3] != 0)
                {
                    dotobj1.push({
                        x: x,
                        y: y - i * imgRowHeight,
                        a: dotImgData[index + 3] / 255,
                        rx: 5 + rand1.x * (tini_width  - 5 - imgWidth * dotPixelMargin),
                        ry: 5 + rand1.y * (tini_height - 5 - imgRowHeight * dotPixelMargin)
                    });
                }
            }
        }
        dotObjects[i] = dotobj1;
        if(dotobj1.length > dotMaxElements)
        {
            dotMaxElements = dotobj1.length;
        }
    }
    // fill shorter objects with empty elements
    for(var i = 0, j = dotObjects.length; i < j; i++)
    {
        for(var k = dotObjects[i].length; k < dotMaxElements; k++)
        {
            var clone = dotObjects[i][0];
            dotObjects[i].push({
                x: clone.x,
                y: clone.y,
                a: 0,
                rx: clone.rx,
                ry: clone.ry
            });
        }
    }
    // calc color for every dot
    for(var i = 0; i < dotMaxElements; i++)
    {
        dotColors.push(200 + parseInt(Math.random() * 55));
    }
    shuffle(dotObjects);
}

function drawObjectPixel(obj, i)
{
    ctx.fillStyle = 'rgba(' + dotColors[i] + ',' + dotColors[i] + ',' + dotColors[i] + ',' + obj.a + ')';
    ctx.fillRect(obj.x * dotPixelMargin + obj.rx, obj.y * dotPixelMargin + obj.ry, dotPixelWidth, dotPixelWidth);
}

function tiniDotShift(thisLoop)
{
    var secondsPassed = parseInt(thisLoop / 1000),
        frame = secondsPassed % 3;

    // show object 1
    if(frame == 0 || frame == 1)
    {
        // set next object if allowed
        if(frameNeedsUpdate == 1)
        {
            frameCurrent = frameNext;
            frameNext = frameCurrent + 1;
            if(frameNext >= dotObjects.length)
            {
                frameNext = 0;
            }

            dotobj1 = dotObjects[frameCurrent];
            dotobj2 = dotObjects[frameNext];
            shuffle(dotobj2);

            frameNeedsUpdate = 0;
        }
        // draw pixels
        for(var i = 0; i < dotobj1.length; i++)
        {
            drawObjectPixel(dotobj1[i], i);
        }
    }
    // move object 1 to object 2
    if(frame == 2)
    {
        // calculate shift
        var fact1 = (parseInt(thisLoop) - secondsPassed * 1000) / 1000,
            fact2 = 1 - fact1;

        // draw pixels
        for(var i = 0, j = dotobj1.length; i < j; i++)
        {
            drawObjectPixel({
                x:  dotobj1[i].x  * fact2 + dotobj2[i].x  * fact1,
                y:  dotobj1[i].y  * fact2 + dotobj2[i].y  * fact1,
                a:  dotobj1[i].a  * fact2 + dotobj2[i].a  * fact1,
                rx: dotobj1[i].rx * fact2 + dotobj2[i].rx * fact1,
                ry: dotobj1[i].ry * fact2 + dotobj2[i].ry * fact1
            }, i);
        }
        // allow next object
        frameNeedsUpdate = 1;
    }
}

function tiniBackground(thisLoop)
{
    ctx.fillStyle = '#308D3D';
    ctx.fillRect(50, 25, tini_width - 100, tini_height - 50);

    // left
    var bgGrad = ctx.createLinearGradient(0, 0, 50, 0);
    bgGrad.addColorStop(0, '#44AB53');
    bgGrad.addColorStop(1, '#308D3D');
    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(50, 25);
    ctx.lineTo(50, tini_height - 25);
    ctx.lineTo(0, tini_height);
    ctx.fill();

    // right
    bgGrad = ctx.createLinearGradient(tini_width, 0, tini_width - 50, 0);
    bgGrad.addColorStop(0, '#44AB53');
    bgGrad.addColorStop(1, '#308D3D');
    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.moveTo(tini_width, 0);
    ctx.lineTo(tini_width - 50, 25);
    ctx.lineTo(tini_width - 50, tini_height - 25);
    ctx.lineTo(tini_width, tini_height);
    ctx.fill();

    // top
    bgGrad = ctx.createLinearGradient(0, 0, 0, 25);
    bgGrad.addColorStop(0, '#44AB53');
    bgGrad.addColorStop(1, '#308D3D');
    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.moveTo(tini_width, 0);
    ctx.lineTo(tini_width - 50, 25);
    ctx.lineTo(50, 25);
    ctx.lineTo(0, 0);
    ctx.fill();

    // bot
    bgGrad = ctx.createLinearGradient(0, tini_height, 0, tini_height - 25);
    bgGrad.addColorStop(0, '#44AB53');
    bgGrad.addColorStop(1, '#308D3D');
    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.moveTo(0, tini_height);
    ctx.lineTo(50, tini_height - 25);
    ctx.lineTo(tini_width - 50, tini_height - 25);
    ctx.lineTo(tini_width, tini_height);
    ctx.fill();
    
    // shadow message
    ctx.fillStyle = '#44AB53';
    if(tini_audio_play == 0) {
    	ctx.fillText('Good morning!',                                                     330, tini_height / 2 - 60);
    	ctx.fillText('This will probably be the last JavaScript injected into Famous :)', 49,  tini_height / 2 - 40);
    	ctx.fillText('~ click for some demoscene music ~',                                216, tini_height / 2);
    	ctx.fillText('Thanks for all the wonderful moments <3',                           189, tini_height / 2 + 40);
    	ctx.fillText('Greetz fly out to:',                                                303, tini_height / 2 + 60);
    } else {
    	ctx.fillText('                _____',                               135, tini_height / 2 - 60);
    	ctx.fillText(' _____  _____  /    /____  ___',                      135, tini_height / 2 - 40);
    	ctx.fillText('|     \\/     |/    /    /_|   |_ ___ ______  ___',   135, tini_height / 2 - 20);
    	ctx.fillText('|            /    /    /\\__   __|___|      \\|___|', 135, tini_height / 2);
    	ctx.fillText('|   \\    /  /____     ___/|   | |   |   |   |   |',  135, tini_height / 2 + 20);
    	ctx.fillText('|___|\\__/|___|  /    /    |____\\|___|___|___|___|', 135, tini_height / 2 + 40);
    	ctx.fillText('               /____/      Created by M4tini.com',    135, tini_height / 2 + 60);
    }
}

// audio setup
var audio = document.createElement('audio'),
    tini_audio_play = 0;
//audio.controls = 'controls';
audio.volume = '1';
audio.loop = 'loop';
audio.preload = 'auto';
var source = document.createElement('source');
source.src = 'Reloaded_Installer_10.mp3';
audio.appendChild(source);
source = source.cloneNode(true);
source.src = 'Reloaded_Installer_10.ogg';
audio.appendChild(source);
body.appendChild(audio);
tini.onclick = function(){
    tini_audio_play = (tini_audio_play == 0) ? 1 : 0;
    if(tini_audio_play == 1) {
        audio.play();
    } else {
    	audio.pause();
    }
}

function tiniLoop(thisLoop)
{
    // background
    tiniBackground(thisLoop);
    // snake
    tiniSnake(thisLoop);
    // dot images
    tiniDotShift(thisLoop);
    // loop
	requestAnimationFrame(tiniLoop);
}

function tiniWaitForSources()
{
    if(tiniSources == 0)
    {
        clearInterval(tiniSourceInterval);
        requestAnimationFrame(tiniLoop);
    }
}
tiniSourceInterval = setInterval(tiniWaitForSources, 137);
