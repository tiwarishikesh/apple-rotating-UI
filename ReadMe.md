Rotating Product Display
========

This is me playing around with a rotating product carousel idea I came across on Instagram from an account by the name of [ui.alok](https://www.instagram.com/ux.alok/). 


[Original Figma Post](https://www.instagram.com/p/CjfgzkCvw3L/)

[Live Demo](https://kanr.is/pens/apple-rotating/)

Explanation for beginners
--------

This is list of watches along with color of swatch, name of the image file and type of band
```
let watches = [
    {
        name: "blackAluminiumSport.jpg",
        color:'black',
        band:'Sport',
        case: 'Aluminium'
    }, .... ]
```

We use this information to create the navigation dots on the left using [append](https://developer.mozilla.org/en-US/docs/Web/API/Element/append).

```
watches.forEach((watch, index)=>{
            watch.src = watch.name;
            $('.colors-container').append(`
                <div class="single-color-option ${watch.band}" onclick="watchAnimation.goto(${index})" style="color:${watch.color}; background:${watch.color}" title="${watch.band} Band with  ${watch.case} Case"></div>
            `);
        })
```
The ${} are called [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). They are in essence a simple placement for '+' while appending strings. Follow the link to read more about them



We load the first image and use it to figure out the dimensions of the actual image by applying the ratio to mydummyDiv which exists as a placeholder
```
const myImage = new Image(document.getElementById('mydummyDiv').style.width.split('px')[0]);
        myImage.src = watches[0].src;
        myImage.onload = async () => {
            watchAnimation.dimensions.width = myImage.width;
            watchAnimation.dimensions.height = myImage.height;
            $("#mydummyDiv").css('height', ($("#mydummyDiv").width() * (myImage.height / myImage.width))+'px');
```



Rotation square is element with three images positioned on three edges, we find the distance that would be required between the dummy element and the center of this square such that two images remain out of bounds of screen
```
 $('#rotationSquare').css('width',
            Math.max(
                /* Distance from right of dummy element plus the height of the image as one will be positioned rotated 90deg at the top */
                $(window).width() - $("#mydummyDiv")[0].getBoundingClientRect().left + (myImage.height),
                /* Distance from bottom of dummy element plus the height of the image */
                $(window).height() - $("#mydummyDiv")[0].getBoundingClientRect().top + (myImage.width),
                /* Distance from top of dummy element plus the height of the image */
                $("#mydummyDiv")[0].getBoundingClientRect().top + myImage.height,
            )*2);
```



Then we position the Rotation square so as their left edges align and vertical centeres align
```
$("#rotationSquare").css('left',$("#mydummyDiv")[0].getBoundingClientRect().left - $("#rotationSquare")[0].getBoundingClientRect().left);
$("#rotationSquare").css('top', $("#mydummyDiv").offset().top + ($("#mydummyDiv").height()/2) - $("#rotationSquare").height()/2);
```


Adjust the three images such that their respective tops maintain the same distance from the edge on top of image when positioned in normal rotation on the screen
```
$('#rotationSquare img:eq(0)').css('right',`calc(50% - ${watchAnimation.dimensions.height/2}px)`);
$('#rotationSquare img:eq(2)').css('left',`calc(50% - ${watchAnimation.dimensions.height/2}px)`);
$('#rotationSquare img:eq(1)').css('top',`${$("#rotationSquare img:eq(0)")[0].getBoundingClientRect().top - $("#rotationSquare")[0].getBoundingClientRect().top}px`);
$('#rotationSquare img:eq(1)').css('left',`${$("#rotationSquare img:eq(0)")[0].getBoundingClientRect().left - $("#rotationSquare")[0].getBoundingClientRect().left}px`);
```
Enable the borders on #rotationSquare and #rotationSquare img to see how it works


Set the current image source and bring opacity to 1 so it shows. Also added the transition property after resetting the elements
```
$("#rotationSquare").css('transform','rotate(0deg)');
$("#rotationSquare img").attr('src',watches[watchAnimation.currentImage].src);
$("#rotationSquare").css('top', $("#mydummyDiv").offset().top + ($("#mydummyDiv").height()/2) - ($("#rotationSquare").height()/2) + $("#mydummyDiv")[0].getBoundingClientRect().top - $("img:eq(1)")[0].getBoundingClientRect().top);
setTimeout(() => {
    $("#rotationSquare").css('transition','transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)');
    $("#rotationSquare").css('opacity','1');
}, 50);
```

When animating we need to determine which direction the circle should move in
```
if(this.currentImage > x) {
    $("#rotationSquare img:eq(2)").attr('src',watches[x].src);
    setTimeout(() => {
        $("#rotationSquare").css('transform','rotate(90deg)');
    }, 50);
}  else{
    $("#rotationSquare img:eq(0)").attr('src',watches[x].src);
    setTimeout(() => {
        $("#rotationSquare").css('transform','rotate(-90deg)');
    }, 50);
} 
```