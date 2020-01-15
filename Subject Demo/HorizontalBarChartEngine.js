
// #region MetaData

// This function using to draw Horizontal Bar Chart, and return object that contains object for each part of chart,
// you can use those objects to make your chart resposive.
// In the engine event on legendClick and part of slices based on yScale labels Clicked, 
// IF you want to override all functionality of event you can using those signatures to create your functions:   
//      function OnMouseLegendClick(d, i){} => for lengend event Clicked
//      function OnMouseHBarChartClicked(d, i){} => for each part of slices based on yScale labels Clicked

// IF you want to increase some of your functionality for main functionality of each event you can using those signatures to create your functions:
//       function CLickDownHBarLegend(d, i){} => for Legend event clicked this fired when clicked down only on each part of legend
//       function ClickUpHBarLegend(d, i){} => for Legend event clicked this fired when clicked Up only on each part of legend
//       You can use the above two methods to subscribe all event of legend event (DOWN/UP)
//       function CLickDownHBarChart(d, i){} => for partOFBarChart based on YScale labels, event clicked this fired when clicked down only on each part of legend
//       function ClickUpHBarChart(d, i){} => for partOFBarChart based on YScale labels, event clicked this fired when clicked down only on each part of legend

//       function OnMouseHBarChartHovered(d, i){} => the event hovered this fired when hovered on each slice of bar chart
//       function OnMouseHBarChartOutted(d, i){} => the event outted this fired when outted from each slice of bar chart
//       function OnMouseHBarChartMoved(d, i){} => the event Moved this fired when Moved on each slice of bar chart

// It take an object that contains some of property that using to draw the chart:
// 1- divClassName: it is a mandatory you set class name of DIV which is want to draw the chart in it
// 2- height: it is a mandatory, it set a height of main SVG
// 3- SVG: it is an optional property, you can set it with exist SVG object ,if you draw exist chart and want to draw new chart above it
// 4- NumberOfSlice: It is a mandatory , it is a number of slices that you want to draw its with the chart
// 5- xScaleMaxNumber: It is a mandatory, it is a max number that using to draw Scale
// 6- dataSet: It is a mandatory , it must contains some of property as:
//      {Label: 'Label 01' ,ClassName: 'A A01' , ValueItem1: 22 , ValueItem2: 34 , ....},
//      {Label: 'Label 01' ,ClassName:'B', ValueItem1: 25 , ValueItem2: 55 , ....}    
//      Label => Items that occurs in yScale
//      ValueItem1 / ValueItem2 / ValueItem[n] => Its are Values of Slices , each ValueItem[n] act as Slice of all YScale.
//      ClassName => If you want to add class name for each slice
// 7- title: It is an optional, you can set Title for Chart
// 8- colors: It is a mandatory, set it as array of colors that you want to using those to color slices
// 9- dataLegend: It is an optional , you can set it if you want to show Legned, but you must set array of names in order as order of slices as
//      ['valueItem1' , 'valueItem2' , ...] each value here must be name that you want to  occure in legend and much each slice
// 10- xScaleTitle: It is an optional, you can set it with string value if you want to occure title for XScale
// 11- yScaleTitle: It is an optional, you can set it with string value if you want to occure title for YScale
// 12- ShowLabels: It is an optional , you can set it with TRUE if you want to show values of each slice with it.
// 13- ShowXScale: It is an optional , you can set it with TRUE if you want to show XLine.
// 14- ShowYScale: It is an optional , you can set it with TRUE if you want to show YLine.
// 15- HiddenYTips: It is an optional, you can set it if you want to hidden the lines of YScale
// 16- HiddenXTips: It is an optional, you can set it if you want to hidden the lines of XScale
// 17- showVerticalLines: It is an optional, you can set it with true if you want to draw Vertical Lines

// #endregion

