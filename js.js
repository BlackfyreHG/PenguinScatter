




var sortByProperty = function(property)
{
    return function(a,b)
    {
        if(d3.mean(a[property], function(item) { return item.grade; }) ==
           d3.mean(b[property], function(item) { return item.grade; }))
        {
            return 0;
        }
        else if (d3.mean(a[property], function(item) { return item.grade; }) >
           d3.mean(b[property], function(item) { return item.grade; }))
        { 
            return 1;
        }
        else
        {
            return -1;
        }
    }
}

var meanGrade = function(array) {
    return d3.mean(array, function(assignment) { return assignment.grade; });
}


var scatter1 = function(students,width,height) //Final versus mean homework
{
    //console.log(students);
    //console.log(students.map(function(student) { return meanGrade(student.homework); }));
    
    
    //set height and width of svg
    var svg = d3.select("#final_v_hw")
            .attr("width",width)
            .attr("height",height);
            //.attr("id","FinalvHW") ------------
    
    var xScale = d3.scaleLinear()
                //.domain([-1,students.length])
    
                .domain([d3.min(students, function(student){return meanGrade(student.homework);})-1 ,
                                d3.max(students, function(student){return meanGrade(student.homework);})+1
                        ])
                .range([0,width])
    
    var yScale = d3.scaleLinear()
                .domain([
                          d3.min(students, function(student){return student.final[0].grade;})-1,
                          d3.max(students, function(student){return student.final[0].grade;})+1
                        ])
                .range([height,0]);
    
    svg.selectAll("circle")
        .data(students)
        .enter()
        .append("circle")
        .attr("cx",function(student)
        {
            return xScale(meanGrade(student.homework));    
        })
        .attr("cy",function(student)
        {
            return yScale(student.final[0].grade);  
        })
        .attr("r",3)
        .attr("fill","blue")
    
        .on("mouseover", function(student) {
            var xPosition = parseFloat(d3.select(this).attr("cx")) + 10;
            var yPosition = parseFloat(d3.select(this).attr("cy")) + 10;
        
            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#pengImg")
                    .attr("src", "imgs/" + student.picture);
        
            d3.select("#tooltip").select("#ydata")
                .text("Final: "+ student.final[0].grade);
        
            d3.select("#tooltip").select("#xdata")
                .text("Mean HW: "+Math.round(meanGrade(student.homework)));
        
            d3.select("#tooltip #finalScore")
                .text("Final Score: " + student.final[0].grade);
        
            d3.select("#tooltip #avgHW")
                .text("HW Average: " + Math.round(meanGrade(student.homework)));
        
            d3.select("#tooltip #avgQuiz")
                .text("Quiz Average: " + Math.round(meanGrade(student.quizes)));
        
            d3.select("#tooltip #avgTest")
                .text("Test Average: " + Math.round(meanGrade(student.test)));
        
            d3.select("#tooltip").classed("hidden", false);
                
        }).on("mouseout", function() {
            d3.select("#tooltip").classed("hidden", true);
        });
    
    svg.append("line")
        .attr("x1",xScale(0))
        .attr("x2",xScale(width))
        .attr("y1",yScale(60))
        .attr("y2",yScale(60))
        .attr("stroke","red");
    
        svg.append("line")
        .attr("x1",xScale(30))
        .attr("x2",xScale(30))
        .attr("y1",yScale(height))
        .attr("y2",yScale(0))
        .attr("stroke","red");
}

