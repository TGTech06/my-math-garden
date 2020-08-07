const BACKGROUND_COLOR = '#000000'
const LINE_COLOR = '#FFFFFF'
const LINE_WIDTH = 15

var currentX = 0;
var currentY = 0;
var previousX = 0;
var previousY = 0;

var canvas;
var context;

function prepareCanvas(){
    console.log('Preparing Canvas');
    canvas = document.getElementById('my-canvas');
    context = canvas.getContext('2d');

    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    context.strokeStyle = LINE_COLOR;
    context.lineWidth = LINE_WIDTH;
    context.lineJoin = 'round';
    var isPainting = false;

    document.addEventListener('mousedown', function(event){
        console.log('Mouse Pressed')
        isPainting = true;
    });

    document.addEventListener('mousemove', function(event){
            previousX = currentX;
            currentX = event.clientX - canvas.offsetLeft;
    
            previousY = currentY;
            currentY = event.clientY - canvas.offsetTop;
    
        if(isPainting == true){
            
            draw();
        }
        
    });
    document.addEventListener('mouseup', function(event){
        console.log('Mouse Released')
        isPainting = false
    });

    canvas.addEventListener('mouseleave', function(event){
        console.log('Mouse Left')
        isPainting = false
    });

    // Touch events

    canvas.addEventListener('touchstart', function(e) {
        isPainting = true;
        currentY = event.touches[0].clientY - canvas.offsetTop;
        currentX = event.touches[0].clientX - canvas.offsetLeft;
   
    });

    canvas.addEventListener('touchmove', function(e) {
        // e.preventDefault();
        
        

        if(isPainting == true){
            previousX = currentX;
            previousY = currentY;
            currentY = event.touches[0].clientY - canvas.offsetTop;
            currentX = event.touches[0].clientX - canvas.offsetLeft;
            
            draw();
        }

        // updateLog(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
    });

    canvas.addEventListener('touchend', function(e) {
    
        isPainting = false;
    });


}

function draw() {
    context.beginPath();
    context.moveTo(previousX, previousY);
    context.lineTo(currentX, currentY);
    context.closePath();
    context.stroke();
}

function clearCanvas(){
    
    var currentX = 0;
    var currentY = 0;
    var previousX = 0;
    var previousY = 0;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    
}