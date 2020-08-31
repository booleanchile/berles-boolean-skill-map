import * as d3 from "d3";

const createSpiderChart = (node, data, options = { onClickSegment: () => {} }) => {
  /*
    data is an key:value Object received from parent Component, where
    the 'key' is the skill as a string and the 'value' is an array of
    numbers. It contains the data to be visualized
  */
  /*
    number_of_segments is the number of sections that the skills-map must
    have. It is calculated as the length of the 'data' variable.
  */
  const number_of_segments = Object.keys(data).length;
  /*
    number_of_levels is the amount of levels associated to every segment.
    It is calculated from the length of the array of the first item in
    'data'. This assumes that every skill has the same amount of levels.
    TODO: What happens if the skills don't have the same amount of levels?
  */
  const number_of_levels = data["Internet"].length;
  /*
    padding is the separation between every level on each segment
  */
  const padding = 50;
  /*
    angle is the result of 360° (2*Math.PI) divided by 'number_of_segments'
    The result is the number of degrees every segment must have.
  */
  const angle = (2 * Math.PI) / number_of_segments;
  /*
    padding_between_segments is the separation between segments. Corresponds
    to 1° and it's used both to the right and the left side of the segment.
  */
  const padding_between_segments = Math.PI / 90;

  /*
    colorArray is an key:value Object. The color of the level is defined
    according to the number associated to said level
  */
  const colorArray = {
    0: "#C0C0C0",
    1: "#41D38C",
    2: "#2EAB6D",
    3: "#6D03D7",
    4: "#460388",
    5: "#28024E",
  };

  function handleArcClick(segmentName, levelsData) {
    //alert(`Clicked ${segment}`);
    options.onClickSegment(segmentName, levelsData);
  }

  /*
    Here, the magic happens (i'm not entirely certain of what happens in
    this section, so it may need some refactor to make it efficient)

    As React and D3 both want to control the DOM, an useEffect Hook is
    needed in order to tell React to re-render the component. In this way,
    first the components are generated (div, svg, g) and <g> is associated
    to the chartRef hook.

    Then, a re-render is triggered (why is it triggered?) and the code
    inside the useEffect hook is executed. The re-render is necessary,
    otherwise it would be imposible to use d3 to select something that
    doesn't exist.

    The first loop (j) iterates from 1 to number_of_segments+1. It's used to
    'iterate over the segments'. The +1 is for further calculations.

    The second loop (i) iterates from 0 to number_of_levels. It's used to
    'iterate over the levels'.

    startAngle is the angle that every segment has +padding_between_segments
    The multiplication by (j-1) is necessary in order to, on each iteration,
    move the starting angle of the arc.
    In the case of 'endAngle', the same calculation is made, but
    -padding_between_segments. This results in an arc that has an angle of
    angle - 2*padding_between_segments (the start angle is forwarded by 
    padding_between_segments and the end angle is pulled back by
    padding_between_segments).

    An d3 arc component is generated, using the angles calculated before,
    and radius defined by a constan + padding*i, which separates the arcs
    while the level changes.
  */
  let skillsMapNode = null;

  for (let j = 1; j < number_of_segments + 1; j++) {
    const segmentName = Object.keys(data)[j - 1];
    const segmentID = `segment-${j}`;
    skillsMapNode = d3
      .select(node)
      .append("g")
      .attr("class", segmentID)
      .attr("role","listitem")
      .attr("aria-label", segmentName)
      .on("click", () => {
        handleArcClick(segmentName, data[segmentName])
      })
      .on("mouseover", function (d, i) {
        d3.select(this).style("transform", "scale(1.1,1.1)");
      })
      .on("mouseleave", function (d, i) {
        d3.select(this).style("transform", "scale(1,1)");
      });

    for (let i = 0; i < number_of_levels; i++) {
      const startAngle = angle * (j - 1) + padding_between_segments;
      const endAngle = angle * j - padding_between_segments;
      const arc = d3
        .arc()
        .innerRadius(50 + padding * i)
        .outerRadius(100 + padding * i)
        .startAngle(startAngle)
        .endAngle(endAngle);

      /*
      using the chartRef hook, the <g> component is selected and the
      prior generated arc is appended, filling it with the corresponding
      color
      */
      skillsMapNode
        .append("path")
        .attr("d", arc)
        .attr("stroke", "#FFF")
        .attr("stroke-width", "2px")
        .attr("fill", colorArray[data[Object.keys(data)[j - 1]][i]]);

      /*
      This condition is used to place the labels. In order to do this,
      an invisible curve must be generated at the end of every segment,
      thus, the curve must be generated on the last iteration of the
      second loop
      */
      if (i == number_of_levels - 1) {
        /*
        outerArc is defined as type any. This will be the outer curve.

        rightTopLimit and leftTopLimit are the limits of the top half
        of the chart in degrees. This is used to turn the bottom labels
        to make them readable

        The angles start at the top part of the screen. In normal
        cartesian plane, 90°. That's the reason of the limits being
        'unusual'
        */
        let outerArc;
        const rightTopLimit = (Math.PI / 180) * 90;
        const leftTopLimit = (Math.PI / 180) * 260;
        /*
        If the arc is in the upper half of the chart, outerArc is a
        normal arc
        The radius constant is greater than normal case for visual
        reasons (otherwise, the label it's placed to close to the chart)
        */
        if (startAngle < rightTopLimit || startAngle > leftTopLimit) {
          outerArc = d3
            .arc()
            .innerRadius(105 + padding * i)
            .outerRadius(105 + padding * i)
            .startAngle(startAngle)
            .endAngle(endAngle);
        } else {
          /*
          If the arc is in the bottom half of the chart, outerArc is
          drawn backwards.
          The radius constant is greater than prior case for visual
          reasons
          */
          outerArc = d3
            .arc()
            .innerRadius(120 + padding * i)
            .outerRadius(120 + padding * i)
            .startAngle(endAngle)
            .endAngle(startAngle);
        }
        /*
        The <g> component is selected and the outerArc is appended.
        This arc has an id attribute that identifies every segment.

        TODO: extreme case --> what happens when 2 segments have the
        same name?
        */
        skillsMapNode
          .append("path")
          .attr("d", outerArc)
          .attr("fill", "none")
          .attr("id", Object.keys(data)[j - 1]);
      }
    }
    /*
    The <g> component is selected and a <textPath> component is appended
    inside a <text>
    The 'href' attribute matches the label to the corresponding segment.
    'startOffset' and 'text-anchor' are used to center the text in the
    invisible arc.
    Finally, the label is entered from the data.
    */
    skillsMapNode
      .append("text")
      .append("textPath")
      .attr("href", `#${Object.keys(data)[j - 1]}`)
      .attr("startOffset", "25%")
      .style("text-anchor", "middle")
      .text(Object.keys(data)[j - 1]);
  }
  /*
    should return entire chart
  */
  return skillsMapNode.node().parentNode;
};

export {
  createSpiderChart,
};
