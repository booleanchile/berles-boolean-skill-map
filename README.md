# berles-boolean-skill-map
[circle-ci-image]: https://circleci.com/gh/booleanchile/berles-boolean-skill-map.svg?style=svg

[circle-ci-url]: https://circleci.com/gh/booleanchile/berles-boolean-skill-map

[npm-nodeico-image]: https://nodei.co/npm/berles-boolean-skill-map.png?downloads=true&downloadRank=true&stars=true
[npm-nodeico-url]: https://nodei.co/npm/berles-boolean-skill-map/


[![Build Status][circle-ci-image]][circle-ci-url] 
[![NPM][npm-nodeico-image]][npm-nodeico-url] 

D3 skills maps that represent a custom developer roadmap version of https://roadmap.sh

## Demo
Demo available in https://booleanchile.github.io/berles-boolean-skill-map/

## Installation

```
npm install berles-boolean-skill-map
```

## Usage
This library is compatible as UMD module or ES6 module.

#### UMD usage

```html
<body>
  <h1>Acá va el gráfico</h1>
  <div style="text-align: 'center';">
    <svg height="800" width="800">
      <g height={800} width={800} transform="translate(400,400)""
      ></g>
    </svg>
  </div>

  <script src="https://unpkg.com/berles-boolean-skill-map@latest/umd/skillsMap.js"></script>
  <script>
    const formData = {
      'Internet': [1, 1, 1, 2, 3],
      'Backend': [1, 1, 0, 0, 0],
      'Programación': [1, 1, 3, 0, 0],
      'Control Versiones': [1, 1, 2, 3, 0],
      'HTML y A11y': [1, 1, 1, 2, 3],
      'CSS': [1, 1, 1, 2, 3],
      'Javascript': [1, 1, 3, 0, 0],
      'Testing': [1, 1, 3, 0, 0],
      'Performance': [1, 1, 0, 0, 0],
      'Devops': [1, 1, 1, 0, 0],
      'Arquitectura': [1, 3, 0, 0, 0]
    };
    const skillsMapTarget = document.querySelector('svg > g');
    const onClickSegment = (segmentName, levelsData) => {
      console.log(segmentName, levelsData);
    };
    // UMD package it is available in window.skillsMap global variable
    window.SkillsMap.createSpiderChart(
      skillsMapTarget,
      formData,
      { onClickSegment }
    );
  </script>
</body>
```

#### ES6 Package

React JS Example
```javascript
import { createSpiderChart } from "berles-boolean-skill-map";

function SkillsMap() {
  const chartRef = useRef();

  useEffect(() => {
    const formData = {
      'Internet': [1, 1, 1, 2, 3],
      'Backend': [1, 1, 0, 0, 0],
      'Programación': [1, 1, 3, 0, 0],
      'Control Versiones': [1, 1, 2, 3, 0],
      'HTML y A11y': [1, 1, 1, 2, 3],
      'CSS': [1, 1, 1, 2, 3],
      'Javascript': [1, 1, 3, 0, 0],
      'Testing': [1, 1, 3, 0, 0],
      'Performance': [1, 1, 0, 0, 0],
      'Devops': [1, 1, 1, 0, 0],
      'Arquitectura': [1, 3, 0, 0, 0]
    };
    const chartOptions = {
      onClickSegment(segmentName, levelsData) {
        ModalGenerator(segmentName, levelsData);
      },
    };
    createSpiderChart(chartRef.current, formData, chartOptions);
  }, []);

  return (
    <>
      <h1>Acá va el gráfico</h1>
      <div style={{ textAlign: "center" }}>
        <svg height={800} width={800}>
          <g
            ref={chartRef}
            height={800}
            width={800}
            transform={`translate(
                ${400},
                ${400})`}
          ></g>
        </svg>
      </div>
    </>
  );
}

```
### Contributors
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/nicoavila"><img src="https://avatars0.githubusercontent.com/u/602639?v=4" width="100px;" alt=""/><br /><sub><b>nicoavila</b></sub></a><br /><a href="https://github.com/ngChile/ngchile-packages/commits?author=nicoavila" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/gpincheiraa"><img src="https://avatars0.githubusercontent.com/u/5608336?v=4" width="100px;" alt=""/><br /><sub><b>gpincheiraa</b></sub></a><br /><a href="https://github.com/ngChile/ngchile-packages/commits?author=gpincheiraa" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->