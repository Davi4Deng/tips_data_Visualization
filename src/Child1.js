import React,{ Component } from "react";
import * as d3 from "d3";


class child1 extends Component{
  constructor(props){
    super(props)
    this.state={}
  }
  componentDidMount(){
    console.log(this.props.data1);
  }
  componentDidUpdate(){
    var data=this.props.data1

    //set the dimensions and margins of the graph
    var margin = { top: 45, right: 30, bottom:110, left:25 },
        w = 600 - margin.left - margin.right,
        h = 350 - margin.top - margin.bottom;

    var container = d3.select(".child1_svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .select(".g_1")
    .attr("transform",`translate(${margin.left}, ${margin.top})`);

    // Add x axis
    var x_data=data.map(item=>item.total_bill)
    const x_scale = d3.scaleLinear().domain([0,d3.max(x_data)]).range([margin.left, w]);
    container.selectAll(".x_axis_g").data([0]).join('g').attr("class",'x_axis_g')
    .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

    // Add Y axis
    var y_data=data.map(item=>item.tip)
    const y_scale = d3.scaleLinear().domain([0,d3.max(y_data)]).range([h, 0]);
    container.selectAll(".y_axis_g").data([0]).join('g').attr("class",'y_axis_g')
    .attr("transform",`translate(${margin.left},0)`).call(d3.axisLeft(y_scale));

    container.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", function (d) {
            return x_scale(d.total_bill);
        })
        .attr("cy", function (d){
            return y_scale(d.tip);
        })
        .attr("r", 3)
        .style("fill", "#69b3a2")

    // Add X axis label
    container.append("text")
    .attr("text-anchor", "end")
    .attr("x", w / 2 + margin.left)
    .attr("y", h + margin.top + 0)
    .text("Total Bill");

    // Add Y axis label
    container.append("text")
        .attr("text-anchor", "end")
        .attr("x", -(h / 2))
        .attr("y", -margin.left + 20)
        .attr("transform", "rotate(-90)")
        .text("Tips");

    // Add chart title
    container.append("text")
        .attr("text-anchor", "middle")
        .attr("x", w / 2)
        .attr("y", -20)
        .style("font-size", "16px")
        .text("Total Bill vs Tips");
    }
  render(){
    return (
        <svg className="child1_svg">
            <g className="g_1"></g>
        </svg>
    );
  }
}

export default child1;