var scatter2 = function(students,width,height) //scatter for Mean hw versus Mean Quiz
{
    var svg = d3.select("#hw_v_quiz")
        .attr("width",width)
        .attr("height",height);
    var xScale = d3.scaleLinear()
                    //.domain([-1,students.length])

                    .domain([d3.min(students, function(student){return meanGrade(student.quizes);})-1 ,
                                    d3.max(students, function(student){return meanGrade(student.quizes);})+1
                            ])
                    .range([0,width])
    
    var yScale = d3.scaleLinear()
                .domain([
                          d3.min(students, function(student){return meanGrade(student.homework);})-1,
                          d3.max(students, function(student){return meanGrade(student.homework);})+1
                        ])
                .range([height,0]);
    
    svg.selectAll("circle")
        .data(students)
        .enter()
        .append("circle")
        .attr("cx",function(student)
        {
            return xScale(meanGrade(student.quizes));    
        })
        .attr("cy",function(student)
        {
            return yScale(meanGrade(student.homework));  
        })
        .attr("r",3)
        .attr("fill","blue")
    
        .on("mouseover", function(student) {
            var xPosition = parseFloat(d3.select(this).attr("cx")) + 10;
            var yPosition = parseFloat(d3.select(this).attr("cy")) + 10;
        
            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#pengImg")
                    .attr("src", "imgs/" + student.picture);
        
            d3.select("#tooltip").select("#xdata")
                .text("Mean Quiz: "+ Math.round(meanGrade(student.homework)));
        
            d3.select("#tooltip").select("#ydata")
                .text("Mean HW: "+Math.round(meanGrade(student.homework)));
        
            d3.select("#tooltip #finalScore")
                .text("Final Score: " + student.final[0].grade);
        
            d3.select("#tooltip #avgHW")
                .text("HW Average: " + Math.round(meanGrade(student.homework)));
        
            d3.select("#tooltip #avgQuiz")
                .text("Quiz Average: " + Math.round(meanGrade(student.quizes)));
        
            d3.select("#tooltip #avgTest")
                .text("Test Average: " + Math.round(meanGrade(student.test)));
        
            d3.select("#tooltip").classed("hidden", false);
                
        }).on("mouseout", function() {
            d3.select("#tooltip").classed("hidden", true);
        });
    
    svg.append("line")
        .attr("x1",xScale(0))
        .attr("x2",xScale(width))
        .attr("y1",yScale(.6*50))
        .attr("y2",yScale(.6*50))
        .attr("stroke","red");
    
        svg.append("line")
        .attr("x1",xScale(6))
        .attr("x2",xScale(6))
        .attr("y1",yScale(height))
        .attr("y2",yScale(0))
        .attr("stroke","red");
    
    
}

var scatter3 = function(students,width,height) //Scatter of Mean Test versus Final 
{
    var svg = d3.select("#test_v_final")
        .attr("width",width)
        .attr("height",height);
    
    var xScale = d3.scaleLinear()
                    //.domain([-1,students.length])

                    .domain([d3.min(students, function(student){return meanGrade(student.test);})-1 ,
                                    d3.max(students, function(student){return meanGrade(student.test);})+1
                            ])
                    .range([0,width])
    
    var yScale = d3.scaleLinear()
                .domain([
                          d3.min(students, function(student){return student.final[0].grade;})-1,
                          d3.max(students, function(student){return student.final[0].grade;})+1
                        ])
                .range([height,0]);
    
    svg.selectAll("circle")
        .data(students)
        .enter()
        .append("circle")
        .attr("cx",function(student)
        {
            return xScale(meanGrade(student.test));    
        })
        .attr("cy",function(student)
        {
            return yScale(student.final[0].grade);  
        })
        .attr("r",3)
        .attr("fill","blue")
    
        .on("mouseover", function(student) {
            var xPosition = parseFloat(d3.select(this).attr("cx")) + 10;
            var yPosition = parseFloat(d3.select(this).attr("cy")) + 10;
        
            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#pengImg")
                    .attr("src", "imgs/" + student.picture);
        
            d3.select("#tooltip").select("#xdata")
                .text("Final: "+ Math.round(student.final[0].grade));
        
            d3.select("#tooltip").select("#ydata")
                .text("Mean Test: "+Math.round(meanGrade(student.test)));
        
            d3.select("#tooltip #finalScore")
                .text("Final Score: " + student.final[0].grade);
        
            d3.select("#tooltip #avgHW")
                .text("HW Average: " + Math.round(meanGrade(student.homework)));
        
            d3.select("#tooltip #avgQuiz")
                .text("Quiz Average: " + Math.round(meanGrade(student.quizes)));
        
            d3.select("#tooltip #avgTest")
                .text("Test Average: " + Math.round(meanGrade(student.test)));
        
            d3.select("#tooltip").classed("hidden", false);
                
        }).on("mouseout", function() {
            d3.select("#tooltip").classed("hidden", true);
        });
    
    svg.append("line")
        .attr("x1",xScale(0))
        .attr("x2",xScale(width))
        .attr("y1",yScale(.6*students[0].final[0].max))
        .attr("y2",yScale(.6*students[0].final[0].max))
        .attr("stroke","red");
    
        svg.append("line")
        .attr("x1",xScale(.6*students[0].test[0].max))
        .attr("x2",xScale(.6*students[0].test[0].max))
        .attr("y1",yScale(height))
        .attr("y2",yScale(0))
        .attr("stroke","red");
}

