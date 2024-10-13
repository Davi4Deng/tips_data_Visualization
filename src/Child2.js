import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    var data = this.props.data2;

    // Data aggregation, calculating average tips based on day
    var avgTipByDay = d3.rollups(
      data,
      (v) => d3.mean(v, (d) => d.tip),
      (d) => d.day
    ).map(([day, avgTip]) => ({ day, avgTip }));

    // Set chart dimensions and margins
    var margin = { top: 50, right: 10, bottom: 80, left: 60 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    // Clear previous chart content (if any)
    d3.select(".child2_svg").selectAll("*").remove();

    var container = d3
      .select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Set X axis
    var x = d3
      .scaleBand()
      .domain(avgTipByDay.map((d) => d.day))
      .range([0, w])
      .padding(0.2);

    container
      .append("g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x));

    // Set Y axis
    var y = d3
      .scaleLinear()
      .domain([0, d3.max(avgTipByDay, (d) => d.avgTip)])
      .nice()
      .range([h, 0]);

    container.append("g").call(d3.axisLeft(y));

    // Generate histogram
    container
      .selectAll("rect")
      .data(avgTipByDay)
      .join("rect")
      .attr("x", (d) => x(d.day))
      .attr("y", (d) => y(d.avgTip))
      .attr("width", x.bandwidth())
      .attr("height", (d) => h - y(d.avgTip))
      .attr("fill", "#69b3a2");

    // Add X-axis labels
    container
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", w / 2)
      .attr("y", h + margin.top + 10)
      .text("Day");

    // Add Y-axis labels
    container
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", -h / 2)
      .attr("y", -margin.left + 20)
      .attr("transform", "rotate(-90)")
      .text("Average Tip");

    // Add chart title
    container
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", w / 2)
      .attr("y", -20)
      .style("font-size", "16px")
      .text("Average Tip by Day");
  }

  render() {
    return <svg className="child2_svg"></svg>;
  }
}

export default Child2;