let _div_class_Name_Horiz = '';
function DrawHorizontalBarChart({
    //#region Properties
    divClassName,
    height,
    SVG,
    NumberOfSlice,
    xScaleMaxNumber,
    dataSet,
    title,
    colors,
    dataLegend,
    legendTitle,
    xScaleTitle,
    yScaleTitle,
    ShowLabels = false,
    ShowXScale = false,
    ShowYScale = false,
    HiddenYTips = false,
    HiddenXTips = false,
    showVerticalLines = false
    //#endregion
}) {
    let result = {};
    // #region MAin SVG
    let color = d3.scaleOrdinal(colors);
    let svgWidth;
    let svgLegend;
    let svgBar;
    let svgXAxis;
    _div_class_Name_Horiz = divClassName;
    // let height = height;
    let div = document.getElementsByClassName(divClassName)[0];
    let mainDivHeight = document.getElementsByClassName(divClassName)[0].offsetHeight;

    let divLegend = document.createElement('div');
    divLegend.setAttribute('class', 'divLegend');
    divLegend.style.height = ((mainDivHeight / 10) * 1.5) + 'px';

    divLegend.style.marginLeft = '90px';

    let divBody = document.createElement('div');
    divBody.setAttribute('class', 'divBody');
    divBody.style.height = ((mainDivHeight / 10) * 7.5) + 'px';
    divClassName = 'divBody';
    if ((height + 20) > mainDivHeight)
        divBody.style.overflowY = "scroll";

    let divXAxis = document.createElement('div');
    divXAxis.setAttribute('class', 'divXAxis');
    divXAxis.style.height = ((mainDivHeight / 10) * 1) + 'px';

    div.appendChild(divLegend);
    div.appendChild(divBody);
    div.appendChild(divXAxis);

    if (SVG == undefined) {
        svgLegend = d3.select('.divLegend')
            .append('svg')
            .attr('class', 'svgLegend')
            .attr("height", ((mainDivHeight / 10) * 1.5))
        // .style('width', '100%');

        svgBar = d3.select("." + divClassName)
            .append("svg")
            .attr('class', 'svgBar')
            .attr("height", height - 124)
            .style('width', '100%')
            .style('overflow', 'visible');

        svgXAxis = d3.select('.divXAxis')
            .append('svg')
            .attr('class', 'svgXAxis')
            .attr("height", 20)
            .style('width', '100%');
    } else {
        svgBar = SVG;
        svgLegend = SVG.SVGLegend;
        svgXAxis = SVG.SVGXAxis;
    }
    svgWidth = document.getElementsByClassName(divClassName)[0].clientWidth;
    result.SVG = svgBar;
    result.SVG.SVGLegend = svgLegend;
    result.SVG.SVGXAxis = svgXAxis;
    result.SvgWidth = svgWidth;
    // #endregion

    // #region XScale && YScale
    let xScale = d3.scaleLinear()
        .domain([0, xScaleMaxNumber])
        .range([0, svgWidth - 150]);
    if (ShowXScale) {
        let gXScale = svgXAxis.append("g")
            .attr('class', "xScale")
            .attr("transform", 'translate(100 , ' + (0) + ')')
            .call(d3.axisBottom(xScale));
        result.gXScale = gXScale;
    }


    if (xScaleTitle != undefined) {
        let gXScaleTitle = svgBar.append("g")
            .attr('class', "xScaleTitle")
            .attr("transform", 'translate(' + (svgWidth / 2) + ' , ' + (height - 10) + ')')
            .append('text')
            .text(xScaleTitle);
        result.xScaleTitle = gXScaleTitle;
    }

    let yScale = d3.scaleBand()
        .domain(dataSet.map((d) => d.Label))
        .range([30, height - 100])
        .padding(0.1)
    if (ShowYScale) {
        let gYScale = svgBar.append("g")
            .attr('class', "yScale")
            .attr("transform", 'translate(100 , ' + (-20) + ')')
            .call(d3.axisLeft(yScale));
        result.gYScale = gYScale;
    }


    if (yScaleTitle != undefined) {
        let gYScaleTitle = svgBar.append("g")
            .attr('class', "yScaleTitle")
            .attr("transform", 'translate(20 , ' + (height / 2) + ')')
            .append('text')
            .text(yScaleTitle)
            .attr('transform', 'rotate(-90)');
        result.yScaleTitle = gYScaleTitle;
    }
    // #endregion

    // #region showVerticalLines
    if (showVerticalLines) {
        let gBarLine = svgBar.append('g')
            .attr('class', 'gBarLine')
            .attr("transform", 'translate(100 , ' + 80 + ')')
        for (let index = 0; index < xScale.ticks().length; index++) {
            gBarLine.append('line')
                .attr('transform', d3.selectAll(".xScale .tick")._groups[0][index].getAttribute("transform"))
                .attr('y2', (height - 130))
                .attr('stroke', 'gray')
                .attr('opacity', '0.2')
        }
    }
    // #endregion

    // #region Title
    if (title != undefined) {
        let gBarTitle = svgBar.append('text')
            .attr('class', 'gBarTitle')
            .attr("transform", 'translate(' + ((svgWidth / 2) - 250) + ' , ' + 30 + ')')
            .text(title)
            .attr('font-size', '12')
            .attr('font-weight', 'bold');
        result.gBarTitle = gBarTitle;
    }
    // #endregion

    // #region Draw Bar Chart
    let prevIndex = 0;
    for (let index = 1; index <= NumberOfSlice; index++) {
        let gBarChart = svgBar.append("g")
            .attr('class', 'gBarChart')
            .attr("transform", 'translate(100 , ' + (-20) + ')');

        gBarChart.selectAll('.g' + dataLegend[index - 1])
            .data(dataSet)
            .enter()
            .append('rect')
            .attr("class", (d) => (dataLegend != undefined ? dataLegend[index - 1].replace(/\s/g, '') : '') + ' BarChat ' + d.Label.replace(/\s/g, '') + ' ' + (d.ClassName != undefined ? d.ClassName : ''))
            .attr("x", 0)
            .attr("y", (d) => yScale(d.Label) + (index == prevIndex ? ((yScale.bandwidth() / NumberOfSlice) * (index - 1)) : 0))
            .attr("width", (d) => xScale(d['ValueItem' + index]))
            .attr("height", (yScale.bandwidth() / NumberOfSlice) - 2)
            .attr('fill', color(index - 1))
            .on('mouseover', OnMouseBarChartHovere)
            .on('mouseout', OnMouseBarChartOut)
            .on('mousemove', OnMouseBarChartMove)
            .on('mousedown', OnMouseHBarChartClick)

        if (ShowLabels) {
            let gBarChartLabel = svgBar.append("g")
                .attr('class', 'gBarChartLabel' + dataLegend[index - 1])
                .attr("transform", 'translate(100 , ' + ((yScale.bandwidth() / 10) - 15) + ')');
            gBarChartLabel.selectAll('.' + dataLegend[index - 1])
                .data(dataSet)
                .enter()
                .append('text')
                .attr("class", d => dataLegend[index - 1] + ' label' + d.Label.replace(/\s/g, ''))
                .text((d) => d['ValueItem' + index])
                .attr("x", (d) => xScale(d['ValueItem' + index]) + 5)
                .attr("y", (d) => yScale(d.Label) + ((yScale.bandwidth() / NumberOfSlice) / 2) - 5 + (index == prevIndex ? ((yScale.bandwidth() / NumberOfSlice) * (index - 1)) : 0))
                .attr('font-size', '12')
        }

        prevIndex = index + 1;

        result['gBarChartItem' + index] = gBarChart;
    }
    // #endregion

    // #region Draw Legend
    if (dataLegend != undefined) {
        let maxLength = GetMaxSizeOfLegend(dataLegend);
        let svgWidthWithAllData = (maxLength * dataLegend.length) + maxLength;
        d3.select('.svgLegend')
            .attr('width', svgWidthWithAllData);

        if (legendTitle != undefined) {
            let gLegendBarTitle = svgLegend.append('g')
                .attr('class', 'gLegendBarTitle')
                .attr("transform", 'translate(' + 10 + ' , ' + 50 + ')');
            gLegendBarTitle
                .append('text')
                .text(legendTitle)
                .attr('class', 'legendTitle')
                .attr('x', '0')
                .attr('y', '-20')
                .attr('font-size', '20')
                .attr('font-weight' , 'bold')
        }

        let yCount = 0;
        let cy = 0;
        let xCount = 0;
        let lineNumber = 0; // number of legend lines
        let gLegendBarText = svgLegend.append('g')
            .attr('class', 'gLegendBarText')
            .attr("transform", 'translate(' + 17 + ' , ' + (legendTitle != undefined ? 80 : 60) + ')');
        gLegendBarText.selectAll('.txt')
            .data(dataLegend)
            .enter()
            .append('text')
            .text((d) => d)
            .attr('class', (d) => d.replace(/\s/g, '') + ' legendText')
            .attr('x', (d, i) => {
                if ((maxLength * xCount * 1.1) > (document.getElementsByClassName('divLegend')[0].offsetWidth - 90)) { // 90 is a margin left
                    xCount = 0;
                    lineNumber += 1;
                }
                return (maxLength + 15) * xCount++;
            })
            .attr('y', (d, i) => {
                if ((maxLength * yCount * 1.1) > (document.getElementsByClassName('divLegend')[0].offsetWidth - 90)) {
                    cy += 30;
                    yCount = 0;
                }
                yCount++;
                return -20 + cy;
            })
            .attr('font-size', '15')
            .style('cursor', 'pointer')
            .on('mousedown', OnMouseLegendClick)

        let w = +(d3.select('.svgLegend').attr('height'));
        d3.select('.svgLegend')
            .attr('height', w + (lineNumber * 20));
        if (svgWidthWithAllData + maxLength > (document.getElementsByClassName('divLegend')[0].offsetWidth - 90)) {
            divLegend.style.overflowY = 'scroll';
            divLegend.style.overflowX = 'hidden';
        }
        if(lineNumber <= 2 && legendTitle == undefined){
            divLegend.style.overflowY = 'hidden';
        }

        xCount = 0;
        yCount = 0;
        cy = 0;
        let gLegendBarColor = svgLegend.append('g')
            .attr('class', 'gLegendBarColor')
            .attr("transform", 'translate(10 , ' + (legendTitle != undefined ? 75 : 57) + ')');
        gLegendBarColor.selectAll('.txt')
            .data(dataLegend)
            .enter()
            .append('circle')
            .attr('class', (d) => d.replace(/\s/g, '') + ' Legend')
            .attr('cx', (d, i) => {
                if ((maxLength * xCount * 1.1) > (document.getElementsByClassName('divLegend')[0].offsetWidth - 90)) {
                    xCount = 0;
                }
                return (maxLength + 15) * xCount++;
            })
            .attr('cy', (d, i) => {
                if ((maxLength * yCount * 1.1) > (document.getElementsByClassName('divLegend')[0].offsetWidth - 90)) {
                    cy += 30;
                    yCount = 0;
                }
                yCount++;
                return -20 + cy;
            })
            .attr('r', '6')
            .attr('fill', (d, i) => color(i))
            .style('cursor', 'pointer')
            .on('mousedown', OnMouseLegendClick)

        result.gLegendBarText = gLegendBarText;
        result.gLegendBarColor = gLegendBarColor;
    }
    // #endregion

    // #region Show/Hidden Y/X Tips
    if (HiddenYTips) {
        d3.selectAll('.yScale .domain')
            .attr('opacity', '0')
        d3.selectAll('.yScale line')
            .attr('opacity', '0')
    }
    if (HiddenXTips) {
        d3.selectAll('.xScale .domain')
            .attr('opacity', '0')
        d3.selectAll('.xScale line')
            .attr('opacity', '0')
    }
    // #endregion

    return result;
}

