const params = {
    width: 400,
    height: 400
};

const element = document.getElementById("main");
console.log(element)

const two = new Two(params).appendTo(element)

// const radius = 50;
// const x = 200;
// const y = 200;
var Data = [2, 4, 6, 7, 3, 9]

const rect = two.makeRectangle(two.width / 2, two.height / 2, 100, 100)
rect.fill = "blue";
rect.stroke = "blue";
rect.linewidth = 3;

// const circle = two.makeCircle(x, y, radius)
// circle.fill = "orange";
// circle.stroke = "red";
// circle.linewidth = 10;

two.update()