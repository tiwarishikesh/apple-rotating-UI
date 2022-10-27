$(document).ready(()=>{
    watchAnimation.init();
})

watchAnimation = {
    init: async function () {
        watches.forEach((watch, index)=>{
            watch.src = watch.name;
            $('.colors-container').append(`
                <div class="single-color-option ${watch.band}" onclick="watchAnimation.goto(${index})" style="color:${watch.color}; background:${watch.color}" title="${watch.band} Band with  ${watch.case} Case"></div>
            `);
        })
        const myImage = new Image(document.getElementById('mydummyDiv').style.width.split('px')[0]);
        myImage.src = watches[0].src;
        myImage.onload = async () => {
            watchAnimation.dimensions.width = myImage.width;
            watchAnimation.dimensions.height = myImage.height;
            console.log(($("#mydummyDiv").width * (myImage.width / myImage.height))+'px');
            $("#mydummyDiv").css('height', ($("#mydummyDiv").width() * (myImage.height / myImage.width))+'px');
            $('#rotationSquare').css('width',
            Math.max(
                $(window).width() - $("#mydummyDiv")[0].getBoundingClientRect().left + (myImage.height),
                $(window).height() - $("#mydummyDiv")[0].getBoundingClientRect().top + (myImage.width),
                $("#mydummyDiv")[0].getBoundingClientRect().top + myImage.height,
            )*2);

            $("#rotationSquare").css('left',$("#mydummyDiv")[0].getBoundingClientRect().left - $("#rotationSquare")[0].getBoundingClientRect().left);
            $("#rotationSquare").css('top', $("#mydummyDiv").offset().top + ($("#mydummyDiv").height()/2) - $("#rotationSquare").height()/2);
            
            $('#rotationSquare img').css('width',$("#mydummyDiv").width());
            $('#rotationSquare img:eq(0)').css('right',`calc(50% - ${watchAnimation.dimensions.height/2}px)`);
            $('#rotationSquare img:eq(2)').css('left',`calc(50% - ${watchAnimation.dimensions.height/2}px)`);
            console.log($("#rotationSquare img:eq(0)")[0].getBoundingClientRect().top);
            $('#rotationSquare img:eq(1)').css('top',`${$("#rotationSquare img:eq(0)")[0].getBoundingClientRect().top - $("#rotationSquare")[0].getBoundingClientRect().top}px`);
            $('#rotationSquare img:eq(1)').css('left',`${$("#rotationSquare img:eq(0)")[0].getBoundingClientRect().left - $("#rotationSquare")[0].getBoundingClientRect().left}px`);
            $("#rotationSquare").css('transform','rotate(0deg)');
            $("#rotationSquare img").attr('src',watches[watchAnimation.currentImage].src);
            $("#rotationSquare").css('top', $("#mydummyDiv").offset().top + ($("#mydummyDiv").height()/2) - ($("#rotationSquare").height()/2) + $("#mydummyDiv")[0].getBoundingClientRect().top - $("img:eq(1)")[0].getBoundingClientRect().top);
            setTimeout(() => {
                $("#rotationSquare").css('transition','transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)');
                $("#rotationSquare").css('opacity','1');
            }, 50);
            watches.forEach((watch)=>{
                let x = new Image();
                x.src = watch.src;
            })
        }
    },
    change: function (direction) {
        if(![1,-1].includes(direction)){
            return false;
        }
        this.goto(this.currentImage+direction);
    },
    goto: function (x) {
        if(x < 0) {
            x = watches.length - 1;
        }else if(x >= watches.length){
            x = 0;
        }
        if(x == 0 && this.currentImage == watches.length - 1){
            $("#rotationSquare img:eq(0)").attr('src',watches[x].src);
            setTimeout(() => {
                $("#rotationSquare").css('transform','rotate(-90deg)');
            }, 50);
        }else if(this.currentImage == 0 && x == watches.length - 1){
            $("#rotationSquare img:eq(2)").attr('src',watches[x].src);
            setTimeout(() => {
                $("#rotationSquare").css('transform','rotate(90deg)');
            }, 50);
        }else if(this.currentImage > x) {
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
        setTimeout(() => {
            $("#rotationSquare").css('transition','0s');
            $("#rotationSquare img:eq(1)").attr('src',watches[x].src);
            $("#rotationSquare").css('transform','rotate(0deg)');
            setTimeout(() => {
                $("#rotationSquare").css('transition','transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)');
            }, 50);
            this.currentImage = x;
        }, 650);

    },
    currentImage: 0,
    dimensions: {}
}


let watches = [
    {
        name: "blackAluminiumSport.jpg",
        color:'black',
        band:'Sport',
        case: 'Aluminium'
    },
    {
        name: "goldStainlessSteelMilanese.jpg",
        color:'gold',
        band:'Milanese',
        case: "Stainless Steel"
    },
    {
        name:"GoldStainlessSteelSport.jpg",
        color:'gold',
        band:'Sport',
        case:'Stainless Steel'
    },
    {
        name: "graphiteStainlessSteelMilanese.jpg",
        color:'#251607',
        band:'Milanese',
        case: 'Stainless Steel'
    },
    {
        name: "graphiteStainlessSteelSport.jpg",
        color:'#251607',
        band:'Sport',
        case: 'Stainless Steel'
    },
    {
        name: "RedAluminiumSport.jpg",
        color:'black',
        band:'Sport',
        case: 'Aluminium'
    },
    {
        name: "silverAluminiumSport.jpg", 
        color:'black',
        band:'Sport',
        case: 'Aluminium'
    },
    {
        name: "silverStainlessSteelMilanese.jpg", 
        color:'black',
        band:'Milanese',
        case: 'Stainless Steel'
    },
    {
        name: "SilverStainlessSteelSport.jpg",
        color:'silver',
        band:'Sport',
        case: 'Stainless Steel'
    },
    {
        name: "starlightAluminium.jpg",
        color:'beige',
        band:'Sport',
        case: 'Aluminium'
    }
]