// #region Event Methods 
let flagH = -1;
function OnMouseLegendClick(d, i) {
    if (typeof OnMouseLegendClicked == 'function') {
        OnMouseLegendClicked(d, i);
    }
    else {
        if (flagH != i) {
            d3.selectAll('.BarChat')
                .attr('opacity', '0.3');
            d3.selectAll('.Legend')
                .attr('opacity', '0.3');
            d3.selectAll('.' + d.replace(/\s/g, ''))
                .attr('opacity', '1');

            if (typeof CLickDownHBarLegend == 'function')
                CLickDownHBarLegend(d, i);
            flagH = i;
        } else {
            d3.selectAll('.BarChat')
                .attr('opacity', '1');
            d3.selectAll('.Legend')
                .attr('opacity', '1');

            if (typeof ClickUpHBarLegend == 'function')
                ClickUpHBarLegend(d, i);
            flagH = -1;
        }
    }

}

let flagHBar = -1;
function OnMouseHBarChartClick(d, i) {
    if (typeof OnMouseHBarChartClicked == 'function')
        OnMouseHBarChartClicked(d, i);

    else {
        if (flagHBar != i) {
            d3.selectAll('.BarChat')
                .attr('opacity', '0.3');
            d3.selectAll('.' + d.Label.replace(/\s/g, ''))
                .attr('opacity', '1');
            d3.selectAll('.Legend')
                .attr('opacity', '1');

            if (typeof CLickDownHBarChart == 'function')
                CLickDownHBarChart(d, i);
            flagHBar = i;
        } else {
            d3.selectAll('.BarChat')
                .attr('opacity', '1');

            if (typeof ClickUpHBarChart == 'function')
                ClickUpHBarChart(d, i);
            flagHBar = -1;
        }
    }
}

function OnMouseBarChartHovere(d, i) {

    if (typeof OnMouseHBarChartHovered == 'function')
        OnMouseHBarChartHovered(d, i);
}
function OnMouseBarChartOut(d, i) {

    if (typeof OnMouseHBarChartOutted == 'function')
        OnMouseHBarChartOutted(d, i);
}
function OnMouseBarChartMove(d, i) {

    if (typeof OnMouseHBarChartMoved == 'function')
        OnMouseHBarChartMoved(d, i);
}

// #endregion

// #region HelperMethods

function GetMaxSizeOfLegend(dataLegendSet = []) {
    let maxWidth = 0;
    dataLegendSet.forEach(item => {
        let text = document.createElement('p');
        text.append(item);
        text.style.width = 'fit-content';
        document.getElementsByClassName(_div_class_Name_Horiz)[0].appendChild(text);
        if (text.clientWidth > maxWidth)
            maxWidth = text.clientWidth;

        text.remove();
    })
    return maxWidth;
}
// #endregion