var scatter4 = function(students,width,height) //Scatter of Mean Test versus Mean Quiz
{
    var svg = d3.select("#test_v_quiz")
        .attr("width",width)
        .attr("height",height);
    
    var xScale = d3.scaleLinear()
                    //.domain([-1,students.length])

                    .domain([d3.min(students, function(student){return meanGrade(student.test);})-1 ,
                                    d3.max(students, function(student){return meanGrade(student.test);})+1
                            ])
                    .range([0,width])
    
    var yScale = d3.scaleLinear()
                .domain([
                          d3.min(students, function(student){return meanGrade(student.quizes);})-1,
                          d3.max(students, function(student){return meanGrade(student.quizes);})+1
                        ])
                .range([height,0]);
    
    svg.selectAll("circle")
        .data(students)
        .enter()
        .append("circle")
        .attr("cx",function(student)
        {
            return xScale(meanGrade(student.test));    
        })
        .attr("cy",function(student)
        {
            return yScale(meanGrade(student.quizes));  
        })
        .attr("r",3)
        .attr("fill","blue")
    
        .on("mouseover", function(student) {
            var xPosition = parseFloat(d3.select(this).attr("cx")) + 10;
            var yPosition = parseFloat(d3.select(this).attr("cy")) + 10;
        
            d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#pengImg")
                    .attr("src", "imgs/" + student.picture);
        
            d3.select("#tooltip").select("#xdata")
                .text("Mean tests: "+ Math.round(meanGrade(student.test)));
        
            d3.select("#tooltip").select("#ydata")
                .text("Mean Quizzes: "+Math.round(meanGrade(student.quizes)));
        
            d3.select("#tooltip #finalScore")
                .text("Final Score: " + student.final[0].grade);
        
            d3.select("#tooltip #avgHW")
                .text("HW Average: " + Math.round(meanGrade(student.homework)));
        
            d3.select("#tooltip #avgQuiz")
                .text("Quiz Average: " + Math.round(meanGrade(student.quizes)));
        
            d3.select("#tooltip #avgTest")
                .text("Test Average: " + Math.round(meanGrade(student.test)));
        
            d3.select("#tooltip").classed("hidden", false);
                
        }).on("mouseout", function() {
            d3.select("#tooltip").classed("hidden", true);
        });
    
    svg.append("line")
        .attr("x1",xScale(60))
        .attr("x2",xScale(60))
        .attr("y1",yScale(height))//.6*students[0].test[0].max))
        .attr("y2",yScale(0))//.6*students[0].test[0].max))
        .attr("stroke","red");
    
        svg.append("line")
        .attr("x1",xScale(0))//.6*students[0].quizes[0].max))
        .attr("x2",xScale(width))//.6*students[0].quizes[0].max))
        .attr("y1",yScale(6))
        .attr("y2",yScale(6))
        .attr("stroke","red");
}

var showScatter = function () {
    d3.selectAll("btn.plot").on("click", function() {
        d3.selectAll("btn.plot").classed("active", false);
        d3.select(this).classed("active", true);
        
        d3.selectAll(".plotDiv")
          .classed("hidden", true);
        
        var ref = d3.select(this).attr("id-ref");
        d3.select(ref).classed("hidden", false);
    })
}

// Get the penguin information
var penguinPromise = d3.json("classData.json");
penguinPromise.then(function(students) {
    var width = 800;
    var height= 500;
    console.log(students);
    scatter1(students,width,height);
    scatter2(students,width,height);
    scatter3(students,width,height);
    scatter4(students,width,height);
    
    showScatter();
    
}, function(err) {
    console.log("failed to get student data:", err);
